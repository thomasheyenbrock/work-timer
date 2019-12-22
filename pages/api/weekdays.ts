import { NextApiResponse, NextApiRequest } from "next";
import { Weekday } from "../[date]";
import {
  startOfWeek,
  parseISO,
  setDay,
  format,
  parse,
  differenceInHours
} from "date-fns";
import {
  writeFile as writeFileCallback,
  readFile as readFileCallback
} from "fs";
import { promisify } from "util";
import { resolve } from "path";

const writeFile = promisify(writeFileCallback);
const readFile = promisify(readFileCallback);

const createWeekdayStub = (date: string) => ({
  date,
  delta: 0,
  workTimes: [],
  breaks: []
});

const addDeltaToWeekday = (weekday: Weekday) => {
  const workHours = weekday.workTimes
    .map(workTime => ({
      end: parse(workTime.end, "HH:mm", new Date()),
      start: parse(workTime.start, "HH:mm", new Date())
    }))
    .reduce(
      (totalWorkTime, workTimeSlot) =>
        totalWorkTime + differenceInHours(workTimeSlot.end, workTimeSlot.start),
      0
    );
  const breakHours = weekday.breaks.reduce(
    (totalBreakTime, breakDuration) =>
      totalBreakTime +
      differenceInHours(
        parse(breakDuration.duration, "HH:mm", new Date()),
        parse("00:00", "HH:mm", new Date())
      ),
    0
  );
  return {
    ...weekday,
    delta: workHours - breakHours - 8
  };
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { date } = req.query;
  if (Array.isArray(date)) {
    res.statusCode = 400;
    res.end();
    return;
  }
  const startDate = startOfWeek(parseISO(date));
  const weekdayKeys = Array.from({ length: 7 }).map((_, index) =>
    format(setDay(startDate, index), "yyyy-MM-dd")
  );
  if (req.method === "POST") {
    if (!Array.isArray(req.body)) {
      res.statusCode = 400;
      res.end();
      return;
    }
    const newStore = weekdayKeys.reduce((updatedStore, weekdayKey) => {
      updatedStore[weekdayKey] = req.body.find(
        (weekday: any) => weekday.date === weekdayKey
      );
      return updatedStore;
    }, {} as { [key: string]: Weekday });
    const storeString = await readFile(resolve("weekdays.json"), "utf-8");
    const store = JSON.parse(storeString);
    await writeFile(
      resolve("weekdays.json"),
      JSON.stringify({ ...store, ...newStore })
    );
    res.statusCode = 200;
    res.end(JSON.stringify(newStore));
  } else {
    const storeString = await readFile(resolve("weekdays.json"), "utf-8");
    const store = JSON.parse(storeString);
    const weekdays = weekdayKeys.map(weekday =>
      addDeltaToWeekday(store[weekday] || createWeekdayStub(weekday))
    );
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    res.end(JSON.stringify(weekdays));
  }
};

export default handler;

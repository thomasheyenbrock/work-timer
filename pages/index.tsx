import startOfWeek from "date-fns/startOfWeek";
import setDay from "date-fns/setDay";
import endOfWeek from "date-fns/endOfWeek";
import parseISO from "date-fns/parseISO";
import { NextPage } from "next";
import useSWR, { mutate, trigger } from "@zeit/swr";
import Layout from "../components/Layout";
import format from "../utils/format";
import customFetch from "../utils/fetch";
import WeekdayListItem from "../components/WeekdayListItem";
import de from "date-fns/locale/de";
import absoluteUrl from "../utils/absolute-url";

type WorkTime = {
  start: string;
  end: string;
};

type Break = {
  duration: string;
};

export type Weekday = {
  date: string;
  delta: number;
  workTimes: WorkTime[];
  breaks: Break[];
};

const WeekView: NextPage<{
  startOfWeekDateString: string;
  backendUrl: string;
  initialData: unknown;
}> = ({
  startOfWeekDateString = startOfWeek(new Date()).toISOString(),
  backendUrl,
  initialData
}) => {
  const startOfWeekDate = parseISO(startOfWeekDateString);
  const { data: weekdays, error } = useSWR<Weekday[]>(backendUrl, customFetch, {
    initialData
  } as any);
  const setWeekdays = async (updatedWeekdays: Weekday[]) => {
    mutate(backendUrl, updatedWeekdays, false);
    // send text to the API
    await customFetch(backendUrl, {
      method: "POST",
      body: JSON.stringify(updatedWeekdays),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    trigger(backendUrl);
  };

  if (error) {
    return <Layout>Error loading the data</Layout>;
  }
  if (!weekdays) {
    return <Layout>No Data</Layout>;
  }

  return (
    <Layout>
      <h1>Woche vom {format(startOfWeekDate, "do MMMM")}</h1>
      <ul>
        {weekdays.map((weekday, index) => {
          const updateWeekday = (updatedWeekday: Weekday) => {
            setWeekdays([
              ...weekdays.slice(0, index),
              updatedWeekday,
              ...weekdays.slice(index + 1)
            ]);
          };
          return(
            <WeekdayListItem
              weekday={weekday}
              onChangeWeekday={updateWeekday}
              key={weekday.date}
              showDivider={index < weekdays.length - 1}
              isActive={true}
            />
          );
        })}
      </ul>
      <style jsx>{`
        h1 {
          font-size: 1.5rem;
          padding: 16px;
        }
        ul {
          list-style: none;
        }
      `}</style>
    </Layout>
  );
};

WeekView.getInitialProps = async ({ req }) => {
  const { origin } = absoluteUrl(req, "localhost:3000");
  const startOfWeekDate = startOfWeek(new Date("2019-10-19"), { locale: de });
  const endOfWeekDate = endOfWeek(startOfWeekDate);
  const backendUrl = `${origin}/api/weekdays?from=${encodeURIComponent(
    startOfWeekDate.toISOString()
  )}&to=${encodeURIComponent(endOfWeekDate.toISOString())}`;
  const data = await customFetch(backendUrl, { method: "GET" });
  console.log(data);
  return {
    startOfWeekDateString: startOfWeekDate.toISOString(),
    initialData: data,
    backendUrl
  };
};

export default WeekView;

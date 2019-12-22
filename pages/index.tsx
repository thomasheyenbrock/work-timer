import startOfWeek from "date-fns/startOfWeek";
import setDay from "date-fns/setDay";
import endOfWeek from "date-fns/endOfWeek";
import parseISO from "date-fns/parseISO";
import { NextPage } from "next";
import useSWR from "@zeit/swr";
import Layout from "../components/Layout";
import format from "../utils/format";
import customFetch from "../utils/fetch";
import WeekdayListItem from "../components/WeekdayListItem";

type WorkTime = {
  start: string;
  end: string;
};

type Duration = {
  hours: number;
  minutes: number;
};
type Break = {
  duration: Duration;
};

export type Weekday = {
  date: string;
  delta: number;
  workTimes: WorkTime[];
  breaks: Break[];
};

const WeekView: NextPage<{
  startOfWeekDateString: string;
  url: string;
  initialData: unknown;
}> = ({
  startOfWeekDateString = startOfWeek(new Date()).toISOString(),
  url,
  initialData
}) => {
  const startOfWeekDate = parseISO(startOfWeekDateString);
  const { data, error } = useSWR<Weekday[]>(url, customFetch, {
    initialData
  } as any);
  console.log(data, error);
  const businessDaysOfWeek = [
    setDay(startOfWeekDate, 1),
    setDay(startOfWeekDate, 2),
    setDay(startOfWeekDate, 3),
    setDay(startOfWeekDate, 4),
    setDay(startOfWeekDate, 5)
  ];

  return (
    <Layout>
      <h1>Woche vom {format(startOfWeekDate, "do MMMM")}</h1>
      <ul>
        {businessDaysOfWeek.map((businessDayOfWeek, index) => (
          <WeekdayListItem
            weekday={{
              date: businessDayOfWeek.toISOString(),
              delta: Math.round((Math.random() * 2 - 1) * 4),
              workTimes: [],
              breaks: []
            }}
            key={businessDayOfWeek.toISOString()}
            showDivider={index < businessDaysOfWeek.length - 1}
            isActive={true}
          />
        ))}
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
  const startOfWeekDate = startOfWeek(new Date());
  const endOfWeekDate = endOfWeek(startOfWeekDate);
  const url = `https://worktime-pj0rmd2tq.now.sh/api/work-slot?from=${encodeURIComponent(
    startOfWeekDate.toISOString()
  )}&to=${encodeURIComponent(endOfWeekDate.toISOString())}`;
  const data = customFetch(url);
  return {
    startOfWeekDateString: startOfWeekDate.toISOString(),
    initialData: data,
    url
  };
};

export default WeekView;

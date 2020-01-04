import startOfWeek from "date-fns/startOfWeek";
import endOfWeek from "date-fns/endOfWeek";
import parseISO from "date-fns/parseISO";
import formatISO from "date-fns/formatISO";
import { NextPage } from "next";
import useSWR, { mutate, trigger } from "swr";
import Layout from "../../components/Layout";
import format from "../../utils/format";
import customFetch from "../../utils/fetch";
import WeekdayListItem from "../../components/WeekdayListItem";
import de from "date-fns/locale/de";
import absoluteUrl from "../../utils/absolute-url";
import { withApollo } from "../../lib/with-apollo";
import { useWeekdaysQuery, Weekday } from "../../generated/apollo-components";
import { formatRFC3339 } from "date-fns";

const WeekView: NextPage<{
  startOfWeekDateString: string;
  endOfWeekDateString: string;
  backendUrl: string;
  initialData: Weekday[];
}> = ({
  startOfWeekDateString = startOfWeek(new Date()).toISOString(),
  endOfWeekDateString,
  backendUrl,
  initialData
}) => {
  const { data, loading, error } = useWeekdaysQuery({
    variables: {
      startDate: startOfWeekDateString,
      endDate: endOfWeekDateString
    }
  });
  console.log("apollo", data, loading, error);
  const startOfWeekDate = parseISO(startOfWeekDateString);

  const setWeekdays = async (updatedWeekdays: Weekday[]) => {};

  if (error) {
    return <Layout>Error loading the data</Layout>;
  }
  if (loading) {
    return <Layout>Loading</Layout>;
  }
  if (!data || !data.weekDays) {
    return <Layout>No Data</Layout>;
  }

  return (
    <Layout>
      <h1>Woche vom {format(startOfWeekDate, "do MMMM")}</h1>
      <ul>
        {data.weekDays.map((weekday, index) => {
          const updateWeekday = (updatedWeekday: Weekday) => {
            setWeekdays([
              ...data.weekDays.slice(0, index),
              updatedWeekday,
              ...data.weekDays.slice(index + 1)
            ]);
          };
          return (
            <WeekdayListItem
              weekday={weekday}
              onChangeWeekday={updateWeekday}
              key={weekday.date}
              showDivider={index < data.weekDays.length - 1}
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

WeekView.getInitialProps = async ({ req, query }) => {
  const date = !Array.isArray(query.date) ? query.date : "2019-10-19";
  const { origin } = absoluteUrl(req, "localhost:3000");
  const startOfWeekDate = startOfWeek(new Date(date), { locale: de });
  const endOfWeekDate = endOfWeek(new Date(date), { locale: de });
  const backendUrl = `${origin}/api/weekdays?date=${date}`;
  const data = await customFetch(backendUrl, { method: "GET" });
  return {
    startOfWeekDateString: format(
      startOfWeekDate,
      "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
    ),
    endOfWeekDateString: format(endOfWeekDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"),
    initialData: data,
    backendUrl
  };
};

export default withApollo(WeekView);

import Layout from "../components/Layout";
import startOfWeek from "date-fns/startOfWeek";
import setDay from "date-fns/setDay";
import format from "../utils/format";

const WeekView: React.FC<{ startOfWeekDate: Date }> = ({
  startOfWeekDate = startOfWeek(new Date())
}) => {
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
        {businessDaysOfWeek.map(businessDayOfWeek => (
          <li key={businessDayOfWeek.toISOString()}>
            {format(businessDayOfWeek, "EEEE")}
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default WeekView;

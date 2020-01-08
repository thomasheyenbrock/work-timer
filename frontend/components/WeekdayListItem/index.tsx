import parseISO from "date-fns/parseISO";
import format from "../../utils/format";
import Tag from "../Tag";
import WorkTimeListItem from "../WorkTimeListItem";
import FlatButton from "../FlatButton";
import TextField from "../TextField";
import TrashIcon from "../../icons/Trash2";
import {
  Weekday,
  useCreateWorkTimeMutation,
  useDeleteWorkTimeMutation,
  useUpdateWorkTimeMutation,
  WeekdaysDocument,
  WeekdaysQuery,
  WeekdaysQueryVariables
} from "../../generated/apollo-components";
import TimeField from "../TimeField";

const WeekdayListItem: React.FC<{
  weekday: Weekday;
  showDivider?: boolean;
  isActive: boolean;
  onChangeWeekday: (weekday: Weekday) => void;
  weekdayQueryVariables: {
    startDate: string;
    endDate: string;
  };
}> = props => {
  const [
    createWorkTime,
    { loading: isCreatingWorkTime }
  ] = useCreateWorkTimeMutation({
    update(cache, { data }) {
      if (!data) {
        return;
      }
      const weekdaysQueryResult = cache.readQuery<
        WeekdaysQuery,
        WeekdaysQueryVariables
      >({
        query: WeekdaysDocument,
        variables: props.weekdayQueryVariables
      });
      if (!weekdaysQueryResult || !weekdaysQueryResult.weekDays) {
        return;
      }
      cache.writeQuery({
        query: WeekdaysDocument,
        variables: props.weekdayQueryVariables,
        data: {
          weekDays: weekdaysQueryResult.weekDays.map(weekday =>
            weekday.id === props.weekday.id
              ? {
                  ...weekday,
                  workTimes: weekday.workTimes.concat([data.createWorkTime])
                }
              : weekday
          )
        }
      });
    }
  });
  return (
    <li>
      <div className="header">
        <span>{format(parseISO(props.weekday.date), "EEEE")}</span>
        {/* <Tag color={props.weekday.delta <= 0 ? "green" : "red"}>
          {props.weekday.delta} h
        </Tag> */}
      </div>
      {props.isActive && (
        <div className="content">
          <div>
            {props.weekday.workTimes.map((workTime, index) => (
              <WorkTimeListItem
                date={props.weekday.date}
                workTime={workTime}
                weekdayId={props.weekday.id}
                key={index}
                weekdayQueryVariables={props.weekdayQueryVariables}
              />
            ))}
            <FlatButton
              onClick={() => {
                createWorkTime({
                  variables: {
                    weekday: props.weekday.id
                  }
                });
              }}
              disabled={isCreatingWorkTime}
            >
              {isCreatingWorkTime
                ? "Zeitraum wird erstellt..."
                : "+ weiteren Zeitraum erfassen"}
            </FlatButton>
          </div>
          <div>
            {props.weekday.breaks.map((breakTime, index) => (
              <div className="inline" key={index}>
                <TextField
                  label="Pausendauer"
                  placeholder="00:00"
                  value={
                    breakTime.duration
                      ? format(new Date().setTime(breakTime.duration), "HH:ss")
                      : "00:00"
                  }
                  onChange={e => {
                    const duration = e.target.value;
                    alert("TBD");
                  }}
                />
                <FlatButton>
                  <TrashIcon
                    onClick={() => {
                      props.onChangeWeekday({
                        ...props.weekday,
                        breaks: [
                          ...props.weekday.breaks.slice(0, index),
                          ...props.weekday.breaks.slice(index + 1)
                        ]
                      });
                    }}
                  />
                </FlatButton>
              </div>
            ))}
            <FlatButton
              onClick={() => {
                alert("TBD");
              }}
            >
              + weitere Pause erfassen
            </FlatButton>
          </div>
        </div>
      )}
      <style jsx>{`
        li {
          ${props.showDivider
            ? `border-bottom: 1px solid hsl(250, 18%, 23%)`
            : ``}
        }
        .header {
          padding: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        span {
          font-size: 1.3rem;
          font-weight: 600;
        }
        .content {
          padding: 16px;
        }
        .content > * + * {
          margin: 32px 0 0;
        }
        .inline {
          display: flex;
        }
      `}</style>
    </li>
  );
};

export default WeekdayListItem;

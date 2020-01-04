import parseISO from "date-fns/parseISO";
import format from "../utils/format";
import Tag from "./Tag";
import FlatButton from "./FlatButton";
import TextField from "./TextField";
import TrashIcon from "../icons/Trash2";
import { Weekday } from "../generated/apollo-components";

const WeekdayListItem: React.FC<{
  weekday: Weekday;
  showDivider?: boolean;
  isActive: boolean;
  onChangeWeekday: (weekday: Weekday) => void;
}> = props => (
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
            <div className="inline" key={index}>
              <TextField
                label="Von"
                placeholder="00:00"
                value={format(parseISO(workTime.start), "HH:ss")}
                onChange={e => {
                  props.onChangeWeekday({
                    ...props.weekday,
                    workTimes: [
                      ...props.weekday.workTimes.slice(0, index),
                      { ...workTime, start: e.target.value },
                      ...props.weekday.workTimes.slice(index + 1)
                    ]
                  });
                }}
              />
              <TextField
                label="Bis"
                placeholder="00:00"
                value={format(parseISO(workTime.end), "HH:ss")}
                onChange={e => {
                  props.onChangeWeekday({
                    ...props.weekday,
                    workTimes: [
                      ...props.weekday.workTimes.slice(0, index),
                      { ...workTime, end: e.target.value },
                      ...props.weekday.workTimes.slice(index + 1)
                    ]
                  });
                }}
              />
              <FlatButton>
                <TrashIcon
                  onClick={() => {
                    props.onChangeWeekday({
                      ...props.weekday,
                      workTimes: [
                        ...props.weekday.workTimes.slice(0, index),
                        ...props.weekday.workTimes.slice(index + 1)
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
            + weiteren Zeitraum erfassen
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
                  alert("TBD")
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
              alert("TBD")
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

export default WeekdayListItem;

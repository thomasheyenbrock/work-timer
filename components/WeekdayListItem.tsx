import parseISO from "date-fns/parseISO";
import format from "../utils/format";
import Tag from "./Tag";
import { Weekday } from "../pages/index";
import FlatButton from "./FlatButton";
import TextField from "./TextField";

const WeekdayListItem: React.FC<{
  weekday: Weekday;
  showDivider?: boolean;
  isActive: boolean;
}> = props => (
  <li>
    <div className="header">
      <span>{format(parseISO(props.weekday.date), "EEEE")}</span>
      <Tag color={props.weekday.delta <= 0 ? "green" : "red"}>
        {props.weekday.delta}
      </Tag>
    </div>
    {props.isActive && (
      <div className="content">
        <div>
          <div className="inline">
            <TextField label="Von" placeholder="00:00" />
            <TextField label="Bis" placeholder="00:00" />
          </div>
          <FlatButton>+ weiteren Zeitraum erfassen</FlatButton>
        </div>
        <div>
          <TextField label="Pausendauer" placeholder="00:00" />
          <FlatButton>+ weitere Pause erfassen</FlatButton>
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
        margin: 16px 0 0;
      }
      .inline {
        display: flex;
      }
    `}</style>
  </li>
);

export default WeekdayListItem;

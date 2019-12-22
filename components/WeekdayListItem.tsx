import format from "../utils/format";
import Tag from "./Tag";

const WeekdayListItem: React.FC<{
  date: Date;
  delta: number;
  showDivider?: boolean;
}> = props => (
  <li>
    <div className="header">
      <span>{format(props.date, "EEEE")}</span>
      <Tag color={props.delta <= 0 ? "green" : "red"}>{props.delta}</Tag>
    </div>
    <style jsx>{`
      .header {
        padding: 16px 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        ${props.showDivider
          ? `border-bottom: 1px solid hsl(250, 18%, 23%)`
          : ``}
      }
    `}</style>
  </li>
);

export default WeekdayListItem;

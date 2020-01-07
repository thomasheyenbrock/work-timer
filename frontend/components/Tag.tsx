const colors = {
  green: {
    background: "hsl(126, 100%, 90%)",
    color: "hsl(140, 100%, 25%)"
  },
  red: {
    background: "hsl(360, 100%, 90%)",
    color: "hsl(360, 100%, 25%)"
  }
};

const Tag: React.FC<{ color: keyof typeof colors }> = props => (
  <div className="tag">
    {props.children}
    <style jsx>{`
      .tag {
        background-color: green;
        font-weight: 600;
        font-size: 0.8rem;
        height: 20px;
        display: flex;
        align-items: center;
        padding: 0 8px;
        border-radius: 10px;
        background-color: ${colors[props.color].background};
        color: ${colors[props.color].color};
      }
    `}</style>
  </div>
);

export default Tag;

const FlatButton: React.FC<JSX.IntrinsicElements["button"]> = props => (
  <button {...props}>
    {props.children}
    <style jsx>{`
      color: hsl(252, 21%, 82%);
      border: 0;
      background: transparent;
    `}</style>
  </button>
);

export default FlatButton;

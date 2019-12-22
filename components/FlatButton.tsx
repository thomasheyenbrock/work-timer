const FlatButton: React.FC<JSX.IntrinsicElements["button"]> = props => (
  <button {...props}>
    {props.children}
    <style jsx>{`
      color: hsl(252, 21%, 82%);
    `}</style>
  </button>
);

export default FlatButton;

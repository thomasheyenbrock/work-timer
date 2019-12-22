const TextField: React.FC<JSX.IntrinsicElements["input"] & {
  label: React.ReactNode;
}> = props => (
  <div>
    <label>
      <span>{props.label}</span>
      <input {...props} />
    </label>
    <style jsx>{`
      label {
        display: flex;
        flex-direction: column;
        color: hsl(252, 21%, 82%);
      }
      input {
        font-size: 2.5rem;
        color: white;
        background: transparent;
        border: 0;
        transition: all 0.2s;
        width: 100%;
      }
      input:focus {
        outline: none;
        box-shadow: 0 2px 0 white;
      }
    `}</style>
  </div>
);

export default TextField;

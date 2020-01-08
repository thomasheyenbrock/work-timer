import { useCallback } from "react";
import debounce from "lodash/debounce";

const TextField: React.FC<JSX.IntrinsicElements["input"] & {
  label: React.ReactNode;
  debouncedHandleChange?: () => void;
}> = ({ debouncedHandleChange, ...props}) => {
  const additionalChangeHandler = useCallback(
    debouncedHandleChange
      ? debounce(debouncedHandleChange, 1000)
      : () => {},
    [debouncedHandleChange]
  );
  return (
    <div>
      <label>
        <span>{props.label}</span>
        <input
          {...props}
          onChange={e => {
            if (props.onChange) {
              props.onChange(e);
            }
            if (debouncedHandleChange) {
              additionalChangeHandler();
            }
          }}
        />
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
        }
      `}</style>
    </div>
  );
};

export default TextField;

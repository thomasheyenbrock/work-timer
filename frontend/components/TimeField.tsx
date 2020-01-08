import React, { useState, useCallback } from "react";
import TextField from "./TextField";
import parse from "date-fns/parse";
import isValid from "date-fns/isValid";

const TimeField: React.FC<React.ComponentProps<typeof TextField> & {
  date: Date;
}> = props => {
  const [internalValue, setInternalValue] = useState("");
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
    if (!props.onChange) {
      return;
    }
    const parsed = parse(e.target.value, "HH:ss", new Date(props.date));
    if (isValid(parsed)) {
      e.target.value = parsed.toISOString();
      props.onChange(e);
    }
  }, [internalValue, setInternalValue]);
  return <TextField {...props} value={internalValue} onChange={onChange} />;
};

export default React.memo(TimeField);

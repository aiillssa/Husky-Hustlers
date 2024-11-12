import { memo } from "react";
import type { FC } from "react";

import resets from "../../_resets.module.css";
import classes from "./InputField.module.css";

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: FC<InputFieldProps> = memo(function InputField({
  label,
  value,
  onChange,
}) {
  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <label className={classes.label}>{label}</label>
      <input
        className={classes.input}
        type="text"
        value={value}
        onChange={onChange}
      />
    </div>
  );
});

export default InputField;

import { FC, PropsWithChildren, useState } from "react";
import cn from "classnames";
import "./styles.scss";

export const FloatingLabel: FC<
  { label?: string; hasValue: boolean } & PropsWithChildren
> = ({ label, children, hasValue }) => {
  const [focus, setFocus] = useState(false);

  return (
    <div
      className="float-label"
      onBlur={() => setFocus(false)}
      onFocus={() => setFocus(true)}
    >
      {children}
      <label
        className={cn({
          label: true,
          "label-float": focus || hasValue,
        })}
      >
        {label}
      </label>
    </div>
  );
};

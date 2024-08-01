import { FC } from "react";
import { Controller, ControllerRenderProps } from "react-hook-form";
import { Input as AntdInput, InputProps } from "antd";
import { FloatingLabel } from "../floating-label";
import "./styles.scss";

type InputFormFieldProps = {
  name: string;
  label?: string;
} & InputProps;
export const InputFormField: FC<InputFormFieldProps> = ({
  label,
  name,
  ...rest
}) => {
  return (
    <Controller
      name={name}
      render={({ field }) => <Input {...rest} {...field} label={label} />}
    />
  );
};

const Input: FC<{ label?: string } & ControllerRenderProps & InputProps> = ({
  label,
  ...rest
}) => {
  return (
    <FloatingLabel label={label} hasValue={!!rest.value}>
      <AntdInput {...rest} className="input-form-field" />
    </FloatingLabel>
  );
};

import { FC } from "react";
import { Controller, ControllerRenderProps } from "react-hook-form";
import { InputNumberProps, InputNumber as AntInputNumber } from "antd";
import { FloatingLabel } from "@payment-front/shared/components";
import "./styles.scss";

type InputFormFieldProps = {
  name: string;
  label?: string;
} & InputNumberProps;

export const InputNumberFormField: FC<InputFormFieldProps> = ({
  label,
  name,
  ...rest
}) => {
  return (
    <Controller
      name={name}
      render={({ field }) => <InputNumber {...rest} {...field} label={label} />}
    />
  );
};

const InputNumber: FC<
  { label?: string } & ControllerRenderProps & InputNumberProps
> = ({ label, ...rest }) => {
  return (
    <FloatingLabel label={label} hasValue={!!rest.value}>
      <AntInputNumber {...rest} className="input-number-form-field" />
    </FloatingLabel>
  );
};

import { DatePicker as AntdDatePicker, DatePickerProps } from "antd";
import { FC } from "react";
import { Controller, ControllerRenderProps } from "react-hook-form";
import { FloatingLabel } from "@payment-front/shared/components";
import "./styles.scss";

type DatePickerFormFieldProps = {
  name: string;
  label?: string;
} & DatePickerProps;

export const DatePickerFormField: FC<DatePickerFormFieldProps> = ({
  label,
  name,
  ...rest
}) => {
  return (
    <Controller
      name={name}
      render={({ field }) => (
        <DatePicker {...rest} {...field} label={label} placeholder={""} />
      )}
    />
  );
};

const DatePicker: FC<
  { label?: string } & ControllerRenderProps & DatePickerProps
> = ({ label, ...rest }) => {
  return (
    <FloatingLabel label={label} hasValue={!!rest.value}>
      <AntdDatePicker {...rest} className="date-picker-form-field" />
    </FloatingLabel>
  );
};

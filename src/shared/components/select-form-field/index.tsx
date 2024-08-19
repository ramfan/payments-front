import { Select as AntSelect, SelectProps } from "antd";
import { Controller } from "react-hook-form";
import { FC } from "react";
import { FloatingLabel } from "@payment-front/shared/components";
import "./styles.scss";

type SelectFormFieldProps = {
  label: string;
  name: string;
} & SelectProps;

export const SelectFormField: FC<SelectFormFieldProps> = ({
  label,
  name,
  ...rest
}) => {
  return (
    <Controller
      render={({ field }) => (
        <Select {...field} {...rest} label={label} onChange={field.onChange} />
      )}
      name={name}
    />
  );
};

const Select: FC<{ label: string } & SelectProps> = ({ label, ...rest }) => {
  return (
    <FloatingLabel label={label} hasValue={!!rest.value}>
      <AntSelect {...rest} className="select-form-field" />
    </FloatingLabel>
  );
};

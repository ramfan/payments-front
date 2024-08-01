import { InputFormField } from "../../shared/components";
import { Button } from "antd";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLoginMutation } from "./api";
import "./styles.scss";
import { useAuthorization } from "@payment-front/features";
import { useNavigate } from "react-router";

export const LoginForm = () => {
  const { t } = useTranslation();
  const { setAuthorizedData } = useAuthorization();
  const { loginMutation } = useLoginMutation();
  const navigation = useNavigate();
  const methods = useForm({
    resolver: yupResolver(
      yup.object().shape({
        login: yup.string().required(),
        password: yup.string().required(),
      }),
    ),
  });

  const handleSubmit = methods.handleSubmit((data) => {
    loginMutation(data, {
      onSuccess: (data) => {
        setAuthorizedData(data.login);
        navigation("/main");
      },
    });
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit} className="login-form">
        <InputFormField width={"200px"} name="login" label={t("label.login")} />
        <InputFormField
          width={"200px"}
          name="password"
          label={t("label.password")}
          type="password"
        />
        <Button htmlType="submit">{t("buttons.signIn")}</Button>
      </form>
    </FormProvider>
  );
};

import { Flex } from "antd";
import "./styles.scss";
import { LoginForm } from "@payment-front/widgets";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const LoginPage = () => {
  const { t } = useTranslation();
  return (
    <Flex align="center" justify="center" className="container">
      <Flex
        justify="center"
        align="center"
        vertical={true}
        className="form"
        gap="24px"
      >
        <LoginForm />
        <NavLink to="/sign-up">{t("links.signUp")}?</NavLink>
      </Flex>
    </Flex>
  );
};

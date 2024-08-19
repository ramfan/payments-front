import { CREDIT_TYPE } from "@payment-front/shared/consts.ts";
import { useTranslation } from "react-i18next";
import { SelectProps } from "antd";

export const useLoanTitles = () => {
  const { t } = useTranslation();

  const cardTitleByType: Record<keyof typeof CREDIT_TYPE, string> = {
    [CREDIT_TYPE.CONSUMER_LOAN]: t("common.consumerLoan"),
    [CREDIT_TYPE.MORTGAGE]: t("common.mortgage"),
  };

  return cardTitleByType;
};

export const useLoanSelectOptions = () => {
  const titles = useLoanTitles();
  const options: SelectProps["options"] = [];

  Object.values(CREDIT_TYPE).forEach((type) => {
    options.push({ label: titles[type], value: type });
  });

  return options;
};

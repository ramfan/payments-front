import cn from "classnames";
import { Button, Card, Drawer, Flex, Tag } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { FC, useState } from "react";
import {
  TCredit,
  useInvalidateSafeData,
  useLoanSelectOptions,
  useLoanTitles,
} from "@payment-front/features";
import { useTranslation } from "react-i18next";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CREDIT_TYPE } from "@payment-front/shared/consts.ts";
import {
  InputFormField,
  InputNumberFormField,
  SelectFormField,
  DatePickerFormField,
} from "@payment-front/shared/components";
import {
  AddCreditMutationVariables,
  useCreditMutation,
} from "@payment-front/widgets/loan-card/api";
import dayjs from "dayjs";

export const LoanCard: FC<{ loanData?: TCredit; className?: string }> = ({
  loanData,
  className,
}) => {
  const { t } = useTranslation();
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);
  const titles = useLoanTitles();

  return (
    <>
      <Card onClick={() => setIsDrawerOpened(true)} className={cn(className)}>
        {!loanData?.creditType ? (
          <>
            <PlusOutlined />
            &nbsp;
            {t("buttons.add")}
          </>
        ) : (
          <Flex vertical gap="8px">
            {loanData?.name ?? titles[loanData?.creditType]}
            <LoanTag type={loanData?.creditType} />
          </Flex>
        )}
      </Card>
      <LoanDrawer
        isOpened={isDrawerOpened}
        setIsOpened={setIsDrawerOpened}
        loanData={loanData}
      />
    </>
  );
};

const LoanTag: FC<{ type?: keyof typeof CREDIT_TYPE }> = ({ type }) => {
  const titles = useLoanTitles();

  if (!type) {
    return null;
  }

  const colors = {
    [CREDIT_TYPE.CONSUMER_LOAN]: "green",
    [CREDIT_TYPE.MORTGAGE]: "orange",
  };

  return (
    <Tag color={colors[type]} style={{ maxWidth: "fit-content" }}>
      {titles[type]}
    </Tag>
  );
};

type TLoanDrawerFormFields = AddCreditMutationVariables;

const LoanDrawer: FC<{
  isOpened: boolean;
  setIsOpened: (status: boolean) => void;
  loanData?: TCredit;
}> = ({ isOpened, setIsOpened, loanData }) => {
  const { t } = useTranslation();
  const {
    addCreditMutation,
    isAddCreditMutationPending,
    removeCreditMutation,
    isRemoveCreditMutationPending,
  } = useCreditMutation();
  const invalidateSafeData = useInvalidateSafeData();
  const options = useLoanSelectOptions();
  const methods = useForm<TLoanDrawerFormFields>({
    resolver: yupResolver<TLoanDrawerFormFields>(
      yup.object().shape({
        name: yup.string(),
        credit_size: yup.number().required(),
        percent: yup.number().required(),
        start_date: yup.string().required(),
        months_count: yup.number(),
        credit_type: yup.mixed<keyof typeof CREDIT_TYPE>().required(),
      }),
    ),
    defaultValues: loanData
      ? {
          start_date: dayjs(loanData.startDate) as unknown as string,
          credit_size: loanData.creditSize,
          credit_type: loanData.creditType,
          name: loanData.name,
          months_count: loanData.monthsCount,
          percent: loanData.percent,
        }
      : undefined,
  });

  const handleSuccessRequest = async () => {
    await invalidateSafeData();
    setIsOpened(false);
  };

  const handleSubmit = methods.handleSubmit((fields) => {
    addCreditMutation(
      {
        ...fields,
        start_date: dayjs(fields.start_date).format("YYYY-MM-DD"),
      },
      {
        onSuccess: handleSuccessRequest,
      },
    );
  });

  const handleRemove = () => {
    if (loanData) {
      removeCreditMutation(
        { id: loanData.id },
        { onSuccess: handleSuccessRequest },
      );
    }
  };

  return (
    <Drawer
      open={isOpened}
      onClose={() => setIsOpened(false)}
      footer={
        !loanData ? (
          <Button
            form="loan-form"
            htmlType="submit"
            loading={isAddCreditMutationPending}
          >
            {t("buttons.add")}
          </Button>
        ) : (
          <Button
            loading={isRemoveCreditMutationPending}
            danger
            onClick={handleRemove}
          >
            {t("buttons.remove")}
          </Button>
        )
      }
    >
      <form id="loan-form" onSubmit={handleSubmit}>
        <FormProvider {...methods}>
          <Flex gap="14px" vertical>
            <InputFormField
              name="name"
              label={t("label.nameOrGoal")}
              disabled={!!loanData}
            />
            <InputNumberFormField
              name="credit_size"
              label={t("label.creditSize")}
              disabled={!!loanData}
            />
            <InputNumberFormField
              name="percent"
              label={t("label.percent")}
              disabled={!!loanData}
            />
            <DatePickerFormField
              label={t("label.wasTaken")}
              name="start_date"
              format={"DD.MM.YYYY"}
              disabled={!!loanData}
            />
            <InputNumberFormField
              name="months_count"
              label={t("label.loanTerm")}
              disabled={!!loanData}
            />
            <SelectFormField
              options={options}
              name="credit_type"
              label={t("label.creditType")}
              disabled={!!loanData}
            />
          </Flex>
        </FormProvider>
      </form>
    </Drawer>
  );
};

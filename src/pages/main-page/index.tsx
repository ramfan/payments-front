import { Flex, Spin } from "antd";
import { LoanCard } from "@payment-front/widgets";
import { MainLayout } from "@payment-front/shared/components";
import { useSelfData } from "@payment-front/features";
import "./styles.scss";

export const MainPage = () => {
  const { data, isLoading } = useSelfData();

  return (
    <MainLayout>
      {isLoading ? (
        <Spin />
      ) : (
        <Flex gap="12px" wrap="wrap">
          <LoanCard className="card" />
          {data?.creditSet?.map((credit) => (
            <LoanCard key={credit.id} className="card" loanData={credit} />
          ))}
        </Flex>
      )}
    </MainLayout>
  );
};

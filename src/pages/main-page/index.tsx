import { Flex, Spin } from "antd";
import { LoanCard } from "@payment-front/widgets";
import { MainLayout } from "@payment-front/shared/components";
import { useSelfData } from "@payment-front/features";
import "./styles.scss";

export const MainPage = () => {
  const { data, isLoading } = useSelfData();

  if (isLoading) {
    return (
      <MainLayout>
        <Spin />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {isLoading ? (
        <Spin />
      ) : (
        <Flex gap="12px">
          <LoanCard className="card" />
          {data?.creditSet?.map((credit) => (
            <LoanCard key={credit.id} className="card" loanData={credit} />
          ))}
        </Flex>
      )}
    </MainLayout>
  );
};

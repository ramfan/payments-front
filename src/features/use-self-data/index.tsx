import { gql } from "graphql-request";
import { useGQLClient } from "@payment-front/features";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CREDIT_TYPE } from "@payment-front/shared/consts.ts";

const getSelfDataQuery = gql`
  query getSelfData {
    getSelfData {
      id
      fullName
      creditSet {
        id
        name
        creditSize
        percent
        startDate
        creditType
        monthsCount
        borrower {
          id
        }
      }
    }
  }
`;

export type TCredit = {
  id: number;
  name: string;
  creditSize: number;
  percent: number;
  startDate: string;
  creditType: keyof typeof CREDIT_TYPE;
  monthsCount: number;
};

export type TSelfDataResponse = {
  id: number;
  fullName: string;
  creditSet: TCredit[];
};

export const useSelfData = () => {
  const gqlClient = useGQLClient();
  const { data, isLoading, isError } = useQuery<
    { getSelfData: TSelfDataResponse },
    Error
  >({
    queryKey: ["self_data"],
    queryFn: () => {
      return gqlClient.request<{ getSelfData: TSelfDataResponse }>({
        document: getSelfDataQuery,
      });
    },
    staleTime: 600_000,
  });

  return { data: data?.getSelfData, isLoading, isError };
};

export const useInvalidateSafeData = () => {
  const client = useQueryClient();

  return async () => {
    if (!client.isFetching({ queryKey: ["self_data"] })) {
      await client.invalidateQueries({ queryKey: ["self_data"] });
    }
  };
};

import { gql } from "graphql-request";
import { CREDIT_TYPE } from "@payment-front/shared/consts.ts";
import { useGQLClient } from "@payment-front/features";
import { useMutation } from "@tanstack/react-query";

const addCreditMutation = gql`
  mutation addCredit(
    $credit_size: Int!
    $percent: Float!
    $start_date: Date!
    $months_count: Int
    $credit_type: CreditType!
    $name: String
  ) {
    addCredit(
      percent: $percent
      credit_size: $credit_size
      credit_type: $credit_type
      months_count: $months_count
      start_date: $start_date
      name: $name
    ) {
      id
    }
  }
`;

export type AddCreditMutationVariables = {
  name?: string;
  credit_size: number;
  percent: number;
  start_date: string;
  months_count?: number;
  credit_type: keyof typeof CREDIT_TYPE;
};

export const useCreditMutation = () => {
  const gqlClient = useGQLClient();
  const { mutate, isPending } = useMutation<
    { id: number },
    Error,
    AddCreditMutationVariables
  >({
    mutationFn: (variables: AddCreditMutationVariables) => {
      return gqlClient.request<{ id: number }>({
        document: addCreditMutation,
        variables,
      });
    },
  });

  return { addCreditMutation: mutate, isPending };
};

import { useMutation } from "@tanstack/react-query";
import { useGQLClient } from "@payment-front/features";
import { gql } from "graphql-request";

const loginMutation = gql`
  mutation Login($login: String!, $password: String!) {
    login(username: $login, password: $password)
  }
`;

export const useLoginMutation = () => {
  const gqlClient = useGQLClient();
  const { mutate } = useMutation<
    { login: string },
    Error,
    { login: string; password: string }
  >({
    mutationFn: (variables: { login: string; password: string }) => {
      return gqlClient.request<{ login: string }>({
        document: loginMutation,
        variables,
      });
    },
  });

  return { loginMutation: mutate };
};

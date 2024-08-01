import { gql } from "graphql-request";

export const refreshQuery = gql`
  mutation RefreshSession {
    refreshSession
  }
`;

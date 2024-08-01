import { GraphqlClient } from "@payment-front/shared/api/GraphqlClient.ts";

export type ConfigContextType = {
  client: GraphqlClient;
  isAuthorized: boolean;
  setAuthorizedData(accessToken: string): void;
};

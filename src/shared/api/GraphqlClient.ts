import { GraphQLClient as Client } from "graphql-request";

import { ErrorBuilder } from "@payment-front/shared/api";

export type GraphqlClientConstructorParams = { baseUrl: string };

export class GraphqlClient {
  private readonly client: Client;

  public constructor({ baseUrl }: GraphqlClientConstructorParams) {
    this.client = new Client(baseUrl, { credentials: "include" });
  }

  public updateHeaders(key: string, value: string): GraphqlClient {
    this.client.setHeader(key, value);
    return this;
  }

  public async request<T extends object>(requestParams: {
    document: string;
    variables?: Record<string, unknown>;
    requestHeaders?: Record<string, string>;
  }) {
    try {
      const { data } = await this.client.rawRequest<T>(
        requestParams.document,
        requestParams.variables,
        requestParams.requestHeaders,
      );

      return data;
    } catch (error: unknown) {
      throw ErrorBuilder.getErrorInstanceByMessage(error);
    }
  }
}

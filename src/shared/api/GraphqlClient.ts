import { rawRequest as gqlRequest } from "graphql-request";
import { ErrorBuilder } from "./gql-errors.ts";

export type GraphqlClientConstructorParams = { baseUrl: string };

export class GraphqlClient {
  private readonly baseUrl: string;
  private readonly headersMap: Record<string, string>;

  public constructor({ baseUrl }: GraphqlClientConstructorParams) {
    this.baseUrl = baseUrl;
    this.headersMap = {};
  }

  public updateHeaders(key: string, value: string): GraphqlClient {
    this.headersMap[key] = value;
    return this;
  }

  public async request<T extends object>(requestParams: {
    document: string;
    variables?: Record<string, unknown>;
    requestHeaders?: Record<string, string>;
  }) {
    if (!this.baseUrl) {
      throw new Error("Backend endpoint is not init");
    }

    try {
      const { data } = await gqlRequest<T>(
        this.baseUrl,
        requestParams.document,
        requestParams.variables,
        { ...requestParams.requestHeaders, ...this.headersMap },
      );

      return data;
    } catch (error: unknown) {
      const errorMessage = (error as Error)?.message;
      const errorInstance =
        ErrorBuilder.getErrorInstanceByMessage(errorMessage);

      console.error(errorInstance);

      throw errorInstance;
    }
  }
}

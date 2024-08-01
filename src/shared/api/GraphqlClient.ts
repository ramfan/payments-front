import { GraphQLClient as Client } from "graphql-request";

export type GraphqlClientConstructorParams = { baseUrl: string };

export class GraphqlClient {
  private readonly client: Client;

  public constructor({ baseUrl }: GraphqlClientConstructorParams) {
    this.client = new Client(baseUrl);
  }

  public updateHeaders(key: string, value: string): GraphqlClient {
    this.client.setHeader(key, value);
    return this;
  }

  public request<T>(...request: Parameters<Client["request"]>) {
    return this.client.request<T>(...request);
  }
}

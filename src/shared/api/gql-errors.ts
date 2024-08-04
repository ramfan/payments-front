export const enum GQLErrorTypes {
  BadRequest = "BAD_REQUEST_ERROR",
  BadCredentials = "BAD_CREDENTIALS_ERROR",
  SchemaValidation = "SCHEMA_VALIDATION_ERROR",
  Unknown = "UNKNOWN_ERROR",
}

export class ErrorBuilder {
  public static getErrorInstanceByMessage(msg: string): GraphQLError {
    let errorInstance: Error = new UnknownException();

    if (msg?.includes("Bad credentials")) {
      errorInstance = new BadCredentialsException();
    }

    if (msg?.includes("Bad request")) {
      errorInstance = new BadRequestException();
    }

    if (msg?.includes("Validation error")) {
      errorInstance = new SchemaValidationException();
    }

    return errorInstance;
  }
}

class GraphQLError extends Error {
  constructor(msg: string) {
    super(msg);
    super.name = "GraphQLError";
  }
}

class BadRequestException extends GraphQLError {
  constructor() {
    super(GQLErrorTypes.BadRequest);
  }
}

class BadCredentialsException extends GraphQLError {
  constructor() {
    super(GQLErrorTypes.BadCredentials);
  }
}

class UnknownException extends GraphQLError {
  constructor() {
    super(GQLErrorTypes.Unknown);
  }
}

class SchemaValidationException extends GraphQLError {
  constructor() {
    super(GQLErrorTypes.SchemaValidation);
  }
}

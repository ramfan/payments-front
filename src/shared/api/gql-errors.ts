export const enum GQLErrorTypes {
  BadRequest = "BAD_REQUEST_ERROR",
  BadCredentials = "BAD_CREDENTIALS_ERROR",
  SchemaValidation = "SCHEMA_VALIDATION_ERROR",
  AccessDenied = "ACCESS_DENIED_ERROR",
  Unauthorized = "UNAUTHORIZED_ERROR",
  Unknown = "UNKNOWN_ERROR",
}

export class ErrorBuilder {
  public static getErrorInstanceByMessage(error: unknown): GraphQLError {
    const msg = (error as Error)?.message;

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

    if (msg?.includes("Access Denied")) {
      errorInstance = new AccessDeniedException();
    }

    if (msg?.includes("Unauthorized")) {
      errorInstance = new UnauthorizedException();
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

export class BadRequestException extends GraphQLError {
  constructor() {
    super(GQLErrorTypes.BadRequest);
  }
}

export class BadCredentialsException extends GraphQLError {
  constructor() {
    super(GQLErrorTypes.BadCredentials);
  }
}

export class UnknownException extends GraphQLError {
  constructor() {
    super(GQLErrorTypes.Unknown);
  }
}

export class SchemaValidationException extends GraphQLError {
  constructor() {
    super(GQLErrorTypes.SchemaValidation);
  }
}

export class AccessDeniedException extends GraphQLError {
  constructor() {
    super(GQLErrorTypes.AccessDenied);
  }
}
export class UnauthorizedException extends GraphQLError {
  constructor() {
    super(GQLErrorTypes.Unauthorized);
  }
}

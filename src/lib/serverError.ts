import { NextResponse } from "next/server";
import {
  ErrorResponse,
  HTTP_STATUS,
  HttpStatusCode,
  ErrorCode,
} from "./types/error-types";

// API Route 에서만 사용하는 Error 클래스 입니다.

class ServerApiError extends Error {
  constructor(
    public message: string,
    public readonly statusCode: HttpStatusCode,
    public readonly errorCode?: ErrorCode
  ) {
    super(message);
    this.name = this.constructor.name;
  }

  public jsonResponse(): NextResponse<ErrorResponse> {
    const errorResponse: ErrorResponse = {
      status: this.statusCode,
      message: this.message,
      error: this.errorCode,
    };

    return NextResponse.json(errorResponse, {
      status: this.statusCode,
    });
  }
}

export class NextResponseError {
  public BadRequest(message?: string) {
    return new BadRequestError(message).jsonResponse();
  }

  public Unauthorized(message?: string) {
    return new UnauthorizedError(message).jsonResponse();
  }

  public Forbidden(message?: string) {
    return new ForbiddenError(message).jsonResponse();
  }

  public NotFound(message?: string) {
    return new NotFoundError(message).jsonResponse();
  }

  public InternalServerError(message?: string) {
    return new InternalServerError(message).jsonResponse();
  }
}

/* 400 Bad Request */
class BadRequestError extends ServerApiError {
  constructor(message?: string) {
    super(
      message ?? "Bad Request",
      HTTP_STATUS.BAD_REQUEST,
      "VALIDATION_ERROR"
    );
  }
}

/* 401 Unauthorized */
class UnauthorizedError extends ServerApiError {
  constructor(message?: string) {
    super(
      message ?? "Unauthorized",
      HTTP_STATUS.UNAUTHORIZED,
      "AUTHENTICATION_ERROR"
    );
  }
}

/* 403 Forbidden */
class ForbiddenError extends ServerApiError {
  constructor(message?: string) {
    super(message ?? "Forbidden", HTTP_STATUS.FORBIDDEN, "AUTHORIZATION_ERROR");
  }
}

/* 404 Not Found */
class NotFoundError extends ServerApiError {
  constructor(message?: string) {
    super(message ?? "Not Found", HTTP_STATUS.NOT_FOUND, "NOT_FOUND");
  }
}

/* 500 Internal Server Error */
class InternalServerError extends ServerApiError {
  constructor(message?: string) {
    super(
      message ?? "Internal Server Error",
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      "INTERNAL_ERROR"
    );
  }
}

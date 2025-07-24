// 공통 에러 응답 인터페이스
export interface ErrorResponse {
  status: number;
  message: string;
  error?: string;
}

// HTTP 상태 코드 상수
export const HTTP_STATUS = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export type HttpStatusCode = (typeof HTTP_STATUS)[keyof typeof HTTP_STATUS];

// 에러 코드 타입
export type ErrorCode =
  | "VALIDATION_ERROR"
  | "AUTHENTICATION_ERROR"
  | "AUTHORIZATION_ERROR"
  | "NOT_FOUND"
  | "INTERNAL_ERROR"
  | "NETWORK_ERROR"
  | "TIMEOUT_ERROR";

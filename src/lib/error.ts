import { ErrorResponse } from "./types/error-types";

// API 호출 시에 에러 처리를 위한 클래스 입니다.
class FetchError extends Error {
  constructor(public response: Response, public data: ErrorResponse) {
    super(`Fetch failed with status ${data?.status ?? 500}`);
  }
}

export async function catchError(response: Response, method?: string) {
  if (!response.ok) {
    let data: ErrorResponse;

    try {
      data = await response.json();
    } catch {
      // JSON 파싱 실패 시 기본 에러 응답 생성
      data = {
        status: response.status,
        message: response.statusText || "Unknown error",
        error: "PARSE_ERROR",
      };
    }

    console.log(`[Error] (${method}) ${response.url}`, data);

    throw new FetchError(response, data);
  }

  return response;
}

export function extractError(e: any): ErrorResponse {
  if (e instanceof FetchError) {
    return e.data;
  }

  return {
    status: e?.status ?? 500,
    message: e?.message ?? "Unknown Error",
    error: e?.error ?? "INTERNAL_ERROR",
  };
}

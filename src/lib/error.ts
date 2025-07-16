export interface FetchErrorType {
  status: number;
  message: string;
  error: string;
}

class FetchError extends Error {
  constructor(public response: Response, public data: any) {
    super(`Fetch failed with status ${data.statusCode}`);
  }
}

export async function catchError(response: Response, method?: string) {
  if (!response.ok) {
    const data = await response.json();

    console.error(`[Error] (${method}) ${response.url}`, data);

    throw new FetchError(response, data);
  }

  return response;
}

export function extractError(e: any): FetchErrorType {
  if (e instanceof FetchError) {
    const data = e.data;
    return data;
  }

  return {
    status: 500,
    message: e?.message ?? "Unknown Error",
    error: e?.error ?? "Unknown",
  };
}

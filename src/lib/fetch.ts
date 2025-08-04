import { catchError } from "./error";

type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";

class ApiBuilder {
  private baseUrl: string;
  private options: RequestInit = {};
  private withErrorHandler: boolean = true;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  public url(url: string) {
    this.baseUrl = this.baseUrl + url;
    return this;
  }

  public method(method: HTTPMethod) {
    this.options.method = method;
    return this;
  }

  public headers(headers: HeadersInit) {
    this.options.headers = { ...this.options.headers, ...headers };
    return this;
  }

  public body(body: unknown) {
    this.options.body = JSON.stringify(body);
    return this;
  }

  public credentials(credentials: boolean) {
    this.options.credentials = credentials ? "include" : "omit";
    return this;
  }

  public cache(cache: RequestCache) {
    this.options.cache = cache;
    return this;
  }

  public next(next: NextFetchRequestConfig) {
    this.options.next = next;
    return this;
  }

  public errorHandler(errorHandler: boolean) {
    this.withErrorHandler = errorHandler;
    return this;
  }

  public async call<T>(): Promise<T> {
    const response = await fetch(this.baseUrl, this.options);

    this.withErrorHandler && (await catchError(response, this.options.method));

    return await response.json();
  }
}

type ApiBaseType = "fast-trip" | "google-map";

export function httpClient(base: ApiBaseType = "fast-trip"): ApiBuilder {
  const url =
    base === "fast-trip"
      ? process.env.NEXT_PUBLIC_BASE_URL!
      : process.env.NEXT_PUBLIC_GOOGLE_API_URL!;

  return new ApiBuilder(url);
}

export const searchParamsToObject = <T extends Record<string, string>>(
  searchParams: URLSearchParams
): T => {
  const result = {} as T;

  for (const [key, value] of searchParams.entries()) {
    if (value && Object.prototype.hasOwnProperty.call(result, key)) {
      const typedKey = key as keyof T;
      result[typedKey] = value as T[typeof typedKey];
    }
  }

  return result;
};

export const objectToQueryString = <T extends Record<string, string | number>>(
  params: T
): string => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `&${queryString}` : "";
};

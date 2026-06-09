import { getStrapiUrl } from "./config";

export class StrapiRequestError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "StrapiRequestError";
  }
}

export async function strapiGet<T>(pathWithQuery: string, init?: RequestInit): Promise<T> {
  const base = getStrapiUrl();
  if (!base) {
    throw new StrapiRequestError("Strapi URL no configurada (STRAPI_URL)", 0);
  }

  const url = `${base}${pathWithQuery.startsWith("/") ? "" : "/"}${pathWithQuery}`;
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...init?.headers,
  };

  const token = process.env.STRAPI_API_TOKEN;
  if (token) {
    (headers as Record<string, string>).Authorization = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    ...init,
    headers,
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new StrapiRequestError(`Strapi respondió ${res.status}: ${url}`, res.status);
  }

  return (await res.json()) as T;
}

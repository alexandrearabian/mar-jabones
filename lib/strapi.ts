const STRAPI_URL_RAW = process.env.STRAPI_URL ?? process.env.NEXT_PUBLIC_STRAPI_URL;
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

/** Prefer 127.0.0.1 over localhost — avoids some Node fetch failures on macOS. */
function normalizeStrapiUrl(url: string): string {
  return url.replace(/\/+$/, "").replace(/\/\/localhost\b/i, "//127.0.0.1");
}

export const STRAPI_BASE_URL = STRAPI_URL_RAW
  ? normalizeStrapiUrl(STRAPI_URL_RAW)
  : "http://127.0.0.1:1337";

export class StrapiConnectionError extends Error {
  constructor(
    message: string,
    readonly cause?: unknown,
  ) {
    super(message);
    this.name = "StrapiConnectionError";
  }
}

export class StrapiRequestError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "StrapiRequestError";
  }
}

export async function query<TResponse>(url: string): Promise<TResponse> {
  if (!STRAPI_URL_RAW || !STRAPI_API_TOKEN) {
    throw new StrapiConnectionError(
      "Faltan STRAPI_URL o STRAPI_API_TOKEN en .env (reiniciá pnpm dev después de editarlos).",
    );
  }

  const base = normalizeStrapiUrl(STRAPI_URL_RAW);
  const path = url.startsWith("/") ? url : `/${url}`;
  const fullUrl = `${base}${path}`;

  try {
    const response = await fetch(fullUrl, {
      headers: {
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new StrapiRequestError(
        `Strapi respondió ${response.status} para ${path}`,
        response.status,
      );
    }

    return (await response.json()) as TResponse;
  } catch (err) {
    if (err instanceof StrapiRequestError) throw err;

    const hint =
      err instanceof Error && err.cause instanceof Error
        ? err.cause.message
        : err instanceof Error
          ? err.message
          : "unknown";

    throw new StrapiConnectionError(
      `No se pudo conectar con Strapi en ${base}. ¿Está corriendo? (cd backend && pnpm develop). Detalle: ${hint}`,
      err,
    );
  }
}

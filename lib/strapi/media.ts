function pickUrlFromMediaObject(obj: Record<string, unknown>): string | null {
  const direct = obj.url;
  if (typeof direct === "string" && direct.length > 0) return direct;

  const formats = obj.formats;
  if (formats && typeof formats === "object") {
    const fmtRecord = formats as Record<string, unknown>;
    for (const key of ["medium", "small", "thumbnail"]) {
      const fmt = fmtRecord[key];
      if (fmt && typeof fmt === "object" && fmt !== null && "url" in fmt) {
        const url = (fmt as { url?: unknown }).url;
        if (typeof url === "string" && url.length > 0) return url;
      }
    }
  }

  return null;
}

/** Extrae URL de un campo media de Strapi (plano v5 o anidado tipo v4). */
export function pickStrapiMediaUrl(input: unknown): string | null {
  if (!input) return null;
  if (Array.isArray(input)) {
    for (const item of input) {
      const found = pickStrapiMediaUrl(item);
      if (found) return found;
    }
    return null;
  }
  if (typeof input === "object" && input !== null) {
    const found = pickUrlFromMediaObject(input as Record<string, unknown>);
    if (found) return found;
  }
  // v4 style media object: { attributes: { url: "/uploads/..." } }
  if (typeof input === "object" && input !== null && "attributes" in input) {
    const attrs = (input as { attributes?: unknown }).attributes;
    const found = pickStrapiMediaUrl(attrs);
    if (found) return found;
  }
  if (typeof input === "object" && input !== null && "data" in input) {
    const d = (input as { data?: unknown }).data;
    if (Array.isArray(d)) {
      for (const item of d) {
        const found = pickStrapiMediaUrl(item);
        if (found) return found;
      }
      return null;
    }
    return pickStrapiMediaUrl(d);
  }
  return null;
}

export function pickStrapiMediaUrls(input: unknown): string[] {
  const out: string[] = [];
  const seen = new Set<string>();

  const push = (u: string) => {
    const url = u.trim();
    if (!url) return;
    if (seen.has(url)) return;
    seen.add(url);
    out.push(url);
  };

  const walk = (value: unknown) => {
    if (!value) return;
    if (Array.isArray(value)) {
      for (const item of value) walk(item);
      return;
    }
    if (typeof value === "object" && value !== null) {
      const url = pickUrlFromMediaObject(value as Record<string, unknown>);
      if (url) push(url);
    }
    if (typeof value === "object" && value !== null && "attributes" in value) {
      walk((value as { attributes?: unknown }).attributes);
    }
    if (typeof value === "object" && value !== null && "data" in value) {
      walk((value as { data?: unknown }).data);
    }
  };

  walk(input);
  return out;
}

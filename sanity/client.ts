import { createClient, type QueryParams } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

const client = createClient({ projectId, dataset, apiVersion, useCdn: true });

// ponytail: time-based revalidation; add a Sanity webhook + revalidateTag if edits must show instantly.
const REVALIDATE_SECONDS = 60;

export function sanityFetch<T>(query: string, params: QueryParams = {}): Promise<T> {
  return client.fetch<T>(query, params, { next: { revalidate: REVALIDATE_SECONDS } });
}

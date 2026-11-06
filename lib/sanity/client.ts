import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2025-01-01",
  useCdn: false, // on s'appuie sur le cache Next + revalidation par tag
});

export function sanityFetch<T>(query: string, params: Record<string, unknown> = {}, tags: string[] = []) {
  return client.fetch<T>(query, params, { next: { tags } });
}

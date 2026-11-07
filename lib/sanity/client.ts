import { createClient } from "@sanity/client";

export function sanityFetch<T>(query: string, params: Record<string, unknown> = {}, tags: string[] = []) {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId) throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID manquant");

  const client = createClient({
    projectId,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
    apiVersion: "2025-01-01",
    useCdn: true,
  });
  return client.fetch<T>(query, params, { next: { tags } });
}

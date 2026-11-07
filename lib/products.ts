import type { Product } from "./types";
import { getSupabase, hasSupabase } from "./supabase";

export async function getProducts(limit?: number): Promise<Product[]> {
  if (!hasSupabase()) return [];
  let q = getSupabase().from("products").select("*").order("created_at", { ascending: false });
  if (limit) q = q.limit(limit);
  const { data, error } = await q;
  if (error || !data) return [];
  return data.map((r) => ({ ...r, isNew: r.is_new })) as Product[];
}

import type { Product } from "./types";
import { sanityFetch } from "./sanity/client";

// Données de démonstration, remplacées par Sanity dès que NEXT_PUBLIC_SANITY_PROJECT_ID est défini.
const MOCK: Product[] = [
  { id: "1", slug: "robe-aurore", name: "Robe Aurore", price: 85000, category: "robes", images: [], colors: [{ name: "Noir", hex: "#0a0a0a" }, { name: "Ivoire", hex: "#efe9dc" }], sizes: ["S", "M", "L"], isNew: true },
  { id: "2", slug: "jupe-sillage", name: "Jupe Sillage", price: 58000, category: "jupes", images: [], colors: [{ name: "Champagne", hex: "#d8c597" }], sizes: ["S", "M", "L"], isNew: true },
  { id: "3", slug: "sac-orbite", name: "Sac Orbite", price: 120000, category: "sacs", images: [], colors: [{ name: "Noir", hex: "#0a0a0a" }], sizes: ["Unique"], isNew: true },
  { id: "4", slug: "escarpin-lueur", name: "Escarpin Lueur", price: 74000, category: "chaussures", images: [], colors: [{ name: "Or", hex: "#b08d3c" }], sizes: ["37", "38", "39", "40"], isNew: true },
];

const QUERY = `*[_type == "product" && defined(slug.current)] | order(_createdAt desc){
  "id": _id, "slug": slug.current, name, price, category, isNew,
  "images": images[].asset->url, colors, sizes
}`;

export async function getProducts(limit?: number): Promise<Product[]> {
  const items = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    ? await sanityFetch<Product[]>(QUERY, {}, ["products"])
    : MOCK;
  return limit ? items.slice(0, limit) : items;
}

import type { Product } from "./types";
import { sanityFetch } from "./sanity/client";

// Données de démonstration, remplacées par Sanity dès que NEXT_PUBLIC_SANITY_PROJECT_ID est défini.
const MOCK: Product[] = [
  {
    id: "1", slug: "robe-aurore", name: "Robe Aurore", price: 85000, category: "robes",
    images: ["/products/robe-aurore-1.jpg", "/products/robe-aurore-2.jpg"],
    colors: [{ name: "Noir", hex: "#0a0a0a" }, { name: "Ivoire", hex: "#efe9dc" }],
    sizes: ["S", "M", "L"], isNew: true,
  },
  {
    id: "2", slug: "jupe-sillage", name: "Jupe Sillage", price: 58000, category: "jupes",
    images: ["/products/jupe-sillage-1.jpg", "/products/jupe-sillage-2.jpg"],
    colors: [{ name: "Champagne", hex: "#d8c597" }],
    sizes: ["S", "M", "L"], isNew: true,
  },
  {
    id: "3", slug: "sac-orbite", name: "Sac Orbite", price: 120000, category: "sacs",
    images: ["/products/sac-orbite-1.jpg", "/products/sac-orbite-2.jpg"],
    colors: [{ name: "Noir", hex: "#0a0a0a" }],
    sizes: ["Unique"], isNew: true,
  },
  {
    id: "4", slug: "escarpin-lueur", name: "Escarpin Lueur", price: 74000, category: "chaussures",
    images: ["/products/escarpin-lueur-1.jpg", "/products/escarpin-lueur-2.jpg"],
    colors: [{ name: "Or", hex: "#b08d3c" }],
    sizes: ["37", "38", "39", "40"], isNew: true,
  },
];

const QUERY = `*[_type == "product" && defined(slug.current)] | order(_createdAt desc){
  "id": _id, "slug": slug.current, name, price, category, isNew,
  "images": images[].asset->url, colors, sizes
}`;

export async function getProducts(limit?: number): Promise<Product[]> {
  const items = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    ? await sanityFetch<Product[]>(QUERY)
    : MOCK;
  return limit ? items.slice(0, limit) : items;
}

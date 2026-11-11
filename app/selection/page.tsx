import type { Metadata } from "next";
import Link from "next/link";
import ProductGrid from "@/components/ProductGrid";
import { getProducts } from "@/lib/products";
import { CATEGORIES } from "@/lib/types";

export const metadata: Metadata = { title: "La Sélection" };
export const dynamic = "force-dynamic"; // toujours à jour

export default async function SelectionPage() {
  const products = await getProducts();
  return (
    <section className="mx-auto max-w-[1600px] px-4 pb-8 pt-32 md:px-8">
      <h1 className="font-display text-5xl font-light uppercase tracking-widest md:text-7xl">La Sélection</h1>
      <nav aria-label="Catégories" className="mb-12 mt-8 flex flex-wrap gap-3">
        {CATEGORIES.map((c) => (
          <Link
            key={c.slug}
            href={`/collection/${c.slug}`}
            className="rounded-full border border-line px-5 py-2 text-xs uppercase tracking-[0.2em] text-muted transition-colors duration-500 hover:border-gold hover:text-gold"
          >
            {c.label}
          </Link>
        ))}
      </nav>
      <ProductGrid products={products} />
    </section>
  );
}

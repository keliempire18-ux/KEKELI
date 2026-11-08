import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductGrid from "@/components/ProductGrid";
import { getProducts } from "@/lib/products";
import { CATEGORIES } from "@/lib/types";

export const dynamic = "force-dynamic"; // toujours à jour

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  return { title: CATEGORIES.find((c) => c.slug === category)?.label ?? "Collection" };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const current = CATEGORIES.find((c) => c.slug === category);
  if (!current) notFound();

  const all = await getProducts();
  const items = all.filter((p) => p.category === current.slug);

  return (
    <section className="mx-auto max-w-[1600px] px-4 pb-8 pt-32 md:px-8">
      <h1 className="font-display text-5xl font-light md:text-7xl">{current.label}</h1>

      <nav aria-label="Catégories" className="mb-12 mt-8 flex flex-wrap gap-3">
        {CATEGORIES.map((c) => (
          <Link
            key={c.slug}
            href={`/collection/${c.slug}`}
            className={`rounded-full border px-5 py-2 text-xs uppercase tracking-[0.2em] transition-colors duration-500 ${
              c.slug === current.slug
                ? "border-gold bg-gold text-black"
                : "border-line text-muted hover:border-gold hover:text-gold"
            }`}
          >
            {c.label}
          </Link>
        ))}
      </nav>

      <ProductGrid products={items} category={current.slug} demoFallback={all.length === 0} />
    </section>
  );
}

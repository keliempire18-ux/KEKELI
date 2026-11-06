import Link from "next/link";
import ProductGrid from "@/components/product/ProductGrid";
import { getProducts } from "@/lib/products";

export const revalidate = 3600; // filet de sécurité ; la vraie mise à jour passe par le webhook Sanity

export default async function Home() {
  const products = await getProducts(8);

  return (
    <>
      <section className="flex min-h-dvh flex-col justify-end px-4 pb-10 pt-24 md:px-8">
        <h1
          className="animate-sheen bg-[linear-gradient(110deg,var(--fg)_42%,var(--gold)_50%,var(--fg)_58%)] bg-[length:260%_100%] bg-clip-text font-display text-[clamp(5rem,26vw,24rem)] font-light leading-[0.8] tracking-[-0.02em] text-transparent"
        >
          KEKELI
        </h1>
        <div className="mt-10 flex flex-col justify-between gap-6 border-t border-line pt-6 sm:flex-row sm:items-end">
          <p className="max-w-sm text-lg text-muted">Robes, sacs, chaussures et perruques. Des pièces rares, coupées pour durer.</p>
          <Link href="/collection/robes" className="w-fit border-b border-gold pb-1 text-lg transition-colors hover:text-gold">
            Voir la collection
          </Link>
        </div>
      </section>

      <section className="mx-auto mt-32 max-w-[1600px] px-4 md:px-8" aria-labelledby="nouveautes">
        <h2 id="nouveautes" className="mb-12 font-display text-5xl font-light md:text-6xl">Nouveautés</h2>
        <ProductGrid products={products} />
      </section>
    </>
  );
}

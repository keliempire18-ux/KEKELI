import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import { getProducts } from "@/lib/products";

export const dynamic = "force-dynamic"; // toujours à jour : un produit publié dans /admin apparaît aussitôt

export default async function Home() {
  const products = await getProducts(12);
  return (
    <>
      <Hero />
      <section id="collection" className="mx-auto max-w-[1600px] scroll-mt-16 px-4 pt-32 md:px-8">
        <h2 className="mb-12 font-display text-5xl font-light md:text-6xl">La collection</h2>
        <ProductGrid products={products} />
      </section>
    </>
  );
}

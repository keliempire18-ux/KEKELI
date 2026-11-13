import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import LookbookSection from "@/components/LookbookSection";
import TransformationsReviews from "@/components/TransformationsReviews";
import GiftCardSection from "@/components/GiftCardSection";
import { getProducts } from "@/lib/products";

export const dynamic = "force-dynamic"; // toujours à jour : un produit publié dans /admin apparaît aussitôt

export default async function Home() {
  const products = await getProducts(12);
  return (
    <>
      <Hero />
      <section id="collection" className="mx-auto max-w-[1600px] scroll-mt-16 px-4 py-24 md:px-8 md:py-32">
        <h2 className="mb-12 font-display text-5xl font-light md:text-6xl">La collection</h2>
        <ProductGrid products={products} />
      </section>
      <LookbookSection />
      <TransformationsReviews />
      <GiftCardSection />
    </>
  );
}

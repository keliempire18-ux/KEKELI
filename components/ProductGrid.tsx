import type { Category, Product, ProductColor } from "@/lib/types";
import ProductCard from "./ProductCard";

const photo = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&w=1200&q=80`;

const demo = (
  n: number, name: string, price: number, category: Category, id: string,
  sizes: string[], colors: ProductColor[], isNew = false
): Product => ({
  id: `demo-${n}`, slug: `demo-${n}`, name, price, category, sizes, colors, isNew,
  images: [photo(id)],
});

const DEMO: Product[] = [
  demo(1, "Robe de soirée KEKELI", 185000, "robes", "1761574028720-8872dc5fe412", ["S", "M", "L"], [{ name: "Noir", hex: "#0a0a0a" }], true),
  demo(2, "Robe Rubis", 210000, "robes", "1721182420935-29bfb69dd26c", ["S", "M", "L"], [{ name: "Rubis", hex: "#9b111e" }], true),
  demo(3, "Sac en cuir premium", 320000, "sacs", "1546333456-3e8ed81f41e2", ["Unique"], [{ name: "Cognac", hex: "#8a4b2a" }], true),
  demo(4, "Bottines Lueur", 135000, "chaussures", "1677680128251-58bc3b25f9ec", ["37", "38", "39", "40"], [{ name: "Noir", hex: "#0a0a0a" }]),
  demo(5, "Perruque HD Lace", 240000, "perruques", "1740564001265-02fb7bd643c9", ["Unique"], [{ name: "Brun", hex: "#3b2a20" }]),
  demo(6, "Robe chemise Sillage", 98000, "robes", "1574784019838-aaaf2743ca02", ["S", "M", "L"], [{ name: "Rayé", hex: "#d9d9d9" }]),
];

export default function ProductGrid({
  products,
  category,
  demoFallback = true,
}: {
  products: Product[];
  category?: Category;
  demoFallback?: boolean;
}) {
  // Base vide : produits d'exemple (filtrés par catégorie si besoin). Sinon : vrais produits.
  const fallback = demoFallback ? DEMO.filter((d) => !category || d.category === category) : [];
  const list = products.length > 0 ? products : fallback;

  if (list.length === 0) {
    return <p className="py-24 text-center text-muted">Cette collection arrive bientôt.</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-14 lg:grid-cols-3 lg:gap-x-6">
      {list.map((p, i) => (
        <ProductCard key={p.id} product={p} priority={i < 3} />
      ))}
    </div>
  );
}

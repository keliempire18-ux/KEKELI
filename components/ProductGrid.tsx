import type { Product, ProductColor } from "@/lib/types";
import ProductCard from "./ProductCard";

// Visuel de remplacement : fond dégradé luxe, cadre fin doré et monogramme K.
// Intégré au code (aucun service externe) : il ne peut donc jamais s'afficher cassé.
const art = (a: string, b: string, label: string) =>
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="600" height="800" fill="url(#g)"/><rect x="40" y="40" width="520" height="720" fill="none" stroke="#d4af37" stroke-opacity=".35"/><text x="300" y="410" text-anchor="middle" font-family="Georgia,serif" font-size="150" font-weight="300" fill="#d4af37" fill-opacity=".85">K</text><text x="300" y="470" text-anchor="middle" font-family="Georgia,serif" font-size="22" letter-spacing="8" fill="#fff" fill-opacity=".6">${label}</text></svg>`
  );

const demo = (
  n: number, name: string, price: number, category: Product["category"], label: string,
  a: string, b: string, sizes: string[], colors: ProductColor[], isNew = false
): Product => ({
  id: `demo-${n}`, slug: `demo-${n}`, name, price, category, sizes, colors, isNew,
  images: [art(a, b, label), art(b, a, label)],
});

const DEMO: Product[] = [
  demo(1, "Robe de soirée KEKELI", 185000, "robes", "ROBE", "#1c1608", "#050505", ["S", "M", "L"], [{ name: "Noir", hex: "#0a0a0a" }, { name: "Or", hex: "#d4af37" }], true),
  demo(2, "Perruque HD Lace", 240000, "perruques", "PERRUQUE", "#2a1410", "#0a0605", ["Unique"], [{ name: "Noir de jais", hex: "#0a0a0a" }], true),
  demo(3, "Sac en cuir premium", 320000, "sacs", "SAC", "#2b1a12", "#0d0806", ["Unique"], [{ name: "Cognac", hex: "#8a4b2a" }], true),
  demo(4, "Escarpins Lueur", 135000, "chaussures", "ESCARPINS", "#0f1a24", "#050505", ["37", "38", "39", "40"], [{ name: "Nuit", hex: "#0f1a24" }]),
  demo(5, "Jupe plissée Sillage", 98000, "jupes", "JUPE", "#14231c", "#050605", ["S", "M", "L"], [{ name: "Émeraude", hex: "#14532d" }]),
  demo(6, "Collier Orbite", 76000, "accessoires", "ACCESSOIRE", "#2a2a2a", "#080808", ["Unique"], [{ name: "Or", hex: "#d4af37" }]),
];

export default function ProductGrid({ products }: { products: Product[] }) {
  // Base vide (ou Supabase injoignable) : on affiche les produits d'exemple.
  const list = products.length > 0 ? products : DEMO;

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-14 lg:grid-cols-3 lg:gap-x-6">
      {list.map((p, i) => (
        <ProductCard key={p.id} product={p} priority={i < 3} />
      ))}
    </div>
  );
}

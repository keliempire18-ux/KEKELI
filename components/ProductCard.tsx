"use client";
import Image from "next/image";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

export default function ProductCard({ product: p, priority = false }: { product: Product; priority?: boolean }) {
  const add = useCart((s) => s.add);
  const [main, alt] = p.images;
  const sizes = "(min-width:1024px) 25vw, 50vw";

  return (
    <article className="group">
      <div className="relative aspect-[3/4] overflow-hidden bg-surface">
        {main ? (
          <>
            <Image src={main} alt={p.name} fill priority={priority} sizes={sizes}
              className={`object-cover transition-all duration-700 group-hover:scale-105 ${alt ? "group-hover:opacity-0" : ""}`} />
            {alt && (
              <Image src={alt} alt="" fill sizes={sizes}
                className="scale-105 object-cover opacity-0 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100" />
            )}
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-surface to-line" aria-hidden />
        )}
        {p.isNew && <span className="glass absolute left-3 top-3 border px-2 py-1 text-[11px] tracking-widest">NOUVEAU</span>}
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <h3 className="font-display text-2xl leading-tight">{p.name}</h3>
        <p className="pt-1 text-sm text-muted">{formatPrice(p.price)}</p>
      </div>

      <button
        onClick={() => add({ productId: p.id, slug: p.slug, name: p.name, price: p.price, image: main, size: p.sizes[0], color: p.colors[0]?.name })}
        className="mt-4 w-full border border-line py-3 text-xs uppercase tracking-[0.25em] transition-colors duration-500 hover:border-gold hover:bg-gold hover:text-black"
      >
        Ajouter au panier
      </button>
    </article>
  );
}

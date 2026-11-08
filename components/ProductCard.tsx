"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

export default function ProductCard({ product: p, priority = false }: { product: Product; priority?: boolean }) {
  const add = useCart((s) => s.add);
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [main, alt] = p.images;
  const sizes = "(min-width:1024px) 25vw, 50vw";

  function handleAdd() {
    add({ productId: p.id, slug: p.slug, name: p.name, price: p.price, image: main, size: p.sizes[0], color: p.colors[0]?.name });
    setAdded(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1800);
  }

  return (
    <article className="group transition-transform duration-700 ease-out hover:scale-[1.02]">
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

      {/* Bouton capsule */}
      <button
        onClick={handleAdd}
        className="group/btn relative mt-5 flex w-full items-center justify-center overflow-hidden rounded-full border-[0.5px] border-neutral-700/60 bg-transparent px-6 py-3.5 transition-all duration-500 hover:border-gold hover:shadow-[0_0_28px_-6px_var(--gold)]"
      >
        <span className="absolute inset-0 origin-bottom scale-y-0 bg-gold transition-transform duration-300 ease-out group-hover/btn:scale-y-100 group-active/btn:scale-y-100" aria-hidden />
        <span className="absolute inset-y-0 -left-1/3 w-1/4 -skew-x-12 bg-white/50 opacity-0 transition-all duration-700 ease-out group-hover/btn:left-full group-hover/btn:opacity-100" aria-hidden />

        <span className="relative flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] transition-colors duration-300 group-hover/btn:text-black group-active/btn:text-black">
          {added ? (
            <Check size={16} strokeWidth={1.5} className="animate-pop" />
          ) : (
            <ShoppingBag size={16} strokeWidth={1.5}
              className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:-rotate-6 group-hover/btn:scale-110" />
          )}
          {added ? "Ajouté" : "Ajouter au panier"}
        </span>
      </button>
    </article>
  );
}

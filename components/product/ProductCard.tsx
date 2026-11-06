import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

export default function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const [main, alt] = product.images;

  return (
    <article>
      <Link href={`/produits/${product.slug}`} className="group block">
        <div className="relative aspect-[3/4] overflow-hidden bg-surface">
          {main ? (
            <>
              <Image
                src={main}
                alt={product.name}
                fill
                priority={priority}
                sizes="(min-width:1024px) 25vw, 50vw"
                className={`object-cover transition-opacity duration-700 ${alt ? "group-hover:opacity-0" : ""}`}
              />
              {alt && (
                <Image
                  src={alt}
                  alt=""
                  fill
                  sizes="(min-width:1024px) 25vw, 50vw"
                  className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                />
              )}
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-surface to-line" aria-hidden />
          )}
          {product.isNew && (
            <span className="absolute left-3 top-3 bg-bg/90 px-2 py-1 text-xs text-fg backdrop-blur">Nouveau</span>
          )}
        </div>

        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-2xl leading-tight">{product.name}</h3>
            <ul className="mt-2 flex gap-1.5" aria-label="Couleurs disponibles">
              {product.colors.map((c) => (
                <li key={c.name} title={c.name} className="size-3 rounded-full border border-line" style={{ background: c.hex }} />
              ))}
            </ul>
          </div>
          <p className="pt-1 text-sm text-muted">{formatPrice(product.price)}</p>
        </div>
      </Link>
    </article>
  );
}

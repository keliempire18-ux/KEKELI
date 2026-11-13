"use client";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";

const AMOUNTS = [25000, 50000, 100000];

export default function GiftCardSection() {
  const add = useCart((s) => s.add);
  const [amount, setAmount] = useState(50000);
  const [t, setT] = useState({ rx: 0, ry: 0, gx: 50, gy: 50, on: false });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setT({ rx: (0.5 - py) * 14, ry: (px - 0.5) * 18, gx: px * 100, gy: py * 100, on: true });
  };

  return (
    <section className="mx-auto max-w-[1600px] px-4 py-24 md:px-8 md:py-32" aria-labelledby="carte-cadeau">
      <div className="grid items-center gap-16 md:grid-cols-2 md:gap-24">
        <div
          onMouseMove={onMove}
          onMouseLeave={() => setT({ rx: 0, ry: 0, gx: 50, gy: 50, on: false })}
          className="mx-auto w-full max-w-md"
          style={{ perspective: "900px" }}
        >
          <div
            className="relative aspect-[1.586] overflow-hidden rounded-2xl border-[0.5px] border-[#d4af37]/60 bg-[#0b0b0b] p-7 text-[#f6f4ee] shadow-2xl"
            style={{ transform: `rotateX(${t.rx}deg) rotateY(${t.ry}deg)`, transition: t.on ? "transform 0.1s ease-out" : "transform 0.6s ease-out" }}
          >
            <div className="absolute inset-3 rounded-xl border-[0.5px] border-[#d4af37]/25" aria-hidden />
            <div className="pointer-events-none absolute inset-0 transition-opacity duration-500" style={{ opacity: t.on ? 1 : 0, background: `radial-gradient(circle at ${t.gx}% ${t.gy}%, rgba(212,175,55,0.28), transparent 55%)` }} aria-hidden />
            <div className="relative flex h-full flex-col justify-between">
              <p className="font-display text-xl font-light uppercase tracking-[0.5em] text-[#d4af37]">Kekeli</p>
              <div>
                <p className="font-display text-4xl font-light md:text-5xl">{formatPrice(amount)}</p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.3em] text-[#f6f4ee]/60">L’Expérience KEKELI</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 id="carte-cadeau" className="font-display text-5xl font-light md:text-7xl">L’Expérience KEKELI</h2>
          <p className="mt-4 max-w-md text-muted">Offrez la carte cadeau digitale KEKELI, valable sur La Sélection et à L’Institut.</p>

          <div className="mt-10 flex flex-wrap gap-3" role="radiogroup" aria-label="Montant">
            {AMOUNTS.map((a) => (
              <button
                key={a}
                role="radio"
                aria-checked={amount === a}
                onClick={() => setAmount(a)}
                className={`rounded-full border px-6 py-3 text-xs uppercase tracking-[0.15em] transition-all duration-500 ${
                  amount === a ? "border-gold bg-gold text-bg" : "border-line text-muted hover:border-gold hover:text-gold"
                }`}
              >
                {formatPrice(a)}
              </button>
            ))}
          </div>

          <button
            onClick={() => add({ productId: `carte-cadeau-${amount}`, slug: "carte-cadeau", name: "Carte cadeau L’Expérience KEKELI", price: amount })}
            className="mt-10 rounded-full border-[0.5px] border-gold/60 px-10 py-4 text-xs uppercase tracking-[0.3em] transition-all duration-500 hover:bg-gold hover:text-bg hover:shadow-[0_0_28px_-6px_var(--gold)]"
          >
            Ajouter au panier
          </button>
        </div>
      </div>
    </section>
  );
}

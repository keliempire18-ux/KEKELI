"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";

export default function CartDrawer() {
  const { lines, open, setOpen, setQty, remove } = useCart();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  const items = mounted ? lines : [];
  const total = items.reduce((n, l) => n + l.price * l.qty, 0);

  return (
    <>
      <div onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity duration-500 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`} />
      <aside aria-hidden={!open} aria-label="Panier"
        className={`glass fixed right-0 top-0 z-[70] flex h-dvh w-full max-w-md flex-col border-l transition-transform duration-500 ease-out ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <h2 className="font-display text-3xl font-light">Votre panier</h2>
          <button onClick={() => setOpen(false)} aria-label="Fermer" className="hover:text-gold"><X size={20} strokeWidth={1.25} /></button>
        </div>

        <ul className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
          {items.length === 0 && <li className="py-16 text-center text-muted">Votre panier est vide.</li>}
          {items.map((l) => (
            <li key={l.key} className="flex gap-4">
              <div className="relative h-24 w-20 shrink-0 bg-surface">
                {l.image && <Image src={l.image} alt={l.name} fill sizes="80px" className="object-cover" />}
              </div>
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <p className="font-display text-xl leading-tight">{l.name}</p>
                  <p className="text-xs text-muted">{[l.size, l.color].filter(Boolean).join(" · ")}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 border border-line px-2 py-1">
                    <button onClick={() => setQty(l.key, l.qty - 1)} aria-label="Moins"><Minus size={14} /></button>
                    <span className="w-4 text-center text-sm">{l.qty}</span>
                    <button onClick={() => setQty(l.key, l.qty + 1)} aria-label="Plus"><Plus size={14} /></button>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">{formatPrice(l.price * l.qty)}</p>
                    <button onClick={() => remove(l.key)} className="text-xs text-muted underline hover:text-gold">Retirer</button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="border-t border-line px-6 py-6">
          <div className="mb-4 flex items-baseline justify-between">
            <span className="text-sm text-muted">Total</span>
            <span className="font-display text-3xl">{formatPrice(total)}</span>
          </div>
          <button disabled className="w-full cursor-not-allowed border border-gold py-4 text-xs uppercase tracking-[0.25em] text-gold opacity-60">
            Paiement bientôt disponible
          </button>
        </div>
      </aside>
    </>
  );
}

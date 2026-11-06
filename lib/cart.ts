"use client";
import { useEffect, useState } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartLine {
  key: string; // productId|size|color
  productId: string;
  slug: string;
  name: string;
  price: number;
  image?: string;
  size?: string;
  color?: string;
  qty: number;
}

interface CartState {
  lines: CartLine[];
  add: (line: Omit<CartLine, "key" | "qty">, qty?: number) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      add: (line, qty = 1) =>
        set((s) => {
          const key = [line.productId, line.size, line.color].join("|");
          const found = s.lines.find((l) => l.key === key);
          return {
            lines: found
              ? s.lines.map((l) => (l.key === key ? { ...l, qty: l.qty + qty } : l))
              : [...s.lines, { ...line, key, qty }],
          };
        }),
      setQty: (key, qty) =>
        set((s) => ({ lines: s.lines.map((l) => (l.key === key ? { ...l, qty: Math.max(1, qty) } : l)) })),
      remove: (key) => set((s) => ({ lines: s.lines.filter((l) => l.key !== key) })),
      clear: () => set({ lines: [] }),
    }),
    { name: "kekeli-cart" } // localStorage : le panier survit au rafraîchissement
  )
);

/** Compteur sûr pour le SSR : 0 tant que le client n'a pas hydraté le panier. */
export function useCartCount() {
  const count = useCart((s) => s.lines.reduce((n, l) => n + l.qty, 0));
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? count : 0;
}

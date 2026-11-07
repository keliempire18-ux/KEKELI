"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useCart, useCartCount } from "@/lib/cart";
import { CATEGORIES } from "@/lib/types";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const count = useCartCount();
  const setCartOpen = useCart((s) => s.setOpen);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line/60 bg-bg/70 backdrop-blur-xl">
        <nav className="mx-auto grid h-16 max-w-[1600px] grid-cols-3 items-center px-4 md:px-8" aria-label="Navigation principale">
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="menu-plein-ecran"
            className="flex items-center gap-2 justify-self-start text-sm tracking-wide transition-colors hover:text-gold"
          >
            {open ? <X size={18} strokeWidth={1.25} /> : <Menu size={18} strokeWidth={1.25} />}
            <span className="hidden sm:inline">{open ? "Fermer" : "Menu"}</span>
          </button>

          <Link href="/" className="justify-self-center font-display text-3xl font-light tracking-[0.18em]" aria-label="KEKELI, accueil">
            KEKELI
          </Link>

          <div className="flex items-center justify-self-end">
            <ThemeToggle />
            <button onClick={() => setCartOpen(true)} aria-label={`Panier, ${count} article${count > 1 ? "s" : ""}`} className="relative grid size-10 place-items-center transition-colors hover:text-gold">
              <ShoppingBag size={18} strokeWidth={1.25} />
              {count > 0 && (
                <span key={count} className="absolute right-0.5 top-1 grid min-w-4 animate-pop place-items-center rounded-full bg-gold px-1 text-[10px] font-medium leading-4 text-bg">
                  {count}
                </span>
              )}
            </button>
          </div>
        </nav>
      </header>

      <div
        id="menu-plein-ecran"
        hidden={!open}
        className="fixed inset-0 z-40 overflow-y-auto bg-bg px-4 pb-10 pt-28 md:px-8"
      >
        <ul className="mx-auto max-w-[1600px]">
          {CATEGORIES.map((c) => (
            <li key={c.slug} className="border-b border-line">
              <Link
                href={`/collection/${c.slug}`}
                onClick={() => setOpen(false)}
                className="block py-4 font-display text-5xl font-light transition-all hover:translate-x-3 hover:text-gold md:text-7xl"
              >
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

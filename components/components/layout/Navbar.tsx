"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Crown, Footprints, Gem, Menu, Scissors, Shirt, ShoppingBag, Sparkles, X } from "lucide-react";
import Logo from "@/components/Logo";
import { useCart, useCartCount } from "@/lib/cart";
import { CATEGORIES, type Category } from "@/lib/types";

const svg = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.25, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const Skirt = () => (<svg {...svg} aria-hidden><path d="M8 4h8l4 16H4L8 4z" /><path d="M8 8h8" /></svg>);
const Handbag = () => (<svg {...svg} aria-hidden><path d="M5 9h14l1.5 11h-17L5 9z" /><path d="M9 9V7a3 3 0 0 1 6 0v2" /></svg>);

const ICONS: Record<Category, React.ReactNode> = {
  robes: <Shirt size={18} strokeWidth={1.25} />,
  jupes: <Skirt />,
  chaussures: <Footprints size={18} strokeWidth={1.25} />,
  sacs: <Handbag />,
  accessoires: <Gem size={18} strokeWidth={1.25} />,
  perruques: <Crown size={18} strokeWidth={1.25} />,
};

const MAIN = [
  { href: "/selection", label: "La Sélection" },
  { href: "/institut", label: "L’Institut" },
];

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
        <nav className="mx-auto grid h-16 max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center px-4 md:px-8" aria-label="Navigation principale">
          <div className="justify-self-start">
            <button
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="menu-principal"
              className="flex items-center gap-2 text-xs uppercase tracking-widest transition-colors hover:text-gold md:hidden"
            >
              <Menu size={18} strokeWidth={1.25} />
              Menu
            </button>
            <ul className="hidden items-center gap-10 md:flex">
              {MAIN.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="group relative block py-2 text-xs uppercase tracking-widest transition-colors duration-500 hover:text-gold">
                    {l.label}
                    <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <Link href="/" aria-label="KEKELI, accueil" className="justify-self-center">
            <Logo className="text-xl md:text-2xl" />
          </Link>

          <div className="flex items-center justify-self-end">
            <button
              onClick={() => setCartOpen(true)}
              aria-label={`Ouvrir le panier, ${count} article${count > 1 ? "s" : ""}`}
              className="relative grid size-10 place-items-center transition-colors hover:text-gold"
            >
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
        onClick={() => setOpen(false)}
        aria-hidden
        className={`fixed inset-0 z-[55] bg-black/50 backdrop-blur-sm transition-opacity duration-500 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />

      <aside
        id="menu-principal"
        inert={!open}
        aria-label="Menu"
        className={`fixed left-0 top-0 z-[60] flex h-dvh w-full max-w-sm flex-col border-r border-line bg-bg/85 text-fg backdrop-blur-xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex h-16 items-center justify-between border-b border-line px-6">
          <Logo className="text-lg" />
          <button onClick={() => setOpen(false)} aria-label="Fermer le menu" className="transition-colors hover:text-gold">
            <X size={20} strokeWidth={1.25} />
          </button>
        </div>

        <ul className="flex-1 overflow-y-auto px-6 py-4">
          <li className="border-b border-line pb-4">
            <Link href="/selection" onClick={() => setOpen(false)} className="flex items-center gap-4 py-4 text-sm uppercase tracking-widest transition-colors hover:text-gold">
              <Sparkles size={18} strokeWidth={1.25} /> La Sélection
            </Link>
            <ul className="space-y-1 pl-9">
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/collection/${c.slug}`}
                    onClick={() => setOpen(false)}
                    className="group flex items-center gap-4 py-2 text-xs font-light uppercase tracking-[0.2em] text-muted transition-all duration-500 hover:translate-x-2 hover:text-gold"
                  >
                    {ICONS[c.slug]}
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <Link href="/institut" onClick={() => setOpen(false)} className="flex items-center gap-4 py-6 text-sm uppercase tracking-widest transition-colors hover:text-gold">
              <Scissors size={18} strokeWidth={1.25} /> L’Institut
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
}

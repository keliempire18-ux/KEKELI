"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";

const ph = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&w=1400&q=80`;

// x et y = position du point en % de la photo (0 = gauche/haut, 100 = droite/bas).
// Pour les régler : ouvrez le site avec #calibrer à la fin de l’adresse, puis cliquez sur la photo.
type Spot = { id: string; name: string; price: number; x: number; y: number };
const LOOKS: { photo: string; alt: string; title: string; spots: Spot[] }[] = [
  {
    photo: "1677680128251-58bc3b25f9ec",
    alt: "Look noir signature",
    title: "Le Noir Signature",
    spots: [
      { id: "perruque-hd-lace", name: "Perruque HD Lace", price: 240000, x: 50, y: 12 },
      { id: "sac-premium", name: "Sac en cuir premium", price: 320000, x: 74, y: 56 },
      { id: "bottines-lueur", name: "Bottines Lueur", price: 135000, x: 50, y: 90 },
    ],
  },
  {
    photo: "1721182420935-29bfb69dd26c",
    alt: "Look soirée rubis",
    title: "La Soirée Rubis",
    spots: [
      { id: "perruque-hd-lace", name: "Perruque HD Lace", price: 240000, x: 50, y: 11 },
      { id: "robe-rubis", name: "Robe Rubis", price: 210000, x: 50, y: 48 },
      { id: "sac-premium", name: "Sac en cuir premium", price: 320000, x: 26, y: 68 },
    ],
  },
];

export default function LookbookSection() {
  const add = useCart((s) => s.add);
  const [active, setActive] = useState<string | null>(null);
  const [calibrate, setCalibrate] = useState(false);
  const [pick, setPick] = useState<{ look: number; x: number; y: number } | null>(null);

  useEffect(() => {
    const sync = () => setCalibrate(window.location.hash === "#calibrer");
    sync();
    window.addEventListener("hashchange", sync);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <section className="mx-auto max-w-[1600px] px-4 py-24 md:px-8 md:py-32" aria-labelledby="lookbook">
      <h2 id="lookbook" className="font-display text-5xl font-light md:text-7xl">Shop the Look</h2>
      <p className="mt-4 max-w-md text-muted">Touchez un point lumineux pour découvrir la pièce et l’ajouter à votre panier.</p>

      <div className="mt-16 grid gap-10 md:grid-cols-2 md:gap-16">
        {LOOKS.map((look, li) => (
          <figure key={look.photo} className={li === 1 ? "md:mt-24" : ""}>
            <div
              className="relative aspect-[3/4]"
              onClick={(e) => {
                if (!calibrate) return setActive(null);
                const r = e.currentTarget.getBoundingClientRect();
                setPick({ look: li, x: Math.round(((e.clientX - r.left) / r.width) * 100), y: Math.round(((e.clientY - r.top) / r.height) * 100) });
              }}
            >
              <div className="absolute inset-0 overflow-hidden bg-surface">
                <Image src={ph(look.photo)} alt={look.alt} fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover" />
              </div>

              <div className="pointer-events-none absolute inset-0">
                {look.spots.map((s) => {
                  const key = `${li}-${s.id}`;
                  const open = active === key;
                  return (
                    <div
                      key={key}
                      className={`pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 ${open ? "z-20" : "z-10"}`}
                      style={{ left: `${s.x}%`, top: `${s.y}%` }}
                      onMouseEnter={() => setActive(key)}
                      onMouseLeave={() => setActive((a) => (a === key ? null : a))}
                    >
                      <button
                        onClick={(e) => { e.stopPropagation(); setActive(open ? null : key); }}
                        aria-label={`${s.name}, ${formatPrice(s.price)}`}
                        aria-expanded={open}
                        className="relative grid size-7 place-items-center rounded-full border-[0.5px] border-gold bg-black/30 backdrop-blur-sm"
                      >
                        <span className="absolute inset-0 animate-ping rounded-full border border-gold/60 [animation-duration:2.5s]" aria-hidden />
                        <span className="size-1.5 rounded-full bg-gold" />
                      </button>

                      <div
                        className={`absolute w-52 rounded-xl border-[0.5px] border-gold/50 bg-bg/80 p-4 text-fg shadow-2xl backdrop-blur-md transition-all duration-300 ${
                          s.x > 55 ? "right-0" : "left-0"
                        } ${s.y > 70 ? "bottom-full mb-3" : "top-full mt-3"} ${open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-1 opacity-0"}`}
                      >
                        <p className="font-display text-xl leading-tight">{s.name}</p>
                        <p className="mt-1 text-sm text-muted">{formatPrice(s.price)}</p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            add({ productId: `look-${s.id}`, slug: s.id, name: s.name, price: s.price });
                          }}
                          className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border-[0.5px] border-gold/60 py-2 text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 hover:bg-gold hover:text-bg"
                        >
                          <Plus size={14} strokeWidth={1.5} /> Ajouter
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {calibrate && pick?.look === li && (
                <span className="absolute z-30 -translate-x-1/2 -translate-y-full rounded bg-black px-2 py-1 text-xs text-white" style={{ left: `${pick.x}%`, top: `${pick.y}%` }}>
                  x: {pick.x}, y: {pick.y}
                </span>
              )}
            </div>
            <figcaption className="mt-5 font-display text-2xl font-light">{look.title}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

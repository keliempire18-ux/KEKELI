"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Scissors, Sparkles } from "lucide-react";
import BookingCalendar from "./BookingCalendar";

const ph = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&w=1400&q=80`;

// Disposition asymétrique façon magazine : tailles, formats et décalages volontairement différents.
const GALLERY = [
  { id: "1774660810725-fb04e002003d", alt: "Coiffeuse réalisant un chignon", cls: "col-span-6 md:col-span-5 aspect-[3/4]" },
  { id: "1773688189414-7637b9b138e1", alt: "Maquilleuse appliquant du blush", cls: "col-span-6 md:col-span-4 md:mt-24 aspect-[4/5]" },
  { id: "1630084775816-7abb7383ded5", alt: "Portrait maquillage lèvres rose", cls: "col-span-6 md:col-span-3 aspect-[2/3]" },
  { id: "1636023730877-233b9237d4ec", alt: "Séance de maquillage professionnel", cls: "col-span-6 md:col-span-3 md:-mt-12 aspect-[3/4]" },
  { id: "1761839256791-6a93f89fb8b0", alt: "Cliente installée au salon", cls: "col-span-6 md:col-span-5 aspect-[4/3] md:aspect-[5/4]" },
  { id: "1709477542149-f4e0e21d590b", alt: "Mise en beauté au pinceau", cls: "col-span-6 md:col-span-4 md:mt-16 aspect-[3/4]" },
];

const SERVICES = [
  {
    icon: <Scissors size={22} strokeWidth={1.25} />,
    title: "Salon Coiffure & Perruques",
    image: "1774660810725-fb04e002003d",
    items: ["Soins profonds", "Tresses signatures", "Pose et customisation de lace"],
  },
  {
    icon: <Sparkles size={22} strokeWidth={1.25} />,
    title: "Maquillage Professionnel",
    image: "1773688189414-7637b9b138e1",
    items: ["Mises en beauté de mariée", "Événements VIP", "Maquillage studio"],
  },
];

function Counter({ to, label }: { to: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setN(to);
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / 1800);
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);

  return (
    <div ref={ref} className="text-center">
      <p className="font-display text-6xl font-light md:text-8xl">{n}<span className="text-gold">+</span></p>
      <p className="mt-2 text-xs uppercase tracking-[0.3em] text-muted">{label}</p>
    </div>
  );
}

export default function LInstitut() {
  return (
    <div>
      <section className="mx-auto max-w-[1600px] px-4 pb-20 pt-36 md:px-8">
        <h1 className="font-display text-[clamp(3rem,10vw,9rem)] font-light uppercase leading-none tracking-widest">L’Institut</h1>
        <p className="mt-8 max-w-xl text-lg font-light text-muted">
          Coiffure, perruques et maquillage signés par la fondatrice de KEKELI, coiffeuse et maquilleuse professionnelle. Chaque rendez-vous est une mise en beauté pensée pour vous.
        </p>
      </section>

      <section className="mx-auto grid max-w-[1600px] grid-cols-12 gap-4 px-4 md:gap-6 md:px-8" aria-label="Galerie">
        {GALLERY.map((g) => (
          <div key={g.id} className={`group relative overflow-hidden bg-surface ${g.cls}`}>
            <Image src={ph(g.id)} alt={g.alt} fill sizes="(min-width:768px) 40vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
        ))}
      </section>

      <section className="mx-auto mt-32 grid max-w-4xl grid-cols-2 gap-8 border-y border-line px-4 py-16 md:px-8">
        <Counter to={5} label="Années d’Expertise" />
        <Counter to={1000} label="Visages Sublimés" />
      </section>

      <section className="mx-auto mt-32 grid max-w-[1600px] gap-16 px-4 md:grid-cols-2 md:gap-12 md:px-8">
        {SERVICES.map((s, i) => (
          <article key={s.title} className={i === 1 ? "md:mt-24" : ""}>
            <div className="group relative aspect-[4/5] overflow-hidden bg-surface">
              <Image src={ph(s.image)} alt="" fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="mt-6 flex items-center gap-4 text-gold">{s.icon}<h2 className="font-display text-4xl font-light text-fg">{s.title}</h2></div>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {s.items.map((it) => <li key={it} className="py-4 text-sm font-light uppercase tracking-[0.2em] text-muted">{it}</li>)}
            </ul>
            <Link href="#reservation" className="mt-6 inline-block border-b border-gold pb-1 text-xs uppercase tracking-[0.3em] transition-colors hover:text-gold">Réserver</Link>
          </article>
        ))}
      </section>

      <section id="reservation" className="mx-auto mt-32 max-w-[1600px] scroll-mt-24 px-4 pb-8 md:px-8">
        <h2 className="mb-14 font-display text-5xl font-light uppercase tracking-widest md:text-6xl">Réserver</h2>
        <BookingCalendar />
      </section>
    </div>
  );
}

"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronsLeftRight, Star } from "lucide-react";

// ➜ Remplacez par le vrai couple de photos avant / après de la fondatrice (dans /public ou Supabase).
// Ici, la même photo sert de démonstration : l’« avant » est simplement désaturé.
const PHOTO = "https://images.unsplash.com/photo-1630084775816-7abb7383ded5?auto=format&w=1400&q=80";

// ➜ Avis d’exemple : à remplacer par de vrais avis de clientes. Passez SAMPLE à false une fois fait.
const SAMPLE = true;
const REVIEWS = [
  { who: "A. K.", city: "Cotonou", text: "Un accueil soigné et un résultat exactement comme je l’imaginais." },
  { who: "M. D.", city: "Calavi", text: "Une pose de lace impeccable : naturelle, confortable, élégante." },
  { who: "S. A.", city: "Cotonou", text: "Un maquillage de mariée raffiné qui a tenu toute la journée." },
];

function Compare() {
  const [pos, setPos] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const drag = useRef(false);
  const move = (x: number) => {
    const r = box.current!.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((x - r.left) / r.width) * 100)));
  };

  return (
    <div
      ref={box}
      onPointerDown={(e) => { drag.current = true; e.currentTarget.setPointerCapture(e.pointerId); move(e.clientX); }}
      onPointerMove={(e) => drag.current && move(e.clientX)}
      onPointerUp={() => (drag.current = false)}
      style={{ touchAction: "pan-y" }}
      className="relative aspect-[4/5] w-full max-w-md cursor-ew-resize select-none overflow-hidden bg-surface"
    >
      <Image src={PHOTO} alt="Après" fill sizes="(min-width:768px) 28rem, 100vw" draggable={false} className="object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={PHOTO} alt="Avant" fill sizes="(min-width:768px) 28rem, 100vw" draggable={false} className="object-cover brightness-90 contrast-75 grayscale" />
      </div>
      <span className="glass absolute left-3 top-3 border px-2 py-1 text-[11px] uppercase tracking-widest">Avant</span>
      <span className="glass absolute right-3 top-3 border px-2 py-1 text-[11px] uppercase tracking-widest">Après</span>

      <div className="absolute inset-y-0 w-px -translate-x-1/2 bg-gold" style={{ left: `${pos}%` }}>
        <div
          role="slider"
          tabIndex={0}
          aria-label="Comparer avant et après"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5));
            if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5));
          }}
          className="absolute left-1/2 top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-[0.5px] border-gold bg-bg/70 text-gold backdrop-blur-md"
        >
          <ChevronsLeftRight size={18} strokeWidth={1.25} />
        </div>
      </div>
    </div>
  );
}

function Reviews() {
  const [i, setI] = useState(0);
  const [pause, setPause] = useState(false);
  useEffect(() => {
    if (pause) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % REVIEWS.length), 7000);
    return () => window.clearInterval(id);
  }, [pause]);

  return (
    <div onMouseEnter={() => setPause(true)} onMouseLeave={() => setPause(false)}>
      <div className="grid">
        {REVIEWS.map((r, n) => (
          <blockquote key={r.who + n} aria-hidden={n !== i} className={`col-start-1 row-start-1 transition-opacity duration-700 ${n === i ? "opacity-100" : "pointer-events-none opacity-0"}`}>
            <div className="mb-5 flex gap-1" aria-label="5 étoiles sur 5">
              {Array.from({ length: 5 }).map((_, s) => <Star key={s} size={14} strokeWidth={1.25} className="fill-gold text-gold" />)}
            </div>
            <p className="font-display text-3xl font-light leading-snug md:text-4xl">« {r.text} »</p>
            <footer className="mt-6 text-xs uppercase tracking-[0.25em] text-muted">{r.who} · {r.city}</footer>
          </blockquote>
        ))}
      </div>
      <div className="mt-8 flex items-center gap-3">
        {REVIEWS.map((r, n) => (
          <button key={r.who + n} onClick={() => setI(n)} aria-label={`Avis ${n + 1}`} className={`h-px transition-all duration-500 ${n === i ? "w-10 bg-gold" : "w-5 bg-line hover:bg-gold/60"}`} />
        ))}
        {SAMPLE && <span className="ml-4 text-[11px] uppercase tracking-widest text-muted">Avis d’exemple</span>}
      </div>
    </div>
  );
}

export default function TransformationsReviews() {
  return (
    <section className="mx-auto max-w-[1600px] px-4 py-24 md:px-8 md:py-32" aria-labelledby="transformations">
      <h2 id="transformations" className="font-display text-5xl font-light md:text-7xl">Transformations</h2>
      <p className="mt-4 max-w-md text-muted">Plus de cinq ans d’expertise en coiffure et en maquillage. Faites glisser pour révéler le résultat.</p>
      <div className="mt-16 grid items-center gap-16 md:grid-cols-2 md:gap-24">
        <Compare />
        <Reviews />
      </div>
    </section>
  );
}

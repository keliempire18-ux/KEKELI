"use client";
import { useRef, useState } from "react";
import { Check } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";

const AMOUNTS = [25000, 50000, 100000];
const serif = { fontFamily: '"Playfair Display", Georgia, serif' };
// Grain de métal brossé : fines stries verticales très discrètes
const brushed = {
  backgroundImage:
    "repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 3px)",
};

export default function GiftCardSection() {
  const add = useCart((s) => s.add);
  const [amount, setAmount] = useState(50000);
  const [added, setAdded] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0, gx: 50, gy: 50, on: false });
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  function move(e: React.PointerEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setTilt({ x: (0.5 - py) * 14, y: (px - 0.5) * 18, gx: px * 100, gy: py * 100, on: true });
  }

  function handleAdd() {
    add({ productId: `gift-${amount}`, slug: "carte-cadeau", name: "Carte cadeau L’Expérience KEKELI", price: amount });
    setAdded(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1800);
  }

  return (
    <section className="mx-auto max-w-[1600px] px-4 py-24 md:px-8" aria-labelledby="cadeau">
      <div className="grid items-center gap-16 md:grid-cols-2 md:gap-24">
        {/* Carte VIP : métal brossé noir, finitions dorées, inclinaison, reflet et élévation au survol */}
        <div
          onPointerMove={move}
          onPointerLeave={() => setTilt((t) => ({ ...t, x: 0, y: 0, on: false }))}
          style={{ perspective: "1000px" }}
          className="mx-auto w-full max-w-md"
        >
          <div
            style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
            className="group relative aspect-[1.586/1] overflow-hidden rounded-2xl border border-[#D4AF37]/40 bg-gradient-to-br from-[#1C1C1C] via-[#0A0A0A] to-[#141414] text-white shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-[transform,translate,box-shadow] duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
          >
            {/* Texture métal brossé */}
            <div className="absolute inset-0 opacity-70" style={brushed} aria-hidden />

            {/* Filigrane : grands cercles entrelacés et lignes fines */}
            <svg
              className="absolute inset-0 size-full opacity-5"
              viewBox="0 0 400 252"
              preserveAspectRatio="xMidYMid slice"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1.2"
              aria-hidden
            >
              <circle cx="150" cy="126" r="95" />
              <circle cx="215" cy="126" r="95" />
              <circle cx="182" cy="70" r="95" />
              <circle cx="182" cy="182" r="95" />
              <path d="M0 252L400 0M0 200L330 0M70 252L400 40" />
            </svg>

            {/* Lueur qui suit la souris */}
            <div
              className="absolute inset-0 transition-opacity duration-300"
              style={{ opacity: tilt.on ? 1 : 0, background: `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, rgba(212,175,55,0.22), transparent 55%)` }}
              aria-hidden
            />

            {/* Reflet diagonal : traverse la carte au survol, se remet en place instantanément ensuite */}
            <span
              className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-0 ease-out group-hover:translate-x-[400%] group-hover:duration-1000"
              aria-hidden
            />

            {/* Seconde bordure fine */}
            <div className="absolute inset-3 rounded-xl border-[0.5px] border-[#D4AF37]/25" aria-hidden />

            <div className="relative flex h-full flex-col justify-between p-7">
              <div className="flex items-start justify-between">
                <span style={serif} className="text-xl uppercase tracking-[0.4em] text-[#D4AF37]">Kekeli</span>

                <div className="flex flex-col items-end gap-2">
                  <span className="text-[9px] uppercase tracking-[0.3em] text-[#D4AF37]/80">Privilège</span>
                  <div className="flex items-center gap-3">
                    {/* Symbole sans contact */}
                    <svg width="16" height="20" viewBox="0 0 18 22" fill="none" stroke="#D4AF37" strokeWidth="1.1" strokeLinecap="round" opacity=".85" aria-hidden>
                      <path d="M3 5c3 3.5 3 8.5 0 12" />
                      <path d="M8 3c4.5 5 4.5 11 0 16" />
                      <path d="M13 1c6 6.5 6 13.5 0 20" />
                    </svg>
                    {/* Puce électronique */}
                    <svg width="40" height="30" viewBox="0 0 40 30" fill="none" stroke="#D4AF37" strokeWidth="0.9" aria-hidden>
                      <rect x=".5" y=".5" width="39" height="29" rx="5" fill="#D4AF37" fillOpacity=".12" />
                      <path d="M.5 10h39M.5 20h39M14 .5v29M26 .5v29" opacity=".7" />
                      <rect x="14" y="10" width="12" height="10" rx="2" opacity=".9" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Montant : or satiné gravé */}
              <p
                style={serif}
                className="bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#AA8220] bg-clip-text text-4xl font-normal text-transparent drop-shadow-[0_1px_0_rgba(0,0,0,0.6)] md:text-5xl"
              >
                {formatPrice(amount)}
              </p>

              <p className="text-[11px] uppercase tracking-[0.35em] text-white/60">L’Expérience KEKELI</p>
            </div>
          </div>
        </div>

        <div>
          <h2 id="cadeau" className="font-display text-5xl font-light md:text-6xl">L’Expérience KEKELI</h2>
          <p className="mt-6 max-w-md text-muted">
            Offrez le choix : une pièce de La Sélection ou un moment à L’Institut. La carte cadeau est valable sur les deux.
          </p>

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
            onClick={handleAdd}
            className="mt-10 inline-flex items-center gap-3 rounded-full border border-gold px-10 py-4 text-xs uppercase tracking-[0.3em] transition-all duration-500 hover:bg-gold hover:text-bg hover:shadow-[0_0_28px_-6px_var(--gold)]"
          >
            {added && <Check size={16} strokeWidth={1.5} className="animate-pop" />}
            {added ? "Ajoutée" : "Ajouter au panier"}
          </button>
        </div>
      </div>
    </section>
  );
}

"use client";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { WHATSAPP_PHONE } from "@/lib/contact";

const GROUPS = [
  { label: "Coiffure & Perruques", services: ["Soin profond", "Tresses signatures", "Pose & customisation de lace"] },
  { label: "Maquillage", services: ["Mise en beauté de mariée", "Événement VIP", "Maquillage studio"] },
];
const SLOTS = ["09h30", "11h00", "13h00", "14h30", "16h00"];
const WEEK = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

const chip = (on: boolean) =>
  `rounded-full border px-5 py-2.5 text-xs uppercase tracking-[0.15em] transition-all duration-500 ${
    on ? "border-gold bg-gold text-bg" : "border-line text-muted hover:border-gold hover:text-gold"
  }`;

export default function BookingCalendar() {
  const [now, setNow] = useState<Date | null>(null);
  const [group, setGroup] = useState(0);
  const [service, setService] = useState<string | null>(null);
  const [view, setView] = useState({ y: 0, m: 0 });
  const [date, setDate] = useState<Date | null>(null);
  const [slot, setSlot] = useState<string | null>(null);

  useEffect(() => {
    const d = new Date();
    setNow(d);
    setView({ y: d.getFullYear(), m: d.getMonth() });
  }, []);

  if (!now) return <div className="h-[34rem]" aria-hidden />;

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const offset = (new Date(view.y, view.m, 1).getDay() + 6) % 7; // semaine commençant le lundi
  const days = new Date(view.y, view.m + 1, 0).getDate();
  const cells: (Date | null)[] = [
    ...Array<null>(offset).fill(null),
    ...Array.from({ length: days }, (_, i) => new Date(view.y, view.m, i + 1)),
  ];
  const monthIdx = view.y * 12 + view.m;
  const nowIdx = today.getFullYear() * 12 + today.getMonth();
  const shift = (k: number) =>
    setView(({ y, m }) => {
      const d = new Date(y, m + k, 1);
      return { y: d.getFullYear(), m: d.getMonth() };
    });
  const isToday = !!date && date.getTime() === today.getTime();
  const slotPast = (s: string) => {
    if (!isToday) return false;
    const [h, mi] = s.split("h").map(Number);
    return h * 60 + mi <= now.getHours() * 60 + now.getMinutes();
  };

  const ready = !!service && !!date && !!slot && !slotPast(slot);
  const dateLabel = date?.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const message = `Bonjour KEKELI, je souhaite réserver la prestation ${service} à L’Institut pour le ${dateLabel} à ${slot}. Merci de me confirmer la disponibilité.`;
  const href = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
  const capsule = "inline-block rounded-full border px-10 py-4 text-xs uppercase tracking-[0.3em] transition-all duration-500";

  return (
    <div className="grid gap-12 md:grid-cols-2 md:gap-20">
      <div className="space-y-12">
        <div>
          <h3 className="mb-5 font-display text-3xl font-light"><span className="mr-3 text-gold">01</span>Votre soin</h3>
          <div className="mb-4 flex flex-wrap gap-3">
            {GROUPS.map((g, i) => (
              <button key={g.label} onClick={() => { setGroup(i); setService(null); }} className={chip(group === i)}>{g.label}</button>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            {GROUPS[group].services.map((s) => (
              <button key={s} onClick={() => setService(s)} className={chip(service === s)}>{s}</button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-5 font-display text-3xl font-light"><span className="mr-3 text-gold">02</span>Votre jour</h3>
          <div className="max-w-sm">
            <div className="mb-4 flex items-center justify-between">
              <button onClick={() => shift(-1)} disabled={monthIdx <= nowIdx} aria-label="Mois précédent" className="p-2 transition-colors hover:text-gold disabled:opacity-30"><ChevronLeft size={18} strokeWidth={1.25} /></button>
              <p className="text-sm uppercase capitalize tracking-[0.2em]">
                {new Date(view.y, view.m, 1).toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
              </p>
              <button onClick={() => shift(1)} disabled={monthIdx >= nowIdx + 2} aria-label="Mois suivant" className="p-2 transition-colors hover:text-gold disabled:opacity-30"><ChevronRight size={18} strokeWidth={1.25} /></button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
              {WEEK.map((w) => <span key={w} className="pb-2 text-[10px] uppercase tracking-widest text-muted">{w}</span>)}
              {cells.map((d, i) => {
                if (!d) return <span key={`v${i}`} />;
                const past = d < today;
                const sel = !!date && d.getTime() === date.getTime();
                return (
                  <button
                    key={d.getTime()}
                    disabled={past}
                    onClick={() => setDate(d)}
                    className={`aspect-square rounded-full text-sm transition-all duration-300 ${
                      sel ? "bg-gold text-bg" : past ? "text-muted/40" : "hover:bg-surface hover:text-gold"
                    } ${d.getTime() === today.getTime() && !sel ? "ring-1 ring-gold/60" : ""}`}
                  >
                    {d.getDate()}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-12">
        <div>
          <h3 className="mb-5 font-display text-3xl font-light"><span className="mr-3 text-gold">03</span>Votre heure</h3>
          <div className="flex flex-wrap gap-3">
            {SLOTS.map((s) => (
              <button key={s} disabled={slotPast(s)} onClick={() => setSlot(s)} className={`${chip(slot === s)} disabled:opacity-30`}>{s}</button>
            ))}
          </div>
        </div>

        <div className="border-t border-line pt-8">
          <p className="mb-6 min-h-12 text-sm leading-relaxed text-muted">
            {ready ? (
              <>Votre sélection : <span className="text-fg">{service}</span>, le <span className="text-fg">{dateLabel}</span> à <span className="text-fg">{slot}</span>.</>
            ) : (
              "Choisissez un soin, un jour et une heure pour confirmer votre rendez-vous."
            )}
          </p>
          {ready ? (
            <a href={href} target="_blank" rel="noopener noreferrer" className={`${capsule} border-gold bg-gold text-bg hover:shadow-[0_0_28px_-6px_var(--gold)]`}>
              Confirmer le rendez-vous
            </a>
          ) : (
            <button disabled className={`${capsule} cursor-not-allowed border-line text-muted opacity-60`}>Confirmer le rendez-vous</button>
          )}
          <p className="mt-4 text-xs text-muted">La confirmation se fait sur WhatsApp : votre message est déjà rédigé.</p>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useEffect, useRef, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { WHATSAPP_PHONE } from "@/lib/contact";

const OPTIONS = [
  { emoji: "👗", label: "Passer une commande personnalisée (Robes/Sacs)", message: "Bonjour KEKELI, je souhaite passer une commande personnalisée et en savoir plus sur vos robes et vos sacs." },
  { emoji: "👑", label: "Conseil & Customisation de Perruques", message: "Bonjour KEKELI, j’ai besoin de conseils pour choisir et personnaliser une perruque haute qualité." },
  { emoji: "📦", label: "Suivre l’état de ma livraison", message: "Bonjour KEKELI, je vous contacte pour faire le suivi de ma livraison. Voici mon numéro de commande : " },
  { emoji: "✨", label: "Parler à une conseillère KEKELI", message: "Bonjour KEKELI, j’aimerais échanger avec l’une de vos conseillères." },
];

const link = (message: string) => `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onPointer);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      <div
        id="menu-whatsapp"
        inert={!open}
        className={`w-[min(20rem,calc(100vw-3rem))] origin-bottom-right rounded-2xl border-[0.5px] border-gold/50 bg-bg/80 p-5 text-fg shadow-2xl backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <p className="font-display text-2xl font-light leading-tight">Comment pouvons-nous vous aider ?</p>
        <p className="mb-4 mt-1 text-xs text-muted">Notre équipe vous répond sur WhatsApp.</p>
        <ul className="space-y-2">
          {OPTIONS.map((o) => (
            <li key={o.label}>
              <a
                href={link(o.message)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-xl border-[0.5px] border-line px-4 py-3 text-left text-[13px] font-light leading-snug transition-all duration-500 hover:translate-x-1 hover:border-gold hover:text-gold"
              >
                <span className="text-lg" aria-hidden>{o.emoji}</span>
                <span>{o.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="menu-whatsapp"
        aria-label={open ? "Fermer le menu de contact" : "Nous contacter sur WhatsApp"}
        className="group relative grid size-14 place-items-center rounded-full border-[0.5px] border-gold/60 bg-bg/80 text-gold shadow-xl backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:bg-gold hover:text-bg"
      >
        {!open && <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-gold/20 [animation-duration:3s]" aria-hidden />}
        <MessageCircle size={24} strokeWidth={1.25} className={`absolute transition-all duration-500 ${open ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`} />
        <X size={22} strokeWidth={1.25} className={`absolute transition-all duration-500 ${open ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}`} />
      </button>
    </div>
  );
}

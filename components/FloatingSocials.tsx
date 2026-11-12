import { Facebook, Instagram } from "lucide-react";

// ➜ Collez ici vos vrais liens officiels
const LINKS = {
  instagram: "https://instagram.com",
  facebook: "https://facebook.com",
  tiktok: "https://tiktok.com",
};

// Icône TikTok : tracé vectoriel fin, même épaisseur que les icônes lucide
const TikTok = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const ITEMS = [
  { label: "Instagram", href: LINKS.instagram, icon: <Instagram size={20} strokeWidth={1.25} /> },
  { label: "Facebook", href: LINKS.facebook, icon: <Facebook size={20} strokeWidth={1.25} /> },
  { label: "TikTok", href: LINKS.tiktok, icon: <TikTok /> },
];

export default function FloatingSocials() {
  return (
    // origin-left : sur téléphone, la pilule rétrécit en restant centrée sur la même ligne que le bouton WhatsApp
    <div className="group/socials fixed bottom-6 left-6 z-40 origin-left scale-90 sm:scale-100">
      {/* Infobulle discrète au survol */}
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-2 mb-3 translate-y-1 whitespace-nowrap rounded-full border border-line bg-bg/80 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-muted opacity-0 backdrop-blur-md transition-all duration-300 group-hover/socials:translate-y-0 group-hover/socials:opacity-100 group-focus-within/socials:translate-y-0 group-focus-within/socials:opacity-100"
      >
        Suivre nos actualités
      </span>

      {/* Pilule en verre dépoli : même hauteur (h-14) que le bouton WhatsApp, donc parfaitement alignée */}
      <ul className="flex h-14 items-center gap-5 rounded-full border-[0.5px] border-gold/60 bg-bg/70 px-6 shadow-xl backdrop-blur-md">
        {ITEMS.map((s) => (
          <li key={s.label}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${s.label} (s’ouvre dans un nouvel onglet)`}
              title={s.label}
              className="grid size-8 place-items-center text-fg/80 transition-all duration-300 hover:-translate-y-1 hover:text-gold"
            >
              {s.icon}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

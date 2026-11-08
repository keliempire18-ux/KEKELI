"use client";
import "@fontsource/playfair-display/400.css";
import { useEffect, useState } from "react";

export default function Logo({ variant = "nav", className = "" }: { variant?: "nav" | "hero"; className?: string }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setOn(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Hero : toujours sur fond sombre. Navbar : s'adapte au mode clair ou sombre.
  const gradient =
    variant === "hero"
      ? "from-neutral-100 via-neutral-400 to-neutral-100"
      : "from-neutral-900 via-neutral-500 to-neutral-900 dark:from-neutral-100 dark:via-neutral-300 dark:to-neutral-100";

  return (
    <span
      style={{ fontFamily: '"Playfair Display", Didot, "Bodoni MT", Georgia, serif' }}
      className={`inline-block bg-gradient-to-r bg-clip-text font-normal uppercase leading-none text-transparent transition-all duration-[2200ms] ease-out ${gradient} ${
        on
          ? "pl-[0.4em] tracking-[0.4em] opacity-100 blur-0 md:pl-[0.6em] md:tracking-[0.6em]"
          : "pl-[0.12em] tracking-[0.12em] opacity-0 blur-sm"
      } ${className}`}
    >
      KEKELI
    </span>
  );
}

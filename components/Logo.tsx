"use client";
import "@fontsource/playfair-display/400.css";
import { useEffect, useState } from "react";

export default function Logo({ className = "" }: { variant?: "nav" | "hero"; className?: string }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setOn(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <span
      style={{ fontFamily: '"Playfair Display", Didot, "Bodoni MT", Georgia, serif' }}
      className={`inline-block bg-gradient-to-r from-[#1a1a1a] via-[#4a463f] to-[#1a1a1a] bg-clip-text font-normal uppercase leading-none text-transparent transition-all duration-[2200ms] ease-out dark:from-neutral-100 dark:via-neutral-300 dark:to-neutral-100 ${
        on
          ? "pl-[0.4em] tracking-[0.4em] opacity-100 blur-0 md:pl-[0.6em] md:tracking-[0.6em]"
          : "pl-[0.12em] tracking-[0.12em] opacity-0 blur-sm"
      } ${className}`}
    >
      KEKELI
    </span>
  );
}

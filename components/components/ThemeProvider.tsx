"use client";
import { useEffect } from "react";
import { isNight, msUntilNextSwitch } from "@/lib/theme";

function apply(night: boolean, animate: boolean) {
  const root = document.documentElement;
  if (root.classList.contains("dark") === night) return;
  if (animate) {
    root.classList.add("theme-fade"); // fondu d'une seconde, uniquement lors d'un changement automatique
    window.setTimeout(() => root.classList.remove("theme-fade"), 1100);
  }
  root.classList.toggle("dark", night);
  root.style.colorScheme = night ? "dark" : "light";
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let timer = 0;
    const sync = (animate: boolean) => {
      apply(isNight(), animate);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => sync(true), msUntilNextSwitch()); // se réveille à 06h30 ou 19h00 pile
    };
    sync(false);
    // Si l'onglet ou l'ordinateur était en veille, on se recale au retour.
    const onVisible = () => document.visibilityState === "visible" && sync(true);
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return <>{children}</>;
}

"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const dark = mounted && resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={dark ? "Passer en mode clair" : "Passer en mode sombre"}
      className="grid size-10 place-items-center text-fg/80 transition-colors hover:text-gold"
    >
      {dark ? <Sun size={18} strokeWidth={1.25} /> : <Moon size={18} strokeWidth={1.25} />}
    </button>
  );
}

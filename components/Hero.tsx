"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "./Logo";

// Pour une vidéo cinématique : <Hero videoSrc="/hero.mp4" poster="/hero.jpg" /> (fichiers dans /public)
export default function Hero({ videoSrc, poster }: { videoSrc?: string; poster?: string }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setOn(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section className="relative flex h-dvh items-center justify-center overflow-hidden bg-[#050505] text-white">
      {videoSrc ? (
        <video className="absolute inset-0 size-full object-cover opacity-60" src={videoSrc} poster={poster} autoPlay muted loop playsInline />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,#2b2309_0%,#050505_65%)]" aria-hidden />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" aria-hidden />

      <div className="relative z-10 px-4 text-center">
        <h1 aria-label="KEKELI">
          <Logo variant="hero" className="text-[clamp(2.25rem,9vw,7rem)] drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)]" />
        </h1>

        <span
          className={`mx-auto mt-8 block h-px bg-[#d4af37]/70 transition-all delay-700 duration-[1600ms] ease-out ${on ? "w-28 opacity-100" : "w-0 opacity-0"}`}
          aria-hidden
        />
        <p
          className={`mx-auto mt-8 max-w-md text-lg font-light text-white/70 transition-all delay-1000 duration-1000 ease-out ${on ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          L’élégance, redessinée pour demain.
        </p>
        <Link
          href="#collection"
          className={`group glass relative mt-12 inline-block overflow-hidden border border-[#d4af37]/60 px-10 py-4 text-xs uppercase tracking-[0.3em] transition-all delay-[1300ms] duration-1000 ease-out ${on ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          <span className="absolute inset-0 -translate-x-full bg-[#d4af37] transition-transform duration-700 ease-out group-hover:translate-x-0" />
          <span className="relative transition-colors duration-700 group-hover:text-black">Découvrir la collection</span>
        </Link>
      </div>

      <div className="absolute bottom-8 left-1/2 h-14 w-px -translate-x-1/2 overflow-hidden bg-white/20" aria-hidden>
        <span className="block h-1/2 w-full animate-scroll bg-[#d4af37]" />
      </div>
    </section>
  );
}

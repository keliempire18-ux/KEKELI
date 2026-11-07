import Link from "next/link";

// Pour une vidéo cinématique : <Hero videoSrc="/hero.mp4" poster="/hero.jpg" /> (fichiers dans /public)
export default function Hero({ videoSrc, poster }: { videoSrc?: string; poster?: string }) {
  return (
    <section className="relative flex h-dvh items-center justify-center overflow-hidden bg-[#050505] text-white">
      {videoSrc ? (
        <video className="absolute inset-0 size-full object-cover opacity-60" src={videoSrc} poster={poster} autoPlay muted loop playsInline />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,#2b2309_0%,#050505_65%)]" aria-hidden />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" aria-hidden />

      <div className="relative z-10 px-4 text-center">
        <h1 className="animate-rise font-display text-[clamp(3.5rem,14vw,11rem)] font-light tracking-[0.2em] indent-[0.2em]">KEKELI</h1>
        <p className="animate-rise mx-auto mt-6 max-w-md text-lg font-light text-white/70 [animation-delay:0.5s]">
          L’élégance, redessinée pour demain.
        </p>
        <Link
          href="#collection"
          className="animate-rise group glass relative mt-12 inline-block overflow-hidden border border-[#d4af37]/60 px-10 py-4 text-xs uppercase tracking-[0.3em] [animation-delay:0.9s]"
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

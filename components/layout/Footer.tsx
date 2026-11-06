export default function Footer() {
  return (
    <footer className="mt-32 border-t border-line px-4 py-10 text-sm text-muted md:px-8">
      <div className="mx-auto flex max-w-[1600px] flex-col justify-between gap-4 sm:flex-row">
        <span className="font-display text-xl tracking-[0.18em] text-fg">KEKELI</span>
        <span>© {new Date().getFullYear()} KEKELI. Tous droits réservés.</span>
      </div>
    </footer>
  );
}

"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { getSupabase, hasSupabase } from "@/lib/supabase";
import { CATEGORIES, type Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";

const input = "w-full border-b border-line bg-transparent py-3 outline-none transition-colors placeholder:text-muted focus:border-gold";
const btn = "border border-gold px-8 py-3 text-xs uppercase tracking-[0.25em] transition-colors duration-500 hover:bg-gold hover:text-black disabled:opacity-50";
const empty = { name: "", price: "", description: "", category: "robes", sizes: "", colors: "" };

const slugify = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") +
  "-" + Math.random().toString(36).slice(2, 6);

function parseColors(s: string) {
  return s.split(",").map((c) => c.trim()).filter(Boolean).map((c) => {
    const m = c.match(/^(.*?)\s*(#[0-9a-f]{3,6})?$/i);
    return { name: (m?.[1] || c).trim(), hex: m?.[2] || "#999999" };
  });
}

// Réduit les photos de téléphone (max 1800 px, WebP) avant l'envoi : site plus rapide, envoi plus léger.
async function compress(file: File): Promise<Blob> {
  const bmp = await createImageBitmap(file);
  const k = Math.min(1, 1800 / Math.max(bmp.width, bmp.height));
  const c = document.createElement("canvas");
  c.width = Math.round(bmp.width * k);
  c.height = Math.round(bmp.height * k);
  c.getContext("2d")!.drawImage(bmp, 0, 0, c.width, c.height);
  return new Promise((ok, ko) => c.toBlob((b) => (b ? ok(b) : ko(new Error("Image illisible"))), "image/webp", 0.85));
}

export default function AdminPanel() {
  if (!hasSupabase()) return <p className="px-4 pt-32 text-center">Variables Supabase manquantes (voir SETUP.md).</p>;
  return <Panel />;
}

function Panel() {
  const sb = getSupabase();
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [creds, setCreds] = useState({ email: "", password: "" });
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState(empty);
  const [images, setImages] = useState<string[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [drag, setDrag] = useState(false);
  const [msg, setMsg] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    sb.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = sb.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, [sb]);

  const load = useCallback(async () => {
    const { data } = await sb.from("products").select("*").order("created_at", { ascending: false });
    setProducts((data ?? []) as Product[]);
  }, [sb]);
  useEffect(() => { if (session) load(); }, [session, load]);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await sb.auth.signInWithPassword(creds);
    setMsg(error ? "Identifiants incorrects." : "");
  }

  async function upload(files: FileList | File[]) {
    setBusy(true); setMsg("");
    try {
      const urls: string[] = [];
      for (const f of Array.from(files)) {
        if (!f.type.startsWith("image/")) continue;
        const path = `${crypto.randomUUID()}.webp`;
        const { error } = await sb.storage.from("products").upload(path, await compress(f), { contentType: "image/webp", cacheControl: "31536000" });
        if (error) throw error;
        urls.push(sb.storage.from("products").getPublicUrl(path).data.publicUrl);
      }
      setImages((i) => [...i, ...urls]);
    } catch (err) {
      setMsg("Échec de l’envoi : " + (err as Error).message);
    } finally { setBusy(false); }
  }

  async function save(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setMsg("");
    const payload = {
      name: form.name.trim(), description: form.description.trim(), price: Math.round(Number(form.price)),
      category: form.category, images,
      sizes: form.sizes.split(",").map((s) => s.trim()).filter(Boolean), colors: parseColors(form.colors),
    };
    const { error } = editingId
      ? await sb.from("products").update(payload).eq("id", editingId)
      : await sb.from("products").insert({ ...payload, slug: slugify(payload.name) });
    setBusy(false);
    if (error) return setMsg("Erreur : " + error.message);
    setMsg(editingId ? "Modifié : visible sur le site immédiatement." : "Publié : visible sur le site immédiatement.");
    setForm(empty); setImages([]); setEditingId(null); load();
  }

  function edit(p: Product) {
    setForm({ name: p.name, price: String(p.price), description: p.description ?? "", category: p.category,
      sizes: p.sizes.join(", "), colors: p.colors.map((c) => `${c.name} ${c.hex}`).join(", ") });
    setImages(p.images); setEditingId(p.id); window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function del(p: Product) {
    if (!confirm(`Supprimer « ${p.name} » ?`)) return;
    await sb.from("products").delete().eq("id", p.id);
    load();
  }

  if (session === undefined) return <p className="px-4 pt-32 text-center text-muted">Chargement…</p>;

  if (!session) {
    return (
      <form onSubmit={login} className="glass mx-auto mt-32 max-w-sm space-y-6 border p-8">
        <h1 className="font-display text-4xl font-light">Administration</h1>
        <input className={input} type="email" placeholder="E-mail" required value={creds.email} onChange={(e) => setCreds({ ...creds, email: e.target.value })} />
        <input className={input} type="password" placeholder="Mot de passe" required value={creds.password} onChange={(e) => setCreds({ ...creds, password: e.target.value })} />
        <button className={btn}>Se connecter</button>
        {msg && <p className="text-sm text-gold">{msg}</p>}
      </form>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 pb-24 pt-28 md:px-8">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="font-display text-5xl font-light">{editingId ? "Modifier le produit" : "Nouveau produit"}</h1>
        <button onClick={() => sb.auth.signOut()} className="text-sm text-muted underline hover:text-gold">Déconnexion</button>
      </div>

      <form onSubmit={save} className="glass space-y-6 border p-6 md:p-8">
        <div className="grid gap-6 md:grid-cols-2">
          <input className={input} placeholder="Nom" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className={input} type="number" min="0" placeholder="Prix (FCFA)" required value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
          <select className={input} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            {CATEGORIES.map((c) => <option key={c.slug} value={c.slug} className="text-black">{c.label}</option>)}
          </select>
          <input className={input} placeholder="Tailles : S, M, L ou 37, 38, 39" value={form.sizes} onChange={(e) => setForm({ ...form, sizes: e.target.value })} />
        </div>
        <input className={input} placeholder="Couleurs : Noir #0a0a0a, Ivoire #efe9dc" value={form.colors} onChange={(e) => setForm({ ...form, colors: e.target.value })} />
        <textarea className={input} rows={3} placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />

        <div
          onClick={() => fileRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => { e.preventDefault(); setDrag(false); upload(e.dataTransfer.files); }}
          className={`cursor-pointer border border-dashed px-6 py-12 text-center text-sm transition-colors ${drag ? "border-gold text-gold" : "border-line text-muted"}`}
        >
          Glissez vos photos ici, ou touchez pour les choisir
          <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={(e) => e.target.files && upload(e.target.files)} />
        </div>

        {images.length > 0 && (
          <ul className="flex flex-wrap gap-3">
            {images.map((u, i) => (
              <li key={u} className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={u} alt="" title="Toucher pour définir comme photo principale" onClick={() => setImages([u, ...images.filter((x) => x !== u)])}
                  className={`h-28 w-20 cursor-pointer object-cover ${i === 0 ? "outline outline-1 outline-gold" : ""}`} />
                <button type="button" onClick={() => setImages(images.filter((x) => x !== u))} className="absolute right-1 top-1 bg-black/70 px-1.5 text-xs text-white" aria-label="Retirer">×</button>
              </li>
            ))}
          </ul>
        )}

        <div className="flex items-center gap-6">
          <button className={btn} disabled={busy}>{busy ? "Patientez…" : editingId ? "Enregistrer" : "Publier"}</button>
          {editingId && <button type="button" className="text-sm text-muted underline" onClick={() => { setForm(empty); setImages([]); setEditingId(null); }}>Annuler</button>}
          {msg && <p className="text-sm text-gold">{msg}</p>}
        </div>
      </form>

      <h2 className="mb-6 mt-16 font-display text-4xl font-light">Produits en ligne ({products.length})</h2>
      <ul className="divide-y divide-line border-y border-line">
        {products.map((p) => (
          <li key={p.id} className="flex items-center gap-4 py-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {p.images[0] ? <img src={p.images[0]} alt="" className="h-16 w-12 object-cover" /> : <div className="h-16 w-12 bg-surface" />}
            <div className="flex-1"><p className="font-display text-xl">{p.name}</p><p className="text-xs text-muted">{p.category} · {formatPrice(p.price)}</p></div>
            <button onClick={() => edit(p)} className="text-sm underline hover:text-gold">Modifier</button>
            <button onClick={() => del(p)} className="text-sm text-muted underline hover:text-gold">Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

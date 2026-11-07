-- 1) Remplacez VOTRE_EMAIL par l'e-mail du compte administrateur, puis exécutez tout le script.
create or replace function public.is_admin() returns boolean
language sql stable as $$ select coalesce(auth.jwt() ->> 'email', '') = 'VOTRE_EMAIL' $$;

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text not null default '',
  price integer not null check (price >= 0),
  category text not null default 'robes',
  images text[] not null default '{}',
  sizes text[] not null default '{}',
  colors jsonb not null default '[]',
  is_new boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.products enable row level security;
create policy "Lecture publique" on public.products for select using (true);
create policy "Admin ecrit" on public.products for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

insert into storage.buckets (id, name, public) values ('products', 'products', true)
  on conflict (id) do nothing;
create policy "Admin envoie photos" on storage.objects for insert to authenticated
  with check (bucket_id = 'products' and public.is_admin());
create policy "Admin modifie photos" on storage.objects for update to authenticated
  using (bucket_id = 'products' and public.is_admin());
create policy "Admin supprime photos" on storage.objects for delete to authenticated
  using (bucket_id = 'products' and public.is_admin());

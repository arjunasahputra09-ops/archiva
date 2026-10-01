-- Archiva Digital Solutions - skema database Supabase
-- Tempel seluruh isi file ini di Supabase > SQL Editor > New query > Run.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'user',
  created_at timestamptz not null default now()
);
create table if not exists public.article_categories (
  id bigint generated always as identity primary key,
  name text not null,
  slug text not null unique
);
create table if not exists public.articles (
  id bigint generated always as identity primary key,
  category_id bigint references public.article_categories(id),
  title text not null,
  slug text not null unique,
  image text,
  content text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table if not exists public.services (
  id bigint generated always as identity primary key,
  name text not null, description text, image text,
  created_at timestamptz not null default now()
);
create table if not exists public.events (
  id bigint generated always as identity primary key,
  title text not null, description text, image text, event_date date,
  created_at timestamptz not null default now()
);
create table if not exists public.gallery (
  id bigint generated always as identity primary key,
  title text, image text not null,
  created_at timestamptz not null default now()
);
create table if not exists public.clients (
  id bigint generated always as identity primary key,
  name text not null, logo text,
  created_at timestamptz not null default now()
);

insert into public.article_categories (name, slug) values
  ('Teknologi','teknologi'), ('Arsip Digital','arsip-digital'), ('Informasi','informasi')
on conflict (slug) do nothing;

-- Profil dibuat otomatis saat pengguna Sign up.
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name');
  return new;
end $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- Fungsi bantu: apakah pengguna saat ini admin?
create or replace function public.is_admin() returns boolean
language sql security definer set search_path = '' stable as $$
  select exists (select 1 from public.profiles where id = (select auth.uid()) and role = 'admin');
$$;

-- Row Level Security
alter table public.profiles enable row level security;
alter table public.article_categories enable row level security;
alter table public.articles enable row level security;
alter table public.services enable row level security;
alter table public.events enable row level security;
alter table public.gallery enable row level security;
alter table public.clients enable row level security;

create policy "profil: baca milik sendiri" on public.profiles
  for select to authenticated using (id = (select auth.uid()));

do $$
declare t text;
begin
  foreach t in array array['article_categories','articles','services','events','gallery','clients'] loop
    execute format('create policy "publik boleh baca" on public.%I for select to anon, authenticated using (true)', t);
    execute format('create policy "admin boleh tambah" on public.%I for insert to authenticated with check (public.is_admin())', t);
    execute format('create policy "admin boleh ubah" on public.%I for update to authenticated using (public.is_admin()) with check (public.is_admin())', t);
    execute format('create policy "admin boleh hapus" on public.%I for delete to authenticated using (public.is_admin())', t);
  end loop;
end $$;

-- Storage untuk upload gambar (dipakai pada tahap upload)
insert into storage.buckets (id, name, public) values ('article-images','article-images', true)
on conflict (id) do nothing;
create policy "gambar publik dibaca" on storage.objects
  for select using (bucket_id = 'article-images');
create policy "admin upload gambar" on storage.objects
  for insert to authenticated with check (bucket_id = 'article-images' and public.is_admin());
create policy "admin hapus gambar" on storage.objects
  for delete to authenticated using (bucket_id = 'article-images' and public.is_admin());

-- Jadikan akun kamu admin (ganti emailnya, jalankan SETELAH Sign up):
-- update public.profiles set role = 'admin'
--   where id = (select id from auth.users where email = 'emailkamu@contoh.com');

-- Pesan dari form Kontak
create table if not exists public.messages (
  id bigint generated always as identity primary key,
  name text not null check (char_length(name) between 1 and 100),
  email text not null check (char_length(email) between 3 and 200),
  message text not null check (char_length(message) between 1 and 2000),
  created_at timestamptz not null default now()
);
alter table public.messages enable row level security;
create policy "publik boleh kirim pesan" on public.messages
  for insert to anon, authenticated with check (true);
create policy "admin boleh baca pesan" on public.messages
  for select to authenticated using (public.is_admin());
create policy "admin boleh hapus pesan" on public.messages
  for delete to authenticated using (public.is_admin());

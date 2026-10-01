-- Tabel pesan dari form Kontak. Jalankan sekali di Supabase > SQL Editor.
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

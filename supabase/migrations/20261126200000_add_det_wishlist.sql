create table public.det_wishlist (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(btrim(name)) between 1 and 80),
  contact_number text not null check (contact_number ~ '^[+]?[0-9]{7,15}$'),
  preferred_batch text not null check (preferred_batch in ('next', 'later', 'undecided')),
  created_at timestamptz not null default now()
);

create index det_wishlist_created_at_idx on public.det_wishlist (created_at desc, id desc);

alter table public.det_wishlist enable row level security;
revoke all on public.det_wishlist from public, anon, authenticated;
grant insert (id, name, contact_number, preferred_batch) on public.det_wishlist to anon, authenticated;
grant select on public.det_wishlist to authenticated;

create policy "Visitors can submit wishlist requests"
  on public.det_wishlist for insert to anon, authenticated
  with check (true);

create policy "DuoMate admin can read wishlist requests"
  on public.det_wishlist for select to authenticated
  using ((select lower(auth.jwt() ->> 'email')) = 'duomatebd@gmail.com');

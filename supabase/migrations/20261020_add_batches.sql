create table public.batches (
  id uuid primary key default gen_random_uuid(),
  name text not null unique check (length(trim(name)) between 1 and 80),
  status text not null default 'registration_open'
    check (status in ('registration_open', 'active', 'completed')),
  created_at timestamptz not null default now()
);
create table public.batch_enrollments (
  enrollment_id uuid primary key references public.enrollments(id) on delete cascade,
  batch_id uuid not null references public.batches(id),
  assigned_at timestamptz not null default now()
);
create index batch_enrollments_batch_idx on public.batch_enrollments(batch_id);
alter table public.batches enable row level security;
alter table public.batch_enrollments enable row level security;
revoke all on public.batches, public.batch_enrollments from anon, authenticated;
grant select, insert, update on public.batches to authenticated;
grant select, insert, update, delete on public.batch_enrollments to authenticated;
create policy "Admin manages batches" on public.batches for all to authenticated
  using ((select lower(auth.jwt()->>'email')) = 'duomatebd@gmail.com')
  with check ((select lower(auth.jwt()->>'email')) = 'duomatebd@gmail.com');
create policy "Admin manages batch assignments" on public.batch_enrollments for all to authenticated
  using ((select lower(auth.jwt()->>'email')) = 'duomatebd@gmail.com')
  with check ((select lower(auth.jwt()->>'email')) = 'duomatebd@gmail.com');

insert into public.batches(name) values ('Batch 14');

-- Adds soft-delete ("trash") support to the enrollments table.
-- Run this once in the Supabase SQL editor (or via `supabase db push`)
-- for the "Delete" button on the admin Enrollments page to work.

alter table public.enrollments
  add column if not exists deleted_at timestamptz;

create index if not exists enrollments_deleted_at_idx
  on public.enrollments (deleted_at);

-- Allow admins to permanently delete rows (needed both for the "Delete
-- permanently" trash action and for the automatic 30-day purge). Adjust
-- the USING clause to match however admin-only access is checked by
-- your other enrollments policies (e.g. a role check instead of
-- auth.uid() is not null) if this is too permissive for your setup.
drop policy if exists "Admins can delete enrollments" on public.enrollments;
create policy "Admins can delete enrollments"
  on public.enrollments
  for delete
  using (auth.uid() is not null);

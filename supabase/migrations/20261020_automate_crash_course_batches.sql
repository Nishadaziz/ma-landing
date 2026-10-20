-- The public countdown and database assignment use this same schedule.
create table public.course_batch_schedules (
  course_slug text primary key,
  scheduled_days integer[] not null check (cardinality(scheduled_days) > 0 and scheduled_days <@ array[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]),
  start_time time not null,
  timezone text not null default 'Asia/Dhaka',
  first_batch_number integer not null check (first_batch_number > 0),
  first_starts_at timestamptz not null,
  duration_days integer not null check (duration_days > 0)
);
alter table public.course_batch_schedules enable row level security;
revoke all on public.course_batch_schedules from anon, authenticated;
grant select on public.course_batch_schedules to anon, authenticated;
create policy "Public course countdown schedule" on public.course_batch_schedules for select
  to anon, authenticated using (true);
insert into public.course_batch_schedules values
  ('duolingo-15-days-crash-course', array[6,13,21,29], '22:00', 'Asia/Dhaka', 14, '2026-10-21 22:00:00+06', 15);

alter table public.batches
  add column course_slug text references public.course_batch_schedules(course_slug),
  add column batch_number integer,
  add column registration_opens_at timestamptz,
  add column starts_at timestamptz,
  add constraint batches_course_number_unique unique(course_slug,batch_number);
alter table public.batches drop constraint batches_status_check;
alter table public.batches add constraint batches_status_check
  check (status in ('scheduled','registration_open','active','completed'));
update public.batches set course_slug='duolingo-15-days-crash-course', batch_number=14 where name='Batch 14';

create schema if not exists private;
create function private.crash_batch_windows(reference_time timestamptz)
returns table(batch_number integer, opens_at timestamptz, starts_at timestamptz)
language sql stable set search_path='' as $$
  with config as (
    select * from public.course_batch_schedules where course_slug='duolingo-15-days-crash-course'
  ), candidates as (
    select distinct ((m.month_start::date + (day.number - 1)) + c.start_time) at time zone c.timezone as starts,
      c.first_starts_at, c.first_batch_number
    from config c
    cross join lateral generate_series(
      date_trunc('month', c.first_starts_at at time zone c.timezone) - interval '1 month',
      date_trunc('month', greatest(reference_time, c.first_starts_at) at time zone c.timezone) + interval '2 months',
      interval '1 month'
    ) m(month_start)
    cross join lateral unnest(c.scheduled_days) day(number)
    where extract(month from (m.month_start::date + (day.number-1)))=extract(month from m.month_start)
  ), windows as (
    select *, lag(starts) over(order by starts) as opens from candidates
  )
  select (first_batch_number + row_number() over(order by starts) - 1)::integer, opens, starts
  from windows where starts >= first_starts_at;
$$;
revoke all on function private.crash_batch_windows(timestamptz) from public, anon, authenticated;

-- Runs on the database clock and catches up after downtime. Keep one future batch ready.
create function private.sync_crash_batches(reference_time timestamptz default now())
returns void language plpgsql set search_path='' as $$
declare cutoff timestamptz;
begin
  perform pg_advisory_xact_lock(71301415);
  select w.starts_at into cutoff from private.crash_batch_windows(reference_time) w
    where w.starts_at > reference_time order by w.starts_at offset 1 limit 1;
  insert into public.batches(name, course_slug, batch_number, registration_opens_at, starts_at, status)
    select 'Batch '||w.batch_number, 'duolingo-15-days-crash-course', w.batch_number, w.opens_at, w.starts_at,
      case when reference_time < w.opens_at then 'scheduled'
           when reference_time < w.starts_at then 'registration_open'
           when reference_time < w.starts_at + make_interval(days=>c.duration_days) then 'active'
           else 'completed' end
    from private.crash_batch_windows(reference_time) w
    cross join public.course_batch_schedules c
    where c.course_slug='duolingo-15-days-crash-course' and w.starts_at <= cutoff
    on conflict(course_slug,batch_number) do update set
      registration_opens_at=excluded.registration_opens_at, starts_at=excluded.starts_at, status=excluded.status
    where (batches.registration_opens_at,batches.starts_at,batches.status)
      is distinct from (excluded.registration_opens_at,excluded.starts_at,excluded.status);
end;
$$;
revoke all on function private.sync_crash_batches(timestamptz) from public, anon, authenticated;

-- Record against server receipt time; client-submitted dates cannot choose a batch.
-- Assignment happens once, so later approval or manual moves never reassign students.
create function private.assign_crash_enrollment()
returns trigger language plpgsql security definer set search_path='' as $$
declare target uuid;
begin
  if new.course_slug <> 'duolingo-15-days-crash-course' or new.deleted_at is not null then return new; end if;
  perform private.sync_crash_batches(now());
  select b.id into target from public.batches b
    where b.course_slug=new.course_slug and b.registration_opens_at <= now() and b.starts_at > now()
    order by b.starts_at limit 1;
  if target is not null then
    insert into public.batch_enrollments(enrollment_id,batch_id) values(new.id,target)
      on conflict(enrollment_id) do nothing;
  end if;
  return new;
end;
$$;
revoke all on function private.assign_crash_enrollment() from public, anon, authenticated;
create trigger assign_crash_enrollment after insert on public.enrollments
  for each row execute function private.assign_crash_enrollment();

-- Reserve automatic batch names so future scheduled creation cannot collide with manual names.
create function private.reserve_automatic_batch_names()
returns trigger language plpgsql set search_path='' as $$
begin
  if new.name ~ '^Batch [0-9]+$' and substring(new.name from '[0-9]+$')::numeric >= 14
    and (new.course_slug is distinct from 'duolingo-15-days-crash-course' or new.batch_number is null
      or new.name <> 'Batch '||new.batch_number) then
    raise exception 'Numbered batches from Batch 14 are created automatically for the 15-day course';
  end if;
  return new;
end;
$$;
revoke all on function private.reserve_automatic_batch_names() from public, anon, authenticated;
create trigger reserve_automatic_batch_names before insert or update on public.batches
  for each row execute function private.reserve_automatic_batch_names();

select private.sync_crash_batches();
create extension if not exists pg_cron;
select cron.schedule('sync-duomate-crash-batches','* * * * *','select private.sync_crash_batches();');

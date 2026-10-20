-- Run once in the Supabase SQL editor before deploying visit tracking.
create table if not exists public.site_visits (
  id bigint generated always as identity primary key,
  visited_at timestamptz not null default now(),
  visitor_id uuid not null,
  path text not null check (length(path) between 1 and 500 and path like '/%'),
  source text not null check (length(source) between 1 and 100),
  device text not null check (device in ('Mobile', 'Desktop', 'Tablet'))
);
create index if not exists site_visits_date_idx on public.site_visits (visited_at);
alter table public.site_visits enable row level security;
revoke all on public.site_visits from anon, authenticated;
grant insert (visitor_id, path, source, device) on public.site_visits to anon, authenticated;
grant usage on sequence public.site_visits_id_seq to anon, authenticated;
drop policy if exists "Public can record visits" on public.site_visits;
create policy "Public can record visits" on public.site_visits for insert
  to anon, authenticated with check (true);

-- Aggregate in the database: no row limits or public access to visitor identifiers.
create or replace function public.get_visit_stats(days integer default 30)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare result jsonb;
begin
  if lower(coalesce(auth.jwt() ->> 'email', '')) <> 'duomatebd@gmail.com' then
    raise exception 'Admin access required' using errcode = '42501';
  end if;
  if days not in (7, 30, 90) then raise exception 'Invalid date range'; end if;
  with dates as (
    select generate_series(
      (now() at time zone 'Asia/Dhaka')::date - (days - 1),
      (now() at time zone 'Asia/Dhaka')::date, '1 day'::interval)::date as day
  ), visits as (
    select *, (visited_at at time zone 'Asia/Dhaka')::date as day
    from public.site_visits
    where visited_at >= (((now() at time zone 'Asia/Dhaka')::date - (days - 1))::timestamp at time zone 'Asia/Dhaka')
      and visited_at <= now()
  )
  select jsonb_build_object(
    'views', (select count(*) from visits),
    'unique', (select count(distinct visitor_id) from visits),
    'daily', (select jsonb_agg(to_jsonb(d) order by d.day) from (
      select dates.day, count(v.id) as views, count(distinct v.visitor_id) as visitors
      from dates left join visits v using (day) group by dates.day
    ) d),
    'pages', coalesce((select jsonb_agg(to_jsonb(p)) from (
      select path as label, count(*) as views from visits group by path order by views desc, path limit 10
    ) p), '[]'::jsonb),
    'sources', coalesce((select jsonb_agg(to_jsonb(s)) from (
      select source as label, count(*) as views from visits group by source order by views desc, source limit 10
    ) s), '[]'::jsonb),
    'devices', coalesce((select jsonb_agg(to_jsonb(d)) from (
      select device as label, count(*) as views from visits group by device order by views desc, device
    ) d), '[]'::jsonb)
  ) into result;
  return result;
end;
$$;
revoke all on function public.get_visit_stats(integer) from public, anon;
grant execute on function public.get_visit_stats(integer) to authenticated;

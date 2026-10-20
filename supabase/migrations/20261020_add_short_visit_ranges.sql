-- Extend the existing report while preserving its permissions and aggregation.
do $$
declare definition text;
begin
  definition := pg_get_functiondef('public.get_visit_stats(integer)'::regprocedure);
  if position('days not in (1, 3, 7, 30, 90)' in definition) > 0 then
    return;
  end if;
  if position('days not in (7, 30, 90)' in definition) = 0 then
    raise exception 'Unexpected visit report definition; range check was not updated';
  end if;
  execute replace(definition, 'days not in (7, 30, 90)', 'days not in (1, 3, 7, 30, 90)');
end;
$$;

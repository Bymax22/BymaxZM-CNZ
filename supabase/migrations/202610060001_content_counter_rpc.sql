create or replace function public.increment_content_counter(
  p_content_type text,
  p_content_id text,
  p_delta integer
)
returns integer
language sql
security invoker
set search_path = public
as $$
  insert into public.content_like_counts (content_type, content_id, likes)
  values (p_content_type, p_content_id, greatest(0, p_delta))
  on conflict (content_type, content_id)
  do update set likes = greatest(0, content_like_counts.likes + p_delta)
  returning likes;
$$;

grant execute on function public.increment_content_counter(text, text, integer) to anon, authenticated;

do $$
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime') then
    if not exists (
      select 1 from pg_publication_tables
      where pubname = 'supabase_realtime'
        and schemaname = 'public'
        and tablename = 'content_like_counts'
    ) then
      alter publication supabase_realtime add table public.content_like_counts;
    end if;

    if not exists (
      select 1 from pg_publication_tables
      where pubname = 'supabase_realtime'
        and schemaname = 'public'
        and tablename = 'content_comments'
    ) then
      alter publication supabase_realtime add table public.content_comments;
    end if;
  end if;
end;
$$;
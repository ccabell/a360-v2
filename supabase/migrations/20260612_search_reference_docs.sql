-- Phase 3 (retrieval-wiring): FTS over dossier prose for the M6 Research route.
-- FTS-only (no pgvector on Agent Manager). ORs query terms so real questions retrieve.
-- Applied to the agent Supabase (aejskvmpembryunnbgrk).

create or replace function search_reference_docs(q text, lim int default 6)
returns table (
  id uuid, offering_id uuid, title text, content_md text, lens text, doc_type text, rank real
)
language plpgsql
stable
as $$
declare
  word text;
  orq tsquery := NULL;
  stop text[] := array['the','and','for','how','does','what','with','are','can','you','its','was','this','that','from','will','should','would','when'];
begin
  foreach word in array regexp_split_to_array(lower(coalesce(q,'')), '[^a-z0-9]+') loop
    if length(word) >= 3 and not (word = any(stop)) then
      orq := coalesce(orq || plainto_tsquery('english', word), plainto_tsquery('english', word));
    end if;
  end loop;
  if orq is null then return; end if;

  return query
    select d.id, d.offering_id, d.title, d.content_md, d.lens::text, d.doc_type::text,
      ts_rank(to_tsvector('english', coalesce(d.title,'') || ' ' || coalesce(d.content_md,'')), orq) as rank
    from agent_reference_docs d
    where d.status::text in ('draft','active')
      and to_tsvector('english', coalesce(d.title,'') || ' ' || coalesce(d.content_md,'')) @@ orq
    order by rank desc
    limit lim;
end;
$$;

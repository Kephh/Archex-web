create table if not exists public.service_lines (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9-]+$'),
  title text not null check (char_length(title) between 3 and 160),
  summary text not null check (char_length(summary) between 20 and 500),
  body text not null default '',
  display_order integer not null default 0,
  status text not null default 'published' check (status in ('draft', 'published')),
  featured boolean not null default false,
  seo_title text,
  seo_description text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.service_categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9-]+$'),
  name text not null check (char_length(name) between 3 and 160),
  description text not null default '',
  display_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9-]+$'),
  title text not null check (char_length(title) between 3 and 160),
  summary text not null check (char_length(summary) between 20 and 500),
  service_line_id uuid references public.service_lines(id) on delete restrict,
  category_id uuid not null references public.service_categories(id) on delete restrict,
  hero_heading text,
  introduction text not null default '',
  problems jsonb not null default '[]'::jsonb check (jsonb_typeof(problems) = 'array'),
  capabilities jsonb not null default '[]'::jsonb check (jsonb_typeof(capabilities) = 'array'),
  approach text not null default '',
  faqs jsonb not null default '[]'::jsonb check (jsonb_typeof(faqs) = 'array'),
  card_image_url text,
  card_image_alt text,
  cover_image_url text,
  cover_image_alt text,
  seo_title text,
  seo_description text,
  display_order integer not null default 0,
  featured boolean not null default false,
  status text not null default 'published' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.service_relations (
  service_id uuid not null references public.services(id) on delete cascade,
  related_service_id uuid not null references public.services(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (service_id, related_service_id),
  check (service_id <> related_service_id)
);

create table if not exists public.industries (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9-]+$'),
  title text not null check (char_length(title) between 3 and 160),
  summary text not null check (char_length(summary) between 20 and 500),
  body text not null default '',
  context text not null default '',
  common_problems jsonb not null default '[]'::jsonb check (jsonb_typeof(common_problems) = 'array'),
  workflows jsonb not null default '[]'::jsonb check (jsonb_typeof(workflows) = 'array'),
  solution_patterns jsonb not null default '[]'::jsonb check (jsonb_typeof(solution_patterns) = 'array'),
  image_url text,
  image_alt text,
  seo_title text,
  seo_description text,
  display_order integer not null default 0,
  featured boolean not null default false,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.modernization_entries (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9-]+$'),
  title text not null check (char_length(title) between 3 and 160),
  summary text not null check (char_length(summary) between 20 and 500),
  body text not null default '',
  category text,
  tags jsonb not null default '[]'::jsonb check (jsonb_typeof(tags) = 'array'),
  seo_title text,
  seo_description text,
  display_order integer not null default 0,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.industry_services (
  industry_id uuid not null references public.industries(id) on delete cascade,
  service_id uuid not null references public.services(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (industry_id, service_id)
);

create table if not exists public.work_items (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9-]+$'),
  title text not null check (char_length(title) between 3 and 160),
  summary text not null check (char_length(summary) between 20 and 500),
  work_type text not null default 'illustrative' check (work_type in ('illustrative', 'client_case_study')),
  body text not null default '',
  context text not null default '',
  approach text not null default '',
  solution text not null default '',
  outcome text,
  technologies jsonb not null default '[]'::jsonb check (jsonb_typeof(technologies) = 'array'),
  image_url text,
  image_alt text,
  seo_title text,
  seo_description text,
  display_order integer not null default 0,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.work_industries (
  work_item_id uuid not null references public.work_items(id) on delete cascade,
  industry_id uuid not null references public.industries(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (work_item_id, industry_id)
);

create table if not exists public.work_services (
  work_item_id uuid not null references public.work_items(id) on delete cascade,
  service_id uuid not null references public.services(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (work_item_id, service_id)
);

create table if not exists public.insights (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9-]+$'),
  title text not null check (char_length(title) between 3 and 200),
  summary text not null check (char_length(summary) between 20 and 500),
  body text not null default '',
  category text,
  tags jsonb not null default '[]'::jsonb check (jsonb_typeof(tags) = 'array'),
  author_name text,
  author_bio text,
  published_at timestamptz,
  updated_at_content timestamptz,
  status text not null default 'draft' check (status in ('draft', 'published')),
  featured boolean not null default false,
  cover_image_url text,
  cover_image_alt text,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.insight_relations (
  insight_id uuid not null references public.insights(id) on delete cascade,
  related_insight_id uuid not null references public.insights(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (insight_id, related_insight_id),
  check (insight_id <> related_insight_id)
);

create table if not exists public.engagement_models (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9-]+$'),
  title text not null check (char_length(title) between 3 and 160),
  fit_description text not null default '',
  responsibilities jsonb not null default '[]'::jsonb check (jsonb_typeof(responsibilities) = 'array'),
  deliverables jsonb not null default '[]'::jsonb check (jsonb_typeof(deliverables) = 'array'),
  collaboration_pattern text not null default '',
  display_order integer not null default 0,
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.process_stages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9-]+$'),
  title text not null check (char_length(title) between 3 and 160),
  summary text not null default '',
  body text not null default '',
  display_order integer not null default 0,
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.page_content_blocks (
  id uuid primary key default gen_random_uuid(),
  page_key text not null,
  section_key text not null,
  block_type text not null check (block_type in ('hero', 'rich_text', 'featured_selection', 'cta', 'process')),
  content jsonb not null default '{}'::jsonb check (jsonb_typeof(content) = 'object'),
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (page_key, section_key)
);

create or replace function public.is_jsonb_string_array(value jsonb)
returns boolean
language sql
immutable
as $$
  select jsonb_typeof(value) = 'array'
    and not exists (
      select 1 from jsonb_array_elements(value) item
      where jsonb_typeof(item) <> 'string'
    );
$$;

alter table public.services drop constraint if exists services_problems_items_check;
alter table public.services add constraint services_problems_items_check
  check (public.is_jsonb_string_array(problems));
alter table public.services drop constraint if exists services_capabilities_items_check;
alter table public.services add constraint services_capabilities_items_check
  check (public.is_jsonb_string_array(capabilities));
alter table public.services drop constraint if exists services_faqs_items_check;
alter table public.services add constraint services_faqs_items_check
  check (public.is_jsonb_string_array(faqs));
alter table public.industries drop constraint if exists industries_common_problems_items_check;
alter table public.industries add constraint industries_common_problems_items_check
  check (public.is_jsonb_string_array(common_problems));
alter table public.industries drop constraint if exists industries_workflows_items_check;
alter table public.industries add constraint industries_workflows_items_check
  check (public.is_jsonb_string_array(workflows));
alter table public.industries drop constraint if exists industries_solution_patterns_items_check;
alter table public.industries add constraint industries_solution_patterns_items_check
  check (public.is_jsonb_string_array(solution_patterns));
alter table public.modernization_entries drop constraint if exists modernization_tags_items_check;
alter table public.modernization_entries add constraint modernization_tags_items_check
  check (public.is_jsonb_string_array(tags));
alter table public.work_items drop constraint if exists work_technologies_items_check;
alter table public.work_items add constraint work_technologies_items_check
  check (public.is_jsonb_string_array(technologies));
alter table public.insights drop constraint if exists insights_tags_items_check;
alter table public.insights add constraint insights_tags_items_check
  check (public.is_jsonb_string_array(tags));
alter table public.engagement_models drop constraint if exists engagement_responsibilities_items_check;
alter table public.engagement_models add constraint engagement_responsibilities_items_check
  check (public.is_jsonb_string_array(responsibilities));
alter table public.engagement_models drop constraint if exists engagement_deliverables_items_check;
alter table public.engagement_models add constraint engagement_deliverables_items_check
  check (public.is_jsonb_string_array(deliverables));
alter table public.page_content_blocks drop constraint if exists page_content_blocks_home_shape_check;
alter table public.page_content_blocks add constraint page_content_blocks_home_shape_check
  check (
    page_key <> 'home'
    or (
      (section_key = 'hero' and block_type = 'hero' and content ?& array['eyebrow', 'title', 'description'])
      or (section_key in ('services', 'industries', 'work', 'insights')
          and block_type = 'rich_text'
          and content ?& array['eyebrow', 'title', 'description'])
      or (section_key = 'cta' and block_type = 'cta' and content ?& array['title', 'description', 'label'])
    )
  );

do $$
declare
  v_table_name text;
  v_required_column text;
begin
  foreach v_table_name in array array[
    'service_lines', 'service_categories', 'services', 'service_relations',
    'industries', 'modernization_entries', 'industry_services', 'work_items',
    'work_industries', 'work_services', 'insights', 'insight_relations',
    'engagement_models', 'process_stages', 'page_content_blocks'
  ]
  loop
    if to_regclass(format('public.%s', v_table_name)) is null then
      raise exception 'Required content table public.% does not exist after migration', v_table_name;
    end if;
  end loop;

  foreach v_required_column in array array[
    'service_lines.slug', 'service_lines.title', 'service_lines.summary', 'service_lines.status',
    'service_categories.slug', 'service_categories.name', 'service_categories.is_active',
    'services.slug', 'services.title', 'services.summary', 'services.service_line_id',
    'services.category_id', 'services.problems', 'services.capabilities', 'services.status',
    'service_relations.service_id', 'service_relations.related_service_id',
    'industries.slug', 'industries.title', 'industries.summary', 'industries.context',
    'industries.status', 'modernization_entries.slug', 'modernization_entries.title',
    'modernization_entries.summary', 'modernization_entries.tags', 'modernization_entries.status',
    'industry_services.industry_id', 'industry_services.service_id',
    'work_items.slug', 'work_items.title', 'work_items.summary', 'work_items.technologies',
    'work_items.status', 'work_industries.work_item_id', 'work_industries.industry_id',
    'work_services.work_item_id', 'work_services.service_id', 'insights.slug',
    'insights.title', 'insights.summary', 'insights.tags', 'insights.published_at',
    'insights.status', 'insight_relations.insight_id', 'insight_relations.related_insight_id',
    'engagement_models.slug', 'engagement_models.title', 'engagement_models.status',
    'process_stages.slug', 'process_stages.title', 'process_stages.status',
    'page_content_blocks.page_key', 'page_content_blocks.section_key',
    'page_content_blocks.block_type', 'page_content_blocks.content', 'page_content_blocks.status'
  ]
  loop
    if not exists (
      select 1
      from information_schema.columns c
      where c.table_schema = 'public'
        and c.table_name = split_part(v_required_column, '.', 1)
        and c.column_name = split_part(v_required_column, '.', 2)
    ) then
      raise exception 'Required content column public.% does not exist', v_required_column;
    end if;
  end loop;
end;
$$;

create index if not exists service_lines_published_order_idx on public.service_lines (status, display_order);
create index if not exists service_categories_active_order_idx on public.service_categories (is_active, display_order);
create index if not exists services_published_order_idx on public.services (status, display_order);
create index if not exists services_category_idx on public.services (category_id);
create index if not exists services_line_idx on public.services (service_line_id);
create index if not exists industries_published_order_idx on public.industries (status, display_order);
create index if not exists modernization_published_order_idx on public.modernization_entries (status, display_order);
create index if not exists work_items_published_order_idx on public.work_items (status, display_order);
create index if not exists insights_published_date_idx on public.insights (status, published_at desc);
create index if not exists page_blocks_published_idx on public.page_content_blocks (page_key, status);

create or replace function public.set_content_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$
declare
  v_table_name text;
begin
  foreach v_table_name in array array[
    'service_lines', 'service_categories', 'services', 'industries',
    'modernization_entries', 'work_items', 'insights', 'engagement_models', 'process_stages',
    'page_content_blocks'
  ]
  loop
    execute format('drop trigger if exists set_%s_updated_at on public.%I', v_table_name, v_table_name);
    execute format(
      'create trigger set_%s_updated_at before update on public.%I for each row execute function public.set_content_updated_at()',
      v_table_name,
      v_table_name
    );
  end loop;
end;
$$;

alter table public.service_lines enable row level security;
alter table public.service_categories enable row level security;
alter table public.services enable row level security;
alter table public.service_relations enable row level security;
alter table public.industries enable row level security;
alter table public.modernization_entries enable row level security;
alter table public.industry_services enable row level security;
alter table public.work_items enable row level security;
alter table public.work_industries enable row level security;
alter table public.work_services enable row level security;
alter table public.insights enable row level security;
alter table public.insight_relations enable row level security;
alter table public.engagement_models enable row level security;
alter table public.process_stages enable row level security;
alter table public.page_content_blocks enable row level security;

drop policy if exists "Public can read published service lines" on public.service_lines;
create policy "Public can read published service lines" on public.service_lines for select to anon, authenticated using (status = 'published' and (published_at is null or published_at <= now()));
drop policy if exists "Public can read active categories" on public.service_categories;
create policy "Public can read active categories" on public.service_categories for select to anon, authenticated using (is_active);
drop policy if exists "Public can read published services" on public.services;
create policy "Public can read published services" on public.services for select to anon, authenticated using (status = 'published' and (published_at is null or published_at <= now()));
drop policy if exists "Public can read published industries" on public.industries;
create policy "Public can read published industries" on public.industries for select to anon, authenticated using (status = 'published' and (published_at is null or published_at <= now()));
drop policy if exists "Public can read published modernization" on public.modernization_entries;
create policy "Public can read published modernization" on public.modernization_entries for select to anon, authenticated using (status = 'published' and (published_at is null or published_at <= now()));
drop policy if exists "Public can read published work" on public.work_items;
create policy "Public can read published work" on public.work_items for select to anon, authenticated using (status = 'published' and (published_at is null or published_at <= now()));
drop policy if exists "Public can read published insights" on public.insights;
create policy "Public can read published insights" on public.insights for select to anon, authenticated using (status = 'published' and (published_at is null or published_at <= now()));
drop policy if exists "Public can read published engagement models" on public.engagement_models;
create policy "Public can read published engagement models" on public.engagement_models for select to anon, authenticated using (status = 'published');
drop policy if exists "Public can read published process stages" on public.process_stages;
create policy "Public can read published process stages" on public.process_stages for select to anon, authenticated using (status = 'published');
drop policy if exists "Public can read published page blocks" on public.page_content_blocks;
create policy "Public can read published page blocks" on public.page_content_blocks for select to anon, authenticated using (status = 'published' and (published_at is null or published_at <= now()));

drop policy if exists "Public can read service relations" on public.service_relations;
create policy "Public can read service relations" on public.service_relations for select to anon, authenticated using (
  exists (select 1 from public.services s where s.id = service_id and s.status = 'published' and (s.published_at is null or s.published_at <= now()))
  and exists (select 1 from public.services s where s.id = related_service_id and s.status = 'published' and (s.published_at is null or s.published_at <= now()))
);
drop policy if exists "Public can read industry services" on public.industry_services;
create policy "Public can read industry services" on public.industry_services for select to anon, authenticated using (
  exists (select 1 from public.industries i where i.id = industry_id and i.status = 'published' and (i.published_at is null or i.published_at <= now()))
  and exists (select 1 from public.services s where s.id = service_id and s.status = 'published' and (s.published_at is null or s.published_at <= now()))
);
drop policy if exists "Public can read work industries" on public.work_industries;
create policy "Public can read work industries" on public.work_industries for select to anon, authenticated using (
  exists (select 1 from public.work_items w where w.id = work_item_id and w.status = 'published' and (w.published_at is null or w.published_at <= now()))
  and exists (select 1 from public.industries i where i.id = industry_id and i.status = 'published' and (i.published_at is null or i.published_at <= now()))
);
drop policy if exists "Public can read work services" on public.work_services;
create policy "Public can read work services" on public.work_services for select to anon, authenticated using (
  exists (select 1 from public.work_items w where w.id = work_item_id and w.status = 'published' and (w.published_at is null or w.published_at <= now()))
  and exists (select 1 from public.services s where s.id = service_id and s.status = 'published' and (s.published_at is null or s.published_at <= now()))
);
drop policy if exists "Public can read insight relations" on public.insight_relations;
create policy "Public can read insight relations" on public.insight_relations for select to anon, authenticated using (
  exists (select 1 from public.insights i where i.id = insight_id and i.status = 'published' and (i.published_at is null or i.published_at <= now()))
  and exists (select 1 from public.insights i where i.id = related_insight_id and i.status = 'published' and (i.published_at is null or i.published_at <= now()))
);

revoke all privileges on table
  public.service_lines,
  public.service_categories,
  public.services,
  public.service_relations,
  public.industries,
  public.modernization_entries,
  public.industry_services,
  public.work_items,
  public.work_industries,
  public.work_services,
  public.insights,
  public.insight_relations,
  public.engagement_models,
  public.process_stages,
  public.page_content_blocks
from anon, authenticated;

grant select on table
  public.service_lines,
  public.service_categories,
  public.services,
  public.service_relations,
  public.industries,
  public.modernization_entries,
  public.industry_services,
  public.work_items,
  public.work_industries,
  public.work_services,
  public.insights,
  public.insight_relations,
  public.engagement_models,
  public.process_stages,
  public.page_content_blocks
to anon, authenticated;

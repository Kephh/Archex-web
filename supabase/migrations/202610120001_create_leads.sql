create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 120),
  email text not null check (char_length(email) <= 180),
  company text not null check (char_length(company) between 2 and 160),
  project_type text not null check (project_type in ('new-product', 'ai-integration', 'modernization', 'ongoing-engineering', 'not-sure')),
  message text not null check (char_length(message) between 30 and 4000),
  budget_range text,
  desired_start text,
  contact_method text,
  privacy_consent boolean not null default false,
  privacy_consented_at timestamptz,
  status text not null default 'new' check (status in ('new', 'reviewed', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_email_idx on public.leads (email);

alter table public.leads add column if not exists contact_method text;
alter table public.leads add column if not exists privacy_consent boolean not null default false;
alter table public.leads add column if not exists privacy_consented_at timestamptz;

alter table public.leads enable row level security;

drop policy if exists "No public read access to leads" on public.leads;
drop policy if exists "No public insert access to leads" on public.leads;

create policy "Service role can manage leads"
on public.leads
for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_leads_updated_at on public.leads;
create trigger set_leads_updated_at
before update on public.leads
for each row execute function public.set_updated_at();

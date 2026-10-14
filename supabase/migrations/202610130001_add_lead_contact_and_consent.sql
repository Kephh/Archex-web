alter table public.leads add column if not exists contact_method text;
alter table public.leads add column if not exists privacy_consent boolean not null default false;
alter table public.leads add column if not exists privacy_consented_at timestamptz;

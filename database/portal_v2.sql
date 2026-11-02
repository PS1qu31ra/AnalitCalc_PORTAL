-- Atualização NÃO DESTRUTIVA para o Analit Portal (execute no SQL Editor do Neon).
-- Não apaga contas, permissões, analytics ou tabelas do Neon Auth.
-- Requer Neon Auth do tipo Better Auth ativo no mesmo branch do DATABASE_URL.

-- Ao criar do zero, Neon Auth usa IDs text; use text para o identificador nas novas tabelas.
create table if not exists public.user_profiles (
  auth_user_id text primary key references neon_auth."user"(id) on delete cascade,
  full_name text,
  institution text,
  profile_type text not null default 'user'
    check (profile_type in ('user','student','professor','researcher','technician','admin')),
  profile_details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.user_profiles
  add column if not exists profile_details jsonb not null default '{}'::jsonb;

create table if not exists public.apps (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  url text,
  status text not null default 'development'
    check (status in ('active','development','disabled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.user_app_permissions (
  id uuid primary key default gen_random_uuid(),
  auth_user_id text not null references neon_auth."user"(id) on delete cascade,
  app_id uuid not null references public.apps(id) on delete cascade,
  access_role text not null default 'user',
  status text not null default 'active'
    check (status in ('active','blocked','pending')),
  created_at timestamptz not null default now(),
  unique (auth_user_id, app_id)
);

create index if not exists idx_permissions_user on public.user_app_permissions (auth_user_id);

insert into public.apps (slug, name, description, status)
values
 ('analitcalc','AnalitCalc','Cálculos, curvas e simulações de Química Analítica.','active'),
 ('visualizer','Visualizer','Gráficos e visualizações científicas interativas.','development'),
 ('analito','Analito','Assistente científico integrado às ferramentas do Analit.','development'),
 ('marsyn','MARSYN','Espectrometria de massas e identificação analítica.','development')
on conflict (slug) do nothing;

-- Após a publicação do aplicativo, defina a URL real (HTTPS) e o status:
-- update public.apps set url = 'https://SEU-APP.vercel.app', status = 'active'
-- where slug = 'analitcalc';
-- Para dar acesso adicional a um usuário, consulte README.md para o SQL de autorização.

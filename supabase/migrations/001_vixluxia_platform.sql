create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  stripe_customer_id text,
  subscription_status text default 'free',
  subscription_plan text default 'free',
  referral_code text unique,
  referred_by uuid references public.profiles(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.components (
  id text primary key,
  user_id uuid references auth.users(id) on delete set null,
  name text not null,
  tagline text,
  category text,
  prompt text,
  code text,
  preview text,
  tags text[] default '{}',
  status text default 'published',
  premium boolean default false,
  metadata jsonb default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.likes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  component_id text not null,
  created_at timestamptz default now(),
  unique(user_id, component_id)
);

create table if not exists public.component_votes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  component_id text not null,
  value int not null check (value in (-1, 1)),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id, component_id)
);

create table if not exists public.component_comments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  component_id text not null,
  body text not null,
  created_at timestamptz default now()
);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  stripe_customer_id text,
  stripe_subscription_id text unique,
  status text not null,
  plan text not null,
  current_period_end timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.referrals (
  id uuid primary key default gen_random_uuid(),
  referrer_id uuid references auth.users(id) on delete cascade,
  referred_user_id uuid references auth.users(id) on delete set null,
  referral_code text not null,
  status text default 'pending',
  commission_rate numeric default 0.10,
  commission_amount numeric default 0,
  stripe_checkout_session_id text,
  created_at timestamptz default now(),
  converted_at timestamptz
);

create table if not exists public.api_keys (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  name text not null,
  key_hash text not null unique,
  key_prefix text not null,
  scopes text[] default '{}',
  last_used_at timestamptz,
  created_at timestamptz default now(),
  revoked_at timestamptz
);

create table if not exists public.api_usage_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  api_key_id uuid references public.api_keys(id) on delete set null,
  path text not null,
  method text not null,
  status int,
  created_at timestamptz default now()
);

create table if not exists public.ai_generations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  prompt text not null,
  mode text default 'component',
  model text,
  output text,
  usage jsonb,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;
alter table public.components enable row level security;
alter table public.likes enable row level security;
alter table public.component_votes enable row level security;
alter table public.component_comments enable row level security;
alter table public.subscriptions enable row level security;
alter table public.referrals enable row level security;
alter table public.api_keys enable row level security;
alter table public.api_usage_logs enable row level security;
alter table public.ai_generations enable row level security;

create policy "Public components are readable" on public.components for select using (
  status = 'published'
  and (
    premium = false
    or (
      premium = true
      and auth.uid() is not null
      and exists (
        select 1 from public.profiles
        where id = auth.uid() and subscription_status = 'active'
      )
    )
  )
);
create policy "Users can manage own profile" on public.profiles for all using (auth.uid() = id) with check (auth.uid() = id);
create policy "Users can manage own likes" on public.likes for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users can manage own votes" on public.component_votes for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users can manage own comments" on public.component_comments for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users can read own subscriptions" on public.subscriptions for select using (auth.uid() = user_id);
create policy "Users can read own referrals" on public.referrals for select using (auth.uid() = referrer_id or auth.uid() = referred_user_id);
create policy "Users can manage own api keys" on public.api_keys for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users can read own api logs" on public.api_usage_logs for select using (auth.uid() = user_id);
create policy "Users can manage own ai generations" on public.ai_generations for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

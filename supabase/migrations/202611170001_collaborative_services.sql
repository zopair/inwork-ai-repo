-- InWork collaborative services marketplace.
-- Additive migration: preserves existing profiles/jobs/favorites data and tables.

create extension if not exists pgcrypto;

create table if not exists public.service_categories (
  id text primary key,
  name_ar text not null,
  name_en text,
  description text,
  is_active boolean not null default true,
  sort_order integer not null default 100,
  created_at timestamptz not null default now()
);

insert into public.service_categories (id, name_ar, name_en, description, sort_order)
values
  ('home', 'المنزل والصيانة', 'Home & Maintenance', 'خدمات الصيانة والإصلاح والتجهيز', 10),
  ('cleaning', 'النظافة والعناية', 'Cleaning & Care', 'خدمات النظافة والعناية', 20),
  ('digital', 'الخدمات الرقمية', 'Digital Services', 'التصميم والتقنية والمحتوى والخدمات الرقمية', 30),
  ('education', 'التعليم والتدريب', 'Education & Training', 'التعليم والتدريب ونقل المعرفة', 40),
  ('business', 'الأعمال والمشروعات', 'Business Services', 'الدعم المهني والتشغيلي وخدمات المشروعات', 50),
  ('events', 'المناسبات والفعاليات', 'Events', 'تنظيم وتجهيز المناسبات والفعاليات', 60),
  ('personal', 'الخدمات الشخصية', 'Personal Services', 'خدمات شخصية متنوعة وفق سياسات المنصة', 70)
on conflict (id) do nothing;

create table if not exists public.provider_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null check (char_length(trim(display_name)) between 2 and 100),
  bio text,
  location_label text,
  remote_available boolean not null default false,
  is_listed boolean not null default false,
  is_verified boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.provider_services (
  id uuid primary key default gen_random_uuid(),
  provider_id uuid not null references public.provider_profiles(user_id) on delete cascade,
  category_id text not null references public.service_categories(id),
  title text not null check (char_length(trim(title)) between 3 and 140),
  description text,
  pricing_model text not null default 'quote'
    check (pricing_model in ('fixed', 'hourly', 'quote')),
  starting_price numeric(12,2) check (starting_price is null or starting_price >= 0),
  currency text not null default 'EGP' check (currency ~ '^[A-Z]{3}$'),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.service_requests (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references auth.users(id) on delete cascade,
  category_id text not null references public.service_categories(id),
  title text not null check (char_length(trim(title)) between 3 and 160),
  description text not null check (char_length(trim(description)) between 10 and 5000),
  location_label text,
  remote_allowed boolean not null default false,
  budget_amount numeric(12,2) check (budget_amount is null or budget_amount >= 0),
  currency text not null default 'EGP' check (currency ~ '^[A-Z]{3}$'),
  status text not null default 'open'
    check (status in ('open', 'assigned', 'in_progress', 'completed', 'cancelled')),
  selected_provider_id uuid references public.provider_profiles(user_id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.service_offers (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.service_requests(id) on delete cascade,
  provider_id uuid not null references public.provider_profiles(user_id) on delete cascade,
  amount numeric(12,2) not null check (amount >= 0),
  currency text not null default 'EGP' check (currency ~ '^[A-Z]{3}$'),
  scope text not null check (char_length(trim(scope)) between 5 and 3000),
  estimated_duration text,
  message text,
  status text not null default 'pending'
    check (status in ('pending', 'accepted', 'declined', 'withdrawn')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (request_id, provider_id)
);

create table if not exists public.service_reviews (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null unique references public.service_requests(id) on delete cascade,
  customer_id uuid not null references auth.users(id) on delete cascade,
  provider_id uuid not null references public.provider_profiles(user_id) on delete cascade,
  rating smallint not null check (rating between 1 and 5),
  review_text text check (review_text is null or char_length(review_text) <= 2000),
  created_at timestamptz not null default now()
);

create index if not exists provider_services_category_active_idx
  on public.provider_services (category_id, is_active);
create index if not exists provider_services_provider_idx
  on public.provider_services (provider_id);
create index if not exists service_requests_customer_created_idx
  on public.service_requests (customer_id, created_at desc);
create index if not exists service_requests_category_status_idx
  on public.service_requests (category_id, status, created_at desc);
create index if not exists service_offers_request_status_idx
  on public.service_offers (request_id, status, created_at);
create index if not exists service_offers_provider_created_idx
  on public.service_offers (provider_id, created_at desc);
create index if not exists service_reviews_provider_created_idx
  on public.service_reviews (provider_id, created_at desc);

alter table public.service_categories enable row level security;
alter table public.provider_profiles enable row level security;
alter table public.provider_services enable row level security;
alter table public.service_requests enable row level security;
alter table public.service_offers enable row level security;
alter table public.service_reviews enable row level security;

drop policy if exists "active service categories are readable" on public.service_categories;
create policy "active service categories are readable"
  on public.service_categories for select to anon, authenticated
  using (is_active = true);

drop policy if exists "listed provider profiles are public" on public.provider_profiles;
create policy "listed provider profiles are public"
  on public.provider_profiles for select to anon, authenticated
  using (is_listed = true);

drop policy if exists "providers read their own profile" on public.provider_profiles;
create policy "providers read their own profile"
  on public.provider_profiles for select to authenticated
  using (user_id = auth.uid());

drop policy if exists "providers create their own profile" on public.provider_profiles;
create policy "providers create their own profile"
  on public.provider_profiles for insert to authenticated
  with check (user_id = auth.uid());

drop policy if exists "providers update their own profile" on public.provider_profiles;
create policy "providers update their own profile"
  on public.provider_profiles for update to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- Verification is controlled by trusted server-side administration, never by the provider.
create or replace function public.prevent_provider_self_verification()
returns trigger
language plpgsql
as $
begin
  if auth.role() = 'authenticated' and new.is_verified is distinct from old.is_verified then
    raise exception 'Provider verification can only be changed by platform administration';
  end if;
  return new;
end;
$;

drop trigger if exists provider_verification_guard on public.provider_profiles;
create trigger provider_verification_guard
before update on public.provider_profiles
for each row execute function public.prevent_provider_self_verification();

drop policy if exists "active services are publicly readable" on public.provider_services;
create policy "active services are publicly readable"
  on public.provider_services for select to anon, authenticated
  using (
    is_active = true
    and exists (
      select 1 from public.provider_profiles p
      where p.user_id = provider_id and p.is_listed = true
    )
  );

drop policy if exists "providers manage their own services" on public.provider_services;
create policy "providers manage their own services"
  on public.provider_services for all to authenticated
  using (
    exists (
      select 1 from public.provider_profiles p
      where p.user_id = provider_id and p.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.provider_profiles p
      where p.user_id = provider_id and p.user_id = auth.uid()
    )
  );

drop policy if exists "customers read their own requests" on public.service_requests;
create policy "customers read their own requests"
  on public.service_requests for select to authenticated
  using (customer_id = auth.uid());

drop policy if exists "providers read matching open requests" on public.service_requests;
create policy "providers read matching open requests"
  on public.service_requests for select to authenticated
  using (
    status = 'open'
    and exists (
      select 1 from public.provider_services s
      where s.provider_id = auth.uid()
        and s.category_id = service_requests.category_id
        and s.is_active = true
        and exists (
          select 1 from public.provider_profiles p
          where p.user_id = s.provider_id and p.is_listed = true
        )
    )
  );

drop policy if exists "customers create their own requests" on public.service_requests;
create policy "customers create their own requests"
  on public.service_requests for insert to authenticated
  with check (customer_id = auth.uid());

drop policy if exists "request participants read offers" on public.service_offers;
create policy "request participants read offers"
  on public.service_offers for select to authenticated
  using (
    provider_id = auth.uid()
    or exists (
      select 1 from public.service_requests r
      where r.id = request_id and r.customer_id = auth.uid()
    )
  );

drop policy if exists "eligible providers create offers" on public.service_offers;
create policy "eligible providers create offers"
  on public.service_offers for insert to authenticated
  with check (
    provider_id = auth.uid()
    and exists (
      select 1
      from public.service_requests r
      join public.provider_services s
        on s.provider_id = auth.uid()
       and s.category_id = r.category_id
       and s.is_active = true
      join public.provider_profiles p
        on p.user_id = auth.uid()
       and p.is_listed = true
      where r.id = request_id
        and r.status = 'open'
    )
  );

drop policy if exists "completed service reviews are public" on public.service_reviews;
create policy "completed service reviews are public"
  on public.service_reviews for select to anon, authenticated
  using (true);

drop policy if exists "customers review their completed services" on public.service_reviews;
create policy "customers review their completed services"
  on public.service_reviews for insert to authenticated
  with check (
    customer_id = auth.uid()
    and exists (
      select 1 from public.service_requests r
      where r.id = request_id
        and r.customer_id = auth.uid()
        and r.selected_provider_id = provider_id
        and r.status = 'completed'
    )
  );

-- React Supabase Auth Starter - Database Schema
-- Execute this in your NEW Supabase project SQL Editor

-- ============================================
-- 1. CREATE PROFILES TABLE
-- ============================================
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  first_name text,
  last_name text,
  email text,
  avatar_url text,
  bio text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ============================================
-- 2. ENABLE ROW LEVEL SECURITY
-- ============================================
alter table public.profiles enable row level security;

-- ============================================
-- 3. CREATE RLS POLICIES
-- ============================================

-- Allow users to view their own profile
create policy "Users can view own profile"
  on public.profiles
  for select
  using (auth.uid() = id);

-- Allow users to update their own profile
create policy "Users can update own profile"
  on public.profiles
  for update
  using (auth.uid() = id);

-- Allow users to insert their own profile
create policy "Users can insert own profile"
  on public.profiles
  for insert
  with check (auth.uid() = id);

-- ============================================
-- 4. CREATE FUNCTION TO AUTO-CREATE PROFILE
-- ============================================
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, first_name, last_name)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name'
  );
  return new;
end;
$$ language plpgsql security definer;

-- ============================================
-- 5. CREATE TRIGGER ON AUTH.USERS
-- ============================================
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================
-- 6. CREATE UPDATED_AT TRIGGER
-- ============================================
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

create trigger on_profile_updated
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();

-- ============================================
-- DONE! Your database is ready.
-- ============================================

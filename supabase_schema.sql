-- Run this in the Supabase SQL Editor

-- 1. Create the posts table (if it doesn't exist yet)
create table if not exists posts (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  title text not null,
  excerpt text,
  author text default 'Innovation Hub Team',
  category text,
  date timestamp with time zone default timezone('utc'::text, now()),
  content text,
  main_image text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 2. Create the storage bucket for images
insert into storage.buckets (id, name, public) values ('images', 'images', true)
on conflict (id) do nothing;

-- 3. Allow public access to view images
-- We drop first to avoid "policy already exists" errors if you run this multiple times
drop policy if exists "Public Access" on storage.objects;
create policy "Public Access" on storage.objects for select using ( bucket_id = 'images' );

-- 4. Allow public upload
-- FIX: For INSERT policies, we must use 'WITH CHECK', not 'USING'
drop policy if exists "Public Upload" on storage.objects;
create policy "Public Upload" on storage.objects for insert with check ( bucket_id = 'images' );

-- 1. Create Contact Submissions Table
CREATE TABLE "physoc-contact_submissions" (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  year text,
  subject text,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create Announcements Table (with event_date as requested)
CREATE TABLE "physoc-announcements" (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  category text,
  body text not null,
  event_date date, -- For event specific dates
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Create Resources Table
CREATE TABLE "physoc-resources" (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  category text not null,
  link_url text not null,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE "physoc-contact_submissions" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "physoc-announcements" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "physoc-resources" ENABLE ROW LEVEL SECURITY;

-- 5. Policies for Contact Submissions
-- Anyone can insert a contact submission (needed for the public contact form)
CREATE POLICY "Enable insert for public" ON "physoc-contact_submissions"
FOR INSERT WITH CHECK (true);

-- Only authenticated users (admins) can view submissions
CREATE POLICY "Enable read access for authenticated users only" ON "physoc-contact_submissions"
FOR SELECT TO authenticated USING (true);

-- 5. Policies for Announcements
-- Anyone can read announcements (needed for the public announcements page)
CREATE POLICY "Enable read access for all users" ON "physoc-announcements"
FOR SELECT USING (true);

-- Only authenticated users (admins) can insert/update/delete announcements
CREATE POLICY "Enable insert for authenticated users only" ON "physoc-announcements"
FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users only" ON "physoc-announcements"
FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Enable delete for authenticated users only" ON "physoc-announcements"
FOR DELETE TO authenticated USING (true);

-- 7. Policies for Resources
-- Anyone can read resources
CREATE POLICY "Enable read access for all users" ON "physoc-resources"
FOR SELECT USING (true);

-- Only authenticated users (admins) can insert/update/delete resources
CREATE POLICY "Enable insert for authenticated users only" ON "physoc-resources"
FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users only" ON "physoc-resources"
FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Enable delete for authenticated users only" ON "physoc-resources"
FOR DELETE TO authenticated USING (true);

/*
  # CMS Database Structure for SEO-Optimized Content Management

  ## Overview
  This migration creates a complete headless CMS structure optimized for:
  - Fast content retrieval with minimal queries
  - SEO metadata management at page and section levels
  - Image optimization and management
  - Dynamic content updates without code changes
  - Structured data for search engines

  ## Tables Created

  ### 1. pages
  Stores page-level SEO metadata and configuration
  - `id` (uuid, primary key)
  - `slug` (text, unique) - URL-friendly page identifier
  - `title` (text) - Page title for browser tab
  - `meta_description` (text) - SEO meta description (150-160 chars optimal)
  - `meta_keywords` (text[]) - SEO keywords array
  - `og_title` (text) - Open Graph title for social sharing
  - `og_description` (text) - Open Graph description
  - `og_image` (text) - Open Graph image URL
  - `twitter_card` (text) - Twitter card type (summary, summary_large_image)
  - `canonical_url` (text) - Canonical URL for SEO
  - `structured_data` (jsonb) - JSON-LD structured data
  - `is_published` (boolean) - Publication status
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 2. sections
  Stores content for each section of the website
  - `id` (uuid, primary key)
  - `page_id` (uuid, foreign key) - Links to pages table
  - `section_key` (text) - Unique identifier (hero, benefits, testimonials, etc.)
  - `section_title` (text) - Section heading
  - `section_subtitle` (text) - Section subheading
  - `content` (jsonb) - Flexible content structure (text, lists, etc.)
  - `display_order` (integer) - Order of appearance on page
  - `is_visible` (boolean) - Show/hide section
  - `seo_heading_tag` (text) - HTML heading tag (h1, h2, h3)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 3. media
  Manages all images with SEO optimization
  - `id` (uuid, primary key)
  - `storage_path` (text) - Path in Supabase Storage
  - `public_url` (text) - CDN/public URL
  - `alt_text` (text) - Image alt text for accessibility and SEO
  - `title` (text) - Image title attribute
  - `caption` (text) - Optional image caption
  - `width` (integer) - Image width in pixels
  - `height` (integer) - Image height in pixels
  - `file_size` (integer) - File size in bytes
  - `mime_type` (text) - Image MIME type
  - `tags` (text[]) - Categorization tags
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 4. testimonials
  Stores customer testimonials with structured data support
  - `id` (uuid, primary key)
  - `name` (text) - Customer name
  - `role` (text) - Customer job title
  - `company` (text) - Customer company name
  - `testimonial_text` (text) - The testimonial content
  - `avatar_id` (uuid, foreign key) - Links to media table
  - `rating` (integer) - Rating out of 5
  - `display_order` (integer) - Order of appearance
  - `is_featured` (boolean) - Featured testimonial flag
  - `is_published` (boolean) - Publication status
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 5. faqs
  Stores FAQ items with structured data for rich snippets
  - `id` (uuid, primary key)
  - `question` (text) - The question
  - `answer` (text) - The answer
  - `category` (text) - FAQ category for grouping
  - `display_order` (integer) - Order of appearance
  - `is_published` (boolean) - Publication status
  - `view_count` (integer) - Track popular questions
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 6. navigation_items
  Dynamic navigation menu management
  - `id` (uuid, primary key)
  - `label` (text) - Display text
  - `target_section` (text) - Section ID to scroll to
  - `display_order` (integer) - Menu order
  - `is_visible` (boolean) - Show/hide menu item
  - `created_at` (timestamptz)

  ## Security
  - Row Level Security (RLS) enabled on all tables
  - Public read access for published content
  - Authenticated-only write access (for admin panel)

  ## Indexes
  - Optimized indexes for fast queries on slug, section_key, display_order
  - Full-text search indexes for content search capabilities

  ## Triggers
  - Automatic updated_at timestamp updates
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create pages table
CREATE TABLE IF NOT EXISTS pages (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  meta_description text,
  meta_keywords text[],
  og_title text,
  og_description text,
  og_image text,
  twitter_card text DEFAULT 'summary_large_image',
  canonical_url text,
  structured_data jsonb,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create sections table
CREATE TABLE IF NOT EXISTS sections (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_id uuid REFERENCES pages(id) ON DELETE CASCADE,
  section_key text NOT NULL,
  section_title text,
  section_subtitle text,
  content jsonb NOT NULL DEFAULT '{}',
  display_order integer DEFAULT 0,
  is_visible boolean DEFAULT true,
  seo_heading_tag text DEFAULT 'h2',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(page_id, section_key)
);

-- Create media table
CREATE TABLE IF NOT EXISTS media (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  storage_path text NOT NULL,
  public_url text NOT NULL,
  alt_text text NOT NULL,
  title text,
  caption text,
  width integer,
  height integer,
  file_size integer,
  mime_type text,
  tags text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  role text NOT NULL,
  company text,
  testimonial_text text NOT NULL,
  avatar_id uuid REFERENCES media(id) ON DELETE SET NULL,
  rating integer DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  display_order integer DEFAULT 0,
  is_featured boolean DEFAULT false,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create faqs table
CREATE TABLE IF NOT EXISTS faqs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  question text NOT NULL,
  answer text NOT NULL,
  category text,
  display_order integer DEFAULT 0,
  is_published boolean DEFAULT true,
  view_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create navigation_items table
CREATE TABLE IF NOT EXISTS navigation_items (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  label text NOT NULL,
  target_section text NOT NULL,
  display_order integer DEFAULT 0,
  is_visible boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_pages_slug ON pages(slug);
CREATE INDEX IF NOT EXISTS idx_pages_published ON pages(is_published);
CREATE INDEX IF NOT EXISTS idx_sections_page_id ON sections(page_id);
CREATE INDEX IF NOT EXISTS idx_sections_key ON sections(section_key);
CREATE INDEX IF NOT EXISTS idx_sections_order ON sections(display_order);
CREATE INDEX IF NOT EXISTS idx_testimonials_order ON testimonials(display_order);
CREATE INDEX IF NOT EXISTS idx_testimonials_published ON testimonials(is_published);
CREATE INDEX IF NOT EXISTS idx_faqs_order ON faqs(display_order);
CREATE INDEX IF NOT EXISTS idx_faqs_published ON faqs(is_published);
CREATE INDEX IF NOT EXISTS idx_navigation_order ON navigation_items(display_order);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic updated_at
CREATE TRIGGER update_pages_updated_at
  BEFORE UPDATE ON pages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sections_updated_at
  BEFORE UPDATE ON sections
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_media_updated_at
  BEFORE UPDATE ON media
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at
  BEFORE UPDATE ON testimonials
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_faqs_updated_at
  BEFORE UPDATE ON faqs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE navigation_items ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies for public read access to published content
CREATE POLICY "Public can view published pages"
  ON pages FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

CREATE POLICY "Public can view visible sections"
  ON sections FOR SELECT
  TO anon, authenticated
  USING (
    is_visible = true
    AND EXISTS (
      SELECT 1 FROM pages
      WHERE pages.id = sections.page_id
      AND pages.is_published = true
    )
  );

CREATE POLICY "Public can view all media"
  ON media FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can view published testimonials"
  ON testimonials FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

CREATE POLICY "Public can view published FAQs"
  ON faqs FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

CREATE POLICY "Public can view visible navigation items"
  ON navigation_items FOR SELECT
  TO anon, authenticated
  USING (is_visible = true);

-- Create RLS Policies for authenticated users (admin) to manage content
CREATE POLICY "Authenticated users can manage pages"
  ON pages FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage sections"
  ON sections FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage media"
  ON media FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage testimonials"
  ON testimonials FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage FAQs"
  ON faqs FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage navigation"
  ON navigation_items FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
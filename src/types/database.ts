export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Locale = 'en' | 'fr' | 'zh';

export interface Database {
  public: {
    Tables: {
      pages: {
        Row: {
          id: string
          slug: string
          locale: Locale
          title: string
          meta_description: string | null
          meta_keywords: string[] | null
          og_title: string | null
          og_description: string | null
          og_image: string | null
          twitter_card: string | null
          canonical_url: string | null
          structured_data: Json | null
          is_published: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          slug: string
          locale?: Locale
          title: string
          meta_description?: string | null
          meta_keywords?: string[] | null
          og_title?: string | null
          og_description?: string | null
          og_image?: string | null
          twitter_card?: string | null
          canonical_url?: string | null
          structured_data?: Json | null
          is_published?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          slug?: string
          locale?: Locale
          title?: string
          meta_description?: string | null
          meta_keywords?: string[] | null
          og_title?: string | null
          og_description?: string | null
          og_image?: string | null
          twitter_card?: string | null
          canonical_url?: string | null
          structured_data?: Json | null
          is_published?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      sections: {
        Row: {
          id: string
          page_id: string | null
          section_key: string
          locale: Locale
          section_title: string | null
          section_subtitle: string | null
          content: Json
          display_order: number | null
          is_visible: boolean | null
          seo_heading_tag: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          page_id?: string | null
          section_key: string
          locale?: Locale
          section_title?: string | null
          section_subtitle?: string | null
          content?: Json
          display_order?: number | null
          is_visible?: boolean | null
          seo_heading_tag?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          page_id?: string | null
          section_key?: string
          locale?: Locale
          section_title?: string | null
          section_subtitle?: string | null
          content?: Json
          display_order?: number | null
          is_visible?: boolean | null
          seo_heading_tag?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      testimonials: {
        Row: {
          id: string
          locale: Locale
          name: string
          role: string
          company: string | null
          testimonial_text: string
          avatar_url: string | null
          rating: number | null
          display_order: number | null
          is_featured: boolean | null
          is_published: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          locale?: Locale
          name: string
          role: string
          company?: string | null
          testimonial_text: string
          avatar_url?: string | null
          rating?: number | null
          display_order?: number | null
          is_featured?: boolean | null
          is_published?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          locale?: Locale
          name?: string
          role?: string
          company?: string | null
          testimonial_text?: string
          avatar_url?: string | null
          rating?: number | null
          display_order?: number | null
          is_featured?: boolean | null
          is_published?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      faqs: {
        Row: {
          id: string
          locale: Locale
          question: string
          answer: string
          category: string | null
          display_order: number | null
          is_published: boolean | null
          view_count: number | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          locale?: Locale
          question: string
          answer: string
          category?: string | null
          display_order?: number | null
          is_published?: boolean | null
          view_count?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          locale?: Locale
          question?: string
          answer?: string
          category?: string | null
          display_order?: number | null
          is_published?: boolean | null
          view_count?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      navigation_items: {
        Row: {
          id: string
          locale: Locale
          label: string
          target_section: string
          display_order: number | null
          is_visible: boolean | null
          created_at: string | null
        }
        Insert: {
          id?: string
          locale?: Locale
          label: string
          target_section: string
          display_order?: number | null
          is_visible?: boolean | null
          created_at?: string | null
        }
        Update: {
          id?: string
          locale?: Locale
          label?: string
          target_section?: string
          display_order?: number | null
          is_visible?: boolean | null
          created_at?: string | null
        }
      }
    }
  }
}

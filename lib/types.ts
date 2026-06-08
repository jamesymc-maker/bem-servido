export type Tier = "standard" | "featured" | "premium";
export type ProviderStatus = "pending" | "published" | "rejected" | "suspended";

export interface Category {
  slug: string;
  label: string;
  icon: string; // key into ICONS map
  sort: number;
}

export interface Provider {
  id?: string;
  slug: string;
  name: string;
  category_slug: string;
  category_label: string;
  category_icon: string;
  location_slug: string | null;
  tier: Tier;
  verified: boolean;
  photo_url: string;
  languages: string[];
  service_area: string;
  short_desc: string;
  long_desc: string;
  half_day_rate: number;
  full_day_rate: number | null;
  hourly_rate: number | null;
  phone: string;
  whatsapp: string;
  intro_video_url: string | null;
  gallery: string[];
}

export type ReviewStatus = "pending" | "approved" | "rejected";
export interface Review {
  id: string;
  provider_id: string;
  author_name: string;
  rating: number;     // 1-5
  comment: string;
  created_at: string;
}
export interface ReviewSummary { avg: number; count: number; }

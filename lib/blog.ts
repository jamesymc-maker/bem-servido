import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import { createClient } from "@supabase/supabase-js";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const hasSupabase = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

// Cookieless anon client for PUBLIC blog reads. Blog content is public (RLS
// only exposes published rows), so it does not need the request session. Using
// a cookie-bound client here calls next/headers `cookies()`, which forces these
// pages into dynamic rendering and — combined with the old silent `catch {}` —
// swallowed Next.js's internal render-control signals, surfacing as
// "A server error occurred". A plain anon client keeps reads static-friendly
// and lets us see real Supabase errors.
function publicSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } },
  );
}

export interface Post {
  id?: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  cover: string;
  category?: string;
  tags: string[];
  lang: string;
  minutes: number;
  html: string;
  published?: boolean;
  location_slug?: string | null;
}

function mdToPost(slug: string, raw: string): Post | null {
  try {
    const { data, content } = matter(raw);
    const words = content.trim().split(/\s+/).length;
    return {
      slug,
      title: data.title ?? slug,
      description: data.description ?? "",
      date: data.date ? String(data.date).slice(0, 10) : "",
      author: data.author ?? "Daquii",
      cover: data.cover ?? "",
      category: data.category,
      tags: data.tags ?? [],
      lang: data.lang ?? "pt",
      minutes: Math.max(1, Math.round(words / 200)),
      html: marked.parse(content) as string,
      published: true,
    };
  } catch { return null; }
}

function dbRowToPost(row: any): Post {
  const words = (row.content || "").trim().split(/\s+/).length;
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description ?? "",
    date: row.date ? String(row.date).slice(0, 10) : "",
    author: row.author ?? "Daquii",
    cover: row.cover_url ?? "",
    category: row.category_slug ?? undefined,
    tags: row.tags ?? [],
    lang: row.lang ?? "pt",
    minutes: Math.max(1, Math.round(words / 200)),
    html: marked.parse(row.content || "") as string,
    published: row.published ?? false,
    location_slug: row.location_slug ?? null,
  };
}

async function getDbPosts(publishedOnly = true, locationSlug?: string): Promise<Post[]> {
  if (!hasSupabase) return [];
  // Published reads use the public anon client (RLS-filtered). Admin reads of
  // unpublished drafts need the service-role client to bypass RLS.
  let supabase = publicSupabase();
  if (!publishedOnly) {
    const { createAdminSupabase } = await import("./supabase/admin");
    supabase = createAdminSupabase();
  }
  let q = supabase.from("blog_posts").select("*").order("date", { ascending: false });
  if (publishedOnly) q = q.eq("published", true);
  // Posts with a null location_slug are global and show on every location.
  if (locationSlug) q = q.or(`location_slug.is.null,location_slug.eq.${locationSlug}`);
  const { data, error } = await q;
  if (error) {
    console.error("[blog] getDbPosts query failed:", error.message);
    return [];
  }
  return (data ?? []).map(dbRowToPost);
}

function getFilePosts(): Post[] {
  try {
    return fs.readdirSync(BLOG_DIR)
      .filter((f) => f.endsWith(".md"))
      .map((f) => mdToPost(f.replace(/\.md$/, ""), fs.readFileSync(path.join(BLOG_DIR, f), "utf8")))
      .filter((p): p is Post => !!p)
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  } catch { return []; }
}

export async function getAllPosts(locationSlug?: string): Promise<Post[]> {
  // File-based posts carry no location, so they show on every location.
  return hasSupabase ? await getDbPosts(true, locationSlug) : getFilePosts();
}

export async function getAllPostsAdmin(): Promise<Post[]> {
  return hasSupabase ? await getDbPosts(false) : getFilePosts();
}

export async function getPost(slug: string): Promise<Post | null> {
  if (hasSupabase) {
    const supabase = publicSupabase();
    // maybeSingle() returns null (not an error) when no row matches, so a
    // missing/unpublished post is a clean 404 rather than a thrown error.
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();
    if (error) {
      console.error(`[blog] getPost("${slug}") query failed:`, error.message);
    }
    // When Supabase is configured it is the source of truth: a missing row
    // means the post does not exist, so we do not fall back to bundled files.
    return data ? dbRowToPost(data) : null;
  }
  try {
    const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.md`), "utf8");
    return mdToPost(slug, raw);
  } catch { return null; }
}

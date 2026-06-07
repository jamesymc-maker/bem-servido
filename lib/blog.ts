import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const hasSupabase = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);

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
      author: data.author ?? "Bem Servido",
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
    author: row.author ?? "Bem Servido",
    cover: row.cover_url ?? "",
    category: row.category_slug ?? undefined,
    tags: row.tags ?? [],
    lang: row.lang ?? "pt",
    minutes: Math.max(1, Math.round(words / 200)),
    html: marked.parse(row.content || "") as string,
    published: row.published ?? false,
  };
}

async function getDbPosts(publishedOnly = true): Promise<Post[]> {
  if (!hasSupabase) return [];
  try {
    const { createServerSupabase } = await import("./supabase/server");
    const supabase = await createServerSupabase();
    let q = supabase.from("blog_posts").select("*").order("date", { ascending: false });
    if (publishedOnly) q = q.eq("published", true);
    const { data } = await q;
    return (data ?? []).map(dbRowToPost);
  } catch { return []; }
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

export async function getAllPosts(lang?: string): Promise<Post[]> {
  const posts = hasSupabase ? await getDbPosts(true) : getFilePosts();
  return lang ? posts.filter((p) => p.lang === lang) : posts;
}

export async function getAllPostsAdmin(): Promise<Post[]> {
  return hasSupabase ? await getDbPosts(false) : getFilePosts();
}

export async function getPost(slug: string): Promise<Post | null> {
  if (hasSupabase) {
    try {
      const { createServerSupabase } = await import("./supabase/server");
      const supabase = await createServerSupabase();
      const { data } = await supabase.from("blog_posts").select("*").eq("slug", slug).single();
      if (data) return dbRowToPost(data);
    } catch {}
  }
  try {
    const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.md`), "utf8");
    return mdToPost(slug, raw);
  } catch { return null; }
}

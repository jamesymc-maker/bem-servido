import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createAdminSupabase } from "@/lib/supabase/admin";
import { BlogForm } from "@/components/admin/blog-form";

export default async function EditBlogPost({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createAdminSupabase();
  const { data: post } = await supabase.from("blog_posts").select("*").eq("id", id).single();
  if (!post) notFound();
  return (
    <div className="max-w-4xl">
      <Link href="/admin/blog" className="inline-flex items-center gap-1.5 text-sm font-medium mb-5" style={{ color: "var(--muted)" }}>
        <ArrowLeft size={16} /> Blog
      </Link>
      <h1 className="font-heading text-2xl mb-6" style={{ fontWeight: 600 }}>Editar post</h1>
      <BlogForm post={post} />
    </div>
  );
}

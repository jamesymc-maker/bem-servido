import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BlogForm } from "@/components/admin/blog-form";
export default function NovoBlogPost() {
  return (
    <div className="max-w-4xl">
      <Link href="/admin/blog" className="inline-flex items-center gap-1.5 text-sm font-medium mb-5" style={{ color: "var(--ink-soft)" }}>
        <ArrowLeft size={16} /> Blog
      </Link>
      <h1 className="serif text-2xl mb-6" style={{ fontWeight: 600 }}>Novo post</h1>
      <BlogForm />
    </div>
  );
}

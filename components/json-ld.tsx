// Server-renderable structured data. Drop anywhere in a page/layout.
export function JsonLd({ data }: { data: Record<string, any> }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

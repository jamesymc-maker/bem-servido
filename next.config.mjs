/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "randomuser.me" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "*.supabase.co" },
      { protocol: "https", hostname: "*.r2.cloudflarestorage.com" },
    ],
  },
  async redirects() {
    // Public pages now live under /[location]. Old unprefixed URLs redirect to
    // the default location so existing links and bookmarks keep working.
    const DEFAULT_LOCATION = "ilhabela";
    return [
      {
        source: "/anunciante/painel/pagamentos",
        destination: "/anunciante/painel/plano",
        permanent: true,
      },
      { source: "/", destination: `/${DEFAULT_LOCATION}`, permanent: false },
      { source: "/servicos", destination: `/${DEFAULT_LOCATION}/servicos`, permanent: true },
      { source: "/servicos/:slug", destination: `/${DEFAULT_LOCATION}/servicos/:slug`, permanent: true },
      { source: "/profissional/:slug", destination: `/${DEFAULT_LOCATION}/profissional/:slug`, permanent: true },
      { source: "/blog", destination: `/${DEFAULT_LOCATION}/blog`, permanent: true },
      { source: "/blog/:slug", destination: `/${DEFAULT_LOCATION}/blog/:slug`, permanent: true },
      { source: "/sobre", destination: `/${DEFAULT_LOCATION}/sobre`, permanent: true },
      { source: "/precos", destination: `/${DEFAULT_LOCATION}/precos`, permanent: true },
      { source: "/anunciar", destination: `/${DEFAULT_LOCATION}/anunciar`, permanent: true },
    ];
  },
};
export default nextConfig;

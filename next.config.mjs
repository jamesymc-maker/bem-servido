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
    return [
      {
        source: "/anunciante/painel/pagamentos",
        destination: "/anunciante/painel/plano",
        permanent: true,
      },
    ];
  },
};
export default nextConfig;

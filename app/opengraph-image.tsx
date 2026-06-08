import { ImageResponse } from "next/og";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export const alt = "Bem Servido · Serviços locais de confiança em Ilhabela";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "linear-gradient(135deg, #fbf7ef 0%, #f7f1e7 52%, #e2643f 100%)",
          color: "#221c16",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          padding: 80,
          width: "100%",
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,.78)",
            border: "2px solid rgba(14,91,78,.14)",
            borderRadius: 48,
            display: "flex",
            flexDirection: "column",
            gap: 28,
            padding: "64px 72px",
            width: "100%",
          }}
        >
          <div style={{ color: "#0e5b4e", fontSize: 34, fontWeight: 700, letterSpacing: "-0.02em" }}>
            {SITE_NAME}
          </div>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: "-0.05em", lineHeight: 1.04 }}>
            Serviços locais de confiança em Ilhabela
          </div>
          <div style={{ color: "#5c5247", fontSize: 32, lineHeight: 1.35, maxWidth: 860 }}>
            {SITE_DESCRIPTION}
          </div>
        </div>
      </div>
    ),
    size,
  );
}

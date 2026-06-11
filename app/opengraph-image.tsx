import { ImageResponse } from "next/og";
import { ACTIVE_LOCATION_NAME } from "@/lib/locations";

export const runtime = "edge";
export const alt = `Daquii · Serviços locais de confiança em ${ACTIVE_LOCATION_NAME}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #0A4339 0%, #0E5B4E 60%, #1C7A69 100%)",
          color: "#F7F1E7",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30, letterSpacing: 1 }}>
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 9999,
              background: "#E2643F",
            }}
          />
          <span style={{ fontWeight: 600 }}>DAQUII</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, maxWidth: 980 }}>
            Serviços locais de confiança em {ACTIVE_LOCATION_NAME}
          </div>
          <div style={{ fontSize: 34, color: "#EFE5D4", maxWidth: 900 }}>
            Chefs, motoristas, babás, capitães de barco e mais. Gente de verdade, com rosto e nome.
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 28, color: "#F0A589" }}>
          daquii.com
        </div>
      </div>
    ),
    { ...size },
  );
}

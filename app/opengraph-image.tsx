import { ImageResponse } from "next/og";
import { ACTIVE_LOCATION_NAME } from "@/lib/locations";

export const runtime = "edge";
export const alt = `Serviços locais de confiança em ${ACTIVE_LOCATION_NAME} · daquii`;
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
          background: "linear-gradient(135deg, #0B1D3A 0%, #0B1D3A 55%, #00C2BB 100%)",
          color: "#FFFFFF",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 36, letterSpacing: -2 }}>
          <span style={{ fontWeight: 800 }}>daquii</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.05, maxWidth: 980 }}>
            Pessoas de daqui, para você.
          </div>
          <div style={{ fontSize: 32, color: "#FFF7ED", maxWidth: 900 }}>
            Profissionais locais de confiança em {ACTIVE_LOCATION_NAME}. Gente de verdade, com rosto e nome.
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 28, color: "#FFB62B" }}>
          daquii.com
        </div>
      </div>
    ),
    { ...size },
  );
}

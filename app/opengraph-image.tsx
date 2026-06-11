import { ImageResponse } from "next/og";
import { ACTIVE_LOCATION_NAME } from "@/lib/locations";

export const runtime = "edge";
export const alt = `Serviços locais de confiança em ${ACTIVE_LOCATION_NAME} · Daquii`;
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
          background: "#FFF7ED",
          color: "#0B1D3A",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 36, letterSpacing: -2 }}>
          <span style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 700, fontSize: 36, color: "#0B1D3A", letterSpacing: "-0.02em" }}>Daquii</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.05, maxWidth: 980, color: "#0B1D3A" }}>
            As pessoas que tornam {ACTIVE_LOCATION_NAME}{" "}
            <span style={{ color: "#00C2BB" }}>mais fácil.</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}

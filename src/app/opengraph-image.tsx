import { ImageResponse } from "next/og";

export const alt = "Courtpath — certified e-filing for Utah courts";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0a0a0a",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 40, color: "#d4a441", fontWeight: 700 }}>Courtpath</div>
        <div style={{ fontSize: 76, fontWeight: 700, marginTop: 24, lineHeight: 1.1 }}>
          Utah court e-filing, made simple.
        </div>
        <div style={{ fontSize: 32, marginTop: 32, color: "rgba(255,255,255,0.7)" }}>
          Certified by the Utah State Courts for district and justice court filing.
        </div>
      </div>
    ),
    size
  );
}

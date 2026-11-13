import { ImageResponse } from "next/og";
import { CA_RATE } from "@/lib/plans";

// The California page's share card (the site-wide one is about Utah).
export const alt = "Courtpath: unlimited California e-filing for $175 per attorney a month";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function CaliforniaOpengraphImage() {
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
          background: "#0f2840",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 40, color: "#d4a441", fontWeight: 700 }}>Courtpath</div>
        <div style={{ fontSize: 72, fontWeight: 700, marginTop: 24, lineHeight: 1.1 }}>
          {`Unlimited California e-filing, $${CA_RATE} per attorney a month.`}
        </div>
        <div style={{ fontSize: 32, marginTop: 32, color: "rgba(255,255,255,0.75)" }}>
          No Courtpath fee per filing. Court, Tyler and card fees at cost.
        </div>
      </div>
    ),
    size
  );
}

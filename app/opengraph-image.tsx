import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Anay Technical Services — Flooring & Fit-Out · UAE";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A0A0A",
          color: "#F7F5F0",
          padding: 80,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#8A8680",
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          <div style={{ width: 44, height: 2, background: "#C8A96A" }} />
          <span>Flooring &middot; Fit-Out &middot; UAE</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              fontSize: 176,
              lineHeight: 1,
              letterSpacing: -6,
              fontWeight: 700,
            }}
          >
            <span>anay</span>
            <span style={{ color: "#C8A96A" }}>.</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 38,
              color: "#EFEBE1",
              letterSpacing: -1,
              marginTop: 28,
              maxWidth: 820,
            }}
          >
            <span>Surfaces built with precision.</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            color: "#8A8680",
            fontSize: 20,
          }}
        >
          <span>anayservices.com</span>
          <span style={{ color: "#C8A96A", fontWeight: 700 }}>+</span>
        </div>
      </div>
    ),
    { ...size },
  );
}

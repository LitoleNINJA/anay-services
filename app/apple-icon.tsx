import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0A0A0A",
          color: "#F7F5F0",
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontSize: 130,
          fontWeight: 500,
          letterSpacing: -8,
          lineHeight: 1,
          paddingBottom: 18,
        }}
      >
        <span>a</span>
        <span style={{ color: "#C8A96A", marginLeft: 2 }}>.</span>
      </div>
    ),
    { ...size },
  );
}

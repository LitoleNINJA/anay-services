import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          color: "#C8A96A",
          fontSize: 22,
          fontWeight: 700,
          fontFamily: "system-ui, sans-serif",
          letterSpacing: -1,
        }}
      >
        A
      </div>
    ),
    { ...size },
  );
}

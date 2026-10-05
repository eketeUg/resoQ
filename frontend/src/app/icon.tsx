import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 14,
          background: "linear-gradient(135deg, #00d2ff 0%, #3b82f6 50%, #6366f1 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          borderRadius: 8,
          fontWeight: 900,
          letterSpacing: "-0.5px",
          fontFamily: "sans-serif",
          boxShadow: "0 0 10px rgba(0, 210, 255, 0.5)",
        }}
      >
        rQ
      </div>
    ),
    {
      ...size,
    }
  );
}

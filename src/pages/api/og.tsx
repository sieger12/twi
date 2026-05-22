import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

const SITE_NAME = "TwitDownloader";
const SITE_HOST = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://twi-delta.vercel.app"
)
  .replace(/^https?:\/\//, "")
  .replace(/\/$/, "");

export default function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = (searchParams.get("title") ?? "X Video Downloader").slice(
      0,
      120
    );
    const subtitle = (
      searchParams.get("subtitle") ??
      "Download Twitter (X) video, GIF, image, MP3"
    ).slice(0, 160);

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "#0a0a0b",
            backgroundImage:
              "radial-gradient(circle at 18% 20%, rgba(212,255,58,0.18) 0%, transparent 45%), radial-gradient(circle at 92% 92%, rgba(212,255,58,0.10) 0%, transparent 55%)",
            padding: "72px",
            color: "#e8e6e2",
            fontFamily: "Geist",
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", gap: "16px" }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#d4ff3a",
                borderRadius: "10px",
                color: "#0a0a0b",
                fontSize: 28,
                fontWeight: 700,
                fontFamily: "serif",
              }}
            >
              X
            </div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 600,
                letterSpacing: "-0.02em",
              }}
            >
              {SITE_NAME}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div
              style={{
                fontSize: 78,
                fontWeight: 500,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                color: "#fafaf7",
                maxWidth: "92%",
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: 30,
                lineHeight: 1.35,
                color: "#8d8a82",
                maxWidth: "80%",
              }}
            >
              {subtitle}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: 22,
              color: "#5a5751",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
              }}
            >
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 9999,
                  backgroundColor: "#d4ff3a",
                }}
              />
              <span style={{ letterSpacing: "0.18em", textTransform: "uppercase", fontSize: 18 }}>
                Free · No sign-up · HD
              </span>
            </div>
            <div style={{ fontWeight: 500, color: "#8d8a82" }}>
              {SITE_HOST}
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        headers: {
          "cache-control":
            "public, immutable, no-transform, s-maxage=31536000, max-age=31536000",
        },
      }
    );
  } catch (e) {
    return new Response("OG generation failed", { status: 500 });
  }
}

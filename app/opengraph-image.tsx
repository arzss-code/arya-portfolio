import { ImageResponse } from "next/og";

import { METADATA, SITE_URL } from "@/common/constants/metadata";

export const alt = `${METADATA.creator} — ${METADATA.role}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const HIGHLIGHT_STACKS = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Laravel",
  "Figma",
];

export default function OpenGraphImage() {
  const domainHost = SITE_URL.replace(/^https?:\/\//i, "");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#090d16",
          color: "#f8fafc",
          padding: "64px 72px",
          fontFamily: "sans-serif",
          border: "1px solid rgba(148, 163, 184, 0.16)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "10px 20px",
              borderRadius: "999px",
              backgroundColor: "rgba(59, 130, 246, 0.12)",
              border: "1px solid rgba(59, 130, 246, 0.35)",
              color: "#93c5fd",
              fontSize: "20px",
              fontWeight: 600,
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "999px",
                backgroundColor: "#3b82f6",
              }}
            />
            <span>Available for Freelance & Collaboration</span>
          </div>

          <div
            style={{
              display: "flex",
              color: "#94a3b8",
              fontSize: "22px",
              fontWeight: 500,
            }}
          >
            {domainHost}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "72px",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.08,
              color: "#ffffff",
            }}
          >
            {METADATA.creator}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: "34px",
              fontWeight: 600,
              color: "#60a5fa",
              letterSpacing: "-0.01em",
            }}
          >
            {METADATA.role}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: "24px",
              lineHeight: 1.45,
              color: "#cbd5e1",
              maxWidth: "940px",
            }}
          >
            Crafting accessible, high-performance web applications and thoughtful digital interfaces from Semarang, Indonesia.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingTop: "28px",
            borderTop: "1px solid rgba(148, 163, 184, 0.16)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            {HIGHLIGHT_STACKS.map((stack) => (
              <div
                key={stack}
                style={{
                  display: "flex",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  backgroundColor: "rgba(30, 41, 59, 0.8)",
                  border: "1px solid rgba(148, 163, 184, 0.2)",
                  color: "#e2e8f0",
                  fontSize: "18px",
                  fontWeight: 500,
                }}
              >
                {stack}
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              color: "#94a3b8",
              fontSize: "20px",
            }}
          >
            Semarang, ID
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}

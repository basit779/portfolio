import { ImageResponse } from "next/og";

// Generated on-demand on the edge (the canonical Vercel OG setup), so it isn't
// prerendered at build time.
export const runtime = "edge";

export const alt = "Abdul Basit — Aspiring DevOps Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TAGS = ["Docker", "Linux", "CI/CD", "Kubernetes", "Next.js", "AWS"];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundColor: "#07070A",
          color: "#F4F4F6",
          backgroundImage:
            "radial-gradient(700px circle at 12% 18%, rgba(62,207,142,0.28), transparent 60%), radial-gradient(700px circle at 88% 26%, rgba(139,92,246,0.24), transparent 60%), radial-gradient(600px circle at 60% 110%, rgba(34,211,238,0.20), transparent 60%)",
        }}
      >
        {/* top row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", fontSize: 28 }}>
            <span style={{ color: "#3ECF8E" }}>~/</span>
            <span style={{ marginLeft: 8, color: "#A2A2AF" }}>abdul-basit</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px 20px",
              borderRadius: 999,
              border: "1px solid rgba(62,207,142,0.35)",
              backgroundColor: "rgba(62,207,142,0.10)",
              fontSize: 24,
              color: "#3ECF8E",
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 999,
                backgroundColor: "#3ECF8E",
                marginRight: 12,
              }}
            />
            open to internships
          </div>
        </div>

        {/* name + role */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 124,
              fontWeight: 800,
              letterSpacing: -4,
              lineHeight: 1,
              backgroundImage: "linear-gradient(100deg, #F4F4F6, #3ECF8E, #22D3EE, #8B5CF6)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Abdul Basit
          </div>
          <div style={{ display: "flex", marginTop: 20, fontSize: 40, color: "#A2A2AF" }}>
            Aspiring{" "}
            <span style={{ color: "#3ECF8E", marginLeft: 12, marginRight: 12 }}>
              DevOps Engineer
            </span>{" "}
            · IT Student
          </div>
        </div>

        {/* tags */}
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {TAGS.map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                marginRight: 14,
                marginTop: 14,
                padding: "8px 18px",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.12)",
                backgroundColor: "rgba(255,255,255,0.03)",
                fontSize: 26,
                color: "#A2A2AF",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}

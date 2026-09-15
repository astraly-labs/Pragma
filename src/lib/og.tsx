import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const ogSize = { width: 1200, height: 630 };

export async function generateOGImage(
  title: string,
  subtitle: string,
  label = "STARKNET + MIDEN"
) {
  const [logo, sans, mono] = await Promise.all([
    readFile(path.join(process.cwd(), "public/brand/pragma-wordmark.png")),
    readFile(path.join(process.cwd(), "public/fonts/IBMPlexSans-Light.ttf")),
    readFile(path.join(process.cwd(), "public/fonts/IBMPlexMono-Regular.ttf")),
  ]);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#111416",
        color: "#f2f0e9",
        fontFamily: "IBM Plex Sans",
        fontWeight: 300,
        padding: "48px 64px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <svg
        width="520"
        height="520"
        viewBox="0 0 520 520"
        style={{ position: "absolute", right: -230, top: 120, opacity: 0.5 }}
      >
        <circle
          cx="260"
          cy="260"
          r="248"
          fill="none"
          stroke="#ff7946"
          strokeWidth="2"
        />
        {[70, 140, 205].map((radius) => (
          <ellipse
            key={radius}
            cx="260"
            cy="260"
            rx={radius}
            ry="248"
            fill="none"
            stroke="#ff7946"
            strokeWidth="1"
          />
        ))}
        {[70, 140, 205].map((radius) => (
          <ellipse
            key={radius}
            cx="260"
            cy="260"
            rx="248"
            ry={radius}
            fill="none"
            stroke="#ff7946"
            strokeWidth="1"
          />
        ))}
      </svg>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <img
          src={`data:image/png;base64,${logo.toString("base64")}`}
          alt="Pragma"
          width={240}
          height={53}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontFamily: "IBM Plex Mono",
            fontSize: 17,
            letterSpacing: 1,
            textTransform: "uppercase",
          }}
        >
          <div style={{ width: 10, height: 10, background: "#ff7946" }} />
          {label}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flex: 1,
          gap: 22,
          maxWidth: 860,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: title.length > 50 ? 58 : 76,
            lineHeight: 1.08,
            letterSpacing: -2,
            whiteSpace: "pre-wrap",
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 27,
            lineHeight: 1.4,
            color: "#aaaead",
            maxWidth: 760,
          }}
        >
          {subtitle}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid #ffffff24",
          paddingTop: 24,
          fontFamily: "IBM Plex Mono",
          fontSize: 15,
          letterSpacing: 1,
        }}
      >
        <span>OPEN DATA. ONCHAIN COMPUTATION.</span>
        <span style={{ color: "#ff7946" }}>PRAGMA.BUILD</span>
      </div>
    </div>,
    {
      ...ogSize,
      fonts: [
        { name: "IBM Plex Sans", data: sans, weight: 300, style: "normal" },
        { name: "IBM Plex Mono", data: mono, weight: 400, style: "normal" },
      ],
    }
  );
}

import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

export async function generateOGImage(title: string, subtitle: string) {
  const logoUrl = new URL("/pragma-logo.png", "https://www.pragma.build");
  const logoData = await fetch(logoUrl).then((res) => res.arrayBuffer());
  const logoBase64 = `data:image/png;base64,${Buffer.from(logoData).toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#042420",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-120px",
          left: "-100px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(21,255,129,0.08) 0%, transparent 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-150px",
          right: "-80px",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,71,56,0.3) 0%, transparent 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(21,255,129,0.06) 0%, transparent 60%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          opacity: 0.04,
          backgroundImage:
            "linear-gradient(rgba(181,240,229,1) 1px, transparent 1px), linear-gradient(90deg, rgba(181,240,229,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: "24px",
          border: "1px solid rgba(181,240,229,0.1)",
          borderRadius: "24px",
          display: "flex",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "28px",
          position: "relative",
        }}
      >
        <img
          src={logoBase64}
          alt="Pragma"
          width={300}
          height={67}
          style={{ objectFit: "contain" }}
        />

        <div
          style={{
            width: "60px",
            height: "2px",
            background:
              "linear-gradient(90deg, transparent, #15FF81, transparent)",
            display: "flex",
          }}
        />

        <div
          style={{
            fontSize: "36px",
            fontWeight: 300,
            color: "#B5F0E5",
            letterSpacing: "-0.5px",
            display: "flex",
            textAlign: "center",
          }}
        >
          {title}
        </div>

        <div
          style={{
            fontSize: "18px",
            color: "rgba(181,240,229,0.45)",
            letterSpacing: "0.5px",
            display: "flex",
            textAlign: "center",
            maxWidth: "700px",
          }}
        >
          {subtitle}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "40px",
          display: "flex",
          fontSize: "14px",
          color: "rgba(181,240,229,0.3)",
          letterSpacing: "2px",
          textTransform: "uppercase",
        }}
      >
        pragma.build
      </div>
    </div>,
    { ...ogSize }
  );
}

import { ImageResponse } from "next/og";

export const alt = "Edge Visuals, montaggio video per creator e personal brand";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(135deg, #050505 0%, #100808 58%, #050505 100%)",
          color: "#f1efe9",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 560,
            height: 560,
            right: -80,
            top: -80,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,64,56,.38), rgba(255,64,56,0) 68%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 28,
            border: "1px solid rgba(241,239,233,.18)",
            display: "flex",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "70px 78px", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 22, letterSpacing: 8 }}>
            <span style={{ color: "#ff4038", fontSize: 24, fontWeight: 800, letterSpacing: 0 }}>EV</span>
            EDGE VISUALS
          </div>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 920 }}>
            <span style={{ fontSize: 86, fontWeight: 800, letterSpacing: -5, lineHeight: .92 }}>HAI QUALCOSA DA DIRE.</span>
            <span style={{ marginTop: 18, color: "#ff4038", fontFamily: "Georgia, serif", fontSize: 84, fontStyle: "italic", letterSpacing: -4, lineHeight: .9 }}>Facciamolo emergere.</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", color: "#aaa7a0", fontSize: 18, letterSpacing: 3 }}>
            <span>REEL · TIKTOK · YOUTUBE SHORTS</span>
            <span>EDGEVISUALS.STUDIO</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}

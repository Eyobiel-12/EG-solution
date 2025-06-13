import { ImageResponse } from "next/og"

// Route segment config
export const runtime = "edge"

// Image metadata
export const alt = "EG Web Solutions"
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

// Image generation
export default async function Image() {
  // Instead of fetching from Google Fonts directly, we'll use system fonts
  // This avoids the webpack error with https URLs

  return new ImageResponse(
    // ImageResponse JSX element
    <div
      style={{
        fontSize: 128,
        background: "linear-gradient(to bottom, #f0f5ff, #e0ebff)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#4169ff",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", marginBottom: 40 }}>
        <svg
          width="200"
          height="200"
          viewBox="0 0 512 512"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginRight: 40 }}
        >
          {/* Background */}
          <rect width="512" height="512" rx="128" fill="#4169ff" />

          {/* Compass points */}
          <polygon points="256,64 320,256 256,448 192,256" fill="#ffffff" opacity="0.3" />

          {/* Circle */}
          <circle cx="256" cy="256" r="160" stroke="#ffffff" strokeWidth="16" fill="none" />

          {/* Stylized E */}
          <path d="M180 160H280V200H220V236H270V276H220V312H280V352H180V160Z" fill="#ffffff" />

          {/* Stylized G */}
          <path
            d="M300 160C300 160 360 200 360 256C360 312 300 352 300 352L320 312H280V256H320"
            stroke="#ffffff"
            strokeWidth="24"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <div style={{ fontSize: 80, fontWeight: "bold" }}>EG Web Solutions</div>
          <div style={{ fontSize: 40, color: "#4169ff", marginTop: 10 }}>Premium Digital Experiences</div>
        </div>
      </div>
    </div>,
    // ImageResponse options
    {
      // For convenience, we can re-use the exported size metadata
      // config to also set the ImageResponse's width and height.
      ...size,
    },
  )
}

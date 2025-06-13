import { ImageResponse } from "next/og"

// Route segment config
export const runtime = "edge"

// Image metadata
export const size = {
  width: 192,
  height: 192,
}
export const contentType = "image/png"

// Image generation
export default function Icon() {
  return new ImageResponse(
    // ImageResponse JSX element
    <div
      style={{
        fontSize: 24,
        background: "#1a1a1a",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "40px",
        color: "white",
      }}
    >
      <svg width="140" height="140" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Background */}
        <rect width="512" height="512" rx="128" fill="#1a1a1a" />

        {/* Compass points */}
        <polygon points="256,64 320,256 256,448 192,256" fill="#ffffff" opacity="0.3" />

        {/* Circle */}
        <circle cx="256" cy="256" r="160" stroke="#ffffff" strokeWidth="16" fill="none" />

        {/* Stylized E */}
        <path d="M180 160H280V200H220V236H270V276H220V312H280V352H180V160Z" fill="#d4af37" />

        {/* Stylized G */}
        <path
          d="M300 160C300 160 360 200 360 256C360 312 300 352 300 352L320 312H280V256H320"
          stroke="#d4af37"
          strokeWidth="24"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>,
    // ImageResponse options
    {
      // For convenience, we can re-use the exported size metadata
      // config to also set the ImageResponse's width and height.
      ...size,
    },
  )
}

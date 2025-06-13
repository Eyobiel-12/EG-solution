interface FaviconGeneratorProps {
  backgroundColor?: string
  primaryColor?: string
  secondaryColor?: string
}

export default function FaviconGenerator({
  backgroundColor = "#1a1a1a",
  primaryColor = "#d4af37", // Gold color
  secondaryColor = "#ffffff", // Silver/white color
}: FaviconGeneratorProps) {
  return (
    <svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background */}
      <rect width="512" height="512" rx="128" fill={backgroundColor} />

      {/* Compass points */}
      <polygon points="256,64 320,256 256,448 192,256" fill={secondaryColor} opacity="0.3" />

      {/* Circle */}
      <circle cx="256" cy="256" r="160" stroke={secondaryColor} strokeWidth="16" fill="none" />

      {/* Stylized E */}
      <path d="M180 160H280V200H220V236H270V276H220V312H280V352H180V160Z" fill={primaryColor} />

      {/* Stylized G */}
      <path
        d="M300 160C300 160 360 200 360 256C360 312 300 352 300 352L320 312H280V256H320"
        stroke={primaryColor}
        strokeWidth="24"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

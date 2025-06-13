import Image from "next/image"

interface EGLogoProps {
  className?: string
  variant?: "default" | "light" | "dark"
  showText?: boolean
  size?: "sm" | "md" | "lg" | "xl"
}

export default function EGLogo({ className = "", variant = "default", showText = true, size = "md" }: EGLogoProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
    xl: "h-24 w-24",
  }

  const logoSrc = "/logoo.PNG"

  return (
    <div className={`flex items-center ${className}`}>
      <div className={`relative ${sizeClasses[size]} overflow-hidden rounded-full`}>
        <Image
          src={logoSrc || "/placeholder.svg"}
          alt="EG Web Solutions Logo"
          width={200}
          height={200}
          className="object-cover"
        />
      </div>
      {showText && (
        <div
          className={`ml-3 ${variant === "light" ? "text-white" : "text-gray-900"} ${size === "sm" ? "text-sm" : size === "lg" ? "text-xl" : size === "xl" ? "text-2xl" : "text-base"}`}
        ></div>
      )}
    </div>
  )
}

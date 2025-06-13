"use client"

import { Blocks, Database, FileJson, Flame, Code2, LayoutGrid, Smartphone, Palette } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TechIconProps {
  name: string
  className?: string
  size?: "sm" | "md" | "lg"
  animateOnHover?: boolean
  animateOnLoad?: boolean
}

export default function TechIcon({
  name,
  className,
  size = "md",
  animateOnHover = true,
  animateOnLoad = false,
}: TechIconProps) {
  const normalizedName = name.toLowerCase()

  // Size classes for the icon container
  const sizeClasses = {
    sm: "w-6 h-6 p-1",
    md: "w-8 h-8 p-1.5",
    lg: "w-10 h-10 p-2",
  }

  // Size classes for the icon itself
  const iconSizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  }

  // Map technology names to their respective icons, colors, and animation types
  const getTechDetails = (
    tech: string,
  ): {
    icon: JSX.Element
    bgColor: string
    textColor: string
    animationType: "pulse" | "rotate" | "scale" | "bounce" | "wiggle"
  } => {
    switch (tech) {
      case "react native":
        return {
          icon: <Smartphone className={iconSizeClasses[size]} />,
          bgColor: "bg-blue-100",
          textColor: "text-blue-600",
          animationType: "pulse",
        }
      case "next.js":
        return {
          icon: <Blocks className={iconSizeClasses[size]} />,
          bgColor: "bg-black/10",
          textColor: "text-black dark:text-white",
          animationType: "scale",
        }
      case "javascript":
        return {
          icon: <FileJson className={iconSizeClasses[size]} />,
          bgColor: "bg-yellow-100",
          textColor: "text-yellow-700",
          animationType: "wiggle",
        }
      case "css":
        return {
          icon: <Palette className={iconSizeClasses[size]} />,
          bgColor: "bg-blue-100",
          textColor: "text-blue-700",
          animationType: "rotate",
        }
      case "bootstrap":
        return {
          icon: <LayoutGrid className={iconSizeClasses[size]} />,
          bgColor: "bg-purple-100",
          textColor: "text-purple-700",
          animationType: "bounce",
        }
      case "mongodb":
        return {
          icon: <Database className={iconSizeClasses[size]} />,
          bgColor: "bg-green-100",
          textColor: "text-green-700",
          animationType: "pulse",
        }
      case "sqlite":
        return {
          icon: <Database className={iconSizeClasses[size]} />,
          bgColor: "bg-blue-100",
          textColor: "text-blue-700",
          animationType: "bounce",
        }
      case "supabase":
        return {
          icon: <Database className={iconSizeClasses[size]} />,
          bgColor: "bg-emerald-100",
          textColor: "text-emerald-700",
          animationType: "scale",
        }
      case "firebase":
        return {
          icon: <Flame className={iconSizeClasses[size]} />,
          bgColor: "bg-amber-100",
          textColor: "text-amber-700",
          animationType: "wiggle",
        }
      default:
        return {
          icon: <Code2 className={iconSizeClasses[size]} />,
          bgColor: "bg-gray-100",
          textColor: "text-gray-700",
          animationType: "pulse",
        }
    }
  }

  const { icon, bgColor, textColor, animationType } = getTechDetails(normalizedName)

  // Animation variants based on type
  const getAnimationVariants = (type: "pulse" | "rotate" | "scale" | "bounce" | "wiggle") => {
    switch (type) {
      case "pulse":
        return {
          initial: { scale: 1 },
          animate: animateOnLoad
            ? {
                scale: [1, 1.05, 1],
                transition: {
                  duration: 1.5,
                  repeat: 1,
                  repeatType: "reverse" as const,
                },
              }
            : {},
          hover: animateOnHover
            ? {
                scale: [1, 1.1, 1],
                transition: {
                  duration: 0.6,
                },
              }
            : {},
        }
      case "rotate":
        return {
          initial: { rotate: 0 },
          animate: animateOnLoad
            ? {
                rotate: [0, 10, 0],
                transition: {
                  duration: 1,
                  repeat: 1,
                  repeatType: "reverse" as const,
                },
              }
            : {},
          hover: animateOnHover
            ? {
                rotate: [0, -10, 10, -5, 0],
                transition: {
                  duration: 0.6,
                },
              }
            : {},
        }
      case "scale":
        return {
          initial: { scale: 1 },
          animate: animateOnLoad
            ? {
                scale: [1, 1.15, 1],
                transition: {
                  duration: 0.8,
                  repeat: 1,
                  repeatType: "reverse" as const,
                },
              }
            : {},
          hover: animateOnHover
            ? {
                scale: 1.2,
                transition: {
                  duration: 0.2,
                },
              }
            : {},
        }
      case "bounce":
        return {
          initial: { y: 0 },
          animate: animateOnLoad
            ? {
                y: [0, -3, 0],
                transition: {
                  duration: 0.6,
                  repeat: 1,
                  repeatType: "reverse" as const,
                },
              }
            : {},
          hover: animateOnHover
            ? {
                y: [0, -4, 0],
                transition: {
                  duration: 0.4,
                },
              }
            : {},
        }
      case "wiggle":
        return {
          initial: { x: 0 },
          animate: animateOnLoad
            ? {
                x: [0, 2, -2, 0],
                transition: {
                  duration: 0.5,
                  repeat: 1,
                  repeatType: "reverse" as const,
                },
              }
            : {},
          hover: animateOnHover
            ? {
                x: [0, 3, -3, 3, 0],
                transition: {
                  duration: 0.5,
                },
              }
            : {},
        }
      default:
        return {
          initial: {},
          animate: {},
          hover: {},
        }
    }
  }

  const animationVariants = getAnimationVariants(animationType)

  return (
    <motion.div
      className={cn("rounded-full flex items-center justify-center", sizeClasses[size], bgColor, textColor, className)}
      title={name}
      initial="initial"
      animate="animate"
      whileHover="hover"
      variants={animationVariants}
    >
      {icon}
    </motion.div>
  )
}

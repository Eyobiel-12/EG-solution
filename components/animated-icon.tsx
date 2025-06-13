"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface AnimatedIconProps {
  children: ReactNode
  type?: "pulse" | "rotate" | "bounce" | "wiggle" | "scale"
  hoverEffect?: boolean
  className?: string
}

export default function AnimatedIcon({
  children,
  type = "pulse",
  hoverEffect = true,
  className = "",
}: AnimatedIconProps) {
  // Base animation variants
  const baseVariants = {
    initial: {},
    animate: {},
    hover: {},
  }

  // Animation variants based on type
  const animationVariants = {
    pulse: {
      initial: { scale: 1 },
      animate: {
        scale: [1, 1.05, 1],
        transition: {
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse" as const,
        },
      },
      hover: {
        scale: 1.15,
        transition: { duration: 0.2 },
      },
    },
    rotate: {
      initial: { rotate: 0 },
      animate: {
        rotate: [0, 10, 0, -10, 0],
        transition: {
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        },
      },
      hover: {
        rotate: 15,
        transition: { duration: 0.2 },
      },
    },
    bounce: {
      initial: { y: 0 },
      animate: {
        y: [0, -5, 0],
        transition: {
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse" as const,
        },
      },
      hover: {
        y: -8,
        transition: { duration: 0.2 },
      },
    },
    wiggle: {
      initial: { x: 0 },
      animate: {
        x: [0, 3, 0, -3, 0],
        transition: {
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "mirror" as const,
        },
      },
      hover: {
        x: [0, -5, 5, -5, 0],
        transition: { duration: 0.4 },
      },
    },
    scale: {
      initial: { scale: 1 },
      animate: {
        scale: 1,
      },
      hover: {
        scale: 1.2,
        transition: { duration: 0.2 },
      },
    },
  }

  // Combine base variants with specific animation variants
  const variants = {
    ...baseVariants,
    ...animationVariants[type],
  }

  return (
    <motion.div
      className={className}
      initial="initial"
      animate="animate"
      whileHover={hoverEffect ? "hover" : undefined}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import EGLogo from "@/components/eg-logo"

export default function SplashScreen() {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    // Check if this is a PWA launch
    const isPWA = window.matchMedia("(display-mode: standalone)").matches

    // Only show splash screen for PWA or first visit
    if (!isPWA && sessionStorage.getItem("hasVisited")) {
      setShowSplash(false)
      return
    }

    // Set visited flag
    sessionStorage.setItem("hasVisited", "true")

    // Hide splash screen after animation
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-blue-500 to-blue-600"
        >
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <EGLogo variant="light" size="xl" showText={false} />
            </motion.div>
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-2xl font-bold text-white"
            >
              EG Web Solutions
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-gray-100 mt-2"
            >
              Dream It, We Build It
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

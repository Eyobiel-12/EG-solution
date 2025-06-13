"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Download, X } from "lucide-react"
import EGLogo from "@/components/eg-logo"

export default function PWAInstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Check if the app is already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true)
      return
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault()
      // Stash the event so it can be triggered later
      setDeferredPrompt(e)
      // Show the install prompt after a delay
      setTimeout(() => {
        setShowPrompt(true)
      }, 5000) // Show after 5 seconds
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    // Listen for app installed event
    window.addEventListener("appinstalled", () => {
      setIsInstalled(true)
      setShowPrompt(false)
    })

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      window.removeEventListener("appinstalled", () => {})
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    // Show the install prompt
    deferredPrompt.prompt()

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice

    // We no longer need the prompt
    setDeferredPrompt(null)

    // Hide the install button
    setShowPrompt(false)

    // Log the outcome
    console.log(`User ${outcome === "accepted" ? "accepted" : "dismissed"} the install prompt`)
  }

  if (!showPrompt || isInstalled) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:bottom-4 md:w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 z-50 border border-gray-200 dark:border-gray-700">
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3">
          <EGLogo size="sm" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-900 dark:text-gray-100">Install EG Web Solutions</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            Install our app for a better experience and offline access
          </p>
          <div className="mt-3 flex space-x-2">
            <Button size="sm" onClick={handleInstallClick} className="flex-1 bg-blue-500 hover:bg-blue-600">
              <Download className="h-4 w-4 mr-1" />
              Install
            </Button>
            <Button size="sm" variant="outline" onClick={() => setShowPrompt(false)}>
              Not now
            </Button>
          </div>
        </div>
        <button onClick={() => setShowPrompt(false)} className="flex-shrink-0 ml-1 text-gray-400 hover:text-gray-500">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

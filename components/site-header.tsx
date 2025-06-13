"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown, Code, Palette, ShoppingCart, Search, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import EGLogo from "@/components/eg-logo"
import LanguageSelector from "@/components/language-selector"
import { useLanguage } from "@/components/language-context"
import { cn } from "@/lib/utils"

interface NavItem {
  label: string
  href: string
  icon?: React.ReactNode
  children?: NavItem[]
}

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null)
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const pathname = usePathname()
  const { currentLanguage } = useLanguage()
  const [isMobile, setIsMobile] = useState(false)

  // Check if device is mobile on mount and window resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIfMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile)

    // Clean up
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  // Navigation items with translations and icons
  const navItems: NavItem[] = [
    {
      label:
        currentLanguage === "en"
          ? "Home"
          : currentLanguage === "es"
            ? "Inicio"
            : currentLanguage === "fr"
              ? "Accueil"
              : currentLanguage === "de"
                ? "Startseite"
                : currentLanguage === "nl"
                  ? "Home"
                  : "Home",
      href: "/",
    },
    {
      label:
        currentLanguage === "en"
          ? "Services"
          : currentLanguage === "es"
            ? "Servicios"
            : currentLanguage === "fr"
              ? "Services"
              : currentLanguage === "de"
                ? "Dienstleistungen"
                : currentLanguage === "nl"
                  ? "Diensten"
                  : "Services",
      href: "/#services",
      children: [
        { label: "Web Development", href: "/web-development", icon: <Code className="h-4 w-4" /> },
        { label: "Design & Branding", href: "/design", icon: <Palette className="h-4 w-4" /> },
        { label: "E-commerce", href: "/ecommerce", icon: <ShoppingCart className="h-4 w-4" /> },
        { label: "SEO & Marketing", href: "/seo", icon: <Search className="h-4 w-4" /> },
      ],
    },
    {
      label:
        currentLanguage === "en"
          ? "Portfolio"
          : currentLanguage === "es"
            ? "Portafolio"
            : currentLanguage === "fr"
              ? "Portfolio"
              : currentLanguage === "de"
                ? "Portfolio"
                : currentLanguage === "nl"
                  ? "Portfolio"
                  : "Portfolio",
      href: "/#portfolio",
    },
    {
      label:
        currentLanguage === "en"
          ? "About"
          : currentLanguage === "es"
            ? "Nosotros"
            : currentLanguage === "fr"
              ? "À propos"
              : currentLanguage === "de"
                ? "Über uns"
                : currentLanguage === "nl"
                  ? "Over ons"
                  : "About",
      href: "/about",
    },
    {
      label:
        currentLanguage === "en"
          ? "Contact"
          : currentLanguage === "es"
            ? "Contacto"
            : currentLanguage === "fr"
              ? "Contact"
              : currentLanguage === "de"
                ? "Kontakt"
                : currentLanguage === "nl"
                  ? "Contact"
                  : "Contact",
      href: "/#contact",
    },
  ]

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && !(event.target as Element).closest("#mobile-menu")) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isMenuOpen])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)

    // Add haptic feedback on mobile devices
    if (isMobile && navigator.vibrate) {
      navigator.vibrate(50) // Short vibration for feedback
    }
  }

  const toggleDropdown = (label: string) => {
    // Add haptic feedback on mobile devices
    if (isMobile && navigator.vibrate) {
      navigator.vibrate(30) // Shorter vibration for dropdown toggle
    }

    if (activeDropdown === label) {
      setActiveDropdown(null)
    } else {
      setActiveDropdown(label)
    }
  }

  // Handle mouse enter for dropdown
  const handleMouseEnter = (label: string) => {
    if (isMobile) return // Skip hover effects on mobile

    // Clear any existing timeout
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
      dropdownTimeoutRef.current = null
    }

    setHoveredDropdown(label)
  }

  // Handle mouse leave for dropdown
  const handleMouseLeave = () => {
    if (isMobile) return // Skip hover effects on mobile

    // Add a small delay before closing
    dropdownTimeoutRef.current = setTimeout(() => {
      setHoveredDropdown(null)
    }, 200) // 200ms delay before closing
  }

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  // Determine if dropdown should be shown (either by hover or click)
  const isDropdownVisible = (label: string) => {
    if (isMobile) {
      // On mobile, only show if clicked
      return activeDropdown === label
    } else {
      // On desktop, show on hover or click
      return hoveredDropdown === label || activeDropdown === label
    }
  }

  // Animation variants for dropdowns
  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -5,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        staggerChildren: 0.05,
        delayChildren: 0.05,
      },
    },
  }

  // Animation variants for dropdown items
  const itemVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: { opacity: 1, y: 0 },
  }

  // Mobile menu backdrop variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  // Mobile menu slide variants
  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: [0.04, 0.62, 0.23, 0.98], // Custom easing for smoother feel
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  }

  // Mobile dropdown variants with improved animation
  const mobileDropdownVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: [0.04, 0.62, 0.23, 0.98], // Custom easing
        staggerChildren: 0.05,
        delayChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  }

  // Mobile dropdown item variants
  const mobileItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm" : "bg-transparent",
      )}
      role="banner"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo and Company Name */}
          <Link href="/" className="flex items-center space-x-3" aria-label="EG Web Solutions Home">
            <EGLogo size="sm" />
            <span
              className={cn(
                "font-bold text-lg md:text-xl transition-colors duration-300",
                isScrolled ? "text-blue-600 dark:text-blue-400" : "text-blue-500 dark:text-blue-300",
              )}
            >
              EG Web Solutions
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1" aria-label="Main Navigation">
            {navItems.map((item) =>
              item.children ? (
                <div
                  className="relative group"
                  key={item.label}
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    onClick={() => toggleDropdown(item.label)}
                    className={cn(
                      "px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors dropdown-toggle",
                      isActive(item.href)
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400",
                    )}
                    aria-expanded={isDropdownVisible(item.label)}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "ml-1 h-4 w-4 transition-transform duration-300",
                        isDropdownVisible(item.label) ? "transform rotate-180" : "",
                      )}
                    />
                  </button>
                  <AnimatePresence>
                    {isDropdownVisible(item.label) && (
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={dropdownVariants}
                        className="absolute left-0 mt-2 w-56 rounded-lg shadow-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 overflow-hidden"
                        style={{
                          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
                        }}
                        onMouseEnter={() => handleMouseEnter(item.label)} /* Keep dropdown open when hovering content */
                        onMouseLeave={handleMouseLeave}
                      >
                        <div className="py-2 px-1" role="menu" aria-orientation="vertical">
                          {/* Dropdown header */}
                          <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700 mb-1">
                            Our Services
                          </div>

                          {item.children.map((child) => (
                            <motion.div key={child.label} variants={itemVariants}>
                              <Link
                                href={child.href}
                                className="flex items-center w-full text-left px-3 py-2.5 text-sm rounded-md mx-1 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                role="menuitem"
                                onClick={() => {
                                  setActiveDropdown(null)
                                  setHoveredDropdown(null)
                                }}
                              >
                                {child.icon && (
                                  <span className="mr-2 text-blue-500 dark:text-blue-400">{child.icon}</span>
                                )}
                                <span>{child.label}</span>
                              </Link>
                            </motion.div>
                          ))}

                          {/* Dropdown footer */}
                          <div className="mt-1 pt-2 px-3 border-t border-gray-100 dark:border-gray-700">
                            <Link
                              href="/get-started"
                              className="block w-full text-center text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                              onClick={() => {
                                setActiveDropdown(null)
                                setHoveredDropdown(null)
                              }}
                            >
                              View all services →
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive(item.href)
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400",
                  )}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          {/* Right side items (Language selector and CTA) */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSelector variant="header" />
            <Link href="/get-started">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                {currentLanguage === "en"
                  ? "Get Started"
                  : currentLanguage === "es"
                    ? "Comenzar"
                    : currentLanguage === "fr"
                      ? "Commencer"
                      : currentLanguage === "de"
                        ? "Loslegen"
                        : currentLanguage === "nl"
                          ? "Beginnen"
                          : "Get Started"}
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-3">
            <LanguageSelector variant="header" />
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none active:bg-gray-100 dark:active:bg-gray-800 transition-colors"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu with backdrop */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={backdropVariants}
              className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Mobile menu content */}
            <motion.div
              id="mobile-menu"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={mobileMenuVariants}
              className="md:hidden bg-white dark:bg-gray-900 shadow-lg relative z-50 border-t border-gray-200 dark:border-gray-800"
            >
              <div className="px-4 pt-2 pb-4 space-y-1 sm:px-3 max-h-[70vh] overflow-y-auto overscroll-contain">
                {navItems.map((item) => (
                  <div key={item.label} className="my-1.5">
                    {item.children ? (
                      <div className="space-y-1">
                        <button
                          onClick={() => toggleDropdown(item.label)}
                          className={cn(
                            "w-full flex justify-between items-center px-4 py-3 rounded-lg text-base font-medium dropdown-toggle transition-colors",
                            isActive(item.href)
                              ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 active:bg-gray-100 dark:active:bg-gray-800",
                          )}
                          aria-expanded={activeDropdown === item.label}
                        >
                          <span>{item.label}</span>
                          <ChevronDown
                            className={cn(
                              "h-5 w-5 transition-transform duration-300",
                              activeDropdown === item.label ? "transform rotate-180" : "",
                            )}
                          />
                        </button>
                        <AnimatePresence>
                          {activeDropdown === item.label && (
                            <motion.div
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              variants={mobileDropdownVariants}
                              className="overflow-hidden rounded-lg bg-gray-50 dark:bg-gray-800/50 my-1"
                            >
                              {/* Mobile dropdown header with back button */}
                              <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                                <button
                                  onClick={() => setActiveDropdown(null)}
                                  className="flex items-center text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                                  aria-label="Back to main menu"
                                >
                                  <ArrowLeft className="h-3.5 w-3.5 mr-1" />
                                  <span>Back</span>
                                </button>
                                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                  Our Services
                                </span>
                              </div>

                              <div className="p-2">
                                {item.children.map((child, index) => (
                                  <motion.div key={child.label} variants={mobileItemVariants} custom={index}>
                                    <Link
                                      href={child.href}
                                      className="flex items-center px-4 py-3 rounded-md text-base font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-gray-800 active:bg-blue-50 dark:active:bg-blue-900/20 transition-colors"
                                      onClick={() => {
                                        setActiveDropdown(null)
                                        setIsMenuOpen(false)

                                        // Add haptic feedback
                                        if (navigator.vibrate) {
                                          navigator.vibrate(40)
                                        }
                                      }}
                                    >
                                      {child.icon && (
                                        <span className="mr-3 text-blue-500 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 p-2 rounded-md">
                                          {child.icon}
                                        </span>
                                      )}
                                      <span>{child.label}</span>
                                    </Link>
                                  </motion.div>
                                ))}
                              </div>

                              {/* Mobile dropdown footer */}
                              <div className="border-t border-gray-200 dark:border-gray-700 p-3">
                                <Link
                                  href="/get-started"
                                  className="flex items-center justify-center w-full text-center text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md py-2.5 px-4 transition-colors"
                                  onClick={() => {
                                    setActiveDropdown(null)
                                    setIsMenuOpen(false)

                                    // Add haptic feedback
                                    if (navigator.vibrate) {
                                      navigator.vibrate(40)
                                    }
                                  }}
                                >
                                  View all services
                                </Link>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className={cn(
                          "block px-4 py-3 rounded-lg text-base font-medium transition-colors",
                          isActive(item.href)
                            ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 active:bg-gray-100 dark:active:bg-gray-800",
                        )}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        onClick={() => {
                          setIsMenuOpen(false)

                          // Add haptic feedback
                          if (navigator.vibrate) {
                            navigator.vibrate(40)
                          }
                        }}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
                <div className="pt-4">
                  <Link href="/get-started" className="w-full">
                    <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-6 text-base">
                      {currentLanguage === "en"
                        ? "Get Started"
                        : currentLanguage === "es"
                          ? "Comenzar"
                          : currentLanguage === "fr"
                            ? "Commencer"
                            : currentLanguage === "de"
                              ? "Loslegen"
                              : currentLanguage === "nl"
                                ? "Beginnen"
                                : "Get Started"}
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Bottom handle for swipe gestures */}
              <div className="flex justify-center py-2 border-t border-gray-200 dark:border-gray-800">
                <div className="w-12 h-1 bg-gray-300 dark:bg-gray-700 rounded-full" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}

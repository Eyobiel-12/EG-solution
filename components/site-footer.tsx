"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Facebook, Twitter, Instagram, Linkedin, Mail, ArrowRight, Check, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import EGLogo from "@/components/eg-logo"
import { cn } from "@/lib/utils"

// Import the necessary components for the language selector
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface SiteFooterProps {
  className?: string
}

export default function SiteFooter({ className }: SiteFooterProps) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState("en")
  const currentYear = new Date().getFullYear()

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || isSubmitting) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubscribed(true)
      setEmail("")

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubscribed(false)
      }, 5000)
    }, 1500)
  }

  const handleLanguageChange = (langCode: string) => {
    setCurrentLanguage(langCode)
    // In a real implementation, this would update the app's locale/language
    console.log(`Language changed to: ${langCode}`)
  }

  const footerLinks = [
    { title: "About Us", href: "/about" },
    { title: "Services", href: "/#services" },
    { title: "Portfolio", href: "/#portfolio" },
    { title: "Contact", href: "/#contact" },
    { title: "Privacy Policy", href: "/privacy-policy" },
    { title: "Terms of Service", href: "/terms" },
  ]

  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, href: "https://facebook.com", label: "Facebook" },
    { icon: <Twitter className="h-5 w-5" />, href: "https://twitter.com", label: "Twitter" },
    { icon: <Instagram className="h-5 w-5" />, href: "https://instagram.com", label: "Instagram" },
    { icon: <Linkedin className="h-5 w-5" />, href: "https://linkedin.com", label: "LinkedIn" },
  ]

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "nl", name: "Nederlands", flag: "🇳🇱" },
  ]

  return (
    <footer className={cn("bg-gradient-to-b from-blue-900 to-blue-950 text-white", className)}>
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <EGLogo variant="light" size="md" />
            <p className="text-blue-200 max-w-xs">
              Dream It, We Build It: Empowering Your Digital Dominance with premium web development and design services.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-800 hover:bg-blue-700 p-2 rounded-full transition-colors duration-200"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-blue-800 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.slice(0, 3).map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-blue-200 hover:text-white transition-colors duration-200 flex items-center"
                  >
                    <ArrowRight className="h-3 w-3 mr-2" />
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-blue-800 pb-2">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.slice(3).map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-blue-200 hover:text-white transition-colors duration-200 flex items-center"
                  >
                    <ArrowRight className="h-3 w-3 mr-2" />
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-blue-800 pb-2">Newsletter</h3>
            <p className="text-blue-200 mb-4">Subscribe to our newsletter for the latest updates and insights.</p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 h-5 w-5" />
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="pl-10 bg-blue-800/50 border-blue-700 text-white placeholder:text-blue-300 focus:border-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Email address for newsletter"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                disabled={isSubmitting || isSubscribed}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Subscribing...
                  </span>
                ) : isSubscribed ? (
                  <span className="flex items-center">
                    <Check className="mr-2 h-4 w-4" />
                    Subscribed!
                  </span>
                ) : (
                  "Subscribe"
                )}
              </Button>
            </form>
            {isSubscribed && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-green-400 text-sm mt-2"
              >
                Thank you for subscribing!
              </motion.p>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-blue-800 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-4 md:mb-0">
            <p className="text-blue-300 text-sm">&copy; {currentYear} EG Web Solutions. All rights reserved.</p>

            {/* Language Selector */}
            <div className="flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 gap-1 text-blue-300 hover:text-white hover:bg-blue-800"
                    aria-label="Select language"
                  >
                    <Globe className="h-4 w-4" />
                    <span>
                      {languages.find((lang) => lang.code === currentLanguage)?.flag || "🌐"}{" "}
                      {languages.find((lang) => lang.code === currentLanguage)?.name || "Language"}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-blue-950 border-blue-800">
                  {languages.map((language) => (
                    <DropdownMenuItem
                      key={language.code}
                      className={`text-blue-200 hover:text-white hover:bg-blue-800 cursor-pointer ${
                        currentLanguage === language.code ? "bg-blue-800" : ""
                      }`}
                      onClick={() => handleLanguageChange(language.code)}
                    >
                      <span className="mr-2">{language.flag}</span>
                      {language.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-blue-300">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

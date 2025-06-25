"use client"

import { useState, useEffect } from "react"
import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/components/language-context"
import { cn } from "@/lib/utils"

interface LanguageSelectorProps {
  className?: string
  variant?: "header" | "footer"
}

export default function LanguageSelector({ className, variant = "header" }: LanguageSelectorProps) {
  const { currentLanguage, languages, changeLanguage } = useLanguage()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isFooter = variant === "footer"
  const isHeader = variant === "header"

  // Only show English and Dutch
  const filteredLanguages = languages.filter(lang => ["en", "nl"].includes(lang.code))

  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={isHeader ? "ghost" : "outline"}
            size="sm"
            className={cn(
              "gap-1 rounded-full",
              isFooter && "text-blue-300 hover:text-white hover:bg-blue-800",
              isHeader && "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400",
            )}
            aria-label="Select language"
          >
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">
              {filteredLanguages.find((lang) => lang.code === currentLanguage)?.flag || "🌐"}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className={cn(isFooter && "bg-blue-950 border-blue-800", "min-w-[150px]")}>
          {filteredLanguages.map((language) => (
            <DropdownMenuItem
              key={language.code}
              className={cn(
                "cursor-pointer flex items-center gap-2",
                isFooter && "text-blue-200 hover:text-white hover:bg-blue-800",
                currentLanguage === language.code && (isFooter ? "bg-blue-800" : "bg-accent"),
              )}
              onClick={() => changeLanguage(language.code)}
            >
              <span className="mr-2">{language.flag}</span>
              {language.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

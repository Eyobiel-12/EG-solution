"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = {
  code: string
  name: string
  flag: string
}

type LanguageContextType = {
  currentLanguage: string
  languages: Language[]
  changeLanguage: (code: string) => void
  t: (key: string, fallback: string) => string
}

const defaultLanguages: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "nl", name: "Nederlands", flag: "🇳🇱" },
]

// Simple translations for demonstration
const translations: Record<string, Record<string, string>> = {
  en: {
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.portfolio": "Portfolio",
    "nav.about": "About",
    "nav.contact": "Contact",
    "cta.getStarted": "Get Started",
    // Add more translations as needed
  },
  es: {
    "nav.home": "Inicio",
    "nav.services": "Servicios",
    "nav.portfolio": "Portafolio",
    "nav.about": "Nosotros",
    "nav.contact": "Contacto",
    "cta.getStarted": "Comenzar",
  },
  fr: {
    "nav.home": "Accueil",
    "nav.services": "Services",
    "nav.portfolio": "Portfolio",
    "nav.about": "À propos",
    "nav.contact": "Contact",
    "cta.getStarted": "Commencer",
  },
  de: {
    "nav.home": "Startseite",
    "nav.services": "Dienstleistungen",
    "nav.portfolio": "Portfolio",
    "nav.about": "Über uns",
    "nav.contact": "Kontakt",
    "cta.getStarted": "Loslegen",
  },
  nl: {
    "nav.home": "Home",
    "nav.services": "Diensten",
    "nav.portfolio": "Portfolio",
    "nav.about": "Over ons",
    "nav.contact": "Contact",
    "cta.getStarted": "Beginnen",
  },
}

const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: "en",
  languages: defaultLanguages,
  changeLanguage: () => {},
  t: (key, fallback) => fallback,
})

export const useLanguage = () => useContext(LanguageContext)

type LanguageProviderProps = {
  children: ReactNode
  initialLanguage?: string
}

export function LanguageProvider({ children, initialLanguage = "en" }: LanguageProviderProps) {
  const [currentLanguage, setCurrentLanguage] = useState(initialLanguage)

  // Load language preference from localStorage on initial render
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage)
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.split("-")[0]
      const isSupported = defaultLanguages.some((lang) => lang.code === browserLang)
      if (isSupported) {
        setCurrentLanguage(browserLang)
      }
    }
  }, [])

  const changeLanguage = (code: string) => {
    setCurrentLanguage(code)
    localStorage.setItem("language", code)
    // Update HTML lang attribute
    document.documentElement.lang = code
  }

  // Translation function
  const t = (key: string, fallback: string): string => {
    if (!translations[currentLanguage]) {
      return fallback
    }
    return translations[currentLanguage][key] || fallback
  }

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        languages: defaultLanguages,
        changeLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-context"
import { ChatWidgetContainer } from "@/components/chat-widget"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: {
    default: "EG Web Solutions",
    template: "%s | EG Web Solutions"
  },
  description: {
    en: "Professional web development, e-commerce, and SEO services",
    nl: "Professionele webontwikkeling, e-commerce en SEO-diensten"
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "EG Web Solutions",
  },
  openGraph: {
    type: "website",
    locale: {
      en: "en_US",
      nl: "nl_NL"
    },
    url: "https://eg-web-solutions.vercel.app",
    title: "EG Web Solutions",
    description: {
      en: "Professional web development, e-commerce, and SEO services",
      nl: "Professionele webontwikkeling, e-commerce en SEO-diensten"
    },
    siteName: "EG Web Solutions",
  },
  generator: 'v0.dev',
  verification: {
    google: 'S61ugxrRxb_pWQxARq7lynx_xHDzMJNGxLW2Cg5CYzg',
  }
}

export const viewport = {
  themeColor: "#ffffff",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <LanguageProvider>
            <div className="flex min-h-screen flex-col">
              <SiteHeader />
              <main className="flex-1">{children}</main>
              <SiteFooter />
              <ChatWidgetContainer />
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

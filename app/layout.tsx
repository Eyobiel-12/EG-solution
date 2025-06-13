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
  title: "EG Web Solutions",
  description: "Professional web development, e-commerce, and SEO services",
  manifest: "/manifest.json",
  themeColor: "#ffffff",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "EG Web Solutions",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://eg-web-solutions.vercel.app",
    title: "EG Web Solutions",
    description: "Professional web development, e-commerce, and SEO services",
    siteName: "EG Web Solutions",
  },
    generator: 'v0.dev'
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

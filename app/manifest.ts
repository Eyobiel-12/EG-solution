import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "EG Web Solutions",
    short_name: "EG Web",
    description: "Premium Web Development & Design Services",
    start_url: "/",
    display: "standalone",
    background_color: "#1a1a1a",
    theme_color: "#d4af37",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    screenshots: [
      {
        src: "/screenshots/mobile-home.png",
        sizes: "750x1334",
        type: "image/png",
        form_factor: "narrow",
      },
      {
        src: "/screenshots/desktop-home.png",
        sizes: "1920x1080",
        type: "image/png",
        form_factor: "wide",
      },
    ],
    orientation: "portrait",
    categories: ["business", "design", "development", "web"],
    shortcuts: [
      {
        name: "Our Services",
        url: "/#services",
        description: "View our service offerings",
      },
      {
        name: "Portfolio",
        url: "/#portfolio",
        description: "Browse our project portfolio",
      },
      {
        name: "Contact Us",
        url: "/#contact",
        description: "Get in touch with our team",
      },
    ],
    prefer_related_applications: false,
  }
}

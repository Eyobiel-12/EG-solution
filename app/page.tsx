"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  Code,
  Film,
  Paintbrush,
  Search,
  ShoppingCart,
  Stethoscope,
  Heart,
  MapPin,
  Mail,
  Clock,
  ChevronDown,
  Globe,
  Shield,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import PWAInstallPrompt from "@/components/pwa-install-prompt"
import AnimatedIcon from "@/components/animated-icon"
import PortfolioSection from "@/components/portfolio-section"
import SiteHeader from "@/components/site-header"
import { useLanguage } from "@/components/language-context"

type Dot = {
  top: number;
  left: number;
  opacity: number;
  y: number;
  animateOpacity: number[];
  duration: number;
};

function getRandomDots(count = 20) {
  return Array.from({ length: count }, () => ({
    top: Math.random() * 100,
    left: Math.random() * 100,
    opacity: 0.1 + Math.random() * 0.2,
    y: Math.random() * 10 - 5,
    animateOpacity: [0.1 + Math.random() * 0.2, 0.2 + Math.random() * 0.3],
    duration: 2 + Math.random() * 3,
  }))
}

export default function Home() {
  const [isOnline, setIsOnline] = useState(true)
  const { scrollY } = useScroll()
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.8])
  const headerBlur = useTransform(scrollY, [0, 100], [0, 8])
  const { t } = useLanguage()

  const heroRef = useRef<HTMLDivElement | null>(null)
  const servicesRef = useRef<HTMLDivElement | null>(null)
  const portfolioRef = useRef<HTMLDivElement | null>(null)
  const contactRef = useRef<HTMLDivElement | null>(null)

  const [dots, setDots] = useState<Dot[]>([])
  useEffect(() => {
    setDots(getRandomDots(20))
  }, [])

  // Check online status
  useEffect(() => {
    const handleOnlineStatus = () => {
      setIsOnline(navigator.onLine)
    }

    window.addEventListener("online", handleOnlineStatus)
    window.addEventListener("offline", handleOnlineStatus)

    return () => {
      window.removeEventListener("online", handleOnlineStatus)
      window.removeEventListener("offline", handleOnlineStatus)
    }
  }, [])

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  const services = [
    {
      title: "Web App Development",
      description: "Scalable, user-friendly web applications tailored for businesses and startups.",
      icon: <Code className="h-8 w-8" />,
      lottie: "https://lottie.host/a42aaad4-716b-4590-8958-0ffd75794a1d/IrvfxZE4m1.lottie",
      animationType: "pulse",
    },
    {
      title: "Promo Videos & Ads",
      description: "Engaging video ads, motion graphics, and promotional content.",
      icon: <Film className="h-8 w-8" />,
      lottie: "https://lottie.host/d9212ce8-80f3-431e-8354-5e2363dc12db/lUfzG8vxEw.lottie",
      animationType: "rotate",
    },
    {
      title: "Graphic Design & Branding",
      description: "Custom logos, posters, and marketing materials designed to make an impact.",
      icon: <Paintbrush className="h-8 w-8" />,
      lottie: "https://lottie.host/6d3df4a3-2a6d-4c41-a25a-6996a24808a5/AeEpQexKnZ.lottie",
      animationType: "wiggle",
    },
    {
      title: "Website Maintenance & SEO",
      description: "Ongoing support, performance optimization, and SEO strategies.",
      icon: <Search className="h-8 w-8" />,
      lottie: "https://lottie.host/3672bb16-4e52-4717-b146-3d2f19d3580d/mzl8pGehuc.lottie",
      animationType: "bounce",
    },
    {
      title: "E-commerce Platform",
      description: "Full-featured online shopping experience with product management and secure payments.",
      icon: <ShoppingCart className="h-8 w-8" />,
      lottie: "https://lottie.host/82f97e70-8d74-41ca-9f0f-de41290bb313/FSVeesLf73.lottie",
      animationType: "scale",
      status: "In Development",
    },
    {
      title: "Healthcare Portal",
      description: "Comprehensive medical services platform for patient management and appointments.",
      icon: <Stethoscope className="h-8 w-8" />,
      lottie: "https://lottie.host/44fcef0a-90b6-477f-a90c-ef5f13f5758b/rnLXYMd9Vw.lottie",
      animationType: "pulse",
      status: "In Development",
    },
    {
      title: "Habesha Dating Site",
      description: "A specialized dating platform for the Habesha community.",
      icon: <Heart className="h-8 w-8" />,
      lottie: "https://lottie.host/4371091d-c4cc-4f7b-b980-b85555c40ffa/KiMUP8JjIs.lottie",
      animationType: "bounce",
      status: "In Development",
    },
  ]

  // Trusted by logos
  const clientLogos = [
    { name: "Savanna Eetcafe", logo: "/images/savanna-eetcafe-logo.png" },
    { name: "Habesha Merhaba", logo: "/images/habesha-merhaba-logo.jpeg" },
    { name: "Mosob Asmara", logo: "/images/mosob-asmara-logo.jpeg" },
    { name: "BSM Furniture", logo: "/images/bsm-furniture-logo.jpeg" },
    { name: "Habesha Dating", logo: "/images/habesha-dating-logo.jpeg" },
  ]

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      {/* Offline notification */}
      {!isOnline && (
        <div className="fixed top-0 left-0 right-0 bg-amber-500 text-white p-2 text-center z-50">
          You are currently offline. Some features may be limited.
        </div>
      )}

      {/* Header - Using the new redesigned header */}
      <SiteHeader />

      {/* Enhanced Hero Section */}
      <section
        ref={heroRef}
        className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #EBF5FF 0%, #E1EFFE 50%, #DBEAFE 100%)",
        }}
      >
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute top-1/2 -left-48 w-96 h-96 bg-blue-300 rounded-full opacity-10 blur-3xl"></div>

          {/* Animated dots pattern */}
          <div className="absolute inset-0" aria-hidden="true">
            {dots.map((dot, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-blue-400"
                style={{
                  top: `${dot.top}%`,
                  left: `${dot.left}%`,
                  opacity: dot.opacity,
                }}
                animate={{
                  y: [0, dot.y],
                  opacity: dot.animateOpacity,
                }}
                transition={{
                  duration: dot.duration,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <Badge className="mb-6 bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1 text-sm rounded-full">
                    Premium Web Development & Design
                  </Badge>
                </motion.div>

                {/* Main Heading */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-blue-600 tracking-tight">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="block"
                  >
                    Transform Your
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="block text-blue-500"
                  >
                    Digital Presence
                  </motion.span>
                </h1>

                {/* Animated underline */}
                <motion.div
                  className="w-24 h-1.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mb-6"
                  initial={{ width: 0 }}
                  animate={{ width: "6rem" }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                ></motion.div>

                {/* Subheading */}
                <motion.p
                  className="text-xl text-gray-700 mb-8 max-w-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  We craft sophisticated digital experiences that blend elegance with functionality, helping your
                  business stand out in today's competitive landscape.
                </motion.p>

                {/* Feature list */}
                <motion.div
                  className="space-y-4 mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                >
                  {[
                    { icon: <Code className="h-4 w-4" />, text: "Custom Web Development" },
                    { icon: <Paintbrush className="h-4 w-4" />, text: "Stunning UI/UX Design" },
                    { icon: <Globe className="h-4 w-4" />, text: "E-commerce Solutions" },
                    { icon: <Shield className="h-4 w-4" />, text: "Secure & Scalable Applications" },
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
                    >
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 text-blue-600">
                        {feature.icon}
                      </div>
                      <span className="text-lg text-gray-700">{feature.text}</span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3, duration: 0.5 }}
                >
                  <Link href="/get-started">
                    <Button
                      size="lg"
                      className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {t("cta.getStarted", "Get Started")}
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>

                  <Link href="/#portfolio">
                    <Button
                      size="lg"
                      variant="outline"
                      className="px-8 py-3 rounded-full border-blue-300 text-blue-600 hover:bg-blue-50"
                    >
                      View Our Work
                    </Button>
                  </Link>
                </motion.div>

                {/* Stats */}
                <motion.div
                  className="mt-10 grid grid-cols-3 gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                >
                  {[
                    { value: "50+", label: "Projects Completed" },
                    { value: "98%", label: "Client Satisfaction" },
                    { value: "5+", label: "Years Experience" },
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </div>

            {/* Hero Image/Animation */}
            <div className="md:w-1/2 flex justify-center items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative w-full max-w-[550px] aspect-square bg-gradient-to-br from-blue-50 to-transparent p-4 rounded-3xl shadow-lg"
              >
                <motion.div
                  className="w-full h-full"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 2, 0, -2, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                >
                  <DotLottieReact
                    src="https://lottie.host/a42aaad4-716b-4590-8958-0ffd75794a1d/IrvfxZE4m1.lottie"
                    loop
                    autoplay
                    className="w-full h-full"
                  />
                </motion.div>

                {/* Decorative elements to enhance the animation */}
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-blue-100 rounded-full opacity-50 blur-xl"></div>
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-200 rounded-full opacity-40 blur-lg"></div>
              </motion.div>
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer"
            onClick={() => scrollToSection(servicesRef)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{
              opacity: { delay: 1.8, duration: 0.5 },
              y: { delay: 2, duration: 1.5, repeat: Number.POSITIVE_INFINITY },
            }}
          >
            <span className="text-sm text-blue-600 mb-2">Explore Our Services</span>
            <ChevronDown className="h-6 w-6 text-blue-500" />
          </motion.div>
        </div>

        {/* Trusted by section */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm py-6 border-t border-blue-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.5 }}
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <p className="text-gray-600 font-medium mb-4 md:mb-0">Trusted by:</p>
              <div className="flex flex-wrap justify-center gap-8">
                {clientLogos.map((client, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.7 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ delay: 1.7 + index * 0.1, duration: 0.3 }}
                    className="h-10"
                  >
                    <Image
                      src={client.logo || "/placeholder.svg"}
                      alt={client.name}
                      width={120}
                      height={40}
                      className="h-full w-auto object-contain transition-all duration-300"
                      onError={(e) => {
                        // Fallback to placeholder if image fails to load
                        e.currentTarget.src = "/placeholder.svg?height=40&width=120"
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" ref={servicesRef} className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-500">{t("nav.services", "Our Services")}</h2>
            <div className="w-24 h-1 bg-blue-400 mx-auto mb-6"></div>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              We offer a comprehensive range of digital solutions to help your business thrive in the digital landscape.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group border border-blue-100 hover:border-blue-200"
              >
                <div className="flex justify-between items-start mb-6">
                  <AnimatedIcon
                    type={service.animationType as "pulse" | "rotate" | "bounce" | "wiggle" | "scale"}
                    className="p-3 bg-blue-50 text-blue-500 rounded-xl shadow-sm group-hover:bg-blue-100 transition-colors duration-300"
                  >
                    {service.icon}
                  </AnimatedIcon>
                  {service.status && (
                    <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {service.status}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="h-32 w-32 mx-auto opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <DotLottieReact src={service.lottie} loop autoplay />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section - Using the enhanced component */}
      <PortfolioSection portfolioRef={portfolioRef} />

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-500">{t("nav.contact", "Get in Touch")}</h2>
            <div className="w-24 h-1 bg-blue-400 mx-auto mb-6"></div>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Ready to elevate your digital presence? Contact us today to discuss your project.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
                <h3 className="text-2xl font-bold mb-6 text-blue-600">Contact Information</h3>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <AnimatedIcon type="bounce" className="mt-1 bg-white p-2 rounded-lg shadow-sm text-blue-500">
                      <MapPin className="h-5 w-5" />
                    </AnimatedIcon>
                    <div className="ml-4">
                      <h4 className="font-medium">Office Location</h4>
                      <p className="text-gray-600 mt-1">
                        YSM Web Office
                        <br />
                        Shared with Yohannes Hoveniersbedrijf
                        <br />
                        Zweedsestraat 8a, 16, 7418 BG Deventer
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <AnimatedIcon type="wiggle" className="mt-1 bg-white p-2 rounded-lg shadow-sm text-blue-500">
                      <Mail className="h-5 w-5" />
                    </AnimatedIcon>
                    <div className="ml-4">
                      <h4 className="font-medium">Email</h4>
                      <p className="text-gray-600 mt-1">info@ysmweb.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <AnimatedIcon type="rotate" className="mt-1 bg-white p-2 rounded-lg shadow-sm text-blue-500">
                      <Clock className="h-5 w-5" />
                    </AnimatedIcon>
                    <div className="ml-4">
                      <h4 className="font-medium">Working Hours</h4>
                      <p className="text-gray-600 mt-1">
                        Monday - Friday: 9:00 - 18:00
                        <br />
                        Weekend: By appointment
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="h-64 w-full bg-white rounded-xl border border-blue-100">
                    {/* Map placeholder */}
                    <div className="h-full w-full flex items-center justify-center text-gray-400">Interactive Map</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
                <h3 className="text-2xl font-bold mb-6 text-blue-600">Send Us a Message</h3>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200"
                        placeholder="Your email"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200"
                      placeholder="Subject"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200"
                      placeholder="Your message"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full"
                  >
                    Send Message
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PWA Install Prompt */}
      <PWAInstallPrompt />
    </div>
  )
}

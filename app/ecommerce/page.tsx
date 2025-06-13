"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  ShoppingCart,
  CreditCard,
  Package,
  TrendingUp,
  Truck,
  Users,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  BarChart,
  Globe,
  Shield,
  Smartphone,
  Settings,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { DotLottiePlayer } from "@dotlottie/react-player"
import "@dotlottie/react-player/dist/index.css"

interface FAQItem {
  question: string
  answer: string
}

interface PlatformItem {
  name: string
  icon: string
  description: string
}

interface FeatureItem {
  title: string
  description: string
  icon: React.ReactNode
}

export default function EcommercePage() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState<string>("all")

  const toggleFAQ = (index: number) => {
    if (expandedFAQ === index) {
      setExpandedFAQ(null)
    } else {
      setExpandedFAQ(index)
    }
  }

  const platforms: PlatformItem[] = [
    {
      name: "Shopify",
      icon: "https://cdn.worldvectorlogo.com/logos/shopify.svg",
      description: "Fully-hosted e-commerce platform with extensive app ecosystem",
    },
    {
      name: "WooCommerce",
      icon: "https://cdn.worldvectorlogo.com/logos/woocommerce.svg",
      description: "Flexible WordPress-based e-commerce solution",
    },
    {
      name: "Magento",
      icon: "https://cdn.worldvectorlogo.com/logos/magento-2.svg",
      description: "Enterprise-grade platform for large-scale stores",
    },
    {
      name: "BigCommerce",
      icon: "https://cdn.worldvectorlogo.com/logos/bigcommerce.svg",
      description: "Scalable SaaS platform with robust features",
    },
    {
      name: "Custom Solutions",
      icon: "https://cdn-icons-png.flaticon.com/512/6295/6295417.png",
      description: "Tailored e-commerce applications built from scratch",
    },
    {
      name: "Headless Commerce",
      icon: "https://cdn-icons-png.flaticon.com/512/8637/8637114.png",
      description: "Decoupled architecture for maximum flexibility",
    },
  ]

  const features: FeatureItem[] = [
    {
      title: "Responsive Design",
      description: "Mobile-optimized shopping experiences that convert on any device",
      icon: <Smartphone className="h-10 w-10" />,
    },
    {
      title: "Secure Payments",
      description: "Integration with trusted payment gateways and PCI compliance",
      icon: <CreditCard className="h-10 w-10" />,
    },
    {
      title: "Inventory Management",
      description: "Real-time stock tracking and automated inventory controls",
      icon: <Package className="h-10 w-10" />,
    },
    {
      title: "Order Processing",
      description: "Streamlined checkout and efficient order fulfillment workflows",
      icon: <Truck className="h-10 w-10" />,
    },
    {
      title: "Customer Accounts",
      description: "User registration, profiles, and order history tracking",
      icon: <Users className="h-10 w-10" />,
    },
    {
      title: "Search & Filtering",
      description: "Advanced product search and filtering capabilities",
      icon: <Search className="h-10 w-10" />,
    },
    {
      title: "Analytics & Reporting",
      description: "Comprehensive insights into sales, customer behavior, and inventory",
      icon: <BarChart className="h-10 w-10" />,
    },
    {
      title: "Marketing Tools",
      description: "Built-in SEO, discount codes, and promotional features",
      icon: <TrendingUp className="h-10 w-10" />,
    },
    {
      title: "Multi-channel Selling",
      description: "Seamless integration with marketplaces and social platforms",
      icon: <Globe className="h-10 w-10" />,
    },
    {
      title: "Security Features",
      description: "Data protection, fraud prevention, and secure transactions",
      icon: <Shield className="h-10 w-10" />,
    },
    {
      title: "Customization Options",
      description: "Flexible design and functionality tailored to your brand",
      icon: <Settings className="h-10 w-10" />,
    },
    {
      title: "Scalability",
      description: "Solutions that grow with your business and handle increased traffic",
      icon: <TrendingUp className="h-10 w-10" />,
    },
  ]

  const faqs: FAQItem[] = [
    {
      question: "How long does it take to build an e-commerce website?",
      answer:
        "The timeline for building an e-commerce website varies depending on the complexity and requirements. A basic Shopify or WooCommerce store can be set up in 2-4 weeks, while custom e-commerce solutions may take 2-4 months. During our initial consultation, we'll provide a more accurate timeline based on your specific needs, desired features, and the chosen platform.",
    },
    {
      question: "Which e-commerce platform is best for my business?",
      answer:
        "The best platform depends on your specific business needs, budget, and growth plans. Shopify is excellent for beginners and small to medium businesses looking for an all-in-one solution. WooCommerce offers more flexibility and is ideal if you already use WordPress. Magento and custom solutions are better for large enterprises with complex requirements. During our consultation, we'll assess your needs and recommend the most suitable platform for your business.",
    },
    {
      question: "Can you migrate my existing online store to a new platform?",
      answer:
        "Yes, we offer comprehensive migration services for e-commerce stores. We can transfer your products, customer data, order history, and other essential information from your current platform to a new one with minimal disruption to your business. We follow a careful migration process that includes planning, data mapping, testing, and post-migration support to ensure a smooth transition.",
    },
    {
      question: "Do you provide ongoing maintenance and support for e-commerce websites?",
      answer:
        "Absolutely. We offer various maintenance and support packages tailored to your needs. These include regular updates, security patches, performance optimization, bug fixes, and technical assistance. We also provide training for your team on how to manage day-to-day operations of your store. Our goal is to ensure your e-commerce site remains secure, up-to-date, and performs optimally at all times.",
    },
    {
      question: "Can you integrate my e-commerce site with other business systems?",
      answer:
        "Yes, we specialize in integrating e-commerce platforms with various business systems such as ERP, CRM, accounting software, inventory management, shipping providers, and marketing tools. These integrations help automate processes, reduce manual work, and ensure data consistency across your business operations. We can work with both off-the-shelf integrations and develop custom solutions when needed.",
    },
  ]

  const caseStudies = [
    {
      title: "Fashion Boutique",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1170&auto=format&fit=crop",
      platform: "Shopify",
      results: "150% increase in mobile sales",
    },
    {
      title: "Electronics Store",
      image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1201&auto=format&fit=crop",
      platform: "WooCommerce",
      results: "35% higher conversion rate",
    },
    {
      title: "Furniture Retailer",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1170&auto=format&fit=crop",
      platform: "Custom Solution",
      results: "200% growth in first year",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-100 opacity-50 clip-path-diagonal"></div>
          <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-blue-100 opacity-30 rounded-tr-full"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <div className="flex items-center mb-6">
                  <Link href="/">
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800 p-0 mr-2">
                      <ArrowLeft className="h-4 w-4 mr-1" />
                      Home
                    </Button>
                  </Link>
                  <span className="text-gray-400 mx-2">/</span>
                  <span className="text-gray-600">E-commerce Solutions</span>
                </div>

                <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1 text-sm rounded-full">
                  Online Store Solutions
                </Badge>

                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blue-600">E-commerce Solutions</h1>

                <div className="w-20 h-1 bg-blue-400 mb-6"></div>

                <p className="text-xl text-gray-700 mb-8 max-w-lg">
                  We build powerful online stores that drive sales, enhance customer experience, and grow your business.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    { icon: <ShoppingCart className="h-4 w-4" />, text: "Custom Online Stores" },
                    { icon: <CreditCard className="h-4 w-4" />, text: "Secure Payment Processing" },
                    { icon: <Package className="h-4 w-4" />, text: "Inventory Management" },
                    { icon: <TrendingUp className="h-4 w-4" />, text: "Sales Analytics & Growth" },
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 text-blue-600">
                        {feature.icon}
                      </div>
                      <span className="text-lg text-gray-700">{feature.text}</span>
                    </div>
                  ))}
                </div>

                <Link href="/#contact">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full">
                    Get a Free Consultation
                  </Button>
                </Link>
              </div>

              <div className="md:w-1/2">
                <div className="relative w-full max-w-md mx-auto">
                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-200 rounded-full opacity-50 blur-xl"></div>
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-300 rounded-full opacity-40 blur-xl"></div>

                  <div className="relative z-10 bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100 p-4">
                    <DotLottiePlayer
                      src="https://lottie.host/ee12b9b0-db69-495e-b6d9-0ed2e74ae91f/Lp08QYxrEr.lottie"
                      loop
                      autoplay
                      className="w-full h-full"
                      style={{ minHeight: "400px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Platforms Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-600">E-commerce Platforms</h2>
              <div className="w-24 h-1 bg-blue-400 mx-auto mb-6"></div>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                We work with leading e-commerce platforms to build the perfect online store for your business.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {platforms.map((platform, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group border border-blue-100 hover:border-blue-300"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 mr-4">
                      <Image
                        src={platform.icon || "/placeholder.svg"}
                        alt={platform.name}
                        width={60}
                        height={60}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                      {platform.name}
                    </h3>
                  </div>
                  <p className="text-gray-600">{platform.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-600">Key E-commerce Features</h2>
              <div className="w-24 h-1 bg-blue-400 mx-auto mb-6"></div>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Our e-commerce solutions include everything you need to run a successful online store.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group border border-blue-100 hover:border-blue-300"
                >
                  <div className="p-4 bg-blue-50 text-blue-600 rounded-xl w-fit mb-6 group-hover:bg-blue-100 transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-600">Our E-commerce Development Process</h2>
              <div className="w-24 h-1 bg-blue-400 mx-auto mb-6"></div>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                We follow a structured approach to ensure your online store is built for success.
              </p>
            </div>

            <div className="relative">
              {/* Process timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-blue-200 hidden md:block"></div>

              {[
                {
                  number: "01",
                  title: "Discovery & Planning",
                  description:
                    "We analyze your business needs, target audience, and competitors to create a strategic e-commerce plan.",
                },
                {
                  number: "02",
                  title: "Design & UX",
                  description:
                    "We design an intuitive, conversion-focused user experience that reflects your brand identity.",
                },
                {
                  number: "03",
                  title: "Development",
                  description:
                    "Our developers build your store with clean code, optimized performance, and all required features.",
                },
                {
                  number: "04",
                  title: "Product Setup",
                  description:
                    "We set up your product catalog, categories, attributes, and import your inventory data.",
                },
                {
                  number: "05",
                  title: "Testing & QA",
                  description: "Rigorous testing ensures your store works flawlessly across all devices and browsers.",
                },
                {
                  number: "06",
                  title: "Launch & Growth",
                  description:
                    "After launch, we provide ongoing support and optimization to help your online store grow.",
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`flex flex-col md:flex-row items-center mb-12 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <div className="bg-white p-6 rounded-2xl shadow-md border border-blue-100">
                      <div className="text-3xl font-bold text-blue-300 mb-2">{step.number}</div>
                      <h3 className="text-xl font-bold mb-3 text-blue-600">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>

                  <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 text-white font-bold my-4 md:my-0 z-10">
                    {Number.parseInt(step.number)}
                  </div>

                  <div className="md:w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section className="py-20 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-600">Success Stories</h2>
              <div className="w-24 h-1 bg-blue-400 mx-auto mb-6"></div>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                See how we've helped businesses succeed with our e-commerce solutions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {caseStudies.map((study, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-blue-100 flex flex-col h-full"
                >
                  <div className="relative h-48 sm:h-40 md:h-48 w-full">
                    <Image
                      src={study.image || "/placeholder.svg"}
                      alt={study.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-4 md:p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                        <h3 className="text-lg md:text-xl font-bold text-gray-800">{study.title}</h3>
                        <Badge className="bg-blue-100 text-blue-700 whitespace-nowrap">{study.platform}</Badge>
                      </div>
                      <div className="flex items-center text-green-600">
                        <TrendingUp className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="font-medium">{study.results}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/#portfolio">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full">
                  View Full Portfolio
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-600">Why Choose Our E-commerce Solutions</h2>
              <div className="w-24 h-1 bg-blue-400 mx-auto mb-6"></div>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Partner with us for e-commerce solutions that deliver tangible results for your business.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Conversion-Focused Design",
                  description:
                    "We create online stores that are not just beautiful, but strategically designed to convert visitors into customers.",
                },
                {
                  title: "Mobile Optimization",
                  description:
                    "Our e-commerce sites are fully responsive and optimized for the growing number of mobile shoppers.",
                },
                {
                  title: "Performance & Speed",
                  description:
                    "Fast-loading pages improve user experience and search rankings, leading to higher conversion rates.",
                },
                {
                  title: "Scalable Solutions",
                  description:
                    "Our e-commerce platforms grow with your business, handling increased products, traffic, and sales.",
                },
                {
                  title: "Security & Compliance",
                  description:
                    "We implement robust security measures and ensure compliance with payment and data protection regulations.",
                },
                {
                  title: "Ongoing Support",
                  description:
                    "Our relationship continues after launch with maintenance, updates, and strategic guidance.",
                },
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 border border-blue-100 hover:border-blue-300 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start">
                    <div className="mr-4 text-blue-500">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-600">Frequently Asked Questions</h2>
              <div className="w-24 h-1 bg-blue-400 mx-auto mb-6"></div>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Find answers to common questions about our e-commerce solutions.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="mb-4"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex justify-between items-center p-4 bg-white rounded-lg shadow-sm border border-blue-100 hover:border-blue-300 transition-all duration-300"
                  >
                    <span className="font-medium text-left">{faq.question}</span>
                    {expandedFAQ === index ? (
                      <ChevronUp className="h-5 w-5 text-blue-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-blue-500" />
                    )}
                  </button>

                  {expandedFAQ === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-4 bg-blue-50 rounded-b-lg border-x border-b border-blue-100"
                    >
                      <p className="text-gray-700">{faq.answer}</p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Launch Your Online Store?</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Contact us today for a free consultation and let's discuss how we can help grow your e-commerce
                business.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/#contact">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-full">
                    Contact Us
                  </Button>
                </Link>
                <Link href="/get-started">
                  <Button
                    size="lg"
                    className="bg-blue-600 text-white border-2 border-white hover:bg-blue-700 hover:border-white px-8 py-3 rounded-full font-medium"
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <style jsx global>{`
        .clip-path-diagonal {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 30% 100%);
        }
      `}</style>
    </div>
  )
}

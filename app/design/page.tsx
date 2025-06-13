"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Paintbrush,
  Layout,
  ImageIcon,
  Type,
  Layers,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  PenTool,
  Monitor,
  Smartphone,
  Eye,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import SiteHeader from "@/components/site-header"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"

interface FAQItem {
  question: string
  answer: string
}

interface DesignToolItem {
  name: string
  icon: string
  category: string
}

export default function DesignPage() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState<string>("all")

  const toggleFAQ = (index: number) => {
    if (expandedFAQ === index) {
      setExpandedFAQ(null)
    } else {
      setExpandedFAQ(index)
    }
  }

  const designTools: DesignToolItem[] = [
    {
      name: "Adobe Photoshop",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Adobe_Photoshop_CC_icon.svg/512px-Adobe_Photoshop_CC_icon.svg.png",
      category: "graphic",
    },
    {
      name: "Adobe Illustrator",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Adobe_Illustrator_CC_icon.svg/512px-Adobe_Illustrator_CC_icon.svg.png",
      category: "graphic",
    },
    {
      name: "Figma",
      icon: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
      category: "ui",
    },
    {
      name: "Sketch",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Sketch_Logo.svg/512px-Sketch_Logo.svg.png",
      category: "ui",
    },
    {
      name: "Adobe XD",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Adobe_XD_CC_icon.svg/512px-Adobe_XD_CC_icon.svg.png",
      category: "ui",
    },
    {
      name: "Adobe InDesign",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Adobe_InDesign_CC_icon.svg/512px-Adobe_InDesign_CC_icon.svg.png",
      category: "print",
    },
    {
      name: "Adobe After Effects",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Adobe_After_Effects_CC_icon.svg/512px-Adobe_After_Effects_CC_icon.svg.png",
      category: "motion",
    },
    {
      name: "Blender",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Blender_logo_no_text.svg/512px-Blender_logo_no_text.svg.png",
      category: "3d",
    },
    {
      name: "Cinema 4D",
      icon: "https://upload.wikimedia.org/wikipedia/en/d/d8/C4D_Logo.png",
      category: "3d",
    },
    {
      name: "Adobe Premiere Pro",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Adobe_Premiere_Pro_CC_icon.svg/512px-Adobe_Premiere_Pro_CC_icon.svg.png",
      category: "motion",
    },
    {
      name: "Procreate",
      icon: "https://upload.wikimedia.org/wikipedia/en/1/1c/Procreate_app_logo.png",
      category: "graphic",
    },
    {
      name: "Adobe Lightroom",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Adobe_Photoshop_Lightroom_CC_logo.svg/512px-Adobe_Photoshop_Lightroom_CC_logo.svg.png",
      category: "graphic",
    },
  ]

  const filteredTools = activeTab === "all" ? designTools : designTools.filter((tool) => tool.category === activeTab)

  const faqs: FAQItem[] = [
    {
      question: "What design services do you offer?",
      answer:
        "We offer a comprehensive range of design services including brand identity design (logos, color schemes, typography), UI/UX design for websites and applications, print design (business cards, brochures, packaging), digital marketing assets (social media graphics, banners), and motion graphics.",
    },
    {
      question: "How does your design process work?",
      answer:
        "Our design process begins with discovery, where we learn about your business, goals, and target audience. We then move to research and concept development, creating initial design concepts. After your feedback, we refine the designs and finalize them. For branding projects, we deliver a complete brand guidelines document along with all necessary file formats.",
    },
    {
      question: "How long does a typical branding project take?",
      answer:
        "A comprehensive branding project typically takes 4-6 weeks from start to finish. This includes discovery, research, concept development, refinement, and finalization. More complex projects may take longer, while smaller projects can be completed more quickly. We'll provide a specific timeline during our initial consultation based on your project scope.",
    },
    {
      question: "Do you provide editable source files of the designs?",
      answer:
        "Yes, we provide all source files for your designs, including editable vector files for logos and brand assets. For web designs, we provide design files in formats like Figma or Adobe XD. We believe you should have full ownership of your brand assets and designs.",
    },
    {
      question: "Can you work with our existing brand guidelines?",
      answer:
        "We're experienced in working with established brand guidelines and can create new designs that align perfectly with your existing brand identity. We can also help evolve or refresh your brand while maintaining its core elements and recognition.",
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
                  <span className="text-gray-600">Design & Branding</span>
                </div>

                <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1 text-sm rounded-full">
                  Creative Design Services
                </Badge>

                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blue-600">Design & Branding</h1>

                <div className="w-20 h-1 bg-blue-400 mb-6"></div>

                <p className="text-xl text-gray-700 mb-8 max-w-lg">
                  We create stunning visual identities and designs that help your brand stand out and connect with your
                  audience.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    { icon: <Paintbrush className="h-4 w-4" />, text: "Brand Identity Design" },
                    { icon: <Layout className="h-4 w-4" />, text: "UI/UX Design" },
                    { icon: <ImageIcon className="h-4 w-4" />, text: "Print & Digital Design" },
                    { icon: <Type className="h-4 w-4" />, text: "Typography & Visual Systems" },
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

              <div className="md:w-1/2 flex items-center justify-center">
                <DotLottieReact
                  src="https://lottie.host/910d823e-9cce-4b79-b54f-fa77bdbc8287/d3xLA2w4ib.lottie"
                  loop
                  autoplay
                  style={{ width: "100%", height: "600px", maxWidth: "600px" }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-600">Our Design Services</h2>
              <div className="w-24 h-1 bg-blue-400 mx-auto mb-6"></div>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                We offer comprehensive design solutions to help your brand make a lasting impression.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <PenTool className="h-10 w-10" />,
                  title: "Brand Identity",
                  description:
                    "Logo design, color palettes, typography, and comprehensive brand guidelines that capture your brand's essence.",
                },
                {
                  icon: <Layout className="h-10 w-10" />,
                  title: "UI/UX Design",
                  description:
                    "User-centered interface design for websites and applications that enhance user experience and engagement.",
                },
                {
                  icon: <Monitor className="h-10 w-10" />,
                  title: "Website Design",
                  description:
                    "Visually appealing, responsive website designs that reflect your brand and engage your audience.",
                },
                {
                  icon: <Smartphone className="h-10 w-10" />,
                  title: "Mobile App Design",
                  description:
                    "Intuitive and attractive mobile application interfaces designed for optimal user experience.",
                },
                {
                  icon: <ImageIcon className="h-10 w-10" />,
                  title: "Print Design",
                  description:
                    "Business cards, brochures, packaging, and other print materials that make a tangible impression.",
                },
                {
                  icon: <Layers className="h-10 w-10" />,
                  title: "Marketing Materials",
                  description:
                    "Social media graphics, digital ads, email templates, and other assets to support your marketing efforts.",
                },
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group border border-blue-100 hover:border-blue-300"
                >
                  <div className="p-4 bg-blue-50 text-blue-600 rounded-xl w-fit mb-6 group-hover:bg-blue-100 transition-colors duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Design Process Section */}
        <section className="py-20 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-600">Our Design Process</h2>
              <div className="w-24 h-1 bg-blue-400 mx-auto mb-6"></div>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                We follow a collaborative and iterative approach to ensure your design project's success.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  number: "01",
                  title: "Discovery",
                  description:
                    "We learn about your business, goals, target audience, and competitors to inform our design strategy.",
                  icon: <Eye className="h-8 w-8" />,
                },
                {
                  number: "02",
                  title: "Concept Development",
                  description:
                    "We create initial design concepts based on research and your requirements for your feedback.",
                  icon: <PenTool className="h-8 w-8" />,
                },
                {
                  number: "03",
                  title: "Refinement",
                  description:
                    "Based on your feedback, we refine and iterate on the designs until they perfectly match your vision.",
                  icon: <Layers className="h-8 w-8" />,
                },
                {
                  number: "04",
                  title: "Finalization",
                  description:
                    "We finalize all designs and deliver them in all required formats along with usage guidelines.",
                  icon: <Zap className="h-8 w-8" />,
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 border border-blue-100 hover:border-blue-300 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-4">
                      {step.icon}
                    </div>
                    <div className="text-2xl font-bold text-blue-400">{step.number}</div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Design Tools Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-600">Design Tools We Use</h2>
              <div className="w-24 h-1 bg-blue-400 mx-auto mb-6"></div>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                We leverage industry-leading design tools to create exceptional visual experiences.
              </p>
            </div>

            <div className="flex justify-center mb-8">
              <div className="inline-flex bg-white rounded-full p-1 border border-blue-100">
                {[
                  { id: "all", label: "All Tools" },
                  { id: "graphic", label: "Graphic Design" },
                  { id: "ui", label: "UI/UX" },
                  { id: "print", label: "Print" },
                  { id: "motion", label: "Motion" },
                  { id: "3d", label: "3D" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? "bg-blue-500 text-white"
                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {filteredTools.map((tool, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 flex flex-col items-center text-center"
                >
                  <div className="mb-4 h-16 flex items-center justify-center">
                    <Image
                      src={tool.icon || "/placeholder.svg"}
                      alt={tool.name}
                      width={64}
                      height={64}
                      className="h-16 w-auto object-contain"
                    />
                  </div>
                  <h3 className="font-medium text-sm">{tool.name}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-600">Why Professional Design Matters</h2>
              <div className="w-24 h-1 bg-blue-400 mx-auto mb-6"></div>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Investing in professional design provides tangible benefits for your business.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Brand Recognition",
                  description:
                    "Professional design helps your brand stand out and be instantly recognizable to your audience.",
                },
                {
                  title: "Customer Trust",
                  description:
                    "Quality design builds credibility and trust with your customers from the first impression.",
                },
                {
                  title: "Consistent Messaging",
                  description:
                    "A cohesive design system ensures your brand communicates consistently across all touchpoints.",
                },
                {
                  title: "Competitive Advantage",
                  description:
                    "Great design differentiates your business from competitors and positions you as an industry leader.",
                },
                {
                  title: "User Engagement",
                  description: "Thoughtful UI/UX design increases user engagement and improves conversion rates.",
                },
                {
                  title: "Business Growth",
                  description: "Strategic design aligns with your business goals and supports your growth objectives.",
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
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-600">Frequently Asked Questions</h2>
              <div className="w-24 h-1 bg-blue-400 mx-auto mb-6"></div>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Find answers to common questions about our design services.
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
        <section className="py-20 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Brand?</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Contact us today for a free consultation and let's discuss how our design services can elevate your
                brand.
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
                    variant="outline"
                    className="border-white text-white hover:bg-blue-700 px-8 py-3 rounded-full"
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

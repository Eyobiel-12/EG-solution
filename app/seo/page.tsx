"use client"

import type React from "react"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Search,
  BarChart,
  Globe,
  TrendingUp,
  Share2,
  MessageSquare,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  LineChart,
  Target,
  FileText,
  LinkIcon,
  Users,
  Zap,
  Award,
  Layers,
  Smartphone,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import SiteHeader from "@/components/site-header"

interface FAQItem {
  question: string
  answer: string
}

interface ServiceItem {
  title: string
  description: string
  icon: React.ReactNode
}

interface MetricItem {
  title: string
  value: string
  description: string
  icon: React.ReactNode
}

export default function SEOPage() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    if (expandedFAQ === index) {
      setExpandedFAQ(null)
    } else {
      setExpandedFAQ(index)
    }
  }

  const seoServices: ServiceItem[] = [
    {
      title: "SEO Audit & Strategy",
      description:
        "Comprehensive analysis of your website's current SEO performance and development of a tailored strategy.",
      icon: <Search className="h-10 w-10" />,
    },
    {
      title: "On-Page SEO",
      description:
        "Optimization of your website's content, meta tags, headings, and structure to improve search rankings.",
      icon: <FileText className="h-10 w-10" />,
    },
    {
      title: "Technical SEO",
      description:
        "Addressing technical aspects like site speed, mobile-friendliness, indexing, and crawlability issues.",
      icon: <Zap className="h-10 w-10" />,
    },
    {
      title: "Off-Page SEO",
      description: "Building high-quality backlinks and improving your website's authority and reputation.",
      icon: <LinkIcon className="h-10 w-10" />,
    },
    {
      title: "Local SEO",
      description: "Enhancing your visibility in local search results to attract nearby customers.",
      icon: <Target className="h-10 w-10" />,
    },
    {
      title: "Content Marketing",
      description: "Creating valuable, SEO-optimized content that attracts and engages your target audience.",
      icon: <Layers className="h-10 w-10" />,
    },
  ]

  const marketingServices: ServiceItem[] = [
    {
      title: "Social Media Marketing",
      description: "Strategic social media campaigns to build brand awareness and engage with your audience.",
      icon: <Share2 className="h-10 w-10" />,
    },
    {
      title: "PPC Advertising",
      description: "Targeted pay-per-click campaigns on Google, Bing, and social platforms to drive qualified traffic.",
      icon: <TrendingUp className="h-10 w-10" />,
    },
    {
      title: "Email Marketing",
      description: "Personalized email campaigns to nurture leads and maintain customer relationships.",
      icon: <MessageSquare className="h-10 w-10" />,
    },
    {
      title: "Analytics & Reporting",
      description: "Comprehensive tracking and analysis of marketing performance with actionable insights.",
      icon: <BarChart className="h-10 w-10" />,
    },
    {
      title: "Conversion Rate Optimization",
      description: "Improving your website's ability to convert visitors into leads and customers.",
      icon: <LineChart className="h-10 w-10" />,
    },
    {
      title: "Mobile Marketing",
      description: "Specialized strategies to reach and engage users on mobile devices.",
      icon: <Smartphone className="h-10 w-10" />,
    },
  ]

  const successMetrics: MetricItem[] = [
    {
      title: "Organic Traffic Growth",
      value: "185%",
      description: "Average increase in organic search traffic within 6 months",
      icon: <TrendingUp className="h-8 w-8" />,
    },
    {
      title: "Keyword Rankings",
      value: "Top 10",
      description: "Positions achieved for competitive industry keywords",
      icon: <Award className="h-8 w-8" />,
    },
    {
      title: "Conversion Rate",
      value: "+75%",
      description: "Improvement in website conversion rates",
      icon: <Users className="h-8 w-8" />,
    },
  ]

  const faqs: FAQItem[] = [
    {
      question: "How long does it take to see results from SEO?",
      answer:
        "SEO is a long-term strategy that typically takes 3-6 months to show significant results. However, this timeline can vary based on factors like your website's current state, competition in your industry, and the aggressiveness of your SEO strategy. Some improvements, like technical fixes, may show quicker results, while building domain authority and ranking for competitive keywords takes longer. We provide monthly reports to track progress and show incremental improvements throughout the process.",
    },
    {
      question: "What makes your SEO services different from others?",
      answer:
        "Our approach to SEO is comprehensive, transparent, and results-driven. We don't use black-hat techniques that risk penalties. Instead, we focus on sustainable strategies that build long-term success. We combine technical expertise with creative content strategies, and customize our approach for each client rather than using a one-size-fits-all solution. Additionally, we provide detailed reporting with actionable insights, and our team stays current with the latest algorithm updates and industry best practices to ensure your strategy remains effective.",
    },
    {
      question: "Do you guarantee first-page rankings on Google?",
      answer:
        "We don't make guarantees about specific rankings because search results are influenced by many factors outside our control, including Google's algorithms, competitor activities, and industry changes. Any agency promising guaranteed rankings is not being truthful about how SEO works. What we do guarantee is implementing SEO best practices, creating quality content, improving your website's technical health, and building legitimate backlinks. We track progress through various metrics beyond just rankings, including organic traffic growth, click-through rates, and conversions.",
    },
    {
      question: "How do you measure the success of your SEO and marketing campaigns?",
      answer:
        "We measure success through multiple metrics tailored to your business goals. These typically include organic traffic growth, keyword rankings, conversion rates, bounce rates, time on site, backlink quality and quantity, local visibility, and ultimately, lead generation or sales. We set up comprehensive tracking using tools like Google Analytics, Search Console, and other specialized software. You'll receive regular reports showing these metrics and our analysis of what's working and what needs adjustment. We focus on ROI and business impact rather than just technical SEO metrics.",
    },
    {
      question: "Can you help with local SEO for my business?",
      answer:
        "Yes, we specialize in local SEO strategies that help businesses increase their visibility in local search results. Our local SEO services include optimizing your Google Business Profile, creating location-specific content, building local citations and backlinks, managing online reviews, implementing local schema markup, and targeting location-specific keywords. We understand the unique challenges of local businesses and tailor our approach to your specific market and competition. Our goal is to ensure your business appears prominently when potential customers in your area search for your products or services.",
    },
  ]

  const caseStudies = [
    {
      title: "E-commerce Retailer",
      image: "/placeholder.svg?height=400&width=600",
      results: "195% increase in organic traffic",
      industry: "Retail",
    },
    {
      title: "Professional Services Firm",
      image: "/placeholder.svg?height=400&width=600",
      results: "87% more qualified leads",
      industry: "B2B Services",
    },
    {
      title: "Local Restaurant Chain",
      image: "/placeholder.svg?height=400&width=600",
      results: "143% growth in local search visibility",
      industry: "Hospitality",
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
                  <span className="text-gray-600">SEO & Marketing</span>
                </div>

                <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1 text-sm rounded-full">
                  Digital Growth Strategies
                </Badge>

                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blue-600">SEO & Marketing Services</h1>

                <div className="w-20 h-1 bg-blue-400 mb-6"></div>

                <p className="text-xl text-gray-700 mb-8 max-w-lg">
                  We help businesses increase their online visibility, drive qualified traffic, and convert visitors
                  into customers.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    { icon: <Search className="h-4 w-4" />, text: "Search Engine Optimization" },
                    { icon: <BarChart className="h-4 w-4" />, text: "Data-Driven Marketing" },
                    { icon: <Globe className="h-4 w-4" />, text: "Local & Global Strategies" },
                    { icon: <TrendingUp className="h-4 w-4" />, text: "Measurable Results & ROI" },
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
                    Get a Free SEO Audit
                  </Button>
                </Link>
              </div>

              <div className="md:w-1/2">
                <div className="relative w-full max-w-md mx-auto">
                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-200 rounded-full opacity-50 blur-xl"></div>
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-300 rounded-full opacity-40 blur-xl"></div>

                  <div className="relative z-10 bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100 flex flex-col items-center justify-center p-4">
                    <DotLottieReact
                      src="https://lottie.host/ec2db1d7-2d5f-4427-9997-b3282d7221f9/mz3NFGFN70.lottie"
                      loop
                      autoplay
                      style={{ width: '100%', maxWidth: 400, height: 'auto' }}
                      className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto mx-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEO Services Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-600">Our SEO Services</h2>
              <div className="w-24 h-1 bg-blue-400 mx-auto mb-6"></div>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                We offer comprehensive SEO solutions to improve your search visibility and drive organic traffic.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {seoServices.map((service, index) => (
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

        {/* Marketing Services Section */}
        <section className="py-20 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-600">Digital Marketing Services</h2>
              <div className="w-24 h-1 bg-blue-400 mx-auto mb-6"></div>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Complement your SEO strategy with our comprehensive digital marketing solutions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {marketingServices.map((service, index) => (
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

        {/* Process Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-600">Our SEO Process</h2>
              <div className="w-24 h-1 bg-blue-400 mx-auto mb-6"></div>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                We follow a proven methodology to deliver sustainable SEO results for your business.
              </p>
            </div>

            <div className="relative">
              {/* Process timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-blue-200 hidden md:block"></div>

              {[
                {
                  number: "01",
                  title: "Comprehensive Audit",
                  description:
                    "We analyze your website, competitors, and industry to identify opportunities and challenges.",
                },
                {
                  number: "02",
                  title: "Strategy Development",
                  description:
                    "We create a customized SEO strategy aligned with your business goals and target audience.",
                },
                {
                  number: "03",
                  title: "On-Page Optimization",
                  description:
                    "We optimize your website's content, structure, and technical elements for better search visibility.",
                },
                {
                  number: "04",
                  title: "Content Creation",
                  description:
                    "We develop high-quality, SEO-optimized content that engages users and attracts backlinks.",
                },
                {
                  number: "05",
                  title: "Off-Page SEO",
                  description:
                    "We build your site's authority through strategic link building and online reputation management.",
                },
                {
                  number: "06",
                  title: "Monitoring & Refinement",
                  description:
                    "We continuously track performance, analyze data, and refine strategies for optimal results.",
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

        {/* Success Metrics Section */}
        <section className="py-20 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-600">Our Success Metrics</h2>
              <div className="w-24 h-1 bg-blue-400 mx-auto mb-6"></div>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                We measure our success by the tangible results we deliver for our clients.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {successMetrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 hover:shadow-lg transition-all duration-300 border border-blue-100 hover:border-blue-300 text-center"
                >
                  <div className="p-4 bg-blue-50 text-blue-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    {metric.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{metric.title}</h3>
                  <div className="text-4xl font-bold text-blue-600 mb-4">{metric.value}</div>
                  <p className="text-gray-600">{metric.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-600">Success Stories</h2>
              <div className="w-24 h-1 bg-blue-400 mx-auto mb-6"></div>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                See how we've helped businesses achieve remarkable growth through SEO and marketing.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {caseStudies.map((study, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-blue-100"
                >
                  <div className="relative h-48">
                    <Image src={study.image || "/placeholder.svg"} alt={study.title} fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-xl font-bold text-gray-800">{study.title}</h3>
                      <Badge className="bg-blue-100 text-blue-700">{study.industry}</Badge>
                    </div>
                    <div className="flex items-center text-green-600">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      <span className="font-medium">{study.results}</span>
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
        <section className="py-20 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-600">Why Choose Our SEO Services</h2>
              <div className="w-24 h-1 bg-blue-400 mx-auto mb-6"></div>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Partner with us for SEO and marketing services that deliver tangible results for your business.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Data-Driven Approach",
                  description:
                    "We base our strategies on comprehensive data analysis and industry insights, not guesswork.",
                },
                {
                  title: "Transparent Reporting",
                  description:
                    "We provide clear, detailed reports that show exactly what we're doing and the results we're achieving.",
                },
                {
                  title: "White-Hat Techniques",
                  description:
                    "We only use ethical, sustainable SEO practices that build long-term success and avoid penalties.",
                },
                {
                  title: "Industry Expertise",
                  description:
                    "Our team stays current with the latest algorithm updates and digital marketing best practices.",
                },
                {
                  title: "Customized Strategies",
                  description:
                    "We develop tailored solutions based on your specific business goals, industry, and target audience.",
                },
                {
                  title: "Comprehensive Approach",
                  description:
                    "We integrate SEO with other marketing channels for a cohesive strategy that maximizes results.",
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
                Find answers to common questions about our SEO and marketing services.
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Improve Your Search Rankings?</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Contact us today for a free SEO audit and discover how our SEO and marketing services can help grow your
                business online.
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

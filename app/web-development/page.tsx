"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Code,
  Server,
  Database,
  Globe,
  Smartphone,
  Rocket,
  CheckCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"

interface FAQItem {
  question: string
  answer: string
}

interface TechnologyItem {
  name: string
  icon: string
  description: string
}

export default function WebDevelopmentPage() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    if (expandedFAQ === index) {
      setExpandedFAQ(null)
    } else {
      setExpandedFAQ(index)
    }
  }

  const technologies: TechnologyItem[] = [
    {
      name: "React",
      icon: "/placeholder.svg?height=60&width=60",
      description: "Building interactive user interfaces with the most popular frontend library",
    },
    {
      name: "Next.js",
      icon: "/placeholder.svg?height=60&width=60",
      description: "Creating fast, SEO-friendly applications with server-side rendering",
    },
    {
      name: "Node.js",
      icon: "/placeholder.svg?height=60&width=60",
      description: "Powering backend services with JavaScript runtime environment",
    },
    {
      name: "TypeScript",
      icon: "/placeholder.svg?height=60&width=60",
      description: "Adding type safety to enhance code quality and developer experience",
    },
    {
      name: "MongoDB",
      icon: "/placeholder.svg?height=60&width=60",
      description: "Flexible document database for modern applications",
    },
    {
      name: "PostgreSQL",
      icon: "/placeholder.svg?height=60&width=60",
      description: "Robust relational database for data-intensive applications",
    },
  ]

  const faqs: FAQItem[] = [
    {
      question: "What types of web applications do you develop?",
      answer:
        "We develop a wide range of web applications including e-commerce platforms, content management systems, customer portals, booking systems, social networks, and custom business applications. Our expertise spans across various industries and use cases.",
    },
    {
      question: "How long does it typically take to develop a web application?",
      answer:
        "The timeline varies depending on the complexity and scope of the project. A simple website might take 4-6 weeks, while a complex web application could take 3-6 months or more. During our initial consultation, we'll provide a more accurate timeline based on your specific requirements.",
    },
    {
      question: "Do you provide ongoing maintenance and support?",
      answer:
        "Yes, we offer comprehensive maintenance and support packages to ensure your web application remains secure, up-to-date, and performs optimally. Our support includes regular updates, security patches, performance optimization, and technical assistance.",
    },
    {
      question: "What is your development process?",
      answer:
        "Our development process follows an agile methodology with clear phases: Discovery & Planning, Design, Development, Testing, Deployment, and Maintenance. We emphasize collaboration, regular updates, and iterative improvements throughout the project lifecycle.",
    },
    {
      question: "Can you integrate my web application with other systems?",
      answer:
        "Absolutely. We specialize in integrating web applications with various third-party systems, APIs, payment gateways, CRMs, ERPs, and other business tools. Our goal is to create a seamless ecosystem that enhances your operational efficiency.",
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
                  <span className="text-gray-600">Web Development</span>
                </div>

                <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1 text-sm rounded-full">
                  Expert Web Development
                </Badge>

                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blue-600">Web Development Services</h1>

                <div className="w-20 h-1 bg-blue-400 mb-6"></div>

                <p className="text-xl text-gray-700 mb-8 max-w-lg">
                  We build powerful, scalable, and user-friendly web applications that drive business growth and enhance
                  user experience.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    { icon: <Code className="h-4 w-4" />, text: "Custom Web Applications" },
                    { icon: <Server className="h-4 w-4" />, text: "Full-Stack Development" },
                    { icon: <Database className="h-4 w-4" />, text: "Database Design & Integration" },
                    { icon: <Globe className="h-4 w-4" />, text: "API Development" },
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

                  <motion.div
                    className="w-full"
                    style={{ height: "450px" }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.8,
                      ease: "easeOut",
                      delay: 0.2,
                    }}
                  >
                    <DotLottieReact
                      src="https://lottie.host/da8f3084-0d11-4eb7-8b83-26049b48aed3/9uPyylbmV0.lottie"
                      loop
                      autoplay
                      className="w-full h-full scale-150"
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-600">Our Web Development Services</h2>
              <div className="w-24 h-1 bg-blue-400 mx-auto mb-6"></div>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                We offer end-to-end web development solutions tailored to your business needs and objectives.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Code className="h-10 w-10" />,
                  title: "Frontend Development",
                  description:
                    "Creating responsive, interactive, and visually appealing user interfaces using modern frameworks and technologies.",
                },
                {
                  icon: <Server className="h-10 w-10" />,
                  title: "Backend Development",
                  description:
                    "Building robust server-side applications, APIs, and services that power your web applications.",
                },
                {
                  icon: <Database className="h-10 w-10" />,
                  title: "Database Design",
                  description:
                    "Designing efficient, scalable, and secure database architectures for optimal data management.",
                },
                {
                  icon: <Smartphone className="h-10 w-10" />,
                  title: "Progressive Web Apps",
                  description:
                    "Developing web applications that offer native-like experiences across all devices and platforms.",
                },
                {
                  icon: <Globe className="h-10 w-10" />,
                  title: "API Development",
                  description:
                    "Creating RESTful and GraphQL APIs for seamless integration with other systems and services.",
                },
                {
                  icon: <Rocket className="h-10 w-10" />,
                  title: "Performance Optimization",
                  description:
                    "Enhancing web application speed, responsiveness, and overall performance for better user experience.",
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

        {/* Process Section */}
        <section className="py-20 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-600">Our Development Process</h2>
              <div className="w-24 h-1 bg-blue-400 mx-auto mb-6"></div>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                We follow a structured and collaborative approach to ensure successful project delivery.
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
                    "We start by understanding your business goals, target audience, and project requirements to create a comprehensive development plan.",
                },
                {
                  number: "02",
                  title: "Design & Prototyping",
                  description:
                    "Our designers create wireframes and interactive prototypes to visualize the user interface and experience before development begins.",
                },
                {
                  number: "03",
                  title: "Development",
                  description:
                    "Our development team brings the designs to life using the latest technologies and best practices for clean, efficient code.",
                },
                {
                  number: "04",
                  title: "Testing & QA",
                  description:
                    "Rigorous testing ensures your web application is bug-free, secure, and performs optimally across all devices and browsers.",
                },
                {
                  number: "05",
                  title: "Deployment",
                  description:
                    "We handle the deployment process, ensuring a smooth transition from development to production environment.",
                },
                {
                  number: "06",
                  title: "Maintenance & Support",
                  description:
                    "Our relationship continues after launch with ongoing maintenance, updates, and support to keep your application running smoothly.",
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

        {/* Technologies Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-600">Technologies We Use</h2>
              <div className="w-24 h-1 bg-blue-400 mx-auto mb-6"></div>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                We leverage the latest technologies and frameworks to build modern, scalable web applications.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {technologies.map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 flex flex-col items-center text-center"
                >
                  <div className="mb-4">
                    <Image
                      src={tech.icon || "/placeholder.svg"}
                      alt={tech.name}
                      width={60}
                      height={60}
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  <h3 className="font-bold mb-2">{tech.name}</h3>
                  <p className="text-sm text-gray-600">{tech.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-gradient-to-b from-white to-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-600">Why Choose Us</h2>
              <div className="w-24 h-1 bg-blue-400 mx-auto mb-6"></div>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Partner with us for exceptional web development services that deliver tangible results.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Technical Expertise",
                  description:
                    "Our team consists of experienced developers with deep knowledge of modern web technologies.",
                },
                {
                  title: "Quality Assurance",
                  description: "We follow rigorous testing procedures to ensure high-quality, bug-free applications.",
                },
                {
                  title: "Scalable Solutions",
                  description:
                    "Our applications are built to scale with your business growth and increasing user base.",
                },
                {
                  title: "Performance Focused",
                  description: "We optimize every aspect of your web application for maximum speed and efficiency.",
                },
                {
                  title: "Responsive Support",
                  description: "Our dedicated support team is always ready to assist you with any issues or questions.",
                },
                {
                  title: "Transparent Communication",
                  description: "We maintain clear and open communication throughout the development process.",
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
                Find answers to common questions about our web development services.
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Web Development Project?</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Contact us today for a free consultation and let's discuss how we can bring your vision to life.
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

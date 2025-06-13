"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Users, Award, Clock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import SiteFooter from "@/components/site-footer"
import SiteHeader from "@/components/site-header"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="mb-8">
            <Link href="/">
              <Button variant="outline" className="flex items-center gap-2 border-blue-300 text-blue-500">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>

          {/* Hero Section */}
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold mb-6 text-blue-500"
            >
              About EG Web Solutions
            </motion.h1>
            <div className="w-24 h-1 bg-blue-400 mx-auto mb-6"></div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-700 max-w-3xl mx-auto"
            >
              We are a team of passionate web developers and designers dedicated to creating exceptional digital
              experiences that help businesses thrive in the digital landscape.
            </motion.p>
          </div>

          {/* Our Story */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6 text-blue-500">Our Story</h2>
              <div className="w-16 h-1 bg-blue-400 mb-6"></div>
              <p className="text-gray-700 mb-4">
                Founded in 2021, EG Web Solutions began with a simple mission: to help businesses establish a powerful
                online presence through thoughtful design and robust development.
              </p>
              <p className="text-gray-700 mb-4">
                What started as a small team of two passionate developers has grown into a diverse group of creative
                professionals, each bringing unique skills and perspectives to our projects.
              </p>
              <p className="text-gray-700">
                Today, we pride ourselves on delivering tailored digital solutions that not only look beautiful but also
                drive real business results for our clients across various industries.
              </p>
            </motion.div>
            <div className="flex justify-center items-center">
              <img
                src="/images/about.png"
                alt="About EG Web Solutions"
                className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto rounded-2xl shadow-lg object-cover mx-auto"
              />
            </div>
          </div>

          {/* Our Values */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold mb-6 text-blue-500"
              >
                Our Values
              </motion.h2>
              <div className="w-24 h-1 bg-blue-400 mx-auto mb-6"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Users className="h-8 w-8" />,
                  title: "Client Partnership",
                  description: "We view our clients as partners and work collaboratively to achieve their goals.",
                },
                {
                  icon: <Award className="h-8 w-8" />,
                  title: "Excellence",
                  description:
                    "We strive for excellence in every aspect of our work, from design to development to support.",
                },
                {
                  icon: <Clock className="h-8 w-8" />,
                  title: "Timeliness",
                  description: "We respect deadlines and deliver projects on time without compromising quality.",
                },
                {
                  icon: <CheckCircle className="h-8 w-8" />,
                  title: "Integrity",
                  description: "We operate with transparency, honesty, and ethical practices in all our dealings.",
                },
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-blue-100 hover:border-blue-300 hover:shadow-md transition-all duration-300"
                >
                  <div className="bg-blue-50 p-3 rounded-xl w-fit mb-4 text-blue-500">{value.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-blue-50 rounded-2xl p-8 md:p-12 text-center border border-blue-100"
          >
            <h2 className="text-3xl font-bold mb-4 text-blue-500">Ready to Work With Us?</h2>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help bring your digital vision to life with our expertise in web development and
              design.
            </p>
            <Link href="/get-started">
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 rounded-full text-lg">
                Get Started
              </Button>
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

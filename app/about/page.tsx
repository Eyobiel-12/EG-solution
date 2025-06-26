"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Users, Award, Clock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import SiteFooter from "@/components/site-footer"
import SiteHeader from "@/components/site-header"
import { useLanguage } from "@/components/language-context"

export default function AboutPage() {
  const { currentLanguage } = useLanguage()

  // Translations for the about page
  const translations = {
    backToHome: currentLanguage === "en" ? "Back to Home" : "Terug naar Home",
    title: currentLanguage === "en" ? "About EG Web Solutions" : "Over EG Web Solutions",
    subtitle: currentLanguage === "en" 
      ? "We are a team of passionate web developers and designers dedicated to creating exceptional digital experiences that help businesses thrive in the digital landscape."
      : "Wij zijn een team van gepassioneerde webontwikkelaars en ontwerpers die zich inzetten voor het creëren van uitzonderlijke digitale ervaringen die bedrijven helpen gedijen in het digitale landschap.",
    ourStory: {
      title: currentLanguage === "en" ? "Our Story" : "Ons Verhaal",
      paragraph1: currentLanguage === "en"
        ? "Founded in 2021, EG Web Solutions began with a simple mission: to help businesses establish a powerful online presence through thoughtful design and robust development."
        : "Opgericht in 2021, begon EG Web Solutions met een eenvoudige missie: bedrijven helpen een krachtige online aanwezigheid op te bouwen door middel van doordacht ontwerp en robuuste ontwikkeling.",
      paragraph2: currentLanguage === "en"
        ? "What started as a small team of two passionate developers has grown into a diverse group of creative professionals, each bringing unique skills and perspectives to our projects."
        : "Wat begon als een klein team van twee gepassioneerde ontwikkelaars is uitgegroeid tot een diverse groep creatieve professionals, elk met unieke vaardigheden en perspectieven voor onze projecten.",
      paragraph3: currentLanguage === "en"
        ? "Today, we pride ourselves on delivering tailored digital solutions that not only look beautiful but also drive real business results for our clients across various industries."
        : "Vandaag zijn we trots op het leveren van op maat gemaakte digitale oplossingen die niet alleen mooi ogen, maar ook echte bedrijfsresultaten opleveren voor onze klanten in verschillende sectoren."
    },
    ourValues: {
      title: currentLanguage === "en" ? "Our Values" : "Onze Waarden",
      values: [
        {
          title: currentLanguage === "en" ? "Client Partnership" : "Klantpartnerschap",
          description: currentLanguage === "en"
            ? "We view our clients as partners and work collaboratively to achieve their goals."
            : "We zien onze klanten als partners en werken samen om hun doelen te bereiken."
        },
        {
          title: currentLanguage === "en" ? "Excellence" : "Uitmuntendheid",
          description: currentLanguage === "en"
            ? "We strive for excellence in every aspect of our work, from design to development to support."
            : "We streven naar uitmuntendheid in elk aspect van ons werk, van ontwerp tot ontwikkeling tot ondersteuning."
        },
        {
          title: currentLanguage === "en" ? "Timeliness" : "Tijdigheid",
          description: currentLanguage === "en"
            ? "We respect deadlines and deliver projects on time without compromising quality."
            : "We respecteren deadlines en leveren projecten op tijd af zonder in te leveren op kwaliteit."
        },
        {
          title: currentLanguage === "en" ? "Integrity" : "Integriteit",
          description: currentLanguage === "en"
            ? "We operate with transparency, honesty, and ethical practices in all our dealings."
            : "We werken met transparantie, eerlijkheid en ethische praktijken in al onze transacties."
        }
      ]
    },
    cta: {
      title: currentLanguage === "en" ? "Ready to Work With Us?" : "Klaar om met ons samen te werken?",
      description: currentLanguage === "en"
        ? "Let's discuss how we can help bring your digital vision to life with our expertise in web development and design."
        : "Laten we bespreken hoe we kunnen helpen uw digitale visie tot leven te brengen met onze expertise in webontwikkeling en design.",
      button: currentLanguage === "en" ? "Get Started" : "Beginnen"
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="mb-8">
            <Link href="/">
              <Button variant="outline" className="flex items-center gap-2 border-blue-300 text-blue-500">
                <ArrowLeft className="h-4 w-4" />
                {translations.backToHome}
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
              {translations.title}
            </motion.h1>
            <div className="w-24 h-1 bg-blue-400 mx-auto mb-6"></div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-700 max-w-3xl mx-auto"
            >
              {translations.subtitle}
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
              <h2 className="text-3xl font-bold mb-6 text-blue-500">{translations.ourStory.title}</h2>
              <div className="w-16 h-1 bg-blue-400 mb-6"></div>
              <p className="text-gray-700 mb-4">
                {translations.ourStory.paragraph1}
              </p>
              <p className="text-gray-700 mb-4">
                {translations.ourStory.paragraph2}
              </p>
              <p className="text-gray-700">
                {translations.ourStory.paragraph3}
              </p>
            </motion.div>
            <div className="flex justify-center items-center">
              <img
                src="/IMG_1255.jpg"
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
                {translations.ourValues.title}
              </motion.h2>
              <div className="w-24 h-1 bg-blue-400 mx-auto mb-6"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Users className="h-8 w-8" />,
                  title: translations.ourValues.values[0].title,
                  description: translations.ourValues.values[0].description,
                },
                {
                  icon: <Award className="h-8 w-8" />,
                  title: translations.ourValues.values[1].title,
                  description: translations.ourValues.values[1].description,
                },
                {
                  icon: <Clock className="h-8 w-8" />,
                  title: translations.ourValues.values[2].title,
                  description: translations.ourValues.values[2].description,
                },
                {
                  icon: <CheckCircle className="h-8 w-8" />,
                  title: translations.ourValues.values[3].title,
                  description: translations.ourValues.values[3].description,
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
            <h2 className="text-3xl font-bold mb-4 text-blue-500">{translations.cta.title}</h2>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              {translations.cta.description}
            </p>
            <Link href="/get-started">
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 rounded-full text-lg">
                {translations.cta.button}
              </Button>
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

export const dynamic = 'force-static'

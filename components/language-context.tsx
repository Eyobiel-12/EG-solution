"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = {
  code: string
  name: string
  flag: string
}

type LanguageContextType = {
  currentLanguage: string
  languages: Language[]
  changeLanguage: (code: string) => void
  t: (key: string, fallback: string) => string
}

const defaultLanguages: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "nl", name: "Nederlands", flag: "🇳🇱" },
]

// Simple translations for demonstration
const translations: Record<string, Record<string, string>> = {
  en: {
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.portfolio": "Portfolio",
    "nav.about": "About",
    "nav.contact": "Contact",
    "cta.getStarted": "Get Started",
    "footer.newsletter": "Subscribe to Our Newsletter",
    "footer.emailPlaceholder": "Enter your email",
    "footer.subscribe": "Subscribe",
    "footer.subscribeSuccess": "Thank you for subscribing!",
    "footer.companyDescription": "Dream It, We Build It: Empowering Your Digital Dominance with premium web development and design services.",
    "footer.privacyPolicy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "services.webDev": "Web Development",
    "services.design": "Design & Branding",
    "services.ecommerce": "E-commerce",
    "services.seo": "SEO & Marketing",
    "portfolio.viewAll": "View All Projects",
    "portfolio.inDevelopment": "In Development",
    "portfolio.completed": "Completed",
    "portfolio.title": "Our Portfolio",
    "portfolio.subtitle": "Explore our recent projects and see how we've helped businesses transform their digital presence.",
    "getStarted.title": "Get Started with EG Web Solutions",
    "getStarted.subtitle": "Ready to elevate your digital presence? Let's create something amazing together.",
    "contact.title": "Get in Touch",
    "contact.subtitle": "Ready to elevate your digital presence? Contact us today to discuss your project.",
    "portfolio.project.luxuryFurniture.description": "Premium furniture e-commerce platform with 3D product visualization and seamless checkout experience.",
    "portfolio.project.mosoBasmara.description": "Restaurant website with online menu, reservation system, and event booking functionality.",
    "portfolio.project.savannaEetcafe.description": "Modern website for a popular café featuring online ordering and loyalty program integration.",
    "portfolio.project.axumRestaurant.description": "Elegant Ethiopian restaurant website showcasing ancient Axum heritage, featuring online reservations, digital menu, and authentic Ethiopian coffee ceremony experiences.",
    "portfolio.project.kapsalonStars.description": "Hair salon website with appointment booking system and service showcase.",
    "portfolio.project.habeshaDating.description": "A specialized dating platform for the Habesha community with cultural matching algorithms and secure messaging.",
    "portfolio.project.workManagement.description": "Comprehensive project management tool with task tracking, team collaboration, and performance analytics.",
    "portfolio.project.ecommercePlatform.description": "Full-featured online shopping experience with product management, secure payments, and inventory tracking.",
    "portfolio.project.healthcarePortal.description": "Comprehensive medical services platform for patient management, appointments, and secure health records.",
    "portfolio.project.realEstate.description": "Property listing and management platform with virtual tours, agent profiles, and mortgage calculator.",
    "portfolio.project.mosoBasmara.testimonial": "EG Web Solutions transformed our online presence. Our customers love the new reservation system!",
    "portfolio.project.axumRestaurant.testimonial": "EG Web Solutions perfectly captured our vision of blending ancient heritage with modern dining experience.",
    "portfolio.project.mosoBasmara.position": "Owner",
    "portfolio.project.axumRestaurant.position": "Management",
    "portfolio.project.luxuryFurniture.timeline": "Completed in 2023",
    "portfolio.project.mosoBasmara.timeline": "Completed in 2022",
    "portfolio.project.savannaEetcafe.timeline": "Completed in 2022",
    "portfolio.project.axumRestaurant.timeline": "Completed in 2025",
    "portfolio.project.kapsalonStars.timeline": "Completed in 2023",
    "portfolio.project.habeshaDating.timeline": "end of 2025",
    "portfolio.project.workManagement.timeline": "Completed in 2024",
    "portfolio.project.ecommercePlatform.timeline": "end of 2025",
    "portfolio.project.healthcarePortal.timeline": "end of 2025",
    "portfolio.project.realEstate.timeline": "end of 2025",
    "portfolio.featuredProjects": "Featured Projects",
    "portfolio.viewProject": "View Project",
    "portfolio.learnMore": "Learn More",
    "portfolio.visit": "Visit",
    "portfolio.details": "Details",
    "portfolio.completion": "Completion",
    "portfolio.projectOverview": "Project Overview",
    "portfolio.technologiesUsed": "Technologies Used",
    "portfolio.projectStatus": "Project Status",
    "portfolio.complete": "Complete",
    "portfolio.inProgress": "In Progress",
    "portfolio.projectTimeline": "Project Timeline",
    "portfolio.showSimpleTimeline": "Show Simple Timeline",
    "portfolio.showDetailedRoadmap": "Show Detailed Roadmap",
    "portfolio.technologyInfoNotAvailable": "Technology information not available",
    "portfolio.timeline": "Timeline",
    "portfolio.category": "Category",
    "portfolio.testimonial": "Testimonial",
    "portfolio.visitProject": "Visit Project",
    "portfolio.completionLabel": "Completion:",
    "portfolio.endOf2025": "end of 2025",
    "contact.info": "Contact Information",
    "contact.officeLocation": "Office Location",
    "contact.email": "Email",
    "contact.address": "YSM Web Office\nShared with Yohannes Hoveniersbedrijf\nZweedsestraat 8a, 16, 7418 BG Deventer",
    "contact.form.subject": "Subject",
    "contact.form.message": "Message",
    "contact.form.subjectPlaceholder": "Subject",
    "contact.form.messagePlaceholder": "Your message",
    "contact.form.sendMessage": "Send Message",
    "getStarted.goHome": "Go Home",
    "getStarted.returnToHomepage": "Return to Homepage",
    "getStarted.requestSubmitted": "Request Submitted Successfully!",
    "getStarted.requestSubmittedDesc": "Thank you for your interest in our services. We've received your project request and will get back to you within 24-48 hours.",
    "getStarted.whatHappensNext": "What happens next?",
    "getStarted.nextStep1": "Our team will review your project requirements",
    "getStarted.nextStep2": "We'll contact you to discuss details and provide a quote",
    "getStarted.nextStep3": "Once approved, we'll create a project timeline",
    "getStarted.needImmediateAssistance": "Need immediate assistance?",
    "getStarted.contactDirectly": "Feel free to contact us directly:",
    "getStarted.tellUsMore": "Tell us more about your project",
    "getStarted.provideDetails": "Provide some details to help us understand your requirements",
    "getStarted.projectDescription": "Project Description",
    "getStarted.projectDescriptionPlaceholder": "Describe your project, goals, and any specific requirements...",
    "getStarted.timeline": "When do you need this completed?",
    "getStarted.uploadReference": "Upload Reference Materials (Optional)",
    "getStarted.uploadInstructions": "Click to upload or drag and drop",
    "getStarted.uploadFormats": "PDF, PNG, JPG or DOCX (MAX. 10MB)",
    "getStarted.yourContactInfo": "Your Contact Information",
    "getStarted.letUsKnowHowToReach": "Let us know how to reach you",
    "getStarted.fullName": "Full Name",
    "getStarted.fullNamePlaceholder": "John Doe",
    "getStarted.emailAddress": "Email Address",
    "getStarted.emailAddressPlaceholder": "john@example.com",
    "getStarted.phoneNumber": "Phone Number",
    "getStarted.phoneNumberPlaceholder": "+1 (555) 123-4567",
    "getStarted.companyName": "Company Name",
    "getStarted.companyNamePlaceholder": "Company Inc.",
    "getStarted.additionalInfo": "Additional Information",
    "getStarted.additionalInfoPlaceholder": "Any other details you'd like to share...",
    "getStarted.reviewYourInfo": "Review Your Information",
    "getStarted.reviewInfoDesc": "Please review your information before submitting",
    "getStarted.projectDetails": "Project Details",
    "getStarted.contactInfo": "Contact Information",
    "getStarted.startOver": "Start Over",
    "getStarted.submitRequest": "Submit Request",
    "getStarted.submitting": "Submitting...",
    "getStarted.notProvided": "Not provided",
    "getStarted.nameRequired": "Name is required",
    "getStarted.emailRequired": "Email is required",
    "getStarted.emailInvalid": "Please enter a valid email",
    "getStarted.projectDescriptionRequired": "Project description is required",
    "getStarted.timelineRequired": "Timeline selection is required",
    "getStarted.failedToSend": "Failed to send your request: {error}. Please try again or contact us directly at 0687033774.",
    "getStarted.submit": "Submit",
    "getStarted.next": "Next",
    "getStarted.back": "Back",
  },
  nl: {
    "nav.home": "Home",
    "nav.services": "Diensten",
    "nav.portfolio": "Portfolio",
    "nav.about": "Over ons",
    "nav.contact": "Contact",
    "cta.getStarted": "Beginnen",
    "footer.newsletter": "Schrijf je in voor onze nieuwsbrief",
    "footer.emailPlaceholder": "Vul je e-mailadres in",
    "footer.subscribe": "Inschrijven",
    "footer.subscribeSuccess": "Bedankt voor je inschrijving!",
    "footer.companyDescription": "Droom het, Wij bouwen het: Versterk uw digitale aanwezigheid met premium webontwikkeling en design diensten.",
    "footer.privacyPolicy": "Privacybeleid",
    "footer.terms": "Servicevoorwaarden",
    "services.webDev": "Webontwikkeling",
    "services.design": "Design & Branding",
    "services.ecommerce": "E-commerce",
    "services.seo": "SEO & Marketing",
    "portfolio.viewAll": "Bekijk alle projecten",
    "portfolio.inDevelopment": "In ontwikkeling",
    "portfolio.completed": "Voltooid",
    "portfolio.title": "Ons Portfolio",
    "portfolio.subtitle": "Ontdek onze recente projecten en zie hoe we bedrijven hebben geholpen hun digitale aanwezigheid te transformeren.",
    "getStarted.title": "Begin met EG Web Solutions",
    "getStarted.subtitle": "Klaar om uw digitale aanwezigheid te verbeteren? Laten we samen iets geweldigs creëren.",
    "contact.title": "Neem Contact Op",
    "contact.subtitle": "Klaar om uw digitale aanwezigheid te verbeteren? Neem vandaag nog contact met ons op om uw project te bespreken.",
    "portfolio.project.luxuryFurniture.description": "Premium meubel e-commerce platform met 3D productvisualisatie en naadloze checkout-ervaring.",
    "portfolio.project.mosoBasmara.description": "Restaurantwebsite met online menu, reserveringssysteem en evenementboekingsfunctionaliteit.",
    "portfolio.project.savannaEetcafe.description": "Moderne website voor een populair café met online bestellingen en loyaliteitsprogramma-integratie.",
    "portfolio.project.axumRestaurant.description": "Elegante Ethiopische restaurantwebsite die het oude Axum-erfgoed toont, met online reserveringen, digitaal menu en authentieke Ethiopische koffiecermonie-ervaringen.",
    "portfolio.project.kapsalonStars.description": "Kapsalonwebsite met afsprakensysteem en serviceoverzicht.",
    "portfolio.project.habeshaDating.description": "Een gespecialiseerd datingsplatform voor de Habesha-gemeenschap met culturele matchingsalgoritmen en beveiligde berichten.",
    "portfolio.project.workManagement.description": "Uitgebreide projectmanagementtool met taakbeheer, team samenwerking en prestatie-analyse.",
    "portfolio.project.ecommercePlatform.description": "Volledig uitgeruste online winkelervaring met productbeheer, veilige betalingen en voorraadbeheer.",
    "portfolio.project.healthcarePortal.description": "Uitgebreid medisch dienstenplatform voor patiëntbeheer, afspraken en beveiligde medische dossiers.",
    "portfolio.project.realEstate.description": "Platform voor vastgoedvermeldingen en -beheer met virtuele rondleidingen, makelaarsprofielen en hypotheekcalculator.",
    "portfolio.project.mosoBasmara.testimonial": "EG Web Solutions heeft onze online aanwezigheid getransformeerd. Onze klanten zijn dol op het nieuwe reserveringssysteem!",
    "portfolio.project.axumRestaurant.testimonial": "EG Web Solutions heeft onze visie perfect vastgelegd van het combineren van oud erfgoed met moderne eetervaring.",
    "portfolio.project.mosoBasmara.position": "Eigenaar",
    "portfolio.project.axumRestaurant.position": "Management",
    "portfolio.project.luxuryFurniture.timeline": "Voltooid in 2023",
    "portfolio.project.mosoBasmara.timeline": "Voltooid in 2022",
    "portfolio.project.savannaEetcafe.timeline": "Voltooid in 2022",
    "portfolio.project.axumRestaurant.timeline": "Voltooid in 2025",
    "portfolio.project.kapsalonStars.timeline": "Voltooid in 2023",
    "portfolio.project.habeshaDating.timeline": "eind 2025",
    "portfolio.project.workManagement.timeline": "Voltooid in 2024",
    "portfolio.project.ecommercePlatform.timeline": "eind 2025",
    "portfolio.project.healthcarePortal.timeline": "eind 2025",
    "portfolio.project.realEstate.timeline": "eind 2025",
    "portfolio.featuredProjects": "Uitgelichte Projecten",
    "portfolio.viewProject": "Bekijk Project",
    "portfolio.learnMore": "Meer Informatie",
    "portfolio.visit": "Bezoek",
    "portfolio.details": "Details",
    "portfolio.completion": "Voltooiing",
    "portfolio.projectOverview": "Projectoverzicht",
    "portfolio.technologiesUsed": "Gebruikte Technologieën",
    "portfolio.projectStatus": "Projectstatus",
    "portfolio.complete": "Voltooid",
    "portfolio.inProgress": "In uitvoering",
    "portfolio.projectTimeline": "Projecttijdlijn",
    "portfolio.showSimpleTimeline": "Toon Eenvoudige Tijdlijn",
    "portfolio.showDetailedRoadmap": "Toon Gedetailleerde Roadmap",
    "portfolio.technologyInfoNotAvailable": "Technologie-informatie niet beschikbaar",
    "portfolio.timeline": "Tijdlijn",
    "portfolio.category": "Categorie",
    "portfolio.testimonial": "Getuigenis",
    "portfolio.visitProject": "Bezoek Project",
    "portfolio.completionLabel": "Voltooiing:",
    "portfolio.endOf2025": "eind 2025",
    "contact.info": "Contactinformatie",
    "contact.officeLocation": "Kantoorlocatie",
    "contact.email": "E-mail",
    "contact.address": "YSM Web Office\nGedeeld met Yohannes Hoveniersbedrijf\nZweedsestraat 8a, 16, 7418 BG Deventer",
    "contact.form.subject": "Onderwerp",
    "contact.form.message": "Bericht",
    "contact.form.subjectPlaceholder": "Onderwerp",
    "contact.form.messagePlaceholder": "Uw bericht",
    "contact.form.sendMessage": "Bericht Versturen",
    "getStarted.goHome": "Ga naar Home",
    "getStarted.returnToHomepage": "Terug naar Startpagina",
    "getStarted.requestSubmitted": "Aanvraag Succesvol Verzonden!",
    "getStarted.requestSubmittedDesc": "Bedankt voor je interesse in onze diensten. We hebben je projectaanvraag ontvangen en nemen binnen 24-48 uur contact met je op.",
    "getStarted.whatHappensNext": "Wat gebeurt er nu?",
    "getStarted.nextStep1": "Ons team beoordeelt je projectvereisten",
    "getStarted.nextStep2": "We nemen contact met je op om details te bespreken en een offerte te geven",
    "getStarted.nextStep3": "Na goedkeuring maken we een projecttijdlijn",
    "getStarted.needImmediateAssistance": "Direct hulp nodig?",
    "getStarted.contactDirectly": "Neem gerust direct contact met ons op:",
    "getStarted.tellUsMore": "Vertel ons meer over je project",
    "getStarted.provideDetails": "Geef wat details zodat we je wensen begrijpen",
    "getStarted.projectDescription": "Projectbeschrijving",
    "getStarted.projectDescriptionPlaceholder": "Beschrijf je project, doelen en eventuele specifieke wensen...",
    "getStarted.timeline": "Wanneer moet dit klaar zijn?",
    "getStarted.uploadReference": "Upload Referentiemateriaal (optioneel)",
    "getStarted.uploadInstructions": "Klik om te uploaden of sleep bestanden hierheen",
    "getStarted.uploadFormats": "PDF, PNG, JPG of DOCX (MAX. 10MB)",
    "getStarted.yourContactInfo": "Jouw Contactgegevens",
    "getStarted.letUsKnowHowToReach": "Laat ons weten hoe we je kunnen bereiken",
    "getStarted.fullName": "Volledige Naam",
    "getStarted.fullNamePlaceholder": "Jan Jansen",
    "getStarted.emailAddress": "E-mailadres",
    "getStarted.emailAddressPlaceholder": "jan@voorbeeld.com",
    "getStarted.phoneNumber": "Telefoonnummer",
    "getStarted.phoneNumberPlaceholder": "+31 6 1234 5678",
    "getStarted.companyName": "Bedrijfsnaam",
    "getStarted.companyNamePlaceholder": "Bedrijf BV",
    "getStarted.additionalInfo": "Aanvullende Informatie",
    "getStarted.additionalInfoPlaceholder": "Andere details die je wilt delen...",
    "getStarted.reviewYourInfo": "Controleer je gegevens",
    "getStarted.reviewInfoDesc": "Controleer je gegevens voordat je verzendt",
    "getStarted.projectDetails": "Projectdetails",
    "getStarted.contactInfo": "Contactinformatie",
    "getStarted.startOver": "Opnieuw Beginnen",
    "getStarted.submitRequest": "Verzoek Verzenden",
    "getStarted.submitting": "Verzenden...",
    "getStarted.notProvided": "Niet opgegeven",
    "getStarted.nameRequired": "Naam is verplicht",
    "getStarted.emailRequired": "E-mail is verplicht",
    "getStarted.emailInvalid": "Voer een geldig e-mailadres in",
    "getStarted.projectDescriptionRequired": "Projectbeschrijving is verplicht",
    "getStarted.timelineRequired": "Tijdlijnselectie is verplicht",
    "getStarted.failedToSend": "Verzenden mislukt: {error}. Probeer het opnieuw of neem direct contact op via 0687033774.",
    "getStarted.submit": "Verzenden",
    "getStarted.next": "Volgende",
    "getStarted.back": "Terug",
  },
}

const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: "en",
  languages: defaultLanguages,
  changeLanguage: () => {},
  t: (key, fallback) => fallback,
})

export const useLanguage = () => useContext(LanguageContext)

type LanguageProviderProps = {
  children: ReactNode
  initialLanguage?: string
}

export function LanguageProvider({ children, initialLanguage = "en" }: LanguageProviderProps) {
  const [currentLanguage, setCurrentLanguage] = useState(initialLanguage)

  // Load language preference from localStorage on initial render
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage)
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.split("-")[0]
      const isSupported = defaultLanguages.some((lang) => lang.code === browserLang)
      if (isSupported) {
        setCurrentLanguage(browserLang)
      }
    }
  }, [])

  const changeLanguage = (code: string) => {
    setCurrentLanguage(code)
    localStorage.setItem("language", code)
    // Update HTML lang attribute
    document.documentElement.lang = code
  }

  // Translation function
  const t = (key: string, fallback: string): string => {
    if (!translations[currentLanguage]) {
      return fallback
    }
    return translations[currentLanguage][key] || fallback
  }

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        languages: defaultLanguages,
        changeLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

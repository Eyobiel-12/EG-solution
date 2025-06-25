"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ExternalLink, Code, Calendar, Tag, X, ChevronRight, Star, Clock, CheckCircle2, Hourglass } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import ProjectTimeline from "@/components/project-timeline"
import DetailedRoadmap from "@/components/detailed-roadmap"
import TechIcon from "@/components/tech-icon"
import TechStackDisplay from "@/components/tech-stack-display"
import { useLanguage } from "@/components/language-context"

interface Project {
  id: string
  title: string
  url: string
  type: string
  description?: string
  status?: string
  image?: string
  technologies?: string[]
  completionPercentage?: number
  featured?: boolean
  testimonial?: {
    text: string
    author: string
    position: string
  }
  timeline?: string
}

interface PortfolioSectionProps {
  portfolioRef: React.RefObject<HTMLDivElement>
}

export default function PortfolioSection({ portfolioRef }: PortfolioSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [visibleProjects, setVisibleProjects] = useState<number>(6)
  const [showDetailedRoadmap, setShowDetailedRoadmap] = useState<boolean>(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const { currentLanguage, t } = useLanguage()

  // Define the default stack for restaurant projects
  const restaurantTechStack = [
    "Next.js",
    "Supabase",
    "EmailJS",
    "Tailwind CSS",
    "TypeScript",
  ]

  // List of projects
  let projects: Project[] = [
    {
      id: "luxury-furniture",
      title: "BSM Furniture",
      url: "https://v0-luxurious-website-design-swart.vercel.app/",
      type: "E-commerce",
      description:
        "Premium furniture e-commerce platform with 3D product visualization and seamless checkout experience.",
      image: "/images/bsm-furniture-logo.jpeg",
      technologies: ["Next.js", "JavaScript", "CSS", "Bootstrap", "MongoDB"],
      completionPercentage: 100,
      featured: true,
      timeline: "Completed in 2023",
    },
    {
      id: "moso-basmara",
      title: "Moso Basmara",
      url: "https://www.mosobasmara.com/",
      type: "Restaurant",
      description: "Restaurant website with online menu, reservation system, and event booking functionality.",
      image: "/images/mosob-asmara-logo.jpeg",
      testimonial: {
        text: "EG Web Solutions transformed our online presence. Our customers love the new reservation system!",
        author: "Moso Basmara",
        position: "Owner",
      },
      completionPercentage: 100,
      timeline: "Completed in 2022",
    },
    {
      id: "savanna-eetcafe",
      title: "Savanna Eetcafe",
      url: "https://www.savannaeetcafe.nl/",
      type: "Restaurant",
      description: "Modern website for a popular café featuring online ordering and loyalty program integration.",
      image: "/images/savanna-eetcafe-logo.png",
      completionPercentage: 100,
      timeline: "Completed in 2022",
    },
    {
      id: "axum-restaurant",
      title: "Axum Restaurant",
      url: "https://www.aksumrestaurant.nl",
      type: "Restaurant",
      description: "Elegant Ethiopian restaurant website showcasing ancient Axum heritage, featuring online reservations, digital menu, and authentic Ethiopian coffee ceremony experiences.",
      image: "/images/axum-logo.jpg",
      technologies: restaurantTechStack,
      completionPercentage: 100,
      featured: true,
      testimonial: {
        text: "EG Web Solutions perfectly captured our vision of blending ancient heritage with modern dining experience.",
        author: "Axum Restaurant",
        position: "Management",
      },
      timeline: "Completed in 2025",
    },
    {
      id: "kapsalon-stars",
      title: "Kapsalon Stars",
      url: "https://kapsalonstars.nl/",
      type: "Hair Salon",
      description: "Hair salon website with appointment booking system and service showcase.",
      image: "https://kapsalonstars.nl/logo.png",
      technologies: ["Next.js", "JavaScript", "Bootstrap", "SQLite"],
      completionPercentage: 100,
      timeline: "Completed in 2023",
    },
    {
      id: "habesha-dating",
      title: "Habesha Dating Site",
      url: "#",
      type: "Social Platform",
      description:
        "A specialized dating platform for the Habesha community with cultural matching algorithms and secure messaging.",
      status: "In Development",
      image: "/images/habesha-dating-logo.jpeg",
      technologies: ["React Native", "Next.js", "JavaScript", "MongoDB", "Firebase"],
      completionPercentage: 65,
      featured: true,
      timeline: "end of 2025",
    },
    {
      id: "work-management",
      title: "Work Management System",
      url: "https://yohannes-fina.vercel.app/auth/login",
      type: "Business Solution",
      description:
        "Comprehensive project management tool with task tracking, team collaboration, and performance analytics.",
      image: "/images/managment.png",
      technologies: [
        "Next.js",
        "React",
        "Firebase",
        "Supabase",
        "MySQL",
        "MongoDB",
        "Laravel",
        "TailwindCSS",
      ],
      completionPercentage: 100,
      timeline: "Completed in 2024",
    },
    {
      id: "ecommerce-platform",
      title: "E-commerce Platform",
      url: "#",
      type: "E-commerce",
      description:
        "Full-featured online shopping experience with product management, secure payments, and inventory tracking.",
      status: "In Development",
      image: "/placeholder.svg?height=600&width=800",
      technologies: ["Next.js", "React Native", "JavaScript", "Supabase", "Firebase"],
      completionPercentage: 75,
      timeline: "end of 2025",
    },
    {
      id: "healthcare-portal",
      title: "Healthcare Portal",
      url: "#",
      type: "Healthcare",
      description:
        "Comprehensive medical services platform for patient management, appointments, and secure health records.",
      status: "In Development",
      image: "/placeholder.svg?height=600&width=800",
      technologies: ["React Native", "Next.js", "JavaScript", "MongoDB", "Bootstrap"],
      completionPercentage: 50,
      timeline: "end of 2025",
    },
    {
      id: "real-estate",
      title: "Real Estate Website",
      url: "#",
      type: "Real Estate",
      description:
        "Property listing and management platform with virtual tours, agent profiles, and mortgage calculator.",
      status: "In Development",
      image: "/placeholder.svg?height=600&width=800",
      technologies: ["Next.js", "JavaScript", "CSS", "SQLite", "Supabase"],
      completionPercentage: 30,
      timeline: "end of 2025",
    },
  ]

  // Ensure all restaurant projects have the correct tech stack
  projects = projects.map((project) =>
    project.type === "Restaurant"
      ? { ...project, technologies: restaurantTechStack }
      : project
  )

  const categories = ["all", ...Array.from(new Set(projects.map((project) => project.type)))]

  const filteredProjects =
    selectedCategory === "all" ? projects : projects.filter((project) => project.type === selectedCategory)

  const displayedProjects = filteredProjects.slice(0, visibleProjects)
  const featuredProjects = projects.filter((project) => project.featured)

  const handleLoadMore = () => {
    setVisibleProjects((prev) => Math.min(prev + 3, filteredProjects.length))
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setVisibleProjects(6) // Reset visible projects when changing category
  }

  const openProjectModal = (project: Project) => {
    setSelectedProject(project)
    document.body.style.overflow = "hidden"
  }

  const closeProjectModal = () => {
    setSelectedProject(null)
    setShowDetailedRoadmap(false)
    document.body.style.overflow = "auto"
  }

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeProjectModal()
      }
    }

    if (selectedProject) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [selectedProject])

  // Get status badge color
  const getStatusColor = (status?: string) => {
    if (!status) return "bg-green-100 text-green-800"
    if (status === "In Development") return "bg-amber-100 text-amber-800"
    return "bg-blue-100 text-blue-800"
  }

  // Status text translations
  const getStatusText = (status?: string) => {
    if (!status) return t("portfolio.completed", "Completed");
    return t("portfolio.inDevelopment", "In Development");
  };

  // Category translations
  const getCategoryText = (category: string) => {
    switch(category.toLowerCase()) {
      case "all": return currentLanguage === "en" ? "All" : "Alle";
      case "restaurant": return currentLanguage === "en" ? "Restaurant" : "Restaurant";
      case "e-commerce": return "E-commerce";
      case "social platform": return currentLanguage === "en" ? "Social Platform" : "Sociaal Platform";
      case "business solution": return currentLanguage === "en" ? "Business Solution" : "Bedrijfsoplossing";
      case "healthcare": return currentLanguage === "en" ? "Healthcare" : "Gezondheidszorg";
      case "real estate": return currentLanguage === "en" ? "Real Estate" : "Vastgoed";
      case "hair salon": return currentLanguage === "en" ? "Hair Salon" : "Kapsalon";
      default: return category;
    }
  };

  // Update the categories display
  const displayCategories = categories.map(cat => ({
    value: cat,
    label: getCategoryText(cat)
  }));

  // Update status display in the project cards
  const ProjectStatus = ({ status, completionPercentage }: { status?: string; completionPercentage?: number }) => (
    <div className="flex items-center space-x-2">
      {status ? (
        <>
          <Hourglass className="h-4 w-4 text-yellow-500" />
          <span className="text-sm font-medium text-yellow-500">{getStatusText(status)}</span>
        </>
      ) : (
        <>
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <span className="text-sm font-medium text-green-500">{getStatusText()}</span>
        </>
      )}
      {typeof completionPercentage === 'number' && (
        <Progress value={completionPercentage} className="w-20" />
      )}
    </div>
  );

  // Update the view all text
  const viewAllText = t("portfolio.viewAll", "View All Projects");

  return (
    <section id="portfolio" ref={portfolioRef} className="py-20 bg-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-500">{t("portfolio.title", "Our Portfolio")}</h2>
          <div className="w-24 h-1 bg-blue-400 mx-auto mb-6"></div>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            {t("portfolio.subtitle", "Explore our recent projects and see how we've helped businesses transform their digital presence.")}
          </p>
        </motion.div>

        {/* Featured Projects Carousel */}
        {featuredProjects.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-6 text-center">{t("portfolio.featuredProjects", "Featured Projects")}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="relative h-[400px] w-full rounded-2xl overflow-hidden cursor-pointer group"
                  onClick={() => openProjectModal(project)}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                  transition={{
                    scale: { type: "spring", stiffness: 300, damping: 15 },
                    boxShadow: { duration: 0.2 },
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10"
                    initial={{ opacity: 0.7 }}
                    whileHover={{ opacity: 0.9 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    className="absolute inset-0 z-0"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.8 }}
                  >
                    <Image
                      src={project.image || "/placeholder.svg?height=600&width=800"}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20 text-white">
                    <div className="flex items-center mb-3">
                      <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                        <Badge className="bg-blue-500 hover:bg-blue-600">{project.type}</Badge>
                      </motion.div>
                      {project.status && (
                        <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }} className="ml-2">
                          <Badge className={cn(getStatusColor(project.status))}>{project.status}</Badge>
                        </motion.div>
                      )}
                    </div>
                    <motion.h4
                      className="text-2xl md:text-3xl font-bold mb-2 transform origin-left"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {project.title}
                    </motion.h4>
                    <motion.p
                      className="text-gray-200 mb-4 max-w-2xl line-clamp-2 md:line-clamp-3"
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {project.description}
                    </motion.p>

                    {project.technologies && (
                      <motion.div
                        className="mb-4 hidden md:block"
                        initial={{ opacity: 0.7, y: 10 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <TechStackDisplay technologies={project.technologies} interactive={false} />
                      </motion.div>
                    )}

                    {project.completionPercentage !== undefined && project.completionPercentage < 100 && (
                      <motion.div
                        className="mb-4"
                        initial={{ opacity: 0.8 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex justify-between text-sm mb-1">
                          <span>{t("portfolio.completion", "Completion")}</span>
                          <span>{project.completionPercentage}%</span>
                        </div>
                        <Progress value={project.completionPercentage} className="h-2 bg-gray-700" />
                      </motion.div>
                    )}

                    <motion.div
                      initial={{ y: 5, opacity: 0.9 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Button
                        className="bg-blue-500 hover:bg-blue-600 text-white group/btn overflow-hidden relative"
                        onClick={(e) => {
                          e.stopPropagation()
                          if (project.url !== "#") {
                            window.open(project.url, "_blank")
                          } else {
                            openProjectModal(project)
                          }
                        }}
                      >
                        <motion.span
                          className="absolute inset-0 bg-blue-600"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                        <span className="relative z-10 flex items-center">
                          {project.url !== "#" ? t("portfolio.viewProject", "View Project") : t("portfolio.learnMore", "Learn More")}
                          <motion.span
                            className="inline-block ml-2"
                            whileHover={{ x: 3 }}
                            transition={{ repeat: Number.POSITIVE_INFINITY, repeatType: "mirror", duration: 0.6 }}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </motion.span>
                        </span>
                      </Button>
                    </motion.div>
                  </div>

                  {/* Animated corner accent */}
                  <motion.div
                    className="absolute top-0 right-0 w-16 h-16 bg-blue-500 z-10"
                    style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
                    initial={{ opacity: 0, scale: 0 }}
                    whileHover={{ opacity: 0.8, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {displayCategories.map((category) => (
            <Button
              key={category.value}
              variant={selectedCategory === category.value ? "default" : "outline"}
              className={cn(
                "capitalize",
                selectedCategory === category.value
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "border-blue-200 text-blue-700 hover:border-blue-500",
              )}
              onClick={() => handleCategoryChange(category.value)}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {displayedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
                onClick={() => openProjectModal(project)}
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-blue-100 hover:border-blue-300 h-full flex flex-col cursor-pointer">
                  <div className="h-48 relative overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg?height=600&width=800"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                      <Badge className="bg-blue-500 hover:bg-blue-600">{project.type}</Badge>
                      {project.status && <Badge className={getStatusColor(project.status)}>{project.status}</Badge>}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {project.title}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {project.description || "A project by EG Web Solutions."}
                    </p>

                    {project.technologies && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <div key={tech} className="flex items-center">
                            <TechIcon name={tech} size="sm" className="mr-1" animateOnHover={true} />
                            <span className="text-xs text-gray-700">{tech}</span>
                          </div>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    {project.completionPercentage !== undefined && project.completionPercentage < 100 && (
                      <div className="mb-4">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>{t("portfolio.completion", "Completion")}</span>
                          <span>{project.completionPercentage}%</span>
                        </div>
                        <Progress value={project.completionPercentage} className="h-1.5" />
                      </div>
                    )}

                    <div className="mt-auto flex items-center justify-between">
                      {project.completionPercentage !== undefined && project.completionPercentage < 100 && (
                        <span className="text-sm text-gray-500">{t("portfolio.endOf2025", "end of 2025")}</span>
                      )}
                      {project.completionPercentage === 100 && <span className="text-sm text-gray-500"></span>}

                      {project.id !== 'work-management' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-500 hover:text-blue-700 p-0"
                          onClick={(e) => {
                            e.stopPropagation()
                            if (project.url !== "#") {
                              window.open(project.url, "_blank")
                            }
                          }}
                        >
                          {project.url !== "#" ? (
                            <>
                              {t("portfolio.visit", "Visit")} <ExternalLink className="ml-1 h-3 w-3" />
                            </>
                          ) : (
                            <>
                              {t("portfolio.details", "Details")} <ChevronRight className="ml-1 h-3 w-3" />
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Load More Button */}
        {visibleProjects < filteredProjects.length && (
          <div className="mt-12 text-center">
            <Button
              onClick={handleLoadMore}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full"
            >
              {viewAllText}
            </Button>
          </div>
        )}

        {/* Project Detail Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 overflow-y-auto"
            >
              <motion.div
                ref={modalRef}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="relative h-64 md:h-80">
                  <Image
                    src={selectedProject.image || "/placeholder.svg?height=600&width=800"}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                  />
                  <button
                    onClick={closeProjectModal}
                    className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                  >
                    <X className="h-5 w-5" />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Badge className="bg-blue-500 hover:bg-blue-600">{selectedProject.type}</Badge>
                      {selectedProject.status && (
                        <Badge className={getStatusColor(selectedProject.status)}>{selectedProject.status}</Badge>
                      )}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white">{selectedProject.title}</h3>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                      <h4 className="text-xl font-bold mb-4">{t("portfolio.projectOverview", "Project Overview")}</h4>
                      <p className="text-gray-700 dark:text-gray-300 mb-6">{selectedProject.description}</p>

                      {selectedProject.technologies && (
                        <div className="mb-6">
                          <h4 className="font-medium mb-3">{t("portfolio.technologiesUsed", "Technologies Used")}</h4>
                          <TechStackDisplay technologies={selectedProject.technologies} />
                        </div>
                      )}

                      {selectedProject.completionPercentage !== undefined && (
                        <div className="mb-6">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium flex items-center">
                              <Clock className="mr-2 h-5 w-5 text-blue-500" />
                              {t("portfolio.projectStatus", "Project Status")}
                            </h4>
                            <span
                              className={cn(
                                "text-sm font-medium px-2 py-1 rounded-full",
                                selectedProject.completionPercentage === 100
                                  ? "bg-green-100 text-green-800"
                                  : "bg-amber-100 text-amber-800",
                              )}
                            >
                              {selectedProject.completionPercentage === 100 ? (
                                <span className="flex items-center">
                                  <CheckCircle2 className="mr-1 h-3 w-3" /> {t("portfolio.complete", "Complete")}
                                </span>
                              ) : (
                                <span className="flex items-center">
                                  <Hourglass className="mr-1 h-3 w-3" /> {t("portfolio.inProgress", "In Progress")}
                                </span>
                              )}
                            </span>
                          </div>
                          <Progress value={selectedProject.completionPercentage} className="h-2" />
                          <div className="flex justify-between text-sm text-gray-500 mt-1">
                            <span>{t("portfolio.completionLabel", "Completion:")} {selectedProject.completionPercentage}%</span>
                            {selectedProject.completionPercentage < 100 && <span>{t("portfolio.endOf2025", "end of 2025")}</span>}
                          </div>
                        </div>
                      )}

                      {/* Toggle between simple timeline and detailed roadmap */}
                      {selectedProject.completionPercentage !== undefined &&
                        selectedProject.completionPercentage < 100 && (
                          <div className="mb-6">
                            <div className="flex justify-between items-center mb-4">
                              <h4 className="font-medium">{t("portfolio.projectTimeline", "Project Timeline")}</h4>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setShowDetailedRoadmap(!showDetailedRoadmap)}
                                className="text-xs"
                              >
                                {showDetailedRoadmap ? t("portfolio.showSimpleTimeline", "Show Simple Timeline") : t("portfolio.showDetailedRoadmap", "Show Detailed Roadmap")}
                              </Button>
                            </div>

                            {showDetailedRoadmap ? (
                              <DetailedRoadmap
                                projectId={selectedProject.id}
                                projectTitle={selectedProject.title}
                                completionPercentage={selectedProject.completionPercentage}
                              />
                            ) : (
                              <ProjectTimeline completionPercentage={selectedProject.completionPercentage} />
                            )}
                          </div>
                        )}

                      {selectedProject.testimonial && (
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6 relative">
                          <div className="absolute -top-3 -left-3 text-blue-500">
                            <Star className="h-6 w-6 fill-blue-500" />
                          </div>
                          <p className="italic text-gray-700 dark:text-gray-300 mb-3">
                            "{selectedProject.testimonial.text}"
                          </p>
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-bold">
                              {selectedProject.testimonial.author.charAt(0)}
                            </div>
                            <div className="ml-2">
                              <p className="font-medium">{selectedProject.testimonial.author}</p>
                              <p className="text-sm text-gray-500">{selectedProject.testimonial.position}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {selectedProject.id !== 'work-management' && selectedProject.url !== "#" && (
                        <div className="mt-6">
                          <Button
                            className="bg-blue-500 hover:bg-blue-600 text-white"
                            onClick={() => window.open(selectedProject.url, "_blank")}
                          >
                            {t("portfolio.visitProject", "Visit Project")} <ExternalLink className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                        <h4 className="font-bold mb-4 flex items-center">
                          <Code className="mr-2 h-5 w-5 text-blue-500" />
                          {t("portfolio.technologiesUsed", "Technologies")}
                        </h4>
                        {selectedProject.technologies ? (
                          <div className="flex flex-wrap gap-2">
                            {selectedProject.technologies.map((tech) => (
                              <div
                                key={tech}
                                className="flex items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 py-1 rounded-full"
                              >
                                <TechIcon name={tech} size="sm" className="mr-1.5" animateOnLoad={true} />
                                <span className="text-sm">{tech}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500">{t("portfolio.technologyInfoNotAvailable", "Technology information not available")}</p>
                        )}
                      </div>

                      {selectedProject.completionPercentage !== undefined &&
                        selectedProject.completionPercentage < 100 && (
                          <div className="mt-6 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                            <h4 className="font-bold mb-4 flex items-center">
                              <Calendar className="mr-2 h-5 w-5 text-blue-500" />
                              {t("portfolio.timeline", "Timeline")}
                            </h4>
                            <p className="text-gray-700 dark:text-gray-300">{t(`portfolio.project.${selectedProject.id}.timeline`, selectedProject.timeline || "")}</p>
                          </div>
                        )}

                      <div className="mt-6 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                        <h4 className="font-bold mb-4 flex items-center">
                          <Tag className="mr-2 h-5 w-5 text-blue-500" />
                          {t("portfolio.category", "Category")}
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300">{selectedProject.type}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

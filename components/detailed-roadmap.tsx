"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Clock, Flag, ChevronDown, ChevronUp, AlertCircle, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"

interface Deliverable {
  id: string
  title: string
  description: string
  status: "completed" | "in-progress" | "pending"
  completionPercentage?: number
  dueDate: string
}

interface Milestone {
  id: string
  title: string
  description: string
  period: string
  status: "completed" | "in-progress" | "pending"
  deliverables: Deliverable[]
}

interface DetailedRoadmapProps {
  projectId: string
  projectTitle: string
  completionPercentage: number
  className?: string
}

export default function DetailedRoadmap({
  projectId,
  projectTitle,
  completionPercentage,
  className,
}: DetailedRoadmapProps) {
  const [expandedMilestones, setExpandedMilestones] = useState<Record<string, boolean>>({})

  // Toggle milestone expansion
  const toggleMilestone = (id: string) => {
    setExpandedMilestones((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  // Calculate current date position in timeline (from Jan 2024 to Dec 2025)
  const startDate = new Date(2024, 0, 1).getTime() // Jan 1, 2024
  const endDate = new Date(2025, 11, 31).getTime() // Dec 31, 2025
  const currentDate = new Date().getTime()

  // Calculate position percentage (capped between 0-100)
  const timelinePosition = Math.min(100, Math.max(0, ((currentDate - startDate) / (endDate - startDate)) * 100))

  // Define project roadmap with detailed milestones and deliverables
  const roadmap: Milestone[] = [
    {
      id: "discovery",
      title: "Discovery & Planning",
      description: "Requirements gathering, research, and project planning",
      period: "Q1 2024 (Jan-Mar)",
      status: timelinePosition >= 15 ? "completed" : "pending",
      deliverables: [
        {
          id: "req-doc",
          title: "Requirements Document",
          description: "Comprehensive documentation of project requirements and specifications",
          status: timelinePosition >= 10 ? "completed" : "pending",
          dueDate: "January 31, 2024",
        },
        {
          id: "user-research",
          title: "User Research & Personas",
          description: "Target audience analysis and creation of user personas",
          status: timelinePosition >= 12 ? "completed" : "pending",
          dueDate: "February 15, 2024",
        },
        {
          id: "project-plan",
          title: "Project Plan & Timeline",
          description: "Detailed project schedule with milestones and resource allocation",
          status: timelinePosition >= 15 ? "completed" : "pending",
          dueDate: "March 1, 2024",
        },
        {
          id: "tech-stack",
          title: "Technology Stack Selection",
          description: "Finalization of technologies and frameworks to be used",
          status: timelinePosition >= 15 ? "completed" : "pending",
          dueDate: "March 15, 2024",
        },
      ],
    },
    {
      id: "design",
      title: "Design & Prototyping",
      description: "UI/UX design, wireframing, and interactive prototyping",
      period: "Q2 2024 (Apr-Jun)",
      status: timelinePosition >= 30 ? "completed" : timelinePosition >= 20 ? "in-progress" : "pending",
      deliverables: [
        {
          id: "wireframes",
          title: "Wireframes",
          description: "Low-fidelity wireframes for all key screens and user flows",
          status: timelinePosition >= 25 ? "completed" : timelinePosition >= 20 ? "in-progress" : "pending",
          completionPercentage: timelinePosition >= 25 ? 100 : timelinePosition >= 20 ? 70 : 0,
          dueDate: "April 30, 2024",
        },
        {
          id: "ui-design",
          title: "UI Design System",
          description: "Visual design system including color palette, typography, and components",
          status: timelinePosition >= 28 ? "completed" : timelinePosition >= 22 ? "in-progress" : "pending",
          completionPercentage: timelinePosition >= 28 ? 100 : timelinePosition >= 22 ? 60 : 0,
          dueDate: "May 15, 2024",
        },
        {
          id: "hi-fi-mockups",
          title: "High-Fidelity Mockups",
          description: "Detailed visual designs for all screens and states",
          status: timelinePosition >= 30 ? "completed" : timelinePosition >= 25 ? "in-progress" : "pending",
          completionPercentage: timelinePosition >= 30 ? 100 : timelinePosition >= 25 ? 50 : 0,
          dueDate: "June 1, 2024",
        },
        {
          id: "prototype",
          title: "Interactive Prototype",
          description: "Clickable prototype demonstrating core user flows and interactions",
          status: timelinePosition >= 30 ? "completed" : timelinePosition >= 28 ? "in-progress" : "pending",
          completionPercentage: timelinePosition >= 30 ? 100 : timelinePosition >= 28 ? 40 : 0,
          dueDate: "June 30, 2024",
        },
      ],
    },
    {
      id: "development-core",
      title: "Core Development",
      description: "Implementation of core functionality and features",
      period: "Q3-Q4 2024 (Jul-Dec)",
      status: timelinePosition >= 60 ? "completed" : timelinePosition >= 35 ? "in-progress" : "pending",
      deliverables: [
        {
          id: "frontend-foundation",
          title: "Frontend Foundation",
          description: "Base application structure, routing, and core components",
          status: timelinePosition >= 45 ? "completed" : timelinePosition >= 35 ? "in-progress" : "pending",
          completionPercentage: timelinePosition >= 45 ? 100 : timelinePosition >= 35 ? 80 : 0,
          dueDate: "August 15, 2024",
        },
        {
          id: "backend-api",
          title: "Backend API Development",
          description: "Server-side logic, database models, and API endpoints",
          status: timelinePosition >= 50 ? "completed" : timelinePosition >= 40 ? "in-progress" : "pending",
          completionPercentage: timelinePosition >= 50 ? 100 : timelinePosition >= 40 ? 70 : 0,
          dueDate: "September 30, 2024",
        },
        {
          id: "auth-system",
          title: "Authentication & Authorization",
          description: "User authentication, roles, and permissions system",
          status: timelinePosition >= 55 ? "completed" : timelinePosition >= 45 ? "in-progress" : "pending",
          completionPercentage: timelinePosition >= 55 ? 100 : timelinePosition >= 45 ? 60 : 0,
          dueDate: "October 31, 2024",
        },
        {
          id: "core-features",
          title: "Core Feature Implementation",
          description: "Development of primary application features and functionality",
          status: timelinePosition >= 60 ? "completed" : timelinePosition >= 50 ? "in-progress" : "pending",
          completionPercentage: timelinePosition >= 60 ? 100 : timelinePosition >= 50 ? 50 : 0,
          dueDate: "December 15, 2024",
        },
      ],
    },
    {
      id: "advanced-features",
      title: "Advanced Features & Integration",
      description: "Implementation of advanced features and third-party integrations",
      period: "Q1 2025 (Jan-Mar)",
      status: timelinePosition >= 75 ? "completed" : timelinePosition >= 60 ? "in-progress" : "pending",
      deliverables: [
        {
          id: "advanced-ui",
          title: "Advanced UI Components",
          description: "Complex interactive elements and data visualizations",
          status: timelinePosition >= 65 ? "completed" : timelinePosition >= 60 ? "in-progress" : "pending",
          completionPercentage: timelinePosition >= 65 ? 100 : timelinePosition >= 60 ? 40 : 0,
          dueDate: "January 31, 2025",
        },
        {
          id: "payment-integration",
          title: "Payment Processing Integration",
          description: "Integration with payment gateways and subscription management",
          status: timelinePosition >= 70 ? "completed" : timelinePosition >= 65 ? "in-progress" : "pending",
          completionPercentage: timelinePosition >= 70 ? 100 : timelinePosition >= 65 ? 30 : 0,
          dueDate: "February 15, 2025",
        },
        {
          id: "third-party-apis",
          title: "Third-Party API Integrations",
          description: "Integration with external services and data providers",
          status: timelinePosition >= 75 ? "completed" : timelinePosition >= 70 ? "in-progress" : "pending",
          completionPercentage: timelinePosition >= 75 ? 100 : timelinePosition >= 70 ? 20 : 0,
          dueDate: "March 15, 2025",
        },
      ],
    },
    {
      id: "testing-qa",
      title: "Testing & Quality Assurance",
      description: "Comprehensive testing, bug fixing, and performance optimization",
      period: "Q2 2025 (Apr-Jun)",
      status: timelinePosition >= 85 ? "completed" : timelinePosition >= 75 ? "in-progress" : "pending",
      deliverables: [
        {
          id: "unit-testing",
          title: "Unit & Integration Testing",
          description: "Automated tests for individual components and integrated systems",
          status: timelinePosition >= 80 ? "completed" : timelinePosition >= 75 ? "in-progress" : "pending",
          completionPercentage: timelinePosition >= 80 ? 100 : timelinePosition >= 75 ? 40 : 0,
          dueDate: "April 30, 2025",
        },
        {
          id: "user-testing",
          title: "User Acceptance Testing",
          description: "Testing with real users to validate functionality and usability",
          status: timelinePosition >= 83 ? "completed" : timelinePosition >= 80 ? "in-progress" : "pending",
          completionPercentage: timelinePosition >= 83 ? 100 : timelinePosition >= 80 ? 30 : 0,
          dueDate: "May 15, 2025",
        },
        {
          id: "performance-opt",
          title: "Performance Optimization",
          description: "Improving application speed, responsiveness, and resource usage",
          status: timelinePosition >= 85 ? "completed" : timelinePosition >= 83 ? "in-progress" : "pending",
          completionPercentage: timelinePosition >= 85 ? 100 : timelinePosition >= 83 ? 20 : 0,
          dueDate: "June 15, 2025",
        },
      ],
    },
    {
      id: "launch-support",
      title: "Launch & Post-Launch Support",
      description: "Final preparations, deployment, and post-launch maintenance",
      period: "Q3-Q4 2025 (Jul-Dec)",
      status: timelinePosition >= 100 ? "completed" : timelinePosition >= 85 ? "in-progress" : "pending",
      deliverables: [
        {
          id: "deployment-prep",
          title: "Deployment Preparation",
          description: "Environment setup, documentation, and launch checklist",
          status: timelinePosition >= 90 ? "completed" : timelinePosition >= 85 ? "in-progress" : "pending",
          completionPercentage: timelinePosition >= 90 ? 100 : timelinePosition >= 85 ? 50 : 0,
          dueDate: "August 31, 2025",
        },
        {
          id: "beta-launch",
          title: "Beta Launch",
          description: "Limited release to gather feedback before full launch",
          status: timelinePosition >= 95 ? "completed" : timelinePosition >= 90 ? "in-progress" : "pending",
          completionPercentage: timelinePosition >= 95 ? 100 : timelinePosition >= 90 ? 30 : 0,
          dueDate: "October 15, 2025",
        },
        {
          id: "full-launch",
          title: "Full Public Launch",
          description: "Official release of the complete application",
          status: timelinePosition >= 100 ? "completed" : timelinePosition >= 95 ? "in-progress" : "pending",
          completionPercentage: timelinePosition >= 100 ? 100 : timelinePosition >= 95 ? 20 : 0,
          dueDate: "November 30, 2025",
        },
        {
          id: "post-launch",
          title: "Post-Launch Support & Maintenance",
          description: "Ongoing support, bug fixes, and minor enhancements",
          status: "pending",
          completionPercentage: 0,
          dueDate: "December 31, 2025 onwards",
        },
      ],
    },
  ]

  // Get status color for badges
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
    }
  }

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4" />
      case "in-progress":
        return <Clock className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Calendar className="mr-2 h-5 w-5 text-blue-500" />
          <h3 className="font-bold text-lg">Project Roadmap</h3>
        </div>
        <div className="text-sm font-medium text-gray-500">
          Project: <span className="text-blue-600">{projectTitle}</span>
        </div>
      </div>

      {/* Overall progress */}
      <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-medium">Overall Progress</h4>
          <span className="text-sm font-bold">{completionPercentage}%</span>
        </div>
        <Progress value={completionPercentage} className="h-2" />

        <div className="mt-4 flex justify-between text-sm">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1 text-blue-500" />
            <span>Started: January 2024</span>
          </div>
          <div className="flex items-center">
            <Flag className="h-4 w-4 mr-1 text-green-500" />
            <span>Target: December 2025</span>
          </div>
        </div>
      </div>

      {/* Timeline progress bar */}
      <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-8">
        <div className="absolute h-full bg-blue-500 rounded-full" style={{ width: `${timelinePosition}%` }} />

        {/* Current date marker */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-red-500 rounded-full border-2 border-white dark:border-gray-800"
          style={{ left: `${timelinePosition}%`, transform: `translateX(-50%) translateY(-50%)` }}
        >
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">Today</span>
          </div>
        </div>
      </div>

      {/* Milestones with deliverables */}
      <div className="space-y-6">
        {roadmap.map((milestone, index) => (
          <div
            key={milestone.id}
            className={cn(
              "border rounded-lg overflow-hidden",
              milestone.status === "completed"
                ? "border-green-200 dark:border-green-900/30"
                : milestone.status === "in-progress"
                  ? "border-blue-200 dark:border-blue-900/30"
                  : "border-gray-200 dark:border-gray-700",
            )}
          >
            <div
              className={cn(
                "p-4 flex items-center justify-between cursor-pointer",
                milestone.status === "completed"
                  ? "bg-green-50 dark:bg-green-900/10"
                  : milestone.status === "in-progress"
                    ? "bg-blue-50 dark:bg-blue-900/10"
                    : "bg-gray-50 dark:bg-gray-800/50",
              )}
              onClick={() => toggleMilestone(milestone.id)}
            >
              <div className="flex items-center">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center mr-3",
                    milestone.status === "completed"
                      ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                      : milestone.status === "in-progress"
                        ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                        : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
                  )}
                >
                  {index + 1}
                </div>
                <div>
                  <h4 className="font-medium flex items-center">
                    {milestone.title}
                    <span className={cn("ml-2 text-xs px-2 py-0.5 rounded-full", getStatusColor(milestone.status))}>
                      <span className="flex items-center">
                        {getStatusIcon(milestone.status)}
                        <span className="ml-1 capitalize">{milestone.status.replace("-", " ")}</span>
                      </span>
                    </span>
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{milestone.period}</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-sm mr-2">
                  {milestone.deliverables.filter((d) => d.status === "completed").length} of{" "}
                  {milestone.deliverables.length} deliverables completed
                </span>
                {expandedMilestones[milestone.id] ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </div>
            </div>

            <AnimatePresence>
              {expandedMilestones[milestone.id] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-gray-700 dark:text-gray-300 mb-4">{milestone.description}</p>

                    <div className="space-y-4">
                      {milestone.deliverables.map((deliverable) => (
                        <div
                          key={deliverable.id}
                          className={cn(
                            "p-3 rounded-lg",
                            deliverable.status === "completed"
                              ? "bg-green-50 dark:bg-green-900/10"
                              : deliverable.status === "in-progress"
                                ? "bg-blue-50 dark:bg-blue-900/10"
                                : "bg-gray-50 dark:bg-gray-800/50",
                          )}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex items-center">
                              <div
                                className={cn(
                                  "w-6 h-6 rounded-full flex items-center justify-center mr-2",
                                  getStatusColor(deliverable.status),
                                )}
                              >
                                {getStatusIcon(deliverable.status)}
                              </div>
                              <h5 className="font-medium">{deliverable.title}</h5>
                            </div>
                            <span
                              className={cn("text-xs px-2 py-0.5 rounded-full", getStatusColor(deliverable.status))}
                            >
                              {deliverable.status === "completed"
                                ? "Completed"
                                : deliverable.status === "in-progress"
                                  ? "In Progress"
                                  : "Pending"}
                            </span>
                          </div>

                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 ml-8">
                            {deliverable.description}
                          </p>

                          <div className="flex justify-between items-center mt-3 ml-8">
                            <span className="text-xs text-gray-500">Due: {deliverable.dueDate}</span>

                            {deliverable.completionPercentage !== undefined && deliverable.status === "in-progress" && (
                              <div className="flex items-center w-1/3">
                                <span className="text-xs text-gray-500 mr-2">{deliverable.completionPercentage}%</span>
                                <Progress value={deliverable.completionPercentage} className="h-1.5 flex-grow" />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Estimated completion */}
      <div className="mt-8 flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <div className="flex items-center">
          <Flag className="h-5 w-5 text-blue-500 mr-2" />
          <span className="text-sm font-medium">Final Delivery</span>
        </div>
        <span className="text-sm font-bold">End of 2025</span>
      </div>
    </div>
  )
}

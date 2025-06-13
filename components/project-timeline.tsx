"use client"

import { motion } from "framer-motion"
import { Calendar, CheckCircle, Clock, Flag } from "lucide-react"
import { cn } from "@/lib/utils"

interface Milestone {
  date: string
  title: string
  description: string
  completed: boolean
}

interface ProjectTimelineProps {
  completionPercentage: number
  className?: string
}

export default function ProjectTimeline({ completionPercentage, className }: ProjectTimelineProps) {
  // Calculate current date position in timeline (from Jan 2024 to Dec 2025)
  const startDate = new Date(2024, 0, 1).getTime() // Jan 1, 2024
  const endDate = new Date(2025, 11, 31).getTime() // Dec 31, 2025
  const currentDate = new Date().getTime()

  // Calculate position percentage (capped between 0-100)
  const timelinePosition = Math.min(100, Math.max(0, ((currentDate - startDate) / (endDate - startDate)) * 100))

  // Define project milestones
  const milestones: Milestone[] = [
    {
      date: "Q1 2024",
      title: "Planning Phase",
      description: "Requirements gathering and project planning",
      completed: timelinePosition >= 15,
    },
    {
      date: "Q2 2024",
      title: "Design Phase",
      description: "UI/UX design and architecture",
      completed: timelinePosition >= 30,
    },
    {
      date: "Q4 2024",
      title: "Development Phase",
      description: "Core functionality implementation",
      completed: timelinePosition >= 60,
    },
    {
      date: "Q2 2025",
      title: "Testing Phase",
      description: "QA and user acceptance testing",
      completed: timelinePosition >= 80,
    },
    {
      date: "Q4 2025",
      title: "Launch Phase",
      description: "Final deployment and release",
      completed: false,
    },
  ]

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center mb-4">
        <Calendar className="mr-2 h-5 w-5 text-blue-500" />
        <h3 className="font-bold text-lg">Project Timeline</h3>
      </div>

      {/* Timeline progress bar */}
      <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-8">
        <div className="absolute h-full bg-blue-500 rounded-full" style={{ width: `${completionPercentage}%` }} />

        {/* Current date marker */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-red-500 rounded-full border-2 border-white dark:border-gray-800"
          style={{ left: `${timelinePosition}%`, transform: `translateX(-50%) translateY(-50%)` }}
        >
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">Today</span>
          </div>
        </div>

        {/* End date marker */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800">
          <div className="absolute -top-8 right-0 whitespace-nowrap">
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">End of 2025</span>
          </div>
        </div>
      </div>

      {/* Milestones */}
      <div className="space-y-6">
        {milestones.map((milestone, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex"
          >
            <div
              className={cn(
                "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-4",
                milestone.completed
                  ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400",
              )}
            >
              {milestone.completed ? <CheckCircle className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
            </div>
            <div>
              <div className="flex items-center">
                <h4 className="font-medium">{milestone.title}</h4>
                <span
                  className={cn(
                    "ml-2 text-xs px-2 py-0.5 rounded",
                    milestone.completed
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
                  )}
                >
                  {milestone.date}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{milestone.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Estimated completion */}
      <div className="mt-8 flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <div className="flex items-center">
          <Flag className="h-5 w-5 text-blue-500 mr-2" />
          <span className="text-sm font-medium">Estimated Completion</span>
        </div>
        <span className="text-sm font-bold">End of 2025</span>
      </div>
    </div>
  )
}

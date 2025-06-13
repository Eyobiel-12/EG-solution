"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import TechIcon from "@/components/tech-icon"

interface TechStackDisplayProps {
  technologies: string[]
  className?: string
  interactive?: boolean
}

export default function TechStackDisplay({ technologies, className, interactive = true }: TechStackDisplayProps) {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null)

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-3">
        {technologies.map((tech, index) => (
          <motion.div
            key={tech}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className="flex items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 py-1.5 rounded-full"
            onMouseEnter={() => interactive && setHoveredTech(tech)}
            onMouseLeave={() => interactive && setHoveredTech(null)}
          >
            <TechIcon
              name={tech}
              size="sm"
              className="mr-2"
              animateOnHover={false}
              animateOnLoad={hoveredTech === tech || !interactive}
            />
            <span className="text-sm">{tech}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

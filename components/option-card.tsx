"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface OptionCardProps {
  title: string
  description: string
  icon?: ReactNode
  selected?: boolean
  onClick?: () => void
  className?: string
}

export default function OptionCard({
  title,
  description,
  icon,
  selected = false,
  onClick,
  className,
}: OptionCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      onClick={onClick}
      className={cn(
        "cursor-pointer p-6 rounded-xl border transition-all duration-200",
        selected
          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md"
          : "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700",
        className,
      )}
    >
      <div className="flex items-start">
        {icon && <div className="mr-4 text-blue-500 dark:text-blue-400">{icon}</div>}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-lg">{title}</h3>
            {selected && (
              <div className="bg-blue-500 text-white p-1 rounded-full">
                <Check className="h-4 w-4" />
              </div>
            )}
          </div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">{description}</p>
        </div>
      </div>
    </motion.div>
  )
}

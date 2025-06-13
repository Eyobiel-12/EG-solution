"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TimelineOption {
  value: string
  label: string
  description: string
}

interface TimelineSelectorProps {
  options: TimelineOption[]
  defaultValue?: string
  onChange?: (value: string) => void
  className?: string
}

export default function TimelineSelector({ options, defaultValue = "", onChange, className }: TimelineSelectorProps) {
  const [selectedValue, setSelectedValue] = useState(defaultValue)

  const handleSelect = (value: string) => {
    if (value !== selectedValue) {
      setSelectedValue(value)
      onChange?.(value)
    }
  }

  // Initialize with default value if provided
  useEffect(() => {
    if (defaultValue && defaultValue !== selectedValue) {
      setSelectedValue(defaultValue)
    }
  }, [defaultValue])

  return (
    <div className={cn("w-full", className)}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {options.map((option) => {
          const isSelected = option.value === selectedValue

          return (
            <motion.div
              key={option.value}
              whileHover={{ y: -5 }}
              onClick={() => handleSelect(option.value)}
              className={cn(
                "cursor-pointer p-4 rounded-xl border transition-all duration-200",
                isSelected
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md"
                  : "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700",
              )}
            >
              <div
                className={cn(
                  "w-4 h-4 rounded-full mb-3",
                  isSelected ? "bg-blue-500" : "border-2 border-gray-300 dark:border-gray-600",
                )}
              />
              <h4 className="font-medium">{option.label}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{option.description}</p>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

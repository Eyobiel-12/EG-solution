"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface BudgetSliderProps {
  min: number
  max: number
  step?: number
  defaultValue?: number
  onChange?: (value: number) => void
  formatValue?: (value: number) => string
  className?: string
}

export default function BudgetSlider({
  min,
  max,
  step = 100,
  defaultValue = min,
  onChange,
  formatValue = (value) => `$${value.toLocaleString()}`,
  className,
}: BudgetSliderProps) {
  const [value, setValue] = useState(defaultValue)
  const percentage = ((value - min) / (max - min)) * 100

  // Only call onChange when the value actually changes
  const handleChange = (newValue: number) => {
    setValue(newValue)
    onChange?.(newValue)
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-500 dark:text-gray-400">{formatValue(min)}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">{formatValue(max)}</span>
      </div>

      <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
        <div className="absolute h-full bg-blue-500 rounded-full" style={{ width: `${percentage}%` }} />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => handleChange(Number(e.target.value))}
          className="absolute w-full h-full opacity-0 cursor-pointer"
        />
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white dark:bg-gray-800 rounded-full border-2 border-blue-500 shadow-md"
          style={{ left: `calc(${percentage}% - 12px)` }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.2 }}
        />
      </div>

      <div className="mt-4 text-center font-medium text-blue-600 dark:text-blue-400">{formatValue(value)}</div>
    </div>
  )
}

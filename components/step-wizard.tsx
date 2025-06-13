"use client"

import { useState, createContext, useContext, type ReactNode } from "react"
import { motion } from "framer-motion"
import { Check, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface StepWizardContextType {
  currentStep: number
  totalSteps: number
  goToStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  isFirstStep: boolean
  isLastStep: boolean
  stepData: Record<string, any>
  updateStepData: (data: Record<string, any>) => void
}

const StepWizardContext = createContext<StepWizardContextType | undefined>(undefined)

export function useStepWizard() {
  const context = useContext(StepWizardContext)
  if (!context) {
    throw new Error("useStepWizard must be used within a StepWizardProvider")
  }
  return context
}

interface StepWizardProps {
  children: ReactNode
  totalSteps: number
  initialStep?: number
  initialData?: Record<string, any>
  className?: string
}

export function StepWizard({ children, totalSteps, initialStep = 1, initialData = {}, className }: StepWizardProps) {
  const [currentStep, setCurrentStep] = useState(initialStep)
  const [stepData, setStepData] = useState<Record<string, any>>(initialData)

  const goToStep = (step: number) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step)
    }
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateStepData = (data: Record<string, any>) => {
    setStepData((prev) => ({ ...prev, ...data }))
  }

  const value = {
    currentStep,
    totalSteps,
    goToStep,
    nextStep,
    prevStep,
    isFirstStep: currentStep === 1,
    isLastStep: currentStep === totalSteps,
    stepData,
    updateStepData,
  }

  return (
    <StepWizardContext.Provider value={value}>
      <div className={cn("w-full", className)}>
        <div className="mb-8">
          <StepIndicator />
        </div>
        {children}
      </div>
    </StepWizardContext.Provider>
  )
}

export function StepIndicator() {
  const { currentStep, totalSteps, goToStep } = useStepWizard()

  return (
    <div className="flex items-center justify-center">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1
        const isActive = stepNumber === currentStep
        const isCompleted = stepNumber < currentStep

        return (
          <div key={stepNumber} className="flex items-center">
            <button
              onClick={() => goToStep(stepNumber)}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200",
                isActive
                  ? "bg-blue-500 text-white"
                  : isCompleted
                    ? "bg-blue-500 text-white"
                    : "bg-blue-100 text-blue-500",
              )}
              aria-label={`Go to step ${stepNumber}`}
            >
              {isCompleted ? <Check className="h-5 w-5" /> : <span className="text-sm font-medium">{stepNumber}</span>}
            </button>
            {stepNumber < totalSteps && (
              <div className={cn("h-1 w-10 mx-1", stepNumber < currentStep ? "bg-blue-500" : "bg-blue-100")} />
            )}
          </div>
        )
      })}
    </div>
  )
}

interface StepProps {
  step: number
  children: ReactNode
}

export function Step({ step, children }: StepProps) {
  const { currentStep } = useStepWizard()

  if (step !== currentStep) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      {children}
    </motion.div>
  )
}

interface StepNavigationProps {
  onSubmit?: () => void
  submitLabel?: string
  nextLabel?: string
  prevLabel?: string
  className?: string
}

export function StepNavigation({
  onSubmit,
  submitLabel = "Submit",
  nextLabel = "Next",
  prevLabel = "Back",
  className,
}: StepNavigationProps) {
  const { nextStep, prevStep, isFirstStep, isLastStep } = useStepWizard()

  return (
    <div className={cn("flex justify-between mt-8", className)}>
      {!isFirstStep && (
        <button
          onClick={prevStep}
          className="px-6 py-2 border border-blue-300 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors"
        >
          {prevLabel}
        </button>
      )}
      <div className="flex-1" />
      {isLastStep ? (
        <button
          onClick={onSubmit}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
        >
          {submitLabel}
        </button>
      ) : (
        <button
          onClick={nextStep}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
        >
          {nextLabel}
          <ChevronRight className="ml-1 h-4 w-4" />
        </button>
      )}
    </div>
  )
}

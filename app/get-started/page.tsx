"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Globe,
  ShoppingBag,
  PenTool,
  Search,
  Code,
  Smartphone,
  Users,
  FileText,
  Send,
  Home,
  ArrowLeft,
  Upload,
  X,
  CheckCircle,
  Clock,
  Mail,
  Phone,
  PhoneCall,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import { StepWizard, Step, useStepWizard } from "@/components/step-wizard"
import OptionCard from "@/components/option-card"
import TimelineSelector from "@/components/timeline-selector"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"
import emailjs from '@emailjs/browser';
import { useLanguage } from "@/components/language-context"

interface StepNavigationProps {
  onSubmit?: () => void
  submitLabel?: string
  nextLabel?: string
  prevLabel?: string
  className?: string
  disableNext?: boolean
}

function StepNavigation({
  onSubmit,
  submitLabel = "Submit",
  nextLabel = "Next",
  prevLabel = "Back",
  className,
  disableNext = false,
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
          disabled={disableNext}
          className={cn(
            "px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center",
            disableNext && "opacity-50 cursor-not-allowed",
          )}
        >
          {nextLabel}
          <ChevronRight className="ml-1 h-4 w-4" />
        </button>
      )}
    </div>
  )
}

export default function GetStartedPage() {
  const { t } = useLanguage()
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formProgress, setFormProgress] = useState(0)

  // Add file upload functionality
  const [formData, setFormData] = useState({
    projectType: "",
    projectDetails: {
      description: "",
    },
    timeline: "",
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    subscribe: false,
    files: [] as File[],
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const handleProjectTypeSelect = (type: string) => {
    updateFormData({ projectType: type })
  }

  const handleProjectDetailsChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      projectDetails: {
        ...prev.projectDetails,
        [field]: value,
      },
    }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      setFormData((prev) => ({
        ...prev,
        files: [...(prev.files || []), ...newFiles],
      }))
    }
  }

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }))
  }

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  // Add EmailJS initialization in useEffect
  useEffect(() => {
    emailjs.init("fT-abc-a8qyPCy5Ak");
  }, []);

  // Update the handleSubmit function
  const handleSubmit = async () => {
    // Validate form
    const errors: Record<string, string> = {}

    if (!formData.name) errors.name = "Name is required"
    if (!formData.email) errors.email = "Email is required"
    if (formData.email && !validateEmail(formData.email)) errors.email = "Please enter a valid email"
    if (!formData.projectDetails.description) errors.description = "Project description is required"
    if (!formData.timeline) errors.timeline = "Timeline selection is required"

    setFormErrors(errors)

    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true)

      try {
        const templateParams = {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone || 'Not provided',
          company: formData.company || 'Not provided',
          project_type: formData.projectType,
          timeline: formData.timeline,
          project_description: formData.projectDetails.description,
          message: formData.message || 'No additional message',
        };

        console.log('Attempting to send email with params:', templateParams);

        // Send email using EmailJS
        const response = await emailjs.send(
          'service_knff5r5',
          'template_6ufavkk',
          templateParams,
          'fT-abc-a8qyPCy5Ak'
        );

        console.log('EmailJS Response:', response);

        if (response.status === 200) {
          setIsSubmitted(true);
        } else {
          throw new Error(`EmailJS returned status: ${response.status}`);
        }
      } catch (error: any) {
        console.error('EmailJS Error:', error);
        // Show more detailed error message to user
        setFormErrors({
          submit: `Failed to send your request: ${error.message || 'Unknown error'}. Please try again or contact us directly at 0687033774.`
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  }

  // Calculate form progress
  useEffect(() => {
    let progress = 0

    if (formData.projectType) progress += 25
    if (formData.projectDetails.description && formData.timeline) progress += 25
    if (formData.name && formData.email && validateEmail(formData.email)) progress += 25
    if (progress === 75) progress += 25 // If all required fields are filled

    setFormProgress(progress)
  }, [formData])

  const projectTypes = [
    {
      id: "website",
      title: "Website Development",
      description: "Create a new website or redesign an existing one",
      icon: <Globe className="h-6 w-6" />,
    },
    {
      id: "ecommerce",
      title: "E-commerce Solution",
      description: "Build an online store with product management and payments",
      icon: <ShoppingBag className="h-6 w-6" />,
    },
    {
      id: "branding",
      title: "Branding & Design",
      description: "Develop your brand identity with logo and visual assets",
      icon: <PenTool className="h-6 w-6" />,
    },
    {
      id: "seo",
      title: "SEO & Marketing",
      description: "Improve your online visibility and search rankings",
      icon: <Search className="h-6 w-6" />,
    },
    {
      id: "webapp",
      title: "Web Application",
      description: "Custom web application with advanced functionality",
      icon: <Code className="h-6 w-6" />,
    },
    {
      id: "mobile",
      title: "Mobile App",
      description: "Native or hybrid mobile application development",
      icon: <Smartphone className="h-6 w-6" />,
    },
  ]

  const timelineOptions = [
    {
      value: "urgent",
      label: "Urgent (ASAP)",
      description: "Need the project completed as soon as possible",
    },
    {
      value: "standard",
      label: "Standard (1-3 months)",
      description: "Regular timeline with standard milestones",
    },
    {
      value: "flexible",
      label: "Flexible (3+ months)",
      description: "No rush, can work with a relaxed timeline",
    },
  ]

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" className="flex items-center gap-2 border-blue-300 text-blue-500">
              <ArrowLeft className="h-4 w-4" />
              {t("getStarted.goHome", "Back to Home")}
            </Button>
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-green-500 mb-4">{t("getStarted.requestSubmitted", "Request Submitted Successfully!")}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto">
              {t("getStarted.requestSubmittedDesc", "Thank you for your interest in our services. We've received your project request and will get back to you within 24-48 hours.")}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg text-left">
                <h3 className="font-medium text-lg mb-4 flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-blue-500" />
                  {t("getStarted.whatHappensNext", "What happens next?")}
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                      1
                    </div>
                    <span>{t("getStarted.nextStep1", "Our team will review your project requirements")}</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                      2
                    </div>
                    <span>{t("getStarted.nextStep2", "We'll contact you to discuss details and provide a quote")}</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                      3
                    </div>
                    <span>{t("getStarted.nextStep3", "Once approved, we'll create a project timeline")}</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg text-left">
                <h3 className="font-medium text-lg mb-4 flex items-center">
                  <Phone className="mr-2 h-5 w-5 text-blue-500" />
                  {t("getStarted.needImmediateAssistance", "Need immediate assistance?")}
                </h3>
                <p className="mb-4">{t("getStarted.contactDirectly", "Feel free to contact us directly:")}</p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-blue-500" />
                    <a href="mailto:info@egwebsolutions.com" className="text-blue-500 hover:underline">
                      info@egwebsolutions.com
                    </a>
                  </div>
                  <div className="flex items-center">
                    <PhoneCall className="h-4 w-4 mr-2 text-blue-500" />
                    <a href="tel:+31612345678" className="text-blue-500 hover:underline">
                      +31 6 1234 5678
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Link href="/">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8">{t("getStarted.returnToHomepage", "Return to Homepage")}</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-16 max-w-4xl">
      <div className="mb-8">
        <Link href="/">
          <Button variant="outline" className="flex items-center gap-2 border-blue-300 text-blue-500">
            <Home className="h-4 w-4" />
            {t("getStarted.goHome", "Go Home")}
          </Button>
        </Link>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-blue-500">{t("getStarted.title", "Get Started with EG Web Solutions")}</h1>
        <div className="w-24 h-1 bg-blue-400 mx-auto mb-6"></div>
        <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          {t("getStarted.subtitle", "Tell us about your project, and we'll help you bring your vision to life.")}
        </p>
      </motion.div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-8">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${formProgress}%` }}
          />
        </div>
        <StepWizard totalSteps={4} className="relative z-10">
          <Step step={1}>
            <div className="text-center mb-8">
              <div className="w-32 h-32 mx-auto mb-6">
                <img
                  src="/logoo.PNG"
                  alt="Project Selection"
                  className="w-full h-full object-contain"
                />
              </div>
              <h2 className="text-2xl font-bold mb-2">What type of project are you looking for?</h2>
              <p className="text-gray-600 dark:text-gray-400">Select the option that best describes your needs</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {projectTypes.map((type) => (
                <OptionCard
                  key={type.id}
                  title={type.title}
                  description={type.description}
                  icon={type.icon}
                  selected={formData.projectType === type.id}
                  onClick={() => handleProjectTypeSelect(type.id)}
                />
              ))}
            </div>

            <StepNavigation nextLabel="Continue" prevLabel="Back" disableNext={!formData.projectType} />
          </Step>

          <Step step={2}>
            <div className="text-center mb-8">
              <div className="w-32 h-32 mx-auto mb-6">
                <img
                  src="/logoo.PNG"
                  alt="Project Details"
                  className="w-full h-full object-contain"
                />
              </div>
              <h2 className="text-2xl font-bold mb-2">{t("getStarted.tellUsMore", "Tell us more about your project")}</h2>
              <p className="text-gray-600 dark:text-gray-400">
                {t("getStarted.provideDetails", "Provide some details to help us understand your requirements")}
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="project-description" className="flex items-center">
                  {t("getStarted.projectDescription", "Project Description")} <span className="text-red-500 ml-1">*</span>
                </Label>
                <Textarea
                  id="project-description"
                  placeholder={t("getStarted.projectDescriptionPlaceholder", "Describe your project, goals, and any specific requirements...")}
                  className="mt-2 h-32"
                  value={formData.projectDetails.description}
                  onChange={(e) => handleProjectDetailsChange("description", e.target.value)}
                />
                {formErrors.description && <p className="text-red-500 text-sm mt-1">{formErrors.description}</p>}
              </div>

              <div>
                <Label className="flex items-center">
                  {t("getStarted.timeline", "When do you need this completed?")} <span className="text-red-500 ml-1">*</span>
                </Label>
                <TimelineSelector
                  options={timelineOptions}
                  defaultValue={formData.timeline}
                  onChange={(value) => updateFormData({ timeline: value })}
                  className="mt-2"
                />
                {formErrors.timeline && <p className="text-red-500 text-sm mt-1">{formErrors.timeline}</p>}
              </div>

              <div>
                <Label htmlFor="file-upload">{t("getStarted.uploadReference", "Upload Reference Materials (Optional)")}</Label>
                <div className="mt-2 flex items-center justify-center w-full">
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border-gray-300 dark:border-gray-500"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">{t("getStarted.uploadInstructions", "Click to upload")}</span> {t("getStarted.uploadOrDrag", "or drag and drop")}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{t("getStarted.uploadFormats", "PDF, PNG, JPG or DOCX (MAX. 10MB)")}</p>
                    </div>
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      onChange={handleFileUpload}
                      accept=".pdf,.png,.jpg,.jpeg,.docx"
                    />
                  </label>
                </div>
                {formData.files && formData.files.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm font-medium">Uploaded files:</p>
                    <ul className="mt-1 text-sm text-gray-500">
                      {formData.files.map((file, index) => (
                        <li key={index} className="flex items-center">
                          <FileText className="h-4 w-4 mr-2" />
                          {file.name}
                          <button onClick={() => removeFile(index)} className="ml-2 text-red-500 hover:text-red-700">
                            <X className="h-4 w-4" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <StepNavigation disableNext={!formData.projectDetails.description || !formData.timeline} />
          </Step>

          <Step step={3}>
            <div className="text-center mb-8">
              <div className="w-32 h-32 mx-auto mb-6">
                <img
                  src="/logoo.PNG"
                  alt="Contact Information"
                  className="w-full h-full object-contain"
                />
              </div>
              <h2 className="text-2xl font-bold mb-2">{t("getStarted.yourContactInfo", "Your Contact Information")}</h2>
              <p className="text-gray-600 dark:text-gray-400">{t("getStarted.letUsKnowHowToReach", "Let us know how to reach you")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name" className="flex items-center">
                  {t("getStarted.fullName", "Full Name")} <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder={t("getStarted.fullNamePlaceholder", "John Doe")}
                  className="mt-2"
                  value={formData.name}
                  onChange={(e) => updateFormData({ name: e.target.value })}
                />
                {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
              </div>

              <div>
                <Label htmlFor="email" className="flex items-center">
                  {t("getStarted.emailAddress", "Email Address")} <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t("getStarted.emailAddressPlaceholder", "john@example.com")}
                  className="mt-2"
                  value={formData.email}
                  onChange={(e) => updateFormData({ email: e.target.value })}
                />
                {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
              </div>

              <div>
                <Label htmlFor="phone">{t("getStarted.phoneNumber", "Phone Number")}</Label>
                <Input
                  id="phone"
                  placeholder={t("getStarted.phoneNumberPlaceholder", "+1 (555) 123-4567")}
                  className="mt-2"
                  value={formData.phone}
                  onChange={(e) => updateFormData({ phone: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="company">{t("getStarted.companyName", "Company Name")}</Label>
                <Input
                  id="company"
                  placeholder={t("getStarted.companyNamePlaceholder", "Company Inc.")}
                  className="mt-2"
                  value={formData.company}
                  onChange={(e) => updateFormData({ company: e.target.value })}
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="message">{t("getStarted.additionalInfo", "Additional Information")}</Label>
                <Textarea
                  id="message"
                  placeholder={t("getStarted.additionalInfoPlaceholder", "Any other details you'd like to share...")}
                  className="mt-2"
                  value={formData.message}
                  onChange={(e) => updateFormData({ message: e.target.value })}
                />
              </div>

              <div className="md:col-span-2 flex items-start space-x-2">
                <Checkbox
                  id="subscribe"
                  checked={formData.subscribe}
                  onCheckedChange={(checked) => updateFormData({ subscribe: checked as boolean })}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="subscribe"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {t("footer.newsletter", "Subscribe to our newsletter")}
                  </label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t("footer.companyDescription", "Get updates on our services and industry insights")}
                  </p>
                </div>
              </div>
            </div>

            <StepNavigation disableNext={!formData.name || !formData.email || !validateEmail(formData.email)} />
          </Step>

          <Step step={4}>
            <div className="text-center mb-8">
              <div className="w-32 h-32 mx-auto mb-6">
                <img
                  src="/logoo.PNG"
                  alt="Review Information"
                  className="w-full h-full object-contain"
                />
              </div>
              <h2 className="text-2xl font-bold mb-2">{t("getStarted.reviewYourInfo", "Review Your Information")}</h2>
              <p className="text-gray-600 dark:text-gray-400">{t("getStarted.reviewInfoDesc", "Please review your information before submitting")}</p>
            </div>

            <div className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                <h3 className="font-medium text-lg mb-4 flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-blue-500" />
                  {t("getStarted.projectDetails", "Project Details")}
                </h3>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Project Type:</span>
                    <span className="font-medium">
                      {projectTypes.find((t) => t.id === formData.projectType)?.title || t("getStarted.notProvided", "Not specified")}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Timeline:</span>
                    <span className="font-medium">
                      {timelineOptions.find((t) => t.value === formData.timeline)?.label || t("getStarted.notProvided", "Not specified")}
                    </span>
                  </div>

                  {formData.files && formData.files.length > 0 && (
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Uploaded Files:</span>
                      <ul className="mt-1 text-sm">
                        {formData.files.map((file, index) => (
                          <li key={index} className="font-medium">
                            {file.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                <h3 className="font-medium text-lg mb-4 flex items-center">
                  <Users className="mr-2 h-5 w-5 text-blue-500" />
                  {t("getStarted.contactInfo", "Contact Information")}
                </h3>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Name:</span>
                    <span className="font-medium">{formData.name || t("getStarted.notProvided", "Not provided")}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Email:</span>
                    <span className="font-medium">{formData.email || t("getStarted.notProvided", "Not provided")}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Phone:</span>
                    <span className="font-medium">{formData.phone || t("getStarted.notProvided", "Not provided")}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Company:</span>
                    <span className="font-medium">{formData.company || t("getStarted.notProvided", "Not provided")}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <Button
                variant="outline"
                onClick={() => updateFormData({ projectType: "" })}
                className="border-blue-300 text-blue-500"
              >
                {t("getStarted.startOver", "Start Over")}
              </Button>

              <Button
                onClick={handleSubmit}
                className="bg-blue-500 hover:bg-blue-600 text-white px-8"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t("getStarted.submitting", "Submitting...")}
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    {t("getStarted.submitRequest", "Submit Request")}
                  </>
                )}
              </Button>
            </div>
          </Step>
        </StepWizard>
      </div>
    </div>
  )
}

export const dynamic = 'force-static'

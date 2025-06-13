"use client"

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface FormSuccessProps {
  title?: string
  message?: string
  buttonText?: string
  buttonHref?: string
}

export default function FormSuccess({
  title = "Submission Successful!",
  message = "Thank you for your interest. Our team will review your information and get back to you within 1-2 business days.",
  buttonText = "Return to Home",
  buttonHref = "/",
}: FormSuccessProps) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
        className="mx-auto mb-6 w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center"
      >
        <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-2xl font-bold mb-4"
      >
        {title}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8"
      >
        {message}
      </motion.p>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <Link href={buttonHref}>
          <Button className="bg-blue-500 hover:bg-blue-600">{buttonText}</Button>
        </Link>
      </motion.div>
    </motion.div>
  )
}

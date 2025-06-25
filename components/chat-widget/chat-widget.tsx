"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { MessageSquare, X, Send, Loader2, RefreshCw, Phone, Calendar, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useChat } from "./chat-context"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import emailjs from '@emailjs/browser'

export function ChatWidget() {
  const { isOpen, messages, isTyping, unreadCount, toggleChat, sendMessage, resetUnreadCount, setMessages } = useChat()
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [isSending, setIsSending] = useState(false)
  const [showEmoji, setShowEmoji] = useState(false)
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false)
  const [scheduleFormData, setScheduleFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "morning",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Add a list of random greetings and emojis
  const greetings = [
    "Hi there! 👋", "Hello! 😊", "Hey! How can I help?", "Welcome! 🙌", "Good to see you! 😃"
  ]
  const randomGreeting = () => greetings[Math.floor(Math.random() * greetings.length)]
  const randomEmoji = () => ["😊", "👍", "😃", "🙌", "🚀", "😉", "🤗", "💡", "🎉"][Math.floor(Math.random() * 9)]

  // Scroll to bottom when messages change or chat opens
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isOpen])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 300)
    }
  }, [isOpen])

  // Show random emoji occasionally
  useEffect(() => {
    if (isTyping) {
      const timer = setTimeout(() => {
        setShowEmoji(Math.random() > 0.7)
      }, 1000)
      return () => clearTimeout(timer)
    } else {
      setShowEmoji(false)
    }
  }, [isTyping])

  // When the chat is first opened, if there is only the welcome message, replace it with a random greeting
  useEffect(() => {
    if (isOpen && messages.length === 1 && messages[0].id === "welcome") {
      setMessages([
        {
          ...messages[0],
          content: randomGreeting(),
        },
      ])
    }
    // eslint-disable-next-line
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isSending) return

    setIsSending(true)
    try {
      await sendMessage(input)
    } finally {
      setInput("")
      setIsSending(false)
    }
  }

  // Format timestamp to show only hours and minutes
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
    }).format(date)
  }

  const retryLastMessage = async () => {
    if (messages.length < 2) return

    // Find the last user message
    const lastUserMessageIndex = [...messages].reverse().findIndex((m) => m.role === "user")
    if (lastUserMessageIndex === -1) return

    const lastUserMessage = messages[messages.length - 1 - lastUserMessageIndex]

    // Remove the last assistant message if it exists
    if (messages[messages.length - 1].role === "assistant") {
      setMessages((prev) => prev.slice(0, -1))
    }

    // Resend the last user message
    await sendMessage(lastUserMessage.content)
  }

  // Function to reset the chat
  const resetChat = () => {
    setMessages([
      {
        id: "welcome",
        content:
          "👋 Hey there! I'm Eyobiel from EG Web Solutions. How can I help you today? Feel free to ask about our services, or we can schedule a consultation to discuss your specific needs.",
        role: "assistant",
        timestamp: new Date(),
      },
    ])
  }

  // Get time of day greeting
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }

  // Handle schedule form input changes
  const handleScheduleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setScheduleFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle radio button changes for preferred time
  const handleTimeChange = (value: string) => {
    setScheduleFormData((prev) => ({
      ...prev,
      preferredTime: value,
    }))
  }

  // Handle schedule form submission
  const handleScheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Send email using EmailJS
      await emailjs.send(
        'service_rmijcz7',
        'template_7u4o7bo',
        {
          from_name: scheduleFormData.name,
          from_email: scheduleFormData.email,
          phone: scheduleFormData.phone,
          preferred_date: scheduleFormData.preferredDate,
          preferred_time: scheduleFormData.preferredTime,
          message: scheduleFormData.message,
          to_name: 'Eyobiel',
        },
        'nwA2GUTIrMkuucnPG'
      )

      // Show success state
      setIsSubmitted(true)

      // Add a message to the chat about the scheduled consultation
      const confirmationMessage = {
        id: Date.now().toString() + Math.random().toString(36).slice(2),
        content: `Thanks for scheduling a consultation! I've received your request for ${scheduleFormData.preferredDate} (${scheduleFormData.preferredTime}). I'll contact you at ${scheduleFormData.email} or ${scheduleFormData.phone} to confirm the details. Looking forward to discussing your project!`,
        role: "assistant" as const,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, confirmationMessage])

    } catch (error) {
      console.error('Failed to send consultation request:', error)
      // Add error message to chat
      const errorMessage = {
        id: Date.now().toString() + Math.random().toString(36).slice(2),
        content: "I apologize, but there was an error sending your consultation request. Please try again or contact me directly at 0687033774.",
        role: "assistant" as const,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      // Reset after some time
      setTimeout(() => {
        setIsSubmitting(false)
        setIsSubmitted(false)
        setIsScheduleModalOpen(false)
        setScheduleFormData({
          name: "",
          email: "",
          phone: "",
          preferredDate: "",
          preferredTime: "morning",
          message: "",
        })
      }, 3000)
    }
  }

  // Open schedule modal
  const openScheduleModal = () => {
    setIsScheduleModalOpen(true)
  }

  return (
    <>
      {/* Chat button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={toggleChat}
          className={cn(
            "h-14 w-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 text-white p-0 relative transition-all duration-200 ease-in-out",
            isOpen && "bg-blue-700 rotate-[360deg]",
          )}
          aria-label={isOpen ? "Close chat" : "Open chat"}
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <>
              <MessageSquare className="h-6 w-6" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </>
          )}
        </Button>
      </div>

      {/* Chat window */}
      <AnimatePresence mode="sync">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-[350px] sm:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl overflow-hidden z-40 flex flex-col border border-gray-200"
          >
            {/* Chat header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative h-10 w-10 rounded-full bg-white/20 flex items-center justify-center overflow-hidden border-2 border-white/30">
                  <img src="/IMG_1255.jpg" alt="Eyobiel Goitom" className="h-10 w-10 object-cover rounded-full" />
                </div>
                <div>
                  <h3 className="font-semibold">Eyobiel Goitom</h3>
                  <p className="text-xs text-blue-100">Web Developer • Online</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white hover:bg-blue-700/50 rounded-full"
                  onClick={resetChat}
                  aria-label="Reset chat"
                  title="Start new conversation"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white hover:bg-blue-700/50 rounded-full"
                  onClick={toggleChat}
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Chat messages */}
            <div
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-white bg-opacity-95"
              style={{
                backgroundImage:
                  "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABOSURBVGhD7c6xCQAgDAVRR3H/ld3AFkHIg+v+esEEAAAAADbs7ib+pkxyZJIjkxyZ5MgkRyY5MsmRSY5McmSSI5McmeTIJEcmOQAAALxU9QBCwAzWl5g5RAAAAABJRU5ErkJggg==')",
                backgroundSize: "100px 100px",
                backgroundRepeat: "repeat",
                opacity: 1,
              }}
            >
              {messages.map((message) => (
                <div key={message.id} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-3 shadow-sm",
                      message.role === "user"
                        ? "bg-blue-600 text-white rounded-tr-none"
                        : "bg-white border border-gray-200 text-gray-900 rounded-tl-none",
                    )}
                  >
                    <div className="space-y-2">
                      {message.role !== "user" && (
                        <div className="flex items-center space-x-2">
                          <img src="/IMG_1255.jpg" alt="Eyobiel Goitom" className="h-6 w-6 rounded-full object-cover bg-blue-100" />
                          <span className="text-xs font-medium">Eyobiel</span>
                        </div>
                      )}
                      <p className="text-sm whitespace-pre-wrap leading-relaxed">
                        {message.content || "..."}
                        {message.role === "assistant" && Math.random() > 0.7 ? " " + randomEmoji() : ""}
                      </p>
                      <p className="text-xs opacity-70 text-right">{formatTime(message.timestamp)}</p>
                    </div>
                  </motion.div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white border border-gray-200 text-gray-800 rounded-2xl rounded-tl-none max-w-[80%] px-4 py-3 shadow-sm"
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-xs font-medium text-blue-600">
                        EG
                      </div>
                      <span className="text-xs font-medium">Eyobiel</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div
                        className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <div
                        className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <div
                        className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                      {showEmoji && (
                        <span className="text-sm ml-1 animate-pulse">
                          {["🤔", "✍️", "💭", "⌨️"][Math.floor(Math.random() * 4)]}
                        </span>
                      )}
                    </div>
                  </motion.div>
                </div>
              )}

              {/* Schedule Consultation Button - shown after a few messages */}
              {messages.length > 1 && !isTyping && (
                <div className="flex justify-center my-2">
                  <Button
                    onClick={openScheduleModal}
                    className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 shadow-sm"
                    size="sm"
                  >
                    <Calendar className="h-4 w-4" />
                    Schedule a Consultation
                  </Button>
                </div>
              )}

              {/* Retry button if last message is from user or if assistant message is empty */}
              {messages.length > 0 &&
                (messages[messages.length - 1].role === "user" ||
                  (messages[messages.length - 1].role === "assistant" &&
                    messages[messages.length - 1].content === "")) &&
                !isTyping && (
                  <div className="flex justify-center">
                    <Button variant="outline" size="sm" onClick={retryLastMessage} className="text-xs bg-white">
                      <RefreshCw className="h-3 w-3 mr-1" /> No response? Click to try again
                    </Button>
                  </div>
                )}
              {/* Empty state */}
              {messages.length === 0 && <div className="text-center text-gray-500 py-4">Start a conversation!</div>}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat input */}
            <div className="border-t border-gray-200 bg-white p-4">
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Input
                    ref={inputRef}
                    type="text"
                    placeholder={`${getTimeBasedGreeting()}! Type your message...`}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 focus-visible:ring-blue-500 bg-gray-50 border-gray-200"
                    disabled={isTyping || isSending}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={!input.trim() || isTyping || isSending}
                    className="h-10 w-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200"
                    aria-label="Send message"
                  >
                    {isTyping || isSending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">For assistance, contact Eyobiel at 0687033774</p>
                  <div className="flex items-center space-x-2">
                    <a href="tel:0687033774" className="flex items-center text-xs text-blue-600 hover:text-blue-800">
                      <Phone className="h-3 w-3 mr-1" />
                      Call
                    </a>
                    <button
                      type="button"
                      onClick={openScheduleModal}
                      className="flex items-center text-xs text-blue-600 hover:text-blue-800"
                    >
                      <Calendar className="h-3 w-3 mr-1" />
                      Schedule
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Schedule Consultation Modal */}
      <Dialog open={isScheduleModalOpen} onOpenChange={setIsScheduleModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Schedule a Consultation with Eyobiel</DialogTitle>
            <DialogDescription>
              Fill out the form below to schedule a personal consultation about your project needs.
            </DialogDescription>
          </DialogHeader>

          {!isSubmitted ? (
            <form onSubmit={handleScheduleSubmit} className="space-y-4 pt-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={scheduleFormData.name}
                    onChange={handleScheduleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={scheduleFormData.email}
                    onChange={handleScheduleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={scheduleFormData.phone}
                    onChange={handleScheduleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferredDate">Preferred Date</Label>
                  <Input
                    id="preferredDate"
                    name="preferredDate"
                    type="date"
                    value={scheduleFormData.preferredDate}
                    onChange={handleScheduleInputChange}
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Preferred Time</Label>
                <RadioGroup
                  value={scheduleFormData.preferredTime}
                  onValueChange={handleTimeChange}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="morning" id="morning" />
                    <Label htmlFor="morning" className="cursor-pointer">
                      Morning
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="afternoon" id="afternoon" />
                    <Label htmlFor="afternoon" className="cursor-pointer">
                      Afternoon
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="evening" id="evening" />
                    <Label htmlFor="evening" className="cursor-pointer">
                      Evening
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message (Optional)</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your project or any specific questions you have..."
                  value={scheduleFormData.message}
                  onChange={handleScheduleInputChange}
                  className="min-h-[100px]"
                />
              </div>

              <div className="flex justify-end pt-2">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Scheduling...
                    </>
                  ) : (
                    <>
                      Schedule Consultation <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          ) : (
            <div className="py-8 text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Consultation Scheduled!</h3>
              <p className="text-gray-500">
                Thank you for scheduling a consultation. Eyobiel will contact you soon to confirm the details.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

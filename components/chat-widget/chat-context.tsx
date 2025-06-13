"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect, type ReactNode, useRef } from "react"

export type Message = {
  id: string
  content: string
  role: "user" | "assistant" | "system"
  timestamp: Date
}

type ChatContextType = {
  isOpen: boolean
  messages: Message[]
  isTyping: boolean
  unreadCount: number
  toggleChat: () => void
  sendMessage: (content: string) => Promise<void>
  resetUnreadCount: () => void
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: ReactNode }) {
  // Update the welcome message with the new name and consultation emphasis
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content:
        "👋 Hey there! I'm Eyobiel from EG Web Solutions. How can I help you today? Feel free to ask about our services, or we can schedule a consultation to discuss your specific needs.",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [isOpen, setIsOpen] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const [userName, setUserName] = useState<string | null>(null)
  const lastUserMessageRef = useRef<string>("")

  // Load chat history from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem("chatMessages")
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages)
        // Convert string timestamps back to Date objects
        const messagesWithDateObjects = parsedMessages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }))
        setMessages(messagesWithDateObjects)
      } catch (error) {
        console.error("Failed to parse saved chat messages:", error)
      }
    }
  }, [])

  // Save chat history to localStorage when messages change
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages))
  }, [messages])

  // Increment unread count when new assistant messages arrive and chat is closed
  useEffect(() => {
    const lastMessage = messages[messages.length - 1]
    if (!isOpen && lastMessage && lastMessage.role === "assistant") {
      setUnreadCount((prev) => prev + 1)
    }
  }, [messages, isOpen])

  const toggleChat = () => {
    setIsOpen((prev) => !prev)
    if (!isOpen) {
      resetUnreadCount()
    }
  }

  const resetUnreadCount = () => {
    setUnreadCount(0)
  }

  // Function to simulate human typing delay
  const simulateTypingDelay = (text: string) => {
    // Calculate a realistic typing delay based on message length
    // Average human typing speed is about 40 words per minute, or about 200 characters per minute
    // That's about 3-4 characters per second
    const charactersPerSecond = 5 // Slightly faster than average
    const minDelay = 800 // Minimum delay in ms
    const calculatedDelay = Math.max(minDelay, (text.length / charactersPerSecond) * 1000)

    // Cap the delay at a reasonable maximum
    return Math.min(calculatedDelay, 3000)
  }

  // Utility to extract name from user message
  function extractName(message: string): string | null {
    const match = message.match(/my name is ([a-zA-Z\s]+)/i)
    if (match) {
      return match[1].trim().split(" ")[0]
    }
    return null
  }

  const sendMessage = async (content: string) => {
    if (!content.trim()) return

    // Extract and store user name if provided
    const possibleName = extractName(content)
    if (possibleName) {
      setUserName(possibleName)
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString() + Math.random().toString(36).slice(2),
      content,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

    // Set a timeout to prevent hanging requests
    const timeoutId = setTimeout(() => {
      if (isTyping) {
        setIsTyping(false)
        const timeoutMessage: Message = {
          id: Date.now().toString() + Math.random().toString(36).slice(2),
          content:
            "Sorry for the delay. For the quickest assistance, you can reach me (Eyobiel) directly at 0687033774 for a consultation about your project needs.",
          role: "assistant",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, timeoutMessage])
      }
    }, 15000) // 15 seconds timeout

    try {
      // Prepare messages for the API (excluding system messages)
      const apiMessages = messages
        .filter((msg) => msg.role !== "system")
        .concat(userMessage)
        .map(({ role, content }) => ({ role, content }))

      // Add userName as a context message if available
      let contextMessages = apiMessages
      if (userName) {
        contextMessages = [
          { role: "system", content: `The user's name is ${userName}. Use their name in your responses for a personal touch.` },
          ...apiMessages,
        ]
      }

      // Create a placeholder message for streaming
      const assistantMessageId = Date.now().toString() + Math.random().toString(36).slice(2)
      const assistantMessage: Message = {
        id: assistantMessageId,
        content: "",
        role: "assistant",
        timestamp: new Date(),
      }

      // Add a small delay to simulate a human thinking before responding
      await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 1200))

      // Add the empty assistant message that will be updated as content streams in
      setMessages((prev) => [...prev, assistantMessage])

      // Call the API route with a timeout
      const controller = new AbortController()
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => {
          controller.abort()
          reject(new Error("Request timeout"))
        }, 10000),
      )

      const fetchPromise = fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: contextMessages }),
        signal: controller.signal,
      })

      // Race between fetch and timeout
      const response = (await Promise.race([fetchPromise, timeoutPromise])) as Response

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`)
      }

      if (!response.body) {
        throw new Error("Response body is null")
      }

      // Process the streaming response
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let accumulatedContent = ""

      // Read the stream
      while (true) {
        const { done, value } = await reader.read()

        if (done) {
          break
        }

        // Decode the chunk and process it
        const chunk = decoder.decode(value, { stream: true })

        try {
          // The response format is a series of JSON objects separated by newlines
          const lines = chunk.split("\n").filter((line) => line.trim())

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const jsonStr = line.slice(6) // Remove 'data: ' prefix

              if (jsonStr === "[DONE]") {
                continue
              }

              try {
                const data = JSON.parse(jsonStr)

                if (data.type === "text-delta" && data.text) {
                  accumulatedContent += data.text

                  // Update the assistant message with the accumulated content
                  setMessages((prev) =>
                    prev.map((msg) => (msg.id === assistantMessageId ? { ...msg, content: accumulatedContent } : msg)),
                  )
                }
              } catch (e) {
                console.error("Error parsing JSON from stream:", e)
              }
            }
          }
        } catch (e) {
          console.error("Error processing chunk:", e)
        }
      }

      // If we got no content but the request didn't fail, add a fallback message based on user's message
      if (accumulatedContent === "") {
        const userContent = userMessage.content.toLowerCase()
        let fallbackResponse =
          "I'd be happy to help with that! While I can provide general information here, it's always better to get into a direct consultation with Eyobiel to discuss your specific needs. Would you like his contact information?"

        if (
          userContent.includes("web") &&
          (userContent.includes("development") ||
            userContent.includes("developer") ||
            userContent.includes("website") ||
            userContent.includes("site"))
        ) {
          fallbackResponse =
            "Our web development services include custom website creation, responsive design, and web application development. Basic websites start at 635 euros. For the most accurate quote and timeline, it's best to schedule a direct consultation with Eyobiel. Would you like his contact information?"
        } else if (userContent.includes("price") || userContent.includes("cost") || userContent.includes("pricing")) {
          fallbackResponse =
            "Our pricing varies based on project requirements. Basic websites start at 635 euros, e-commerce from 1,499 euros, and SEO from 399 euros/month. For an accurate quote tailored to your specific needs, it's always better to schedule a direct consultation with Eyobiel. Would you like to do that?"
        }

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId
              ? {
                  ...msg,
                  content: fallbackResponse,
                }
              : msg,
          ),
        )
      }

      // Increment unread count if chat is closed
      if (!isOpen) {
        setUnreadCount((prev) => prev + 1)
      }

      // Clear the timeout as we've received a response
      clearTimeout(timeoutId)

      // Add a small delay before removing the typing indicator to make it feel more human
      setTimeout(() => {
        setIsTyping(false)
      }, 500)
    } catch (error) {
      console.error("Error sending message:", error)

      // Update the error message with the new name and consultation emphasis
      const errorMessage: Message = {
        id: Date.now().toString() + Math.random().toString(36).slice(2),
        content:
          "I'm having trouble connecting right now. For the best assistance, please contact Eyobiel directly at 0687033774 for a consultation about your project.",
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => {
        // Remove the last message if it's an empty assistant message
        const lastMsg = prev[prev.length - 1]
        if (lastMsg.role === "assistant" && lastMsg.content === "") {
          return [...prev.slice(0, -1), errorMessage]
        }
        return [...prev, errorMessage]
      })

      // Clear the timeout and set typing to false
      clearTimeout(timeoutId)
      setIsTyping(false)
    }
  }

  return (
    <ChatContext.Provider
      value={{
        isOpen,
        messages,
        isTyping,
        unreadCount,
        toggleChat,
        sendMessage,
        resetUnreadCount,
        setMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider")
  }
  return context
}

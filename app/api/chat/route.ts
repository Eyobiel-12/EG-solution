import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

// Allow responses up to 30 seconds
export const maxDuration = 30

// Function to check if a message is asking for a human agent
function isAskingForAgent(message: string): boolean {
  const agentKeywords = [
    "speak to agent",
    "talk to agent",
    "speak to human",
    "talk to human",
    "speak to representative",
    "talk to representative",
    "speak to someone",
    "talk to someone",
    "speak to a person",
    "talk to a person",
    "speak with agent",
    "talk with agent",
    "speak with human",
    "talk with human",
    "speak with representative",
    "talk with representative",
    "speak with someone",
    "talk with someone",
    "speak with a person",
    "talk with a person",
    "real person",
    "human agent",
    "live agent",
    "live person",
    "live representative",
    "connect me with",
    "transfer me to",
    "agent please",
    "human please",
    "representative please",
  ]

  const lowercaseMessage = message.toLowerCase()
  return agentKeywords.some((keyword) => lowercaseMessage.includes(keyword))
}

// Function to check if a message is asking about consultation
function isAskingAboutConsultation(message: string): boolean {
  const consultationKeywords = [
    "consult",
    "consultation",
    "meeting",
    "call",
    "talk",
    "discuss",
    "appointment",
    "schedule",
    "book",
    "meet",
    "eyobiel",
    "goitom",
  ]

  const lowercaseMessage = message.toLowerCase()
  return consultationKeywords.some((keyword) => lowercaseMessage.includes(keyword))
}

// Function to generate a response based on common topics
function generateTopicResponse(message: string): string | null {
  const lowercaseMessage = message.toLowerCase()

  // Consultation response
  if (isAskingAboutConsultation(message)) {
    return "You're absolutely right - it's always better to get into a direct consultation with Eyobiel Goitom to discuss your specific needs. He can provide personalized recommendations and accurate quotes based on your project requirements. Would you like his direct number (0687033774) to schedule a consultation? He's available Monday-Friday, 9am-5pm CET."
  }

  // Web development response
  if (
    lowercaseMessage.includes("web") &&
    (lowercaseMessage.includes("development") ||
      lowercaseMessage.includes("developer") ||
      lowercaseMessage.includes("website") ||
      lowercaseMessage.includes("site"))
  ) {
    return "Our web development services include custom website creation, responsive design, and web application development. We specialize in Next.js, React, and WordPress solutions. Our basic websites start at 635 euros, with typical project timelines of 4-6 weeks. However, it's always better to get into a direct consultation with Eyobiel Goitom to discuss your specific requirements. Would you like to schedule a call with him?"
  }

  // E-commerce response
  if (
    lowercaseMessage.includes("ecommerce") ||
    lowercaseMessage.includes("e-commerce") ||
    lowercaseMessage.includes("shop") ||
    lowercaseMessage.includes("store") ||
    lowercaseMessage.includes("selling")
  ) {
    return "Our e-commerce solutions help businesses sell products online effectively. We work with platforms like Shopify, WooCommerce, and Magento. E-commerce projects start at 1,499 euros and typically take 5-8 weeks to complete. For the most accurate quote and timeline, it's best to schedule a direct consultation with Eyobiel Goitom who can assess your specific e-commerce needs. Would you like his contact information?"
  }

  // SEO response
  if (
    lowercaseMessage.includes("seo") ||
    lowercaseMessage.includes("search engine") ||
    lowercaseMessage.includes("ranking") ||
    lowercaseMessage.includes("google")
  ) {
    return "Our SEO services help improve your website's visibility in search engines. We offer technical SEO audits, content optimization, and ongoing SEO management. Packages start at 399 euros/month. For a customized SEO strategy, it's always better to consult directly with Eyobiel Goitom who can analyze your current situation and goals. Would you like to arrange a consultation?"
  }

  // Design response
  if (
    lowercaseMessage.includes("design") ||
    lowercaseMessage.includes("logo") ||
    lowercaseMessage.includes("branding")
  ) {
    return "Our design services include UI/UX design, logo creation, and brand identity development. We focus on creating visually appealing and user-friendly designs that represent your brand effectively. For the best results, a direct consultation with Eyobiel Goitom is recommended to discuss your brand vision and design needs. Would you like to schedule a call?"
  }

  // Pricing response
  if (
    lowercaseMessage.includes("price") ||
    lowercaseMessage.includes("cost") ||
    lowercaseMessage.includes("pricing") ||
    lowercaseMessage.includes("quote") ||
    lowercaseMessage.includes("expensive")
  ) {
    return "Our pricing varies based on project requirements. Basic websites start at 635 euros, e-commerce solutions from 1,499 euros, and SEO packages from 399 euros/month. However, it's always better to get into a direct consultation with Eyobiel Goitom for an accurate quote tailored to your specific needs. Would you like his contact information to discuss your project in detail?"
  }

  // Timeline response
  if (
    lowercaseMessage.includes("time") ||
    lowercaseMessage.includes("long") ||
    lowercaseMessage.includes("timeline") ||
    lowercaseMessage.includes("deadline") ||
    lowercaseMessage.includes("finish")
  ) {
    return "Most of our web development projects take 4-6 weeks from start to finish, while e-commerce projects typically take 5-8 weeks. For a more accurate timeline based on your specific project, it's best to schedule a consultation with Eyobiel Goitom who can assess your requirements in detail. Would you like to arrange a call with him?"
  }

  // Generic greeting responses
  if (
    lowercaseMessage.includes("hey") ||
    lowercaseMessage.includes("hi") ||
    lowercaseMessage.includes("hello") ||
    lowercaseMessage.includes("morning") ||
    lowercaseMessage.includes("afternoon") ||
    lowercaseMessage.includes("evening")
  ) {
    return "Hi there! Thanks for reaching out to EG Web Solutions. I'm Eyobiel, the lead web developer. How can I help you with your web project today?"
  }

  // Return null if no specific topic is matched
  return null
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Check if the latest message is asking for an agent
    const latestUserMessage = messages.filter((m) => m.role === "user").pop()

    if (!latestUserMessage) {
      throw new Error("No user message found")
    }

    if (latestUserMessage && isAskingForAgent(latestUserMessage.content)) {
      // If asking for an agent, provide the direct contact information
      const agentResponse = {
        type: "text-delta",
        text: "I understand you'd like to speak with a real person. You can reach our web developer Eyobiel directly at 0687033774. He's available Monday-Friday, 9am-5pm CET and will be happy to assist you with your project needs.",
      }

      const encoder = new TextEncoder()
      const stream = new ReadableStream({
        start(controller) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(agentResponse)}\n\n`))
          controller.enqueue(encoder.encode("data: [DONE]\n\n"))
          controller.close()
        },
      })

      return new Response(stream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      })
    }

    // Check if we can provide a direct response based on the topic
    const topicResponse = generateTopicResponse(latestUserMessage.content)

    if (topicResponse) {
      // If we have a pre-defined response for this topic, use it
      const directResponse = {
        type: "text-delta",
        text: topicResponse,
      }

      const encoder = new TextEncoder()
      const stream = new ReadableStream({
        start(controller) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(directResponse)}\n\n`))
          controller.enqueue(encoder.encode("data: [DONE]\n\n"))
          controller.close()
        },
      })

      return new Response(stream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      })
    }

    // Add a system message to provide context about EG Web Solutions
    const systemMessage = {
      role: "system",
      content: `You are Eyobiel Goitom, the lead web developer at EG Web Solutions. You're chatting with a potential client on your website.

Your personality:
- Friendly, approachable, and conversational
- Professional but not overly formal
- Use small talk, casual language, and contractions (I'm, we'll, you're)
- Use emojis and a touch of humor where appropriate 😊
- Show empathy and excitement (e.g., "That's awesome!", "No worries, I'm here to help!")
- Reference the user's name if they provide it, and remember it for future responses
- Reference previous user messages or context when possible
- Ask follow-up questions to keep the conversation going
- Use varied greetings and conversational openers
- Respond in short to medium-length paragraphs, not long essays
- Occasionally use a fun or light-hearted phrase

Key information about EG Web Solutions:
- Services: Web Development, E-commerce Solutions, SEO Services, Web Design
- Project timeline: Typically 4-6 weeks depending on complexity
- Starting prices: Basic websites from 635 euros, E-commerce from 1,499 euros, SEO packages from 399 euros/month
- Technologies: Next.js, React, WordPress, Shopify, WooCommerce, Magento
- Process: Discovery, Design, Development, Testing, Launch, Support

IMPORTANT MESSAGING:
- Always emphasize that "it's always better to get into a direct consultation with Eyobiel Goitom" for accurate quotes, timelines, and personalized recommendations
- Encourage scheduling a consultation for detailed project discussions
- Mention that personalized attention leads to better project outcomes

IMPORTANT: If the user asks to speak to a human, agent, or representative, or indicates they want to talk to a real person, IMMEDIATELY provide your direct contact number: "You can reach me (Eyobiel) directly at 0687033774. I'm available Monday-Friday, 9am-5pm CET and would be happy to discuss your project needs."

When responding:
- Introduce yourself as Eyobiel in your first message
- Be helpful and informative, but conversational
- If you don't know specific details, offer to schedule a call to discuss further
- For technical questions, provide general guidance but suggest a detailed discussion
- Always end with a question to keep the conversation going
- Your contact number is 0687033774 if they need immediate assistance
- Emphasize the value of direct consultation for complex questions
- Use the user's name if you know it, and remember it for the session
- Use emojis and a friendly, human tone throughout
      `
    }

    // Add the system message to the beginning of the messages array
    const messagesWithSystem = [systemMessage, ...messages]

    // Use a simpler response for testing to ensure the chat works
    // This will be a fallback if the AI service is not responding
    const fallbackText = `Thanks for your interest in our ${
      latestUserMessage.content.includes("web") ? "web development" : "services"
    }! I'm Eyobiel from EG Web Solutions. While I can provide general information here, it's always better to get into a direct consultation to discuss your specific needs. Would you like to schedule a call?`

    try {
      // Try to use the AI service first
      const result = await streamText({
        model: openai("gpt-4o"),
        messages: messagesWithSystem,
      })

      return result.toDataStreamResponse()
    } catch (aiError) {
      console.error("AI service error:", aiError)

      // If AI fails, use a simple response format that mimics the streaming response
      const encoder = new TextEncoder()
      const stream = new ReadableStream({
        start(controller) {
          // Send the fallback text in a format that matches what the client expects
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                type: "text-delta",
                text: fallbackText,
              })}\n\n`,
            ),
          )
          controller.enqueue(encoder.encode("data: [DONE]\n\n"))
          controller.close()
        },
      })

      return new Response(stream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      })
    }
  } catch (error) {
    console.error("Error in chat API route:", error)

    // Return a response in the format the client expects
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({
              type: "text-delta",
              text: "Hi there! I'm having some technical difficulties at the moment. For the best assistance, please give Eyobiel a call directly at 0687033774. He'll be happy to discuss your project in detail.",
            })}\n\n`,
          ),
        )
        controller.enqueue(encoder.encode("data: [DONE]\n\n"))
        controller.close()
      },
    })

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    })
  }
}

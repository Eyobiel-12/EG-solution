"use client"

import { ChatProvider } from "./chat-context"
import { ChatWidget } from "./chat-widget"

export function ChatWidgetContainer() {
  return (
    <ChatProvider>
      <ChatWidget />
    </ChatProvider>
  )
}

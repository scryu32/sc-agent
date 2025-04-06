"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import type { Bot } from "../../lib/bot"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "../../components/ui/avatar"
import { Send } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

interface ChatInterfaceProps {
  selectedBot: Bot
}

export function ChatInterface({ selectedBot }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
          botId: selectedBot.id,
        }),
      })

      if (!response.body) {
        throw new Error("Response body is null")
      }
      console.log(response)

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      const botMessageId = Date.now().toString()
      let botMessage = ""

      setMessages((prev) => [...prev, { id: botMessageId, role: "assistant", content: "" }])

      while (true) {
        const { value, done } = await reader.read()

        if (done) break

        const chunk = decoder.decode(value)
        if (chunk === null) break

        botMessage += chunk

        setMessages((prev) => prev.map((msg) => (msg.id === botMessageId ? { ...msg, content: botMessage } : msg)))
      }
    } catch (error) {
      console.error("Error:", error)
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: "Sorry, an error occurred. Please try again.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full h-[600px] flex flex-col border border-gray-200">
      <CardHeader className="border-b bg-white">
        <CardTitle className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={selectedBot.imageUrl} alt={selectedBot.name} />
            <AvatarFallback>{selectedBot.name[0]}</AvatarFallback>
          </Avatar>
          <span>{selectedBot.name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-400">
            <p>Send a message to {selectedBot.name}!</p>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === "user" ? "bg-sky-500 text-white" : "bg-white border border-gray-200 text-gray-800"
                }`}
              >
                {message.content || (isLoading && message.role === "assistant" ? "..." : "")}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </CardContent>
      <div className="p-4 border-t bg-white">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1 border-gray-300"
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-sky-500 hover:bg-sky-600 text-white"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </Card>
  )
}


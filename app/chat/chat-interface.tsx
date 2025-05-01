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

// 윈도우에 MathJax 타입 정의 추가
declare global {
  interface Window {
    MathJax?: {
      typesetPromise: () => Promise<any>
    }
  }
}

// 메시지를 HTML로 변환: HTML 이스케이프 + 줄바꿈 처리
function formatContent(content: string) {
  const escaped = content
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
  return escaped.replace(/\r?\n/g, '<br/>')
}

export function ChatInterface({ selectedBot }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // MathJax 스크립트 동적 로드
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (document.getElementById('MathJax-script')) return

    const script = document.createElement('script')
    script.id = 'MathJax-script'
    script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js'
    script.async = true
    document.head.appendChild(script)

    script.onload = () => {
      window.MathJax?.typesetPromise()
    }
  }, [])

  // 메시지 업데이트 시 MathJax 렌더링 및 스크롤
  useEffect(() => {
    window.MathJax?.typesetPromise().then(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    })
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

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

    const apiMessages = [...messages, userMessage].map(({ role, content }) => ({ role, content }))

    try {
      console.log(selectedBot.id)
      const response = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages, model: "gpt-4o-mini", botName: selectedBot.id }),
      })

      if (!response.ok) throw new Error(`API 응답 오류: ${response.status}`)
      if (!response.body) throw new Error("응답 본문이 없습니다")

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      const botMessageId = Date.now().toString()
      let botMessage = ""

      setMessages((prev) => [...prev, { id: botMessageId, role: "assistant", content: "" }])

      while (true) {
        const { value, done } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        if (!chunk) continue

        botMessage += chunk
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMessageId ? { ...msg, content: botMessage } : msg
          )
        )
      }
    } catch (error) {
      console.error("오류 발생:", error)
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), role: "assistant", content: "죄송합니다, 오류가 발생했습니다. 다시 시도해주세요." },
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
            <AvatarImage src={selectedBot.imageUrl || "/placeholder.svg?height=32&width=32"} alt={selectedBot.name} />
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
                className={`max-w-[80%] rounded-lg p-3 whitespace-pre-wrap ${
                  message.role === "user"
                    ? "bg-sky-500 text-white"
                    : "bg-white border border-gray-200 text-gray-800"
                }`}
                // 렌더링할 HTML: 수식(MathJax) + 줄바꿈 처리
                dangerouslySetInnerHTML={{ __html: formatContent(message.content) }}
              />
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

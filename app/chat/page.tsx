"use client"

import { useState } from "react"
import { bots } from "../../lib/bots"
import { BotSelector } from "./bot-selector"
import { ChatInterface } from "./chat-interface"
import { NavBar } from "../../components/nav-bar"

export default function ChatPage() {
  const [selectedBot, setSelectedBot] = useState(bots[0])

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <NavBar />

      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Chat with AI</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <BotSelector bots={bots} selectedBot={selectedBot} onSelectBot={setSelectedBot} />
            </div>
            <div className="md:col-span-2">
              <ChatInterface selectedBot={selectedBot} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}


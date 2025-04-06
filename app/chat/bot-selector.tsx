"use client"
import Image from "next/image"
import type { Bot } from "../../lib/bot"
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group"
import { Label } from "../../components/ui/label"

interface BotSelectorProps {
  bots: Bot[]
  selectedBot: Bot
  onSelectBot: (bot: Bot) => void
}

export function BotSelector({ bots, selectedBot, onSelectBot }: BotSelectorProps) {
  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">Select a Bot</h2>
      <RadioGroup
        value={selectedBot.id}
        onValueChange={(value) => {
          const bot = bots.find((b) => b.id === value)
          if (bot) onSelectBot(bot)
        }}
        className="space-y-3"
      >
        {bots.map((bot) => (
          <div key={bot.id} className="flex items-center">
            <RadioGroupItem value={bot.id} id={bot.id} className="peer sr-only" />
            <Label
              htmlFor={bot.id}
              className="flex items-center space-x-3 w-full p-4 rounded-lg border-2 peer-data-[state=checked]:border-sky-500 hover:bg-gray-50 cursor-pointer"
            >
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image src={bot.imageUrl || "/placeholder.svg"} alt={bot.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <p className="font-medium">{bot.name}</p>
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}


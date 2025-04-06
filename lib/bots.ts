import type { Bot } from "./bot"

export const bots: Bot[] = [
  {
    id: "hutao",
    name: "Hutao",
    imageUrl: "/images/hutao.png",
  },
  {
    id: "mizuki",
    name: "Mizuki",
    imageUrl: "/images/mizuki.png",
  },
  {
    id: "assistant",
    name: "Assistant",
    imageUrl: "/images/assistant-bot.png",
  },
]

export function getBotById(id: string): Bot | undefined {
  return bots.find((bot) => bot.id === id)
}


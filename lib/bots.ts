import type { Bot } from "./bot"

export const bots: Bot[] = [
  {
    id: "hutao",
    name: "호두",
    imageUrl: "/images/hutao.png",
  },
  {
    id: "mizuki",
    name: "아키야마 미즈키",
    imageUrl: "/images/mizuki.png",
  },
  {
    id: "runmei",
    name: "완 매",
    imageUrl: "/images/runmei.png",
  },
]

export function getBotById(id: string): Bot | undefined {
  return bots.find((bot) => bot.id === id)
}


import { AuthorityFeedback } from "@/types/feedback"

export function parseAuthorityFeedback(text: string): AuthorityFeedback {
  const getSection = (label: string) => {
    const regex = new RegExp(`${label}:\\s*([\\s\\S]*?)(?=\\n\\w|$)`, "i")
    const match = text.match(regex)
    return match ? match[1].trim() : ""
  }

  return {
    levelLabel: getSection("Nivel"),
    adds: getSection("Lo que suma"),
    subtracts: getSection("Lo que resta"),
    today: getSection("Hoy"),
  }
}

import type { Answer } from "./storage"

export function calculateScore(answers: Answer[]): number {
  if (answers.length === 0) return 0

  const totalScore = answers.reduce((sum, answer) => sum + answer.score, 0)
  const maxPossibleScore = answers.length * 9 // max score per question is 9
  const normalizedScore = Math.round((totalScore / maxPossibleScore) * 100)
  
  return Math.min(100, Math.max(0, normalizedScore))
}


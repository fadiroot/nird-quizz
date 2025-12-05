import type { Persona } from "./questions"
import {
  createQuizSession,
  getCurrentSessionId,
  saveAnswerToSupabase,
  clearSessionId,
} from "./supabase-storage"

const STORAGE_KEY_PERSONA = "nird-quiz-persona"
const STORAGE_KEY_ANSWERS = "nird-quiz-answers"

export interface Answer {
  questionId: string
  optionId: string
  score: number
  roadmapTag: string
}

export async function savePersona(persona: Persona): Promise<void> {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY_PERSONA, persona)
    // Create Supabase session
    await createQuizSession(persona)
  }
}

export function getPersona(): Persona | null {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(STORAGE_KEY_PERSONA)
    return stored as Persona | null
  }
  return null
}

export async function saveAnswer(answer: Answer): Promise<void> {
  if (typeof window !== "undefined") {
    const existing = getAnswers()
    const updated = [...existing.filter(a => a.questionId !== answer.questionId), answer]
    localStorage.setItem(STORAGE_KEY_ANSWERS, JSON.stringify(updated))
    
    // Save to Supabase
    const sessionId = getCurrentSessionId()
    if (sessionId) {
      await saveAnswerToSupabase(sessionId, answer)
    }
  }
}

export function getAnswers(): Answer[] {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(STORAGE_KEY_ANSWERS)
    if (stored) {
      try {
        return JSON.parse(stored) as Answer[]
      } catch {
        return []
      }
    }
  }
  return []
}

export function clearQuizData(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY_PERSONA)
    localStorage.removeItem(STORAGE_KEY_ANSWERS)
    clearSessionId()
  }
}


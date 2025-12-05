import { createClient } from "@supabase/supabase-js"

// Supabase configuration from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file"
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface QuizSession {
  id: string
  persona: string
  created_at: string
  completed_at?: string
  dependency_score?: number
  interpretation?: string
}

export interface QuizAnswer {
  id: string
  session_id: string
  question_id: string
  option_id: string
  score: number
  roadmap_tag: string
  answered_at: string
}

export interface QuizResult {
  id: string
  session_id: string
  dependency_score: number
  interpretation_label: string
  interpretation_description: string
  top_weakness_tags: string[]
  created_at: string
}

export interface QuizRoadmap {
  id: string
  session_id: string
  stage_id: number
  stage_title: string
  stage_why: string
  action_id: string
  action_title: string
  action_effort: string
  action_description?: string
  created_at: string
}

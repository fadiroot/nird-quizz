import { createClient } from "@supabase/supabase-js"

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://kwrftoelcixbyjqbyqhe.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3cmZ0b2VsY2l4YnlqcWJ5cWhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4NzE2NjksImV4cCI6MjA4MDQ0NzY2OX0._WxKvxqdQO9FFGtvdXMczQY24ZciHdYdGyCpiIU5CWA"

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

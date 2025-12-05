import { supabase } from "./supabase"
import type { Persona } from "./questions"
import type { Answer } from "./storage"
import type { RoadmapStage } from "./roadmap"

const STORAGE_KEY_SESSION_ID = "nird-quiz-session-id"

export async function createQuizSession(persona: Persona): Promise<string | null> {
  try {
    const { data, error } = await supabase
      .from("quiz_sessions")
      .insert({
        persona: persona,
      })
      .select("id")
      .single()

    if (error) {
      console.error("Error creating quiz session:", error)
      return null
    }

    if (data && typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY_SESSION_ID, data.id)
    }

    return data.id
  } catch (error) {
    console.error("Error creating quiz session:", error)
    return null
  }
}

export function getCurrentSessionId(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem(STORAGE_KEY_SESSION_ID)
  }
  return null
}

export async function saveAnswerToSupabase(
  sessionId: string,
  answer: Answer
): Promise<boolean> {
  try {
    // First, check if answer already exists and update it, or insert new
    const { data: existing } = await supabase
      .from("quiz_answers")
      .select("id")
      .eq("session_id", sessionId)
      .eq("question_id", answer.questionId)
      .single()

    if (existing) {
      // Update existing answer
      const { error } = await supabase
        .from("quiz_answers")
        .update({
          option_id: answer.optionId,
          score: answer.score,
          roadmap_tag: answer.roadmapTag,
          answered_at: new Date().toISOString(),
        })
        .eq("id", existing.id)

      if (error) {
        console.error("Error updating answer:", error)
        return false
      }
    } else {
      // Insert new answer
      const { error } = await supabase.from("quiz_answers").insert({
        session_id: sessionId,
        question_id: answer.questionId,
        option_id: answer.optionId,
        score: answer.score,
        roadmap_tag: answer.roadmapTag,
      })

      if (error) {
        console.error("Error saving answer:", error)
        return false
      }
    }

    return true
  } catch (error) {
    console.error("Error saving answer:", error)
    return false
  }
}

export async function saveResultsToSupabase(
  sessionId: string,
  score: number,
  interpretation: { label: string; description: string },
  weaknessTags: string[]
): Promise<boolean> {
  try {
    // Update session with completion
    const { error: sessionError } = await supabase
      .from("quiz_sessions")
      .update({
        completed_at: new Date().toISOString(),
        dependency_score: score,
        interpretation: interpretation.label,
      })
      .eq("id", sessionId)

    if (sessionError) {
      console.error("Error updating session:", sessionError)
    }

    // Save results
    const { error: resultsError } = await supabase.from("quiz_results").insert({
      session_id: sessionId,
      dependency_score: score,
      interpretation_label: interpretation.label,
      interpretation_description: interpretation.description,
      top_weakness_tags: weaknessTags,
    })

    if (resultsError) {
      console.error("Error saving results:", resultsError)
      return false
    }

    return true
  } catch (error) {
    console.error("Error saving results:", error)
    return false
  }
}

export async function saveRoadmapToSupabase(
  sessionId: string,
  stages: RoadmapStage[]
): Promise<boolean> {
  try {
    // First, delete existing roadmap for this session to avoid duplicates
    await supabase
      .from("quiz_roadmaps")
      .delete()
      .eq("session_id", sessionId)

    const roadmapData = stages.flatMap((stage) =>
      stage.actions.map((action) => ({
        session_id: sessionId,
        stage_id: stage.id,
        stage_title: stage.title,
        stage_why: stage.why,
        action_id: action.id,
        action_title: action.title,
        action_effort: action.effort,
        action_description: action.description,
      }))
    )

    if (roadmapData.length === 0) {
      return true
    }

    const { error } = await supabase.from("quiz_roadmaps").insert(roadmapData)

    if (error) {
      console.error("Error saving roadmap:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("Error saving roadmap:", error)
    return false
  }
}

// Function to retrieve session data from Supabase
export async function getSessionFromSupabase(sessionId: string) {
  try {
    const { data, error } = await supabase
      .from("quiz_sessions")
      .select("*")
      .eq("id", sessionId)
      .single()

    if (error) {
      console.error("Error fetching session:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Error fetching session:", error)
    return null
  }
}

// Function to retrieve answers from Supabase
export async function getAnswersFromSupabase(sessionId: string) {
  try {
    const { data, error } = await supabase
      .from("quiz_answers")
      .select("*")
      .eq("session_id", sessionId)
      .order("answered_at", { ascending: true })

    if (error) {
      console.error("Error fetching answers:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Error fetching answers:", error)
    return []
  }
}

// Function to retrieve results from Supabase
export async function getResultsFromSupabase(sessionId: string) {
  try {
    const { data, error } = await supabase
      .from("quiz_results")
      .select("*")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: false })
      .limit(1)
      .single()

    if (error) {
      console.error("Error fetching results:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Error fetching results:", error)
    return null
  }
}

// Function to retrieve roadmap from Supabase
export async function getRoadmapFromSupabase(sessionId: string) {
  try {
    const { data, error } = await supabase
      .from("quiz_roadmaps")
      .select("*")
      .eq("session_id", sessionId)
      .order("stage_id", { ascending: true })
      .order("action_id", { ascending: true })

    if (error) {
      console.error("Error fetching roadmap:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Error fetching roadmap:", error)
    return []
  }
}

export function clearSessionId(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY_SESSION_ID)
  }
}


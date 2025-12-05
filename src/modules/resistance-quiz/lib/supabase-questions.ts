import { supabase } from "./supabase"
import type { Question, QuestionOption, Persona } from "./questions"

export async function getQuestionsFromSupabase(persona: Persona): Promise<Question[]> {
  try {
    // Get all questions that match the persona or are for all personas
    const { data: questionsData, error: questionsError } = await supabase
      .from("quiz_questions")
      .select("*")
      .order("display_order", { ascending: true })

    if (questionsError) {
      console.error("Error fetching questions:", questionsError)
      return []
    }

    if (!questionsData || questionsData.length === 0) {
      return []
    }

    // Filter questions by persona
    const filteredQuestions = questionsData.filter((q) => {
      const personaTags = q.persona_tags || []
      // If persona_tags is empty, show to all
      if (personaTags.length === 0) return true
      // Check if persona is in the tags
      return personaTags.includes(persona)
    })

    // Get options for all questions
    const questionIds = filteredQuestions.map((q) => q.id)
    const { data: optionsData, error: optionsError } = await supabase
      .from("quiz_question_options")
      .select("*")
      .in("question_id", questionIds)
      .order("display_order", { ascending: true })

    if (optionsError) {
      console.error("Error fetching options:", optionsError)
      return []
    }

    // Map options to questions
    const questions: Question[] = filteredQuestions.map((q) => {
      const options: QuestionOption[] = (optionsData || [])
        .filter((opt) => opt.question_id === q.id)
        .map((opt) => ({
          id: opt.id,
          label: opt.label,
          score: opt.score,
          roadmapTag: opt.roadmap_tag as QuestionOption["roadmapTag"],
          explain: opt.explain,
        }))

      return {
        id: q.id,
        personaTags: (q.persona_tags || []) as Persona[],
        category: q.category as Question["category"],
        text: q.text,
        options,
      }
    })

    return questions
  } catch (error) {
    console.error("Error fetching questions from Supabase:", error)
    return []
  }
}


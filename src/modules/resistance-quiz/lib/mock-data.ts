import type { QuizSession, QuizAnswer, QuizResult, QuizRoadmap } from "./supabase"

// Mock data for testing and visualization
export const mockSessions: QuizSession[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    persona: "teacher",
    created_at: "2024-01-15T10:30:00Z",
    completed_at: "2024-01-15T10:45:00Z",
    dependency_score: 75,
    interpretation: "Forte dépendance ; commencez par la sensibilisation et des gains rapides urgents"
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    persona: "it_admin",
    created_at: "2024-01-16T14:20:00Z",
    completed_at: "2024-01-16T14:35:00Z",
    dependency_score: 45,
    interpretation: "En transition ; concentrez-vous sur les gains rapides"
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    persona: "director",
    created_at: "2024-01-17T09:15:00Z",
    completed_at: "2024-01-17T09:30:00Z",
    dependency_score: 82,
    interpretation: "Forte dépendance ; commencez par la sensibilisation et des gains rapides urgents"
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    persona: "student",
    created_at: "2024-01-18T16:00:00Z",
    completed_at: "2024-01-18T16:12:00Z",
    dependency_score: 35,
    interpretation: "Déjà sur la voie du Libre"
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440004",
    persona: "parent",
    created_at: "2024-01-19T11:45:00Z",
    completed_at: "2024-01-19T12:00:00Z",
    dependency_score: 68,
    interpretation: "En transition ; concentrez-vous sur les gains rapides"
  }
]

export const mockAnswers: QuizAnswer[] = [
  {
    id: "660e8400-e29b-41d4-a716-446655440000",
    session_id: "550e8400-e29b-41d4-a716-446655440000",
    question_id: "q1",
    option_id: "q1-o3",
    score: 8,
    roadmap_tag: "software",
    answered_at: "2024-01-15T10:32:00Z"
  },
  {
    id: "660e8400-e29b-41d4-a716-446655440001",
    session_id: "550e8400-e29b-41d4-a716-446655440000",
    question_id: "q2",
    option_id: "q2-o2",
    score: 6,
    roadmap_tag: "data",
    answered_at: "2024-01-15T10:33:00Z"
  },
  {
    id: "660e8400-e29b-41d4-a716-446655440002",
    session_id: "550e8400-e29b-41d4-a716-446655440000",
    question_id: "q3",
    option_id: "q3-o4",
    score: 9,
    roadmap_tag: "hardware",
    answered_at: "2024-01-15T10:34:00Z"
  },
  {
    id: "660e8400-e29b-41d4-a716-446655440003",
    session_id: "550e8400-e29b-41d4-a716-446655440001",
    question_id: "q1",
    option_id: "q1-o2",
    score: 4,
    roadmap_tag: "software",
    answered_at: "2024-01-16T14:22:00Z"
  },
  {
    id: "660e8400-e29b-41d4-a716-446655440004",
    session_id: "550e8400-e29b-41d4-a716-446655440001",
    question_id: "q2",
    option_id: "q2-o1",
    score: 2,
    roadmap_tag: "data",
    answered_at: "2024-01-16T14:23:00Z"
  }
]

export const mockResults: QuizResult[] = [
  {
    id: "770e8400-e29b-41d4-a716-446655440000",
    session_id: "550e8400-e29b-41d4-a716-446655440000",
    dependency_score: 75,
    interpretation_label: "Forte dépendance ; commencez par la sensibilisation et des gains rapides urgents",
    interpretation_description: "Votre école a une dépendance significative aux GAFAM. Commencez par la sensibilisation et des mesures immédiates de réduction des risques.",
    top_weakness_tags: ["hardware", "software", "data"],
    created_at: "2024-01-15T10:45:00Z"
  },
  {
    id: "770e8400-e29b-41d4-a716-446655440001",
    session_id: "550e8400-e29b-41d4-a716-446655440001",
    dependency_score: 45,
    interpretation_label: "En transition ; concentrez-vous sur les gains rapides",
    interpretation_description: "Vous êtes au milieu de votre transition. Priorisez les gains rapides et la migration systématique pour accélérer votre progression.",
    top_weakness_tags: ["software", "training"],
    created_at: "2024-01-16T14:35:00Z"
  },
  {
    id: "770e8400-e29b-41d4-a716-446655440002",
    session_id: "550e8400-e29b-41d4-a716-446655440003",
    dependency_score: 35,
    interpretation_label: "Déjà sur la voie du Libre",
    interpretation_description: "Votre école progresse bien vers l'indépendance numérique. Concentrez-vous sur l'achèvement de votre migration et la construction de la durabilité.",
    top_weakness_tags: ["training"],
    created_at: "2024-01-18T16:12:00Z"
  }
]

export const mockRoadmaps: QuizRoadmap[] = [
  {
    id: "880e8400-e29b-41d4-a716-446655440000",
    session_id: "550e8400-e29b-41d4-a716-446655440000",
    stage_id: 0,
    stage_title: "Sensibilisation et inventaire",
    stage_why: "Comprendre l'état actuel de votre dépendance",
    action_id: "stage0-action1",
    action_title: "Audit matériel et logiciel",
    action_effort: "low",
    action_description: "Répertorier tous les équipements et logiciels utilisés",
    created_at: "2024-01-15T10:45:00Z"
  },
  {
    id: "880e8400-e29b-41d4-a716-446655440001",
    session_id: "550e8400-e29b-41d4-a716-446655440000",
    stage_id: 0,
    stage_title: "Sensibilisation et inventaire",
    stage_why: "Comprendre l'état actuel de votre dépendance",
    action_id: "stage0-action2",
    action_title: "Cartographie de l'emplacement des données",
    action_effort: "med",
    action_description: "Identifier où sont stockées toutes les données",
    created_at: "2024-01-15T10:45:00Z"
  },
  {
    id: "880e8400-e29b-41d4-a716-446655440002",
    session_id: "550e8400-e29b-41d4-a716-446655440001",
    stage_id: 1,
    stage_title: "Réduction rapide des risques",
    stage_why: "Réduire immédiatement les risques les plus critiques",
    action_id: "stage1-action1",
    action_title: "Adoption de LibreOffice",
    action_effort: "low",
    action_description: "Remplacer Microsoft Office par LibreOffice",
    created_at: "2024-01-16T14:35:00Z"
  }
]

// Helper functions to get data by session
export function getMockAnswersBySession(sessionId: string): QuizAnswer[] {
  return mockAnswers.filter(a => a.session_id === sessionId)
}

export function getMockResultBySession(sessionId: string): QuizResult | undefined {
  return mockResults.find(r => r.session_id === sessionId)
}

export function getMockRoadmapBySession(sessionId: string): QuizRoadmap[] {
  return mockRoadmaps.filter(r => r.session_id === sessionId)
}


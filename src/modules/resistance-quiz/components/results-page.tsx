"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getAnswers, clearQuizData, type Answer } from "../lib/storage"
import { calculateScore } from "../lib/utils"
import { saveResultsToSupabase } from "../lib/supabase-storage"
import { getCurrentSessionId } from "../lib/supabase-storage"
import { NirdLogo } from "./nird-logo"
import { ThemeToggle } from "./theme-toggle"

function getTopWeaknessTags(answers: Answer[]): string[] {
  const tagScores: Record<string, number> = {}
  
  answers.forEach(answer => {
    const tag = answer.roadmapTag
    tagScores[tag] = (tagScores[tag] || 0) + answer.score
  })

  return Object.entries(tagScores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([tag]) => tag)
}

function getInterpretation(score: number): { label: string; description: string; color: string } {
  if (score < 40) {
    return {
      label: "Déjà sur la voie du Libre",
      description: "Votre école progresse bien vers l'indépendance numérique. Concentrez-vous sur l'achèvement de votre migration et la construction de la durabilité.",
      color: "bg-green-500"
    }
  } else if (score < 70) {
    return {
      label: "En transition ; concentrez-vous sur les gains rapides",
      description: "Vous êtes au milieu de votre transition. Priorisez les gains rapides et la migration systématique pour accélérer votre progression.",
      color: "bg-yellow-500"
    }
  } else {
    return {
      label: "Forte dépendance ; commencez par la sensibilisation et des gains rapides urgents",
      description: "Votre école a une dépendance significative aux GAFAM. Commencez par la sensibilisation et des mesures immédiates de réduction des risques.",
      color: "bg-red-500"
    }
  }
}

export function ResultsPage() {
  const router = useRouter()
  const [score, setScore] = useState<number | null>(null)
  const [interpretation, setInterpretation] = useState<ReturnType<typeof getInterpretation> | null>(null)
  const [weaknessTags, setWeaknessTags] = useState<string[]>([])

  useEffect(() => {
    const answers = getAnswers()
    if (answers.length === 0) {
      router.push("/resistance-quiz")
      return
    }

    const calculatedScore = calculateScore(answers)
    const interpretationData = getInterpretation(calculatedScore)
    const tags = getTopWeaknessTags(answers)
    
    setScore(calculatedScore)
    setInterpretation(interpretationData)
    setWeaknessTags(tags)

    // Save to Supabase
    const sessionId = getCurrentSessionId()
    if (sessionId) {
      saveResultsToSupabase(sessionId, calculatedScore, interpretationData, tags).catch(console.error)
    }
  }, [router])

  const handleRestart = () => {
    clearQuizData()
    router.push("/resistance-quiz/persona")
  }

  const handleViewRoadmap = () => {
    router.push("/resistance-quiz/roadmap")
  }

  if (score === null || !interpretation) {
    return (
      <div className="flex min-h-screen items-center justify-center relative">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <NirdLogo size="md" />
            </div>
            <CardTitle>Chargement des résultats...</CardTitle>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <Card className="w-full max-w-3xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <NirdLogo size="md" />
          </div>
          <CardTitle className="text-3xl font-bold">Vos résultats</CardTitle>
          <CardDescription className="text-lg mt-2">
            Score de dépendance : {score}/100
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="text-6xl font-bold">{score}</div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-sm text-muted-foreground">
                / 100
              </div>
            </div>
            <div className={`w-24 h-3 rounded-full ${interpretation.color}`} />
          </div>

          <div className="space-y-2 text-center">
            <h3 className="text-xl font-semibold">{interpretation.label}</h3>
            <p className="text-muted-foreground">{interpretation.description}</p>
          </div>

          {weaknessTags.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold">Principales préoccupations :</h4>
              <div className="flex flex-wrap gap-2">
                {weaknessTags.map((tag) => {
                  const tagLabels: Record<string, string> = {
                    hardware: "Matériel",
                    data: "Données",
                    training: "Formation",
                    software: "Logiciel"
                  }
                  return (
                    <Badge key={tag} variant="secondary" className="text-sm">
                      {tagLabels[tag] || tag}
                    </Badge>
                  )
                })}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              onClick={handleViewRoadmap}
              size="lg"
              className="flex-1"
            >
              Voir ma feuille de route
            </Button>
            <Button
              onClick={handleRestart}
              size="lg"
              variant="outline"
              className="flex-1"
            >
              Recommencer le quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { type Question } from "../lib/questions"
import { getPersona, saveAnswer, getAnswers } from "../lib/storage"
import { getQuestionsFromSupabase } from "../lib/supabase-questions"
import { Info } from "lucide-react"
import { NirdLogo } from "./nird-logo"
import { ThemeToggle } from "./theme-toggle"

export function QuestionsPage() {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [explanation, setExplanation] = useState<string>("")
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadQuestions = async () => {
      const persona = getPersona()
      if (!persona) {
        router.push("/resistance-quiz/persona")
        return
      }

      setLoading(true)
      // Fetch questions from Supabase
      const questions = await getQuestionsFromSupabase(persona)
      setFilteredQuestions(questions)
      setLoading(false)
    }

    loadQuestions()
  }, [router])

  useEffect(() => {
    // Load existing answers to restore state when questions or index changes
    if (filteredQuestions.length === 0) return

    const answers = getAnswers()
    const currentQuestion = filteredQuestions[currentIndex]
    if (currentQuestion) {
      const existingAnswer = answers.find(a => a.questionId === currentQuestion.id)
      if (existingAnswer) {
        setSelectedOption(existingAnswer.optionId)
        const option = currentQuestion.options.find(o => o.id === existingAnswer.optionId)
        if (option) {
          setExplanation(option.explain)
          setShowExplanation(true)
        }
      } else {
        setSelectedOption(null)
        setShowExplanation(false)
        setExplanation("")
      }
    }
  }, [currentIndex, filteredQuestions])

  const currentQuestion = filteredQuestions[currentIndex]
  const progress = filteredQuestions.length > 0 
    ? ((currentIndex + 1) / filteredQuestions.length) * 100 
    : 0

  const handleOptionSelect = async (optionId: string) => {
    if (!currentQuestion) return

    const option = currentQuestion.options.find(o => o.id === optionId)
    if (!option) return

    setSelectedOption(optionId)
    setExplanation(option.explain)
    setShowExplanation(true)

    // Save answer
    await saveAnswer({
      questionId: currentQuestion.id,
      optionId: option.id,
      score: option.score,
      roadmapTag: option.roadmapTag
    })
  }

  const handleNext = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setSelectedOption(null)
      setShowExplanation(false)
      setExplanation("")

      // Load answer for next question
      const nextQuestion = filteredQuestions[currentIndex + 1]
      const answers = getAnswers()
      const existingAnswer = answers.find(a => a.questionId === nextQuestion.id)
      if (existingAnswer) {
        setSelectedOption(existingAnswer.optionId)
        const option = nextQuestion.options.find(o => o.id === existingAnswer.optionId)
        if (option) {
          setExplanation(option.explain)
          setShowExplanation(true)
        }
      }
    } else {
      router.push("/resistance-quiz/results")
    }
  }

  if (loading || filteredQuestions.length === 0) {
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
            <CardTitle>{loading ? "Chargement des questions..." : "Aucune question trouvée"}</CardTitle>
          </CardHeader>
        </Card>
      </div>
    )
  }

  if (!currentQuestion) {
    return null
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <div className="space-y-4">
            <div className="flex justify-center">
              <NirdLogo size="sm" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">Question {currentIndex + 1} sur {filteredQuestions.length}</CardTitle>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-6">{currentQuestion.text}</h2>
            <RadioGroup
              value={selectedOption || undefined}
              onValueChange={handleOptionSelect}
            >
              <div className="space-y-3">
                {currentQuestion.options.map((option) => (
                  <div
                    key={option.id}
                    className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                      selectedOption === option.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => handleOptionSelect(option.id)}
                  >
                    <RadioGroupItem value={option.id} id={option.id} className="mt-1 cursor-pointer" />
                    <Label
                      htmlFor={option.id}
                      className="flex-1 cursor-pointer font-normal"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          {showExplanation && explanation && (
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>{explanation}</AlertDescription>
            </Alert>
          )}

          <div className="flex justify-end pt-4">
            <Button
              onClick={handleNext}
              disabled={!selectedOption}
              size="lg"
            >
              {currentIndex < filteredQuestions.length - 1 ? "Suivant" : "Voir les résultats"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


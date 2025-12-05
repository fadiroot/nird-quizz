"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getAnswers, type Answer } from "../lib/storage"
import { generateRoadmap, type RoadmapStage, type EffortLevel } from "../lib/roadmap"
import { calculateScore } from "../lib/utils"
import { saveRoadmapToSupabase, getCurrentSessionId } from "../lib/supabase-storage"
import { ArrowLeft, CheckCircle2, MapPin, Navigation, ArrowRight } from "lucide-react"
import { NirdLogo } from "./nird-logo"
import { ThemeToggle } from "./theme-toggle"
import { cn } from "@/lib/utils"

const effortColors: Record<EffortLevel, string> = {
  low: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  med: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  high: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
}

const effortLabels: Record<EffortLevel, string> = {
  low: "Effort faible",
  med: "Effort moyen",
  high: "Effort élevé"
}

export function RoadmapPage() {
  const router = useRouter()
  const [stages, setStages] = useState<RoadmapStage[]>([])
  const [visibleStages, setVisibleStages] = useState<Set<number>>(new Set())
  const stageRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const answers = getAnswers()
    if (answers.length === 0) {
      router.push("/resistance-quiz")
      return
    }

    const score = calculateScore(answers)
    const roadmap = generateRoadmap(score, answers)
    setStages(roadmap)
    
    // Initialize first stage as visible
    if (roadmap.length > 0) {
      setVisibleStages(new Set([roadmap[0].id]))
    }

    // Save roadmap to Supabase
    const sessionId = getCurrentSessionId()
    if (sessionId && roadmap.length > 0) {
      saveRoadmapToSupabase(sessionId, roadmap).catch(console.error)
    }
  }, [router])

  useEffect(() => {
    const observers = stageRefs.current.map((ref, index) => {
      if (!ref) return null

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const stageId = stages[index]?.id
              if (stageId !== undefined) {
                setVisibleStages((prev) => new Set([...prev, stageId]))
              }
            }
          })
        },
        { threshold: 0.2, rootMargin: "-50px" }
      )

      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [stages])

  if (stages.length === 0) {
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
            <CardTitle>Chargement de la feuille de route...</CardTitle>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 p-4 py-8 relative">
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/resistance-quiz/results")}
            className="cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1 flex items-center justify-center gap-4">
            <div className="relative">
              <Navigation className="h-8 w-8 text-primary animate-pulse" />
              <MapPin className="h-4 w-4 text-primary absolute -top-1 -right-1" />
            </div>
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Votre feuille de route de transition
              </h1>
              <p className="text-muted-foreground mt-1">
                Un plan personnalisé étape par étape pour passer aux solutions Libres
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Roadmap */}
        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent hidden md:block" />
          
          {/* Stages */}
          <div className="space-y-12 md:space-y-16">
            {stages.map((stage, stageIndex) => {
              const isVisible = visibleStages.has(stage.id)
              const isLast = stageIndex === stages.length - 1
              
              return (
                <div
                  key={stage.id}
                  ref={(el) => {
                    stageRefs.current[stageIndex] = el
                  }}
                  className={cn(
                    "relative md:pl-20 transition-all duration-700",
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  )}
                  style={{
                    transitionDelay: `${stageIndex * 200}ms`
                  }}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-0 top-0 hidden md:flex items-center justify-center">
                    <div className="relative z-10">
                      <div className={cn(
                        "h-16 w-16 rounded-full border-4 flex items-center justify-center transition-all duration-500",
                        isVisible
                          ? "bg-primary border-primary shadow-lg shadow-primary/50 scale-100"
                          : "bg-background border-muted scale-90"
                      )}>
                        <span className={cn(
                          "text-xl font-bold transition-colors duration-500",
                          isVisible ? "text-primary-foreground" : "text-muted-foreground"
                        )}>
                          {stage.id}
                        </span>
                      </div>
                      {!isLast && (
                        <div className={cn(
                          "absolute top-16 left-1/2 -translate-x-1/2 w-0.5 transition-all duration-700",
                          isVisible
                            ? "h-16 bg-gradient-to-b from-primary to-primary/30"
                            : "h-0 bg-transparent"
                        )} />
                      )}
                    </div>
                  </div>

                  {/* Stage Card */}
                  <Card className={cn(
                    "relative overflow-hidden transition-all duration-500 hover:shadow-xl",
                    isVisible
                      ? "border-primary/50 shadow-lg"
                      : "border-border shadow-sm"
                  )}>
                    {/* Animated Background Gradient */}
                    <div className={cn(
                      "absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent transition-opacity duration-700",
                      isVisible ? "opacity-100" : "opacity-0"
                    )} />
                    
                    <CardHeader className="relative">
                      <div className="flex items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <CardTitle className="text-2xl md:text-3xl">{stage.title}</CardTitle>
                            {isVisible && (
                              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                            )}
                          </div>
                          <CardDescription className="text-base leading-relaxed">
                            {stage.why}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="relative space-y-3">
                      {stage.actions.map((action, actionIndex) => (
                        <div
                          key={action.id}
                          className={cn(
                            "group relative p-4 rounded-lg border bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-md",
                            isVisible
                              ? "opacity-100 translate-x-0"
                              : "opacity-0 translate-x-4"
                          )}
                          style={{
                            transitionDelay: `${(stageIndex * 200) + (actionIndex * 100)}ms`
                          }}
                        >
                          <div className="flex items-start gap-4">
                            <div className={cn(
                              "mt-1 p-1.5 rounded-full transition-all duration-300",
                              isVisible
                                ? "bg-primary/10 text-primary"
                                : "bg-muted text-muted-foreground"
                            )}>
                              <CheckCircle2 className="h-5 w-5" />
                            </div>
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center justify-between gap-2 flex-wrap">
                                <h4 className="font-semibold text-base group-hover:text-primary transition-colors">
                                  {action.title}
                                </h4>
                                <Badge
                                  variant="secondary"
                                  className={cn(
                                    "transition-all duration-300",
                                    effortColors[action.effort],
                                    isVisible && "scale-100 opacity-100",
                                    !isVisible && "scale-90 opacity-0"
                                  )}
                                >
                                  {effortLabels[action.effort]}
                                </Badge>
                              </div>
                              {action.description && (
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                  {action.description}
                                </p>
                              )}
                            </div>
                            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 shrink-0 mt-1" />
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-center pt-12 pb-8">
          <Button
            onClick={() => router.push("/resistance-quiz/results")}
            variant="outline"
            className="cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux résultats
          </Button>
        </div>
      </div>
    </div>
  )
}


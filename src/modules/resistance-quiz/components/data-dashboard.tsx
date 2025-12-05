"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { 
  mockSessions, 
  getMockAnswersBySession, 
  getMockResultBySession, 
  getMockRoadmapBySession 
} from "../lib/mock-data"
import type { QuizSession, QuizRoadmap } from "../lib/supabase"
import { NirdLogo } from "./nird-logo"
import { ThemeToggle } from "./theme-toggle"
import { 
  Users, 
  BarChart3, 
  FileText, 
  Map, 
  Calendar,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Minus
} from "lucide-react"
import { cn } from "@/lib/utils"

const personaLabels: Record<string, string> = {
  teacher: "Enseignant",
  it_admin: "Administrateur IT",
  director: "Directeur",
  student: "Étudiant",
  parent: "Parent / Communauté"
}

const tagLabels: Record<string, string> = {
  hardware: "Matériel",
  data: "Données",
  training: "Formation",
  software: "Logiciel"
}

const effortColors: Record<string, string> = {
  low: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  med: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  high: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
}

function getScoreColor(score: number): string {
  if (score < 40) return "text-green-600 dark:text-green-400"
  if (score < 70) return "text-yellow-600 dark:text-yellow-400"
  return "text-red-600 dark:text-red-400"
}

function getScoreTrend(score: number): { icon: typeof TrendingUp; label: string } {
  if (score < 40) return { icon: TrendingDown, label: "Excellent" }
  if (score < 70) return { icon: Minus, label: "Moyen" }
  return { icon: TrendingUp, label: "Élevé" }
}

export function DataDashboard() {
  const [selectedSession, setSelectedSession] = useState<QuizSession | null>(null)

  const stats = {
    totalSessions: mockSessions.length,
    completedSessions: mockSessions.filter(s => s.completed_at).length,
    averageScore: Math.round(
      mockSessions
        .filter(s => s.dependency_score !== undefined)
        .reduce((sum, s) => sum + (s.dependency_score || 0), 0) /
      mockSessions.filter(s => s.dependency_score !== undefined).length
    ),
    personaDistribution: mockSessions.reduce((acc, s) => {
      acc[s.persona] = (acc[s.persona] || 0) + 1
      return acc
    }, {} as Record<string, number>)
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <NirdLogo size="md" />
            <div>
              <h1 className="text-3xl font-bold">Tableau de bord des données</h1>
              <p className="text-muted-foreground">Visualisation des données du quiz NIRD</p>
            </div>
          </div>
          <ThemeToggle />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sessions totales</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalSessions}</div>
              <p className="text-xs text-muted-foreground">
                {stats.completedSessions} complétées
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Score moyen</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={cn("text-2xl font-bold", getScoreColor(stats.averageScore))}>
                {stats.averageScore}/100
              </div>
              <p className="text-xs text-muted-foreground">
                Dépendance moyenne
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taux de complétion</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round((stats.completedSessions / stats.totalSessions) * 100)}%
              </div>
              <p className="text-xs text-muted-foreground">
                Sessions terminées
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Personas actives</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Object.keys(stats.personaDistribution).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Types de profils
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sessions List */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Sessions</CardTitle>
              <CardDescription>Liste des sessions de quiz</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="space-y-2">
                  {mockSessions.map((session) => {
                    const TrendIcon = session.dependency_score 
                      ? getScoreTrend(session.dependency_score).icon 
                      : Minus
                    return (
                      <div
                        key={session.id}
                        onClick={() => setSelectedSession(session)}
                        className={cn(
                          "p-4 rounded-lg border cursor-pointer transition-colors",
                          selectedSession?.id === session.id
                            ? "bg-primary/10 border-primary"
                            : "hover:bg-accent"
                        )}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline">
                                {personaLabels[session.persona] || session.persona}
                              </Badge>
                              {session.completed_at && (
                                <Badge variant="secondary" className="text-xs">
                                  Complété
                                </Badge>
                              )}
                            </div>
                            {session.dependency_score !== undefined && (
                              <div className="flex items-center gap-2 mt-2">
                                <span className={cn("text-lg font-bold", getScoreColor(session.dependency_score))}>
                                  {session.dependency_score}/100
                                </span>
                                <TrendIcon className="h-4 w-4 text-muted-foreground" />
                              </div>
                            )}
                            <p className="text-xs text-muted-foreground mt-1">
                              <Calendar className="inline h-3 w-3 mr-1" />
                              {new Date(session.created_at).toLocaleDateString("fr-FR")}
                            </p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Session Details */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Détails de la session</CardTitle>
              <CardDescription>
                {selectedSession 
                  ? `Session ${selectedSession.id.slice(0, 8)}...`
                  : "Sélectionnez une session pour voir les détails"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedSession ? (
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
                    <TabsTrigger value="answers">Réponses</TabsTrigger>
                    <TabsTrigger value="results">Résultats</TabsTrigger>
                    <TabsTrigger value="roadmap">Feuille de route</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Persona</p>
                        <p className="font-semibold">
                          {personaLabels[selectedSession.persona] || selectedSession.persona}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Date de création</p>
                        <p className="font-semibold">
                          {new Date(selectedSession.created_at).toLocaleString("fr-FR")}
                        </p>
                      </div>
                      {selectedSession.completed_at && (
                        <div>
                          <p className="text-sm text-muted-foreground">Date de complétion</p>
                          <p className="font-semibold">
                            {new Date(selectedSession.completed_at).toLocaleString("fr-FR")}
                          </p>
                        </div>
                      )}
                      {selectedSession.dependency_score !== undefined && (
                        <div>
                          <p className="text-sm text-muted-foreground">Score de dépendance</p>
                          <p className={cn("font-bold text-xl", getScoreColor(selectedSession.dependency_score))}>
                            {selectedSession.dependency_score}/100
                          </p>
                        </div>
                      )}
                    </div>
                    {selectedSession.interpretation && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Interprétation</p>
                        <p className="font-semibold">{selectedSession.interpretation}</p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="answers" className="space-y-4">
                    <ScrollArea className="h-[400px]">
                      {getMockAnswersBySession(selectedSession.id).map((answer) => (
                        <div key={answer.id} className="p-4 border rounded-lg mb-2">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold">Question: {answer.question_id}</span>
                            <Badge variant="outline">Score: {answer.score}</Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={effortColors[answer.roadmap_tag] || ""}>
                              {tagLabels[answer.roadmap_tag] || answer.roadmap_tag}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              Option: {answer.option_id}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            {new Date(answer.answered_at).toLocaleString("fr-FR")}
                          </p>
                        </div>
                      ))}
                      {getMockAnswersBySession(selectedSession.id).length === 0 && (
                        <p className="text-center text-muted-foreground py-8">
                          Aucune réponse trouvée pour cette session
                        </p>
                      )}
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="results" className="space-y-4">
                    {getMockResultBySession(selectedSession.id) ? (
                      <div className="space-y-4">
                        <div className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-sm text-muted-foreground">Score de dépendance</span>
                            <span className={cn("text-3xl font-bold", getScoreColor(getMockResultBySession(selectedSession.id)!.dependency_score))}>
                              {getMockResultBySession(selectedSession.id)!.dependency_score}/100
                            </span>
                          </div>
                          <Separator className="my-4" />
                          <div className="space-y-2">
                            <p className="font-semibold">
                              {getMockResultBySession(selectedSession.id)!.interpretation_label}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {getMockResultBySession(selectedSession.id)!.interpretation_description}
                            </p>
                          </div>
                          {getMockResultBySession(selectedSession.id)!.top_weakness_tags.length > 0 && (
                            <div className="mt-4">
                              <p className="text-sm font-semibold mb-2">Principales préoccupations:</p>
                              <div className="flex flex-wrap gap-2">
                                {getMockResultBySession(selectedSession.id)!.top_weakness_tags.map((tag) => (
                                  <Badge key={tag} variant="secondary">
                                    {tagLabels[tag] || tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <p className="text-center text-muted-foreground py-8">
                        Aucun résultat trouvé pour cette session
                      </p>
                    )}
                  </TabsContent>

                  <TabsContent value="roadmap" className="space-y-4">
                    <ScrollArea className="h-[400px]">
                      {getMockRoadmapBySession(selectedSession.id).length > 0 ? (
                        <div className="space-y-4">
                          {Object.entries(
                            getMockRoadmapBySession(selectedSession.id).reduce((acc, item) => {
                              if (!acc[item.stage_id]) {
                                acc[item.stage_id] = {
                                  stage_title: item.stage_title,
                                  stage_why: item.stage_why,
                                  actions: []
                                }
                              }
                              acc[item.stage_id].actions.push(item)
                              return acc
                            }, {} as Record<number, { stage_title: string; stage_why: string; actions: QuizRoadmap[] }>)
                          ).map(([stageId, stage]) => (
                            <div key={stageId} className="p-4 border rounded-lg">
                              <div className="mb-3">
                                <h3 className="font-semibold text-lg">{stage.stage_title}</h3>
                                <p className="text-sm text-muted-foreground">{stage.stage_why}</p>
                              </div>
                              <div className="space-y-2">
                                {stage.actions.map((action) => (
                                  <div key={action.action_id} className="p-3 bg-accent rounded-lg">
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="font-medium">{action.action_title}</span>
                                      <Badge className={effortColors[action.action_effort] || ""}>
                                        {action.action_effort}
                                      </Badge>
                                    </div>
                                    {action.action_description && (
                                      <p className="text-sm text-muted-foreground">
                                        {action.action_description}
                                      </p>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-center text-muted-foreground py-8">
                          Aucune feuille de route trouvée pour cette session
                        </p>
                      )}
                    </ScrollArea>
                  </TabsContent>
                </Tabs>
              ) : (
                <div className="flex items-center justify-center h-[500px] text-muted-foreground">
                  <div className="text-center">
                    <Map className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Sélectionnez une session pour voir les détails</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


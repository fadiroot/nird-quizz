"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { savePersona } from "../lib/storage"
import { type Persona } from "../lib/questions"
import { GraduationCap, Server, School, Users, Heart, Check, MousePointer2 } from "lucide-react"
import { useState } from "react"
import { NirdLogo } from "./nird-logo"
import { ThemeToggle } from "./theme-toggle"
import { cn } from "@/lib/utils"

const personas: { id: Persona; label: string; icon: typeof GraduationCap; description: string }[] = [
  {
    id: "teacher",
    label: "Enseignant",
    icon: GraduationCap,
    description: "Je travaille directement avec les élèves et j'utilise des outils pédagogiques quotidiennement"
  },
  {
    id: "it-admin",
    label: "Administrateur IT",
    icon: Server,
    description: "Je gère l'infrastructure technique et les systèmes de l'école"
  },
  {
    id: "school-director",
    label: "Directeur d'école",
    icon: School,
    description: "Je prends des décisions stratégiques concernant la technologie et les politiques de l'école"
  },
  {
    id: "student",
    label: "Élève",
    icon: Users,
    description: "J'utilise la technologie de l'école pour apprendre et collaborer"
  },
  {
    id: "parent",
    label: "Parent / Communauté",
    icon: Heart,
    description: "Je suis préoccupé par la vie privée numérique de mon enfant et les choix technologiques de l'école"
  }
]

export function PersonaPage() {
  const router = useRouter()
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null)

  const handleSelect = async (persona: Persona) => {
    setSelectedPersona(persona)
    await savePersona(persona)
    router.push("/resistance-quiz/questions")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 py-8 relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <Card className="w-full max-w-5xl">
        <CardHeader className="text-center space-y-4 pb-8">
          <div className="flex justify-center">
            <NirdLogo size="md" />
          </div>
          <CardTitle className="text-3xl font-bold">Qui êtes-vous ?</CardTitle>
          <CardDescription className="text-base max-w-2xl mx-auto">
            Sélectionnez votre rôle pour que nous puissions adapter les questions à votre perspective
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {personas.map((persona) => {
              const Icon = persona.icon
              const isSelected = selectedPersona === persona.id
              
              return (
                <button
                  key={persona.id}
                  type="button"
                  onClick={() => handleSelect(persona.id)}
                  className={cn(
                    "relative group text-left p-6 rounded-lg border-2 transition-all duration-200 cursor-pointer",
                    "hover:shadow-md hover:scale-[1.02] active:scale-[0.98]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                    isSelected
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-border bg-card hover:border-primary/50"
                  )}
                >
                  {isSelected && (
                    <div className="absolute top-3 right-3">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground">
                        <Check className="h-4 w-4" />
                      </div>
                    </div>
                  )}
                  
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {!isSelected && (
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary">
                        <MousePointer2 className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "flex items-center justify-center w-12 h-12 rounded-lg shrink-0 transition-colors",
                      isSelected
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                    )}>
                      <Icon className="h-6 w-6" />
                    </div>
                    
                    <div className="flex-1 min-w-0 space-y-2">
                      <h3 className={cn(
                        "text-lg font-semibold leading-tight",
                        isSelected ? "text-primary" : "text-foreground"
                      )}>
                        {persona.label}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed break-words">
                        {persona.description}
                      </p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


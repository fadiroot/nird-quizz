"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"
import { CheckCircle2, Users, Shield, Recycle } from "lucide-react"
import { NirdLogo } from "./nird-logo"
import { ThemeToggle } from "./theme-toggle"

export function LandingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background p-4 relative">
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      
      <div className="max-w-5xl mx-auto py-8">
        {/* Header Section */}
        <div className="text-center space-y-4 mb-12">
          <div className="flex justify-center">
            <NirdLogo size="lg" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">Quiz de Résistance NIRD</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ce quiz mesure la dépendance numérique de votre école et génère une feuille de route de transition personnalisée vers des solutions Libres.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column - NIRD Description */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description NIRD */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Qu'est-ce que le NIRD ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Le <strong>NIRD</strong> — <strong>Numérique Inclusif, Responsable et Durable</strong> — aide les établissements scolaires à reprendre la maîtrise de leur environnement numérique. Il encourage des choix technologiques ouverts, la protection de la vie privée, et un numérique accessible, éthique et durable, sans dépendance excessive aux Big Tech.
                </p>
              </CardContent>
            </Card>

            {/* Les 3 modules principaux */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Les 3 modules principaux du NIRD</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg border bg-card">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <h4 className="font-semibold">Inclusif</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Un numérique accessible à toutes et tous, avec des solutions adaptées aux besoins de chacun.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg border bg-card">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Shield className="h-5 w-5 text-primary" />
                      </div>
                      <h4 className="font-semibold">Responsable</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Respectueux des personnes et des données, avec protection de la vie privée et éthique numérique.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg border bg-card">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Recycle className="h-5 w-5 text-primary" />
                      </div>
                      <h4 className="font-semibold">Durable</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Sobriété en ressources, réparable et pérenne, avec réemploi et allongement de la durée de vie.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - CTA Card (Sticky) */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-xl">Comment ce quiz vous aide</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-sm">Diagnostiquer</p>
                      <p className="text-xs text-muted-foreground">
                        Comprendre votre dépendance actuelle aux plateformes des GAFAM
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-sm">Apprendre les risques</p>
                      <p className="text-xs text-muted-foreground">
                        Découvrir les risques grâce à des retours éducatifs
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-sm">Obtenir une feuille de route</p>
                      <p className="text-xs text-muted-foreground">
                        Recevoir un plan personnalisé étape par étape
                      </p>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <Button 
                  size="lg" 
                  className="w-full"
                  onClick={() => router.push("/resistance-quiz/persona")}
                >
                  Commencer le quiz
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}


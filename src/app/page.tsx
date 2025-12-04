"use client"

import { useState } from "react"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/modules/showcase/components/theme-toggle"
import { ButtonShowcase } from "@/modules/showcase/components/button-showcase"
import { InputShowcase } from "@/modules/showcase/components/input-showcase"
import { CardShowcase } from "@/modules/showcase/components/card-showcase"
import { DialogShowcase } from "@/modules/showcase/components/dialog-showcase"
import { SelectShowcase } from "@/modules/showcase/components/select-showcase"
import { NavigationShowcase } from "@/modules/showcase/components/navigation-showcase"
import { DataDisplayShowcase } from "@/modules/showcase/components/data-display-showcase"
import { FeedbackShowcase } from "@/modules/showcase/components/feedback-showcase"
import { MenuShowcase } from "@/modules/showcase/components/menu-showcase"
import { MiscShowcase } from "@/modules/showcase/components/misc-showcase"
import { CalendarShowcase } from "@/modules/showcase/components/calendar-showcase"
import { OtpShowcase } from "@/modules/showcase/components/otp-showcase"
import { CarouselShowcase } from "@/modules/showcase/components/carousel-showcase"
import { PopoverShowcase } from "@/modules/showcase/components/popover-showcase"
import { Toaster } from "@/components/ui/sonner"
import { cn } from "@/lib/utils"
import {
  LayoutGrid,
  MousePointer,
  Type,
  CreditCard,
  Layers,
  ListChecks,
  Navigation,
  BarChart3,
  Bell,
  Menu,
  Puzzle,
  CalendarDays,
  KeyRound,
  GalleryHorizontal,
  PanelTop,
} from "lucide-react"

const sections = [
  { id: "buttons", label: "Buttons", icon: MousePointer, component: ButtonShowcase },
  { id: "inputs", label: "Inputs", icon: Type, component: InputShowcase },
  { id: "cards", label: "Cards", icon: CreditCard, component: CardShowcase },
  { id: "dialogs", label: "Dialogs", icon: Layers, component: DialogShowcase },
  { id: "selects", label: "Selection", icon: ListChecks, component: SelectShowcase },
  { id: "navigation", label: "Navigation", icon: Navigation, component: NavigationShowcase },
  { id: "data", label: "Data Display", icon: BarChart3, component: DataDisplayShowcase },
  { id: "feedback", label: "Feedback", icon: Bell, component: FeedbackShowcase },
  { id: "menus", label: "Menus", icon: Menu, component: MenuShowcase },
  { id: "misc", label: "Misc", icon: Puzzle, component: MiscShowcase },
  { id: "calendar", label: "Calendar", icon: CalendarDays, component: CalendarShowcase },
  { id: "otp", label: "OTP Input", icon: KeyRound, component: OtpShowcase },
  { id: "carousel", label: "Carousel", icon: GalleryHorizontal, component: CarouselShowcase },
  { id: "popover", label: "Popover", icon: PanelTop, component: PopoverShowcase },
]

export default function Home() {
  const [activeSection, setActiveSection] = useState("buttons")

  const ActiveComponent = sections.find(s => s.id === activeSection)?.component || ButtonShowcase

  return (
    <div className="flex min-h-screen bg-background">
      <Toaster />
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-card">
        <div className="flex h-16 items-center gap-2 border-b px-6">
          <LayoutGrid className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight">NIRD UI</span>
        </div>
        <ScrollArea className="h-[calc(100vh-4rem)] py-4">
          <nav className="space-y-1 px-3">
            {sections.map((section) => {
              const Icon = section.icon
              return (
                <Button
                  key={section.id}
                  variant={activeSection === section.id ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3",
                    activeSection === section.id && "bg-secondary"
                  )}
                  onClick={() => setActiveSection(section.id)}
                >
                  <Icon className="h-4 w-4" />
                  {section.label}
                </Button>
              )
            })}
          </nav>
        </ScrollArea>
      </aside>

      <main className="ml-64 flex-1">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 px-8 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div>
            <h1 className="text-2xl font-bold capitalize">
              {sections.find(s => s.id === activeSection)?.label}
            </h1>
            <p className="text-sm text-muted-foreground">
              shadcn/ui component showcase
            </p>
          </div>
          <ThemeToggle />
        </header>

        <div className="p-8">
          <ActiveComponent />
        </div>
      </main>
    </div>
  )
}

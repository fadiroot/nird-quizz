"use client"

import { School } from "lucide-react"
import { cn } from "@/lib/utils"

interface NirdLogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
  showText?: boolean
}

export function NirdLogo({ className, size = "md", showText = true }: NirdLogoProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12"
  }

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-2xl"
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex items-center justify-center rounded-lg bg-primary text-primary-foreground p-1.5">
        <School className={sizeClasses[size]} />
      </div>
      {showText && (
        <span className={cn("font-bold tracking-tight", textSizeClasses[size])}>
          NIRD
        </span>
      )}
    </div>
  )
}


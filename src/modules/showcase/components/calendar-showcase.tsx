"use client"

import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"

export function CalendarShowcase() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Calendar</h3>
        <div className="flex flex-wrap gap-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </div>
      </div>
    </div>
  )
}


"use client"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Loader2, Mail, ChevronRight } from "lucide-react"

export function ButtonShowcase() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Variants</h3>
        <div className="flex flex-wrap gap-3">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Sizes</h3>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon"><Mail className="h-4 w-4" /></Button>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">With Icons</h3>
        <div className="flex flex-wrap gap-3">
          <Button>
            <Mail /> Login with Email
          </Button>
          <Button disabled>
            <Loader2 className="animate-spin" /> Please wait
          </Button>
          <Button>
            Next <ChevronRight />
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Button Group</h3>
        <ButtonGroup>
          <Button variant="outline">Left</Button>
          <Button variant="outline">Center</Button>
          <Button variant="outline">Right</Button>
        </ButtonGroup>
      </div>
    </div>
  )
}


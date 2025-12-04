"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import { Search, Mail, Lock } from "lucide-react"

export function InputShowcase() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Basic Input</h3>
        <div className="grid gap-4 max-w-sm">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Enter your email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" placeholder="Enter password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="disabled">Disabled</Label>
            <Input id="disabled" placeholder="Disabled input" disabled />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Input Group</h3>
        <div className="grid gap-4 max-w-sm">
          <InputGroup>
            <InputGroupAddon>
              <InputGroupText><Search className="h-4 w-4" /></InputGroupText>
            </InputGroupAddon>
            <InputGroupInput placeholder="Search..." />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon>
              <InputGroupText><Mail className="h-4 w-4" /></InputGroupText>
            </InputGroupAddon>
            <InputGroupInput placeholder="Email" />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon>
              <InputGroupText><Lock className="h-4 w-4" /></InputGroupText>
            </InputGroupAddon>
            <InputGroupInput type="password" placeholder="Password" />
          </InputGroup>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Textarea</h3>
        <div className="max-w-sm space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" placeholder="Type your message here..." />
        </div>
      </div>
    </div>
  )
}


"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SearchBarProps {
  defaultValue?: string
  size?: "default" | "large"
  variant?: "default" | "hero"
  className?: string
}

export function SearchBar({
  defaultValue = "",
  size = "default",
  variant = "default",
  className = "",
}: SearchBarProps) {
  const router = useRouter()
  const [query, setQuery] = useState(defaultValue)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (query.trim()) params.set("search", query.trim())
    router.push(`/browse?${params.toString()}`)
  }

  const isLarge = size === "large"
  const isHero = variant === "hero"

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex items-center gap-2 ${className}`}
    >
      <div className="relative flex-1">
        <Search
          className={`absolute left-4 top-1/2 -translate-y-1/2 ${
            isHero ? "text-muted-foreground" : "text-muted-foreground"
          } ${isLarge ? "h-5 w-5" : "h-4 w-4"}`}
        />
        <Input
          type="text"
          placeholder="Search businesses, services, categories..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={`rounded-lg border-0 shadow-sm ${
            isHero
              ? "bg-card text-foreground placeholder:text-muted-foreground"
              : "bg-card text-foreground"
          } ${isLarge ? "h-14 pl-12 pr-4 text-base" : "h-10 pl-10 pr-3 text-sm"}`}
        />
      </div>
      <Button
        type="submit"
        className={`shrink-0 rounded-lg shadow-sm ${
          isHero ? "bg-accent text-accent-foreground hover:bg-accent/90" : ""
        } ${isLarge ? "h-14 px-7 text-base" : "h-10 px-4"}`}
      >
        Search
      </Button>
    </form>
  )
}

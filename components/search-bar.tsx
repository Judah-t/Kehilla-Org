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
  className?: string
}

export function SearchBar({
  defaultValue = "",
  size = "default",
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

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex items-center gap-2 ${className}`}
    >
      <div className="relative flex-1">
        <Search
          className={`absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground ${
            isLarge ? "h-5 w-5" : "h-4 w-4"
          }`}
        />
        <Input
          type="text"
          placeholder="Search businesses, services, or categories..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={`${isLarge ? "h-12 pl-11 text-base" : "h-10 pl-10 text-sm"} border-border bg-card`}
        />
      </div>
      <Button
        type="submit"
        className={isLarge ? "h-12 px-6" : "h-10 px-4"}
      >
        Search
      </Button>
    </form>
  )
}

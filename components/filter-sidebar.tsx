"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import type { Category } from "@/lib/supabase"

interface FilterSidebarProps {
  categories: Category[]
}

export function FilterSidebar({ categories }: FilterSidebarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get("category") ?? ""

  const handleCategoryClick = useCallback(
    (slug: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (slug === activeCategory) {
        params.delete("category")
      } else {
        params.set("category", slug)
      }
      router.push(`/browse?${params.toString()}`)
    },
    [router, searchParams, activeCategory]
  )

  const handleClearFilters = useCallback(() => {
    router.push("/browse")
  }, [router])

  return (
    <aside className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">Categories</h2>
        {activeCategory && (
          <button
            type="button"
            onClick={handleClearFilters}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Clear
          </button>
        )}
      </div>
      <Separator />
      <nav className="flex flex-col gap-1" aria-label="Category filter">
        <button
          type="button"
          onClick={() => handleCategoryClick("")}
          className={`rounded-md px-3 py-2 text-left text-sm font-medium transition-colors ${
            !activeCategory
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          All Categories
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => handleCategoryClick(cat.slug)}
            className={`rounded-md px-3 py-2 text-left text-sm font-medium transition-colors ${
              activeCategory === cat.slug
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </nav>
    </aside>
  )
}

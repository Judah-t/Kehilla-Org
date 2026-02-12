"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useState } from "react"
import { Check, SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import type { Category, Neighborhood } from "@/lib/supabase"

interface FilterSidebarProps {
  categories: Category[]
  neighborhoods: Neighborhood[]
  resultCount?: number
}

function FilterContent({
  categories,
  neighborhoods,
  activeCategory,
  activeNeighborhoods,
  onCategoryClick,
  onNeighborhoodToggle,
  onClear,
}: {
  categories: Category[]
  neighborhoods: Neighborhood[]
  activeCategory: string
  activeNeighborhoods: string[]
  onCategoryClick: (slug: string) => void
  onNeighborhoodToggle: (slug: string) => void
  onClear: () => void
}) {
  const hasFilters = activeCategory || activeNeighborhoods.length > 0

  return (
    <div className="flex flex-col gap-8">
      {/* Neighborhoods */}
      <section>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-primary">
          Neighborhoods
        </h3>
        <div className="mt-4 flex flex-col">
          {neighborhoods.map((n) => {
            const isActive = activeNeighborhoods.includes(n.slug)
            return (
              <button
                key={n.id}
                type="button"
                onClick={() => onNeighborhoodToggle(n.slug)}
                className="flex items-center justify-between border-b border-border px-1 py-3.5 text-sm text-foreground transition-colors last:border-b-0 hover:bg-muted/50"
              >
                <span className={isActive ? "font-medium" : ""}>
                  {n.name}
                </span>
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-colors ${
                    isActive
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border"
                  }`}
                >
                  {isActive && <Check className="h-3.5 w-3.5" />}
                </span>
              </button>
            )
          })}
        </div>
      </section>

      {/* Business Category */}
      <section>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-primary">
          Business Category
        </h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.slug
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onCategoryClick(cat.slug)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-foreground hover:border-primary/40 hover:text-primary"
                }`}
              >
                {cat.name}
              </button>
            )
          })}
        </div>
      </section>

      {/* Clear All */}
      {hasFilters && (
        <button
          type="button"
          onClick={onClear}
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Clear All
        </button>
      )}
    </div>
  )
}

export function FilterSidebar({
  categories,
  neighborhoods,
  resultCount,
}: FilterSidebarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [open, setOpen] = useState(false)

  const activeCategory = searchParams.get("category") ?? ""
  const activeNeighborhoods = searchParams.getAll("neighborhood")

  const pushFilters = useCallback(
    (cat: string, hoods: string[]) => {
      const params = new URLSearchParams(searchParams.toString())
      params.delete("category")
      params.delete("neighborhood")
      if (cat) params.set("category", cat)
      for (const h of hoods) {
        params.append("neighborhood", h)
      }
      router.push(`/browse?${params.toString()}`)
    },
    [router, searchParams],
  )

  const handleCategoryClick = useCallback(
    (slug: string) => {
      const next = slug === activeCategory ? "" : slug
      pushFilters(next, activeNeighborhoods)
    },
    [activeCategory, activeNeighborhoods, pushFilters],
  )

  const handleNeighborhoodToggle = useCallback(
    (slug: string) => {
      const next = activeNeighborhoods.includes(slug)
        ? activeNeighborhoods.filter((s) => s !== slug)
        : [...activeNeighborhoods, slug]
      pushFilters(activeCategory, next)
    },
    [activeCategory, activeNeighborhoods, pushFilters],
  )

  const handleClear = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete("category")
    params.delete("neighborhood")
    router.push(`/browse?${params.toString()}`)
  }, [router, searchParams])

  const filterContentProps = {
    categories,
    neighborhoods,
    activeCategory,
    activeNeighborhoods,
    onCategoryClick: handleCategoryClick,
    onNeighborhoodToggle: handleNeighborhoodToggle,
    onClear: handleClear,
  }

  const hasFilters = activeCategory || activeNeighborhoods.length > 0

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block">
        <FilterContent {...filterContentProps} />
      </aside>

      {/* Mobile sheet trigger */}
      <div className="lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="gap-2"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {hasFilters && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
                  {(activeCategory ? 1 : 0) + activeNeighborhoods.length}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent
            side="bottom"
            className="flex max-h-[85vh] flex-col rounded-t-2xl px-5 pb-0"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border pb-4">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-sm text-muted-foreground"
              >
                Cancel
              </button>
              <SheetTitle className="text-base font-semibold">
                Filters
              </SheetTitle>
              <button
                type="button"
                onClick={() => {
                  handleClear()
                  setOpen(false)
                }}
                className="text-sm font-medium text-primary"
              >
                Reset
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto py-5">
              <FilterContent {...filterContentProps} />
            </div>

            {/* Sticky bottom bar */}
            <div className="flex items-center gap-4 border-t border-border bg-background px-1 py-4">
              <button
                type="button"
                onClick={() => {
                  handleClear()
                }}
                className="text-sm font-medium text-muted-foreground"
              >
                Clear All
              </button>
              <Button
                className="flex-1 rounded-full"
                size="lg"
                onClick={() => setOpen(false)}
              >
                {resultCount !== undefined
                  ? `Show ${resultCount} Results`
                  : "Show Results"}
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}

import { Suspense } from "react"
import { SearchBar } from "@/components/search-bar"
import { FilterSidebar } from "@/components/filter-sidebar"
import { BusinessCard } from "@/components/business-card"
import {
  getBusinesses,
  getCategories,
  getNeighborhoods,
} from "@/lib/supabase"
import { Skeleton } from "@/components/ui/skeleton"

interface BrowsePageProps {
  searchParams: Promise<{
    category?: string
    search?: string
    neighborhood?: string | string[]
  }>
}

async function BusinessGrid({
  category,
  search,
}: {
  category?: string
  search?: string
}) {
  const businesses = await getBusinesses({ category, search })

  if (businesses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-20 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
          <span className="text-2xl text-muted-foreground/40">?</span>
        </div>
        <p className="mt-4 font-display text-lg font-semibold text-foreground">
          No businesses found
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Try adjusting your search or filters
        </p>
      </div>
    )
  }

  return (
    <>
      <p className="mb-4 text-sm text-muted-foreground">
        {businesses.length} {businesses.length === 1 ? "business" : "businesses"} found
      </p>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {businesses.map((biz) => (
          <BusinessCard key={biz.id} business={biz} />
        ))}
      </div>
    </>
  )
}

function GridSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={`skeleton-${i}`}
          className="flex flex-col overflow-hidden rounded-xl border border-border"
        >
          <Skeleton className="h-44 w-full" />
          <div className="flex flex-col gap-3 p-5">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default async function BrowsePage({ searchParams }: BrowsePageProps) {
  const params = await searchParams
  const [categories, neighborhoods, allBusinesses] = await Promise.all([
    getCategories(),
    getNeighborhoods(),
    getBusinesses({ category: params.category, search: params.search }),
  ])

  const activeCategory = params.category
  const activeSearch = params.search

  const categoryName = activeCategory
    ? categories.find((c) => c.slug === activeCategory)?.name
    : null

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-12">
      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
          {categoryName ? categoryName : "Browse Directory"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {activeSearch
            ? `Showing results for "${activeSearch}"`
            : "Discover trusted local businesses in the community"}
        </p>
      </div>

      {/* Search + mobile filter trigger */}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchBar defaultValue={activeSearch} className="max-w-xl flex-1" />
        <FilterSidebar
          categories={categories}
          neighborhoods={neighborhoods}
          resultCount={allBusinesses.length}
        />
      </div>

      {/* Content */}
      <div className="mt-8 flex flex-col gap-10 lg:flex-row">
        {/* Desktop sidebar */}
        <div className="hidden w-60 shrink-0 lg:block">
          <FilterSidebar
            categories={categories}
            neighborhoods={neighborhoods}
            resultCount={allBusinesses.length}
          />
        </div>

        {/* Grid */}
        <div className="flex-1">
          <Suspense fallback={<GridSkeleton />}>
            <BusinessGrid
              category={activeCategory}
              search={activeSearch}
            />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

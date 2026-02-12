import { Suspense } from "react"
import { SearchBar } from "@/components/search-bar"
import { FilterSidebar } from "@/components/filter-sidebar"
import { BusinessCard } from "@/components/business-card"
import { getBusinesses, getCategories } from "@/lib/supabase"
import { Skeleton } from "@/components/ui/skeleton"

interface BrowsePageProps {
  searchParams: Promise<{
    category?: string
    search?: string
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
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16 text-center">
        <p className="text-lg font-medium text-foreground">
          No businesses found
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Try adjusting your search or filters
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {businesses.map((biz) => (
        <BusinessCard key={biz.id} business={biz} />
      ))}
    </div>
  )
}

function GridSkeleton() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={`skeleton-${i}`}
          className="flex flex-col overflow-hidden rounded-xl border border-border"
        >
          <Skeleton className="h-40 w-full" />
          <div className="flex flex-col gap-3 p-5">
            <Skeleton className="h-5 w-3/4" />
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
  const categories = await getCategories()

  const activeCategory = params.category
  const activeSearch = params.search

  const categoryName = activeCategory
    ? categories.find((c) => c.slug === activeCategory)?.name
    : null

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-12">
      {/* Page Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">
            {categoryName ? categoryName : "Browse Businesses"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {activeSearch
              ? `Showing results for "${activeSearch}"`
              : "Discover trusted local businesses in the community"}
          </p>
        </div>
        <SearchBar defaultValue={activeSearch} className="max-w-xl" />
      </div>

      {/* Content */}
      <div className="mt-8 flex flex-col gap-8 lg:flex-row">
        {/* Sidebar */}
        <div className="w-full shrink-0 lg:w-56">
          <FilterSidebar categories={categories} />
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

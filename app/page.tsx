import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/hero-section"
import { CategoryCard } from "@/components/category-card"
import { BusinessCard } from "@/components/business-card"
import { getCategories, getFeaturedBusinesses } from "@/lib/supabase"

export default async function HomePage() {
  const [categories, featured] = await Promise.all([
    getCategories(),
    getFeaturedBusinesses(),
  ])

  return (
    <>
      <HeroSection />

      {/* Categories Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              Categories
            </p>
            <h2 className="mt-1 text-2xl font-bold text-foreground">
              Browse by Category
            </h2>
          </div>
          <Button variant="ghost" size="sm" asChild className="hidden md:flex">
            <Link href="/browse">
              View all
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* Featured Businesses */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Featured
              </p>
              <h2 className="mt-1 text-2xl font-bold text-foreground">
                Trusted by the Community
              </h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="hidden md:flex"
            >
              <Link href="/browse">
                View all
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((biz) => (
              <BusinessCard key={biz.id} business={biz} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Button variant="outline" className="rounded-full" asChild>
              <Link href="/browse">
                View all businesses
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
        <div className="rounded-2xl bg-primary px-6 py-12 text-center md:px-12 md:py-16">
          <h2 className="text-balance text-2xl font-bold text-primary-foreground md:text-3xl">
            Own a business? Join the directory.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-primary-foreground/80 md:text-base">
            Get discovered by community members looking for trusted local
            services and businesses.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="mt-6 rounded-full"
            asChild
          >
            <Link href="/browse">List your business</Link>
          </Button>
        </div>
      </section>
    </>
  )
}

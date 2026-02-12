import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/hero-section"
import { CategoryCard } from "@/components/category-card"
import { BusinessCard } from "@/components/business-card"
import { FeaturedCarousel } from "@/components/featured-carousel"
import { getCategories, getFeaturedBusinesses, getBusinesses } from "@/lib/supabase"

export default async function HomePage() {
  const [categories, featured, allBusinesses] = await Promise.all([
    getCategories(),
    getFeaturedBusinesses(),
    getBusinesses({ limit: 8 }),
  ])

  return (
    <>
      <HeroSection />

      {/* Featured Spot - horizontal carousel like TJB */}
      <section className="mx-auto max-w-7xl px-4 py-14 lg:px-8 lg:py-16">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-display text-xl font-bold text-foreground md:text-2xl">
              Featured Spot
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Community favorites handpicked for you
            </p>
          </div>
          <Link
            href="/browse"
            className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline md:flex"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-6">
          <FeaturedCarousel businesses={featured} />
        </div>
      </section>

      {/* Category tiles */}
      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-14 lg:px-8 lg:py-16">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-display text-xl font-bold text-foreground md:text-2xl">
                Shop by Category
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Browse businesses organized by what you need
              </p>
            </div>
            <Link
              href="/browse"
              className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline md:flex"
            >
              All categories
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* All Businesses grid */}
      <section className="mx-auto max-w-7xl px-4 py-14 lg:px-8 lg:py-16">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-display text-xl font-bold text-foreground md:text-2xl">
              All Businesses
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Discover trusted local businesses in the community
            </p>
          </div>
          <Link
            href="/browse"
            className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline md:flex"
          >
            Browse all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {allBusinesses.map((biz) => (
            <BusinessCard key={biz.id} business={biz} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/browse">
              View all businesses
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-primary">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-balance text-2xl font-bold text-primary-foreground md:text-3xl">
              Own a business? Get listed today.
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-base leading-relaxed text-primary-foreground/75">
              Join the directory and get discovered by community members looking
              for trusted local services and businesses.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90"
                asChild
              >
                <Link href="/browse">Add Your Business</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                asChild
              >
                <Link href="/browse">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter / WhatsApp section */}
      <section className="mx-auto max-w-7xl px-4 py-14 lg:px-8 lg:py-16">
        <div className="rounded-xl border border-border bg-card p-8 text-center md:p-12">
          <h2 className="font-display text-xl font-bold text-foreground md:text-2xl">
            Stay in the Know
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            {"Keep up to date with the community's hottest deals, new businesses, and local events."}
          </p>
          <form className="mx-auto mt-6 flex max-w-md gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="h-11 flex-1 rounded-lg border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <Button type="button" className="h-11 shrink-0">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </>
  )
}

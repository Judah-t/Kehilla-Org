import { SearchBar } from "@/components/search-bar"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background px-4 pb-16 pt-20 md:pb-20 md:pt-28">
      {/* Subtle decorative ring */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full border border-primary/10" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full border border-primary/5" />

      <div className="relative mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
          Community Business Directory
        </p>
        <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
          Find trusted businesses
          <br />
          in your community.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-pretty text-base leading-relaxed text-muted-foreground">
          Kehilla connects you with reliable, community-recommended local
          businesses and services.
        </p>
        <div className="mx-auto mt-8 max-w-lg">
          <SearchBar size="large" />
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm">
          <span className="text-muted-foreground">Popular:</span>
          {["Restaurants", "Education", "Health", "Real Estate"].map(
            (term) => (
              <a
                key={term}
                href={`/browse?category=${term.toLowerCase().replace(" ", "-")}`}
                className="rounded-full border border-border px-3 py-1 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {term}
              </a>
            ),
          )}
        </div>
      </div>
    </section>
  )
}

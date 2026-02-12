import { SearchBar } from "@/components/search-bar"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-primary px-4 py-20 md:py-28 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(213_56%_45%_/_0.5),_transparent_70%)]" />
      <div className="relative mx-auto max-w-3xl text-center">
        <h1 className="text-balance text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl lg:text-5xl">
          Your community,
          <br />
          your trusted businesses.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-primary-foreground/80 md:text-lg">
          Kehilla connects you with reliable, community-recommended local
          businesses and services.
        </p>
        <div className="mx-auto mt-8 max-w-xl">
          <SearchBar size="large" />
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-primary-foreground/60">
          <span>Popular:</span>
          {["Restaurants", "Education", "Health", "Real Estate"].map((term) => (
            <a
              key={term}
              href={`/browse?category=${term.toLowerCase().replace(" ", "-")}`}
              className="rounded-full border border-primary-foreground/20 px-3 py-1 text-primary-foreground/70 transition-colors hover:border-primary-foreground/40 hover:text-primary-foreground"
            >
              {term}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

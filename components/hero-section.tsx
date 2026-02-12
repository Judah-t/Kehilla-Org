import Link from "next/link"
import { SearchBar } from "@/components/search-bar"

const QUICK_LINKS = [
  { label: "Food & Drink", href: "/browse?category=food-drink" },
  { label: "Services", href: "/browse?category=services" },
  { label: "Shopping", href: "/browse?category=shopping" },
  { label: "Events", href: "/browse?category=events" },
  { label: "Health", href: "/browse?category=health-wellness" },
]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-primary px-4 pb-20 pt-24 md:pb-28 md:pt-32">
      {/* Subtle decorative shapes */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-primary-foreground/5" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-primary-foreground/5" />

      <div className="relative mx-auto max-w-3xl text-center">
        <p className="text-sm font-medium tracking-wider text-primary-foreground/70">
          YOUR COMMUNITY BUSINESS DIRECTORY
        </p>
        <h1 className="mt-5 font-display text-balance text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl lg:text-6xl">
          Discover trusted businesses in your community
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-primary-foreground/75 md:text-lg">
          Find local shops, restaurants, services, and professionals recommended
          by people you know and trust.
        </p>
        <div className="mx-auto mt-10 max-w-xl">
          <SearchBar size="large" variant="hero" />
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm">
          <span className="text-primary-foreground/60">Popular:</span>
          {QUICK_LINKS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-full border border-primary-foreground/20 px-3.5 py-1.5 text-sm text-primary-foreground/80 transition-colors hover:border-primary-foreground/40 hover:text-primary-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

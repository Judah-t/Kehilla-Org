import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { Business } from "@/lib/supabase"

interface FeaturedCarouselProps {
  businesses: Business[]
}

export function FeaturedCarousel({ businesses }: FeaturedCarouselProps) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {businesses.map((biz) => (
        <Link
          key={biz.id}
          href={`/business/${biz.slug}`}
          className="group relative flex h-64 w-56 shrink-0 flex-col justify-end overflow-hidden rounded-xl bg-primary/5 p-5 transition-all hover:shadow-lg sm:w-64"
        >
          {/* Large letter background */}
          <span className="pointer-events-none absolute -right-4 -top-4 font-display text-[10rem] font-bold leading-none text-primary/[0.04]">
            {biz.name.charAt(0)}
          </span>

          <div className="relative z-10">
            <span className="mb-2 inline-block rounded-md bg-accent/10 px-2 py-0.5 text-[11px] font-semibold text-accent">
              Featured
            </span>
            <h3 className="font-display text-base font-semibold text-foreground group-hover:text-primary">
              {biz.name}
            </h3>
            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
              {biz.description}
            </p>
          </div>

          <div className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-card shadow-sm opacity-0 transition-opacity group-hover:opacity-100">
            <ArrowUpRight className="h-3.5 w-3.5 text-foreground" />
          </div>
        </Link>
      ))}
    </div>
  )
}

import Link from "next/link"
import { MapPin, ArrowUpRight } from "lucide-react"
import type { Business } from "@/lib/supabase"

interface BusinessCardProps {
  business: Business
}

export function BusinessCard({ business }: BusinessCardProps) {
  return (
    <Link
      href={`/business/${business.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-lg"
    >
      {/* Image area */}
      <div className="relative flex h-44 items-center justify-center bg-secondary">
        <span className="font-display text-5xl font-bold text-muted-foreground/10">
          {business.name.charAt(0)}
        </span>
        <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-card/90 opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4 text-foreground" />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-base font-semibold text-foreground transition-colors group-hover:text-primary">
            {business.name}
          </h3>
        </div>

        <span className="w-fit rounded-md bg-primary/8 px-2 py-0.5 text-xs font-medium text-primary">
          {business.category}
        </span>

        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {business.description}
        </p>

        <div className="mt-auto flex items-center gap-1.5 pt-2 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">
            {business.neighborhood ? `${business.neighborhood}, ` : ""}{business.city}
          </span>
        </div>
      </div>
    </Link>
  )
}

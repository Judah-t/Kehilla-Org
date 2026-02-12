import Link from "next/link"
import { MapPin, Phone } from "lucide-react"
import type { Business } from "@/lib/supabase"

interface BusinessCardProps {
  business: Business
}

export function BusinessCard({ business }: BusinessCardProps) {
  return (
    <Link
      href={`/business/${business.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-md"
    >
      {/* Placeholder header with initial */}
      <div className="flex h-36 items-center justify-center bg-secondary">
        <span className="text-4xl font-bold text-muted-foreground/20">
          {business.name.charAt(0)}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
            {business.name}
          </h3>
          <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            {business.category}
          </span>
        </div>

        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {business.description}
        </p>

        <div className="mt-auto flex flex-col gap-1.5 pt-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">
              {business.address}, {business.city}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Phone className="h-3.5 w-3.5 shrink-0" />
            <span>{business.phone}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

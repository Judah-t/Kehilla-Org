import Link from "next/link"
import { MapPin, Phone } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Business } from "@/lib/supabase"

interface BusinessCardProps {
  business: Business
}

export function BusinessCard({ business }: BusinessCardProps) {
  return (
    <Link
      href={`/business/${business.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-md"
    >
      <div className="flex h-40 items-center justify-center bg-muted">
        <span className="text-4xl font-bold text-muted-foreground/30">
          {business.name.charAt(0)}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors text-pretty">
            {business.name}
          </h3>
          <Badge
            variant="secondary"
            className="shrink-0 text-xs"
          >
            {business.category}
          </Badge>
        </div>

        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {business.description}
        </p>

        <div className="mt-auto flex flex-col gap-1.5 pt-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">
              {business.address}, {business.city}, {business.state}
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

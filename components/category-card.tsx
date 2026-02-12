import Link from "next/link"
import {
  UtensilsCrossed,
  Wrench,
  ShoppingBag,
  Heart,
  GraduationCap,
  PartyPopper,
  Building2,
  Scale,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import type { Category } from "@/lib/supabase"

const ICON_MAP: Record<string, LucideIcon> = {
  UtensilsCrossed,
  Wrench,
  ShoppingBag,
  Heart,
  GraduationCap,
  PartyPopper,
  Building2,
  Scale,
}

interface CategoryCardProps {
  category: Category
}

export function CategoryCard({ category }: CategoryCardProps) {
  const Icon = ICON_MAP[category.icon] ?? Building2

  return (
    <Link
      href={`/browse?category=${category.slug}`}
      className="group flex flex-col items-start gap-4 rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-md"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/8 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h3 className="font-display text-sm font-semibold text-foreground">
          {category.name}
        </h3>
        {category.description && (
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            {category.description}
          </p>
        )}
      </div>
    </Link>
  )
}

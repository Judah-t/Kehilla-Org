import Link from "next/link"
import {
  UtensilsCrossed,
  ShoppingCart,
  GraduationCap,
  Heart,
  Home,
  Scale,
  Building2,
  Landmark,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import type { Category } from "@/lib/supabase"

const ICON_MAP: Record<string, LucideIcon> = {
  UtensilsCrossed,
  ShoppingCart,
  GraduationCap,
  Heart,
  Home,
  Scale,
  Building2,
  Landmark,
}

interface CategoryCardProps {
  category: Category
}

export function CategoryCard({ category }: CategoryCardProps) {
  const Icon = ICON_MAP[category.icon] ?? Building2

  return (
    <Link
      href={`/browse?category=${category.slug}`}
      className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-sm"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon className="h-5 w-5" />
      </div>
      <span className="text-sm font-medium text-foreground">
        {category.name}
      </span>
    </Link>
  )
}

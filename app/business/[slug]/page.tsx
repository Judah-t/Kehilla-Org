import React from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  Share2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { getBusinessBySlug, getBusinesses } from "@/lib/supabase"

interface BusinessPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: BusinessPageProps) {
  const { slug } = await params
  const business = await getBusinessBySlug(slug)
  if (!business) return { title: "Business Not Found" }
  return {
    title: business.name,
    description: business.description,
  }
}

export default async function BusinessPage({ params }: BusinessPageProps) {
  const { slug } = await params
  const business = await getBusinessBySlug(slug)

  if (!business) notFound()

  const relatedBusinesses = (
    await getBusinesses({ category: business.category.toLowerCase().replace(/\s+&\s+/g, "-").replace(/\s+/g, "-") })
  )
    .filter((b) => b.id !== business.id)
    .slice(0, 3)

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-12">
      {/* Back link */}
      <Link
        href="/browse"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to directory
      </Link>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Main content */}
        <div className="flex-1">
          {/* Header image area */}
          <div className="relative flex h-56 items-center justify-center overflow-hidden rounded-xl bg-secondary md:h-72">
            <span className="pointer-events-none font-display text-[8rem] font-bold text-muted-foreground/[0.06]">
              {business.name.charAt(0)}
            </span>
            {business.featured && (
              <span className="absolute left-4 top-4 rounded-md bg-accent px-2.5 py-1 text-xs font-semibold text-accent-foreground">
                Featured
              </span>
            )}
          </div>

          {/* Business info */}
          <div className="mt-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h1 className="font-display text-2xl font-bold text-foreground text-balance md:text-3xl">
                  {business.name}
                </h1>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-primary/8 px-2.5 py-0.5 text-xs font-medium text-primary">
                    {business.category}
                  </span>
                  {business.subcategory && (
                    <span className="rounded-md bg-secondary px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                      {business.subcategory}
                    </span>
                  )}
                  {business.neighborhood && (
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {business.neighborhood}
                    </span>
                  )}
                </div>
              </div>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Share2 className="h-3.5 w-3.5" />
                Share
              </Button>
            </div>

            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {business.description}
            </p>

            {/* Tags */}
            {business.tags.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {business.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-border px-3 py-1 text-xs text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Related businesses */}
          {relatedBusinesses.length > 0 && (
            <div className="mt-12">
              <Separator className="mb-8" />
              <h2 className="font-display text-lg font-semibold text-foreground">
                More in {business.category}
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {relatedBusinesses.map((biz) => (
                  <Link
                    key={biz.id}
                    href={`/business/${biz.slug}`}
                    className="group rounded-xl border border-border bg-card p-5 transition-all hover:shadow-md"
                  >
                    <h3 className="font-display text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                      {biz.name}
                    </h3>
                    <span className="mt-1.5 inline-block rounded-md bg-primary/8 px-2 py-0.5 text-[11px] font-medium text-primary">
                      {biz.category}
                    </span>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {biz.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar - Contact Info */}
        <aside className="w-full shrink-0 lg:w-80">
          <div className="sticky top-24 rounded-xl border border-border bg-card p-6">
            <h2 className="font-display text-sm font-semibold text-foreground">
              Contact Information
            </h2>

            <div className="mt-5 flex flex-col gap-4">
              <ContactRow icon={MapPin} label="Address">
                <span>
                  {business.address}
                  <br />
                  {business.city}
                </span>
              </ContactRow>

              <ContactRow icon={Phone} label="Phone">
                <a
                  href={`tel:${business.phone}`}
                  className="text-primary hover:underline"
                >
                  {business.phone}
                </a>
              </ContactRow>

              <ContactRow icon={Mail} label="Email">
                <a
                  href={`mailto:${business.email}`}
                  className="break-all text-primary hover:underline"
                >
                  {business.email}
                </a>
              </ContactRow>

              <ContactRow icon={Globe} label="Website">
                <a
                  href={business.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all text-primary hover:underline"
                >
                  {business.website.replace(/^https?:\/\//, "")}
                </a>
              </ContactRow>

              <ContactRow icon={Clock} label="Hours">
                <span>{business.hours}</span>
              </ContactRow>
            </div>

            <Separator className="my-5" />

            <div className="flex flex-col gap-2">
              <Button className="w-full" asChild>
                <a href={`tel:${business.phone}`}>Call Now</a>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <a href={`mailto:${business.email}`}>Send Email</a>
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

function ContactRow({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <div className="text-sm text-foreground">{children}</div>
      </div>
    </div>
  )
}

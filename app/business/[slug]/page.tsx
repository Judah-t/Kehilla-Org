import React from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, MapPin, Phone, Mail, Globe, Clock } from "lucide-react"
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
    title: `${business.name} | Kehilla`,
    description: business.description,
  }
}

export default async function BusinessPage({ params }: BusinessPageProps) {
  const { slug } = await params
  const business = await getBusinessBySlug(slug)

  if (!business) notFound()

  const relatedBusinesses = (
    await getBusinesses({ category: business.category })
  )
    .filter((b) => b.id !== business.id)
    .slice(0, 3)

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-12">
      {/* Back link */}
      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link href="/browse">
          <ArrowLeft className="mr-1.5 h-4 w-4" />
          Back to directory
        </Link>
      </Button>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Main content */}
        <div className="flex-1">
          {/* Header image area */}
          <div className="flex h-52 items-center justify-center rounded-xl bg-secondary md:h-64">
            <span className="text-6xl font-bold text-muted-foreground/15">
              {business.name.charAt(0)}
            </span>
          </div>

          {/* Business info */}
          <div className="mt-6">
            <div className="flex flex-wrap items-start gap-3">
              <h1 className="text-2xl font-bold text-foreground md:text-3xl text-balance">
                {business.name}
              </h1>
              <span className="mt-1.5 rounded-full bg-primary/10 px-3 py-0.5 text-sm font-medium text-primary">
                {business.category}
              </span>
            </div>

            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {business.description}
            </p>

            {/* Tags */}
            {business.tags.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {business.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Related businesses */}
          {relatedBusinesses.length > 0 && (
            <div className="mt-10">
              <Separator className="mb-8" />
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Related
              </p>
              <h2 className="mt-1 text-lg font-semibold text-foreground">
                More in {business.category}
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {relatedBusinesses.map((biz) => (
                  <Link
                    key={biz.id}
                    href={`/business/${biz.slug}`}
                    className="group rounded-xl border border-border bg-card p-4 transition-all hover:shadow-md"
                  >
                    <h3 className="text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                      {biz.name}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
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
          <div className="sticky top-20 rounded-xl border border-border bg-card p-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-primary">
              Contact Information
            </h2>

            <div className="mt-5 flex flex-col gap-4">
              <ContactRow icon={MapPin} label="Address">
                <span>
                  {business.address}
                  <br />
                  {business.city}, {business.state} {business.zip}
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

            <Button className="w-full rounded-full" asChild>
              <a href={`tel:${business.phone}`}>Call Now</a>
            </Button>
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
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-xs text-muted-foreground">{label}</span>
        <div className="text-sm text-foreground">{children}</div>
      </div>
    </div>
  )
}

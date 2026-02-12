import Link from "next/link"

const FOOTER_LINKS = [
  {
    title: "Directory",
    links: [
      { href: "/browse", label: "Browse All" },
      { href: "/browse?category=restaurants", label: "Restaurants" },
      { href: "/browse?category=education", label: "Education" },
      { href: "/browse?category=health", label: "Health" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "#", label: "About" },
      { href: "#", label: "Contact" },
      { href: "#", label: "Privacy Policy" },
      { href: "#", label: "Terms of Service" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-base font-bold text-primary-foreground">
                  K
                </span>
              </div>
              <span className="text-lg font-semibold text-foreground">
                Kehilla
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Connecting our community with trusted local businesses. Find the
              services you need from people you can rely on.
            </p>
          </div>

          <div className="flex gap-16">
            {FOOTER_LINKS.map((group) => (
              <div key={group.title}>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {group.title}
                </h3>
                <ul className="mt-3 flex flex-col gap-2.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <p className="text-center text-xs text-muted-foreground">
            {`\u00A9 ${new Date().getFullYear()} Kehilla. All rights reserved.`}
          </p>
        </div>
      </div>
    </footer>
  )
}

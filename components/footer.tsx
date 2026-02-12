import Link from "next/link"

const DIRECTORY_LINKS = [
  { href: "/browse", label: "Browse All" },
  { href: "/browse?category=food-drink", label: "Food & Drink" },
  { href: "/browse?category=services", label: "Services" },
  { href: "/browse?category=shopping", label: "Shopping" },
  { href: "/browse?category=events", label: "Events" },
]

const COMPANY_LINKS = [
  { href: "#", label: "About Kehilla" },
  { href: "#", label: "Advertise" },
  { href: "#", label: "Contact Us" },
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Terms of Service" },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          {/* Brand */}
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <span className="font-display text-lg font-bold text-primary-foreground">
                  K
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-lg font-bold leading-tight text-foreground">
                  Kehilla
                </span>
              </div>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Your community business directory. Find trusted local shops,
              restaurants, services, and professionals recommended by people you
              know.
            </p>
          </div>

          {/* Link columns */}
          <div className="flex gap-16">
            <div>
              <h3 className="font-display text-[11px] font-semibold uppercase tracking-widest text-primary">
                Directory
              </h3>
              <ul className="mt-3 flex flex-col gap-2.5">
                {DIRECTORY_LINKS.map((link) => (
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
            <div>
              <h3 className="font-display text-[11px] font-semibold uppercase tracking-widest text-primary">
                Company
              </h3>
              <ul className="mt-3 flex flex-col gap-2.5">
                {COMPANY_LINKS.map((link) => (
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

import { createBrowserClient } from "@supabase/ssr"

// ─── Types ────────────────────────────────────────────────────────────────────
export interface Business {
  id: string
  slug: string
  name: string
  description: string
  category: string
  subcategory?: string
  phone: string
  email: string
  website: string
  address: string
  city: string
  neighborhood?: string
  image_url: string
  hours: string
  tags: string[]
  featured?: boolean
  created_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  icon: string
  description?: string
  subcategories?: { name: string; slug: string }[]
}

export interface Neighborhood {
  id: string
  name: string
  slug: string
}

// ─── Client ───────────────────────────────────────────────────────────────────
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// ─── Placeholder data ─────────────────────────────────────────────────────────
const PLACEHOLDER_NEIGHBORHOODS: Neighborhood[] = [
  { id: "1", name: "Williamsburg", slug: "williamsburg" },
  { id: "2", name: "Borough Park", slug: "borough-park" },
  { id: "3", name: "Flatbush / Midwood", slug: "flatbush-midwood" },
  { id: "4", name: "Crown Heights", slug: "crown-heights" },
  { id: "5", name: "Lakewood", slug: "lakewood" },
  { id: "6", name: "Monsey", slug: "monsey" },
]

const PLACEHOLDER_CATEGORIES: Category[] = [
  {
    id: "1",
    name: "Food & Drink",
    slug: "food-drink",
    icon: "UtensilsCrossed",
    description: "Restaurants, bakeries, catering & more",
    subcategories: [
      { name: "Restaurants", slug: "restaurants" },
      { name: "Bakery", slug: "bakery" },
      { name: "Catering", slug: "catering" },
      { name: "Meat & Fish", slug: "meat-fish" },
    ],
  },
  {
    id: "2",
    name: "Services",
    slug: "services",
    icon: "Wrench",
    description: "Home repair, transport, fitness & more",
    subcategories: [
      { name: "Home Repair", slug: "home-repair" },
      { name: "Transportation", slug: "transportation" },
      { name: "Photography", slug: "photography" },
      { name: "Fitness", slug: "fitness" },
    ],
  },
  {
    id: "3",
    name: "Shopping",
    slug: "shopping",
    icon: "ShoppingBag",
    description: "Clothing, gifts, housewares & Judaica",
    subcategories: [
      { name: "Gifts", slug: "gifts" },
      { name: "Clothing", slug: "clothing" },
      { name: "Judaica", slug: "judaica" },
      { name: "Housewares", slug: "housewares" },
    ],
  },
  {
    id: "4",
    name: "Health & Wellness",
    slug: "health-wellness",
    icon: "Heart",
    description: "Doctors, therapists, spas & wellness",
    subcategories: [
      { name: "Medical", slug: "medical" },
      { name: "Therapy", slug: "therapy" },
      { name: "Spa & Beauty", slug: "spa-beauty" },
    ],
  },
  {
    id: "5",
    name: "Education",
    slug: "education",
    icon: "GraduationCap",
    description: "Schools, tutors, lessons & enrichment",
  },
  {
    id: "6",
    name: "Events",
    slug: "events",
    icon: "PartyPopper",
    description: "Party planners, venues, musicians & DJs",
  },
  {
    id: "7",
    name: "Real Estate",
    slug: "real-estate",
    icon: "Building2",
    description: "Sales, rentals & property management",
  },
  {
    id: "8",
    name: "Legal & Finance",
    slug: "legal-finance",
    icon: "Scale",
    description: "Lawyers, accountants & financial planners",
  },
]

const PLACEHOLDER_BUSINESSES: Business[] = [
  {
    id: "1",
    slug: "glatt-mart",
    name: "Glatt Mart",
    description:
      "A full-service kosher supermarket offering a wide selection of fresh produce, meats, baked goods, and pantry staples. Family-owned and serving the community for over 20 years.",
    category: "Food & Drink",
    subcategory: "Groceries",
    phone: "(718) 555-0101",
    email: "info@glattmart.com",
    website: "https://glattmart.com",
    address: "1234 Main Street",
    city: "Brooklyn, NY",
    neighborhood: "Borough Park",
    image_url: "",
    hours: "Sun-Thu 7am-10pm, Fri 7am-3pm",
    tags: ["kosher", "groceries", "supermarket"],
    featured: true,
    created_at: "2024-01-15T00:00:00Z",
  },
  {
    id: "2",
    slug: "torah-academy",
    name: "Torah Academy",
    description:
      "A premier educational institution offering comprehensive Torah and secular studies. Dedicated faculty and small class sizes ensure personalized attention for every student.",
    category: "Education",
    phone: "(718) 555-0202",
    email: "admissions@torahacademy.edu",
    website: "https://torahacademy.edu",
    address: "5678 Oak Avenue",
    city: "Brooklyn, NY",
    neighborhood: "Flatbush / Midwood",
    image_url: "",
    hours: "Sun-Thu 8am-4pm, Fri 8am-12pm",
    tags: ["education", "yeshiva", "school"],
    featured: true,
    created_at: "2024-02-10T00:00:00Z",
  },
  {
    id: "3",
    slug: "jerusalem-grill",
    name: "Jerusalem Grill",
    description:
      "Authentic Middle Eastern cuisine with the highest kosher standards. Enjoy shawarma, falafel, hummus, and grilled specialties in a warm family atmosphere.",
    category: "Food & Drink",
    subcategory: "Restaurants",
    phone: "(718) 555-0303",
    email: "eat@jerusalemgrill.com",
    website: "https://jerusalemgrill.com",
    address: "910 Cedar Lane",
    city: "Brooklyn, NY",
    neighborhood: "Williamsburg",
    image_url: "",
    hours: "Sun-Thu 11am-11pm, Motzei Shabbos 8pm-12am",
    tags: ["restaurant", "kosher", "middle eastern"],
    featured: true,
    created_at: "2024-03-05T00:00:00Z",
  },
  {
    id: "4",
    slug: "shalom-health",
    name: "Shalom Health Center",
    description:
      "Comprehensive family healthcare providing preventative care, urgent care, and specialty services. Board-certified physicians who understand the needs of the frum community.",
    category: "Health & Wellness",
    subcategory: "Medical",
    phone: "(718) 555-0404",
    email: "appointments@shalomhealth.com",
    website: "https://shalomhealth.com",
    address: "2468 Maple Drive",
    city: "Brooklyn, NY",
    neighborhood: "Crown Heights",
    image_url: "",
    hours: "Sun-Thu 8am-6pm, Fri 8am-1pm",
    tags: ["health", "medical", "doctor"],
    featured: true,
    created_at: "2024-03-20T00:00:00Z",
  },
  {
    id: "5",
    slug: "chesed-real-estate",
    name: "Chesed Real Estate",
    description:
      "Helping families find their perfect home. Specializing in residential sales and rentals across Brooklyn and Lakewood with personalized service.",
    category: "Real Estate",
    phone: "(718) 555-0505",
    email: "homes@chesedrealestate.com",
    website: "https://chesedrealestate.com",
    address: "1357 Elm Street",
    city: "Brooklyn, NY",
    neighborhood: "Borough Park",
    image_url: "",
    hours: "Sun-Thu 9am-7pm, Fri 9am-1pm",
    tags: ["real estate", "homes", "rentals"],
    created_at: "2024-04-01T00:00:00Z",
  },
  {
    id: "6",
    slug: "goldberg-law",
    name: "Goldberg Law Offices",
    description:
      "Experienced legal counsel in family law, business law, real estate transactions, and estate planning. Serving the community with integrity for over 15 years.",
    category: "Legal & Finance",
    phone: "(718) 555-0606",
    email: "consult@goldberglaw.com",
    website: "https://goldberglaw.com",
    address: "7890 Pine Road",
    city: "Brooklyn, NY",
    neighborhood: "Flatbush / Midwood",
    image_url: "",
    hours: "Sun-Thu 9am-5pm",
    tags: ["legal", "lawyer", "attorney"],
    created_at: "2024-04-15T00:00:00Z",
  },
  {
    id: "7",
    slug: "bayit-neeman-services",
    name: "Bayit Ne'eman Services",
    description:
      "Professional home repair and renovation services you can trust. From plumbing and electrical to full kitchen remodels, our skilled team does it right the first time.",
    category: "Services",
    subcategory: "Home Repair",
    phone: "(718) 555-0707",
    email: "service@bayitneeman.com",
    website: "https://bayitneeman.com",
    address: "3691 Birch Boulevard",
    city: "Brooklyn, NY",
    neighborhood: "Williamsburg",
    image_url: "",
    hours: "Sun-Thu 8am-6pm, Fri 8am-12pm",
    tags: ["home services", "plumbing", "renovation"],
    created_at: "2024-05-01T00:00:00Z",
  },
  {
    id: "8",
    slug: "simcha-financial",
    name: "Simcha Financial Group",
    description:
      "Comprehensive financial planning, tax preparation, and investment advisory services. Helping families build financial security with personalized strategies.",
    category: "Legal & Finance",
    phone: "(718) 555-0808",
    email: "plan@simchafinancial.com",
    website: "https://simchafinancial.com",
    address: "4820 Walnut Street",
    city: "Brooklyn, NY",
    neighborhood: "Lakewood",
    image_url: "",
    hours: "Sun-Thu 9am-5pm",
    tags: ["finance", "accounting", "tax"],
    created_at: "2024-05-20T00:00:00Z",
  },
  {
    id: "9",
    slug: "the-challah-house",
    name: "The Challah House",
    description:
      "Artisanal challahs and baked goods made fresh every week. Known for our signature pull-apart challahs, rugelach, and custom cakes for every simcha.",
    category: "Food & Drink",
    subcategory: "Bakery",
    phone: "(718) 555-0909",
    email: "orders@challahhouse.com",
    website: "https://challahhouse.com",
    address: "225 Baker Street",
    city: "Brooklyn, NY",
    neighborhood: "Borough Park",
    image_url: "",
    hours: "Sun-Thu 7am-7pm, Fri 7am-2pm",
    tags: ["bakery", "challah", "cakes"],
    featured: true,
    created_at: "2024-06-01T00:00:00Z",
  },
  {
    id: "10",
    slug: "captures-by-rivky",
    name: "Captures by Rivky",
    description:
      "Professional photography for weddings, bar/bat mitzvahs, family portraits, and newborns. Capturing your most precious moments with elegance and creativity.",
    category: "Services",
    subcategory: "Photography",
    phone: "(718) 555-1010",
    email: "book@capturesbyrivky.com",
    website: "https://capturesbyrivky.com",
    address: "88 Lens Lane",
    city: "Brooklyn, NY",
    neighborhood: "Crown Heights",
    image_url: "",
    hours: "By appointment",
    tags: ["photography", "weddings", "portraits"],
    created_at: "2024-06-15T00:00:00Z",
  },
]

// ─── Query functions ──────────────────────────────────────────────────────────

export async function getNeighborhoods(): Promise<Neighborhood[]> {
  return PLACEHOLDER_NEIGHBORHOODS
}

export async function getCategories(): Promise<Category[]> {
  return PLACEHOLDER_CATEGORIES
}

export async function getBusinesses(options?: {
  category?: string
  search?: string
  neighborhood?: string
  limit?: number
}): Promise<Business[]> {
  let results = [...PLACEHOLDER_BUSINESSES]

  if (options?.category) {
    const term = options.category.toLowerCase()
    results = results.filter(
      (b) =>
        b.category.toLowerCase().replace(/\s+&\s+/g, "-").replace(/\s+/g, "-") === term ||
        b.subcategory?.toLowerCase().replace(/\s+/g, "-") === term
    )
  }

  if (options?.search) {
    const term = options.search.toLowerCase()
    results = results.filter(
      (b) =>
        b.name.toLowerCase().includes(term) ||
        b.description.toLowerCase().includes(term) ||
        b.tags.some((t) => t.toLowerCase().includes(term))
    )
  }

  if (options?.neighborhood) {
    const term = options.neighborhood.toLowerCase()
    results = results.filter(
      (b) =>
        b.neighborhood?.toLowerCase().replace(/\s+\/\s+/g, "-").replace(/\s+/g, "-") === term
    )
  }

  if (options?.limit) {
    results = results.slice(0, options.limit)
  }

  return results
}

export async function getBusinessBySlug(
  slug: string
): Promise<Business | null> {
  return PLACEHOLDER_BUSINESSES.find((b) => b.slug === slug) ?? null
}

export async function getFeaturedBusinesses(): Promise<Business[]> {
  const featured = PLACEHOLDER_BUSINESSES.filter((b) => b.featured)
  return featured.length > 0 ? featured : PLACEHOLDER_BUSINESSES.slice(0, 5)
}

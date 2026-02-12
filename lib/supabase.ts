import { createBrowserClient } from "@supabase/ssr"

// ─── Types ────────────────────────────────────────────────────────────────────
export interface Business {
  id: string
  slug: string
  name: string
  description: string
  category: string
  phone: string
  email: string
  website: string
  address: string
  city: string
  state: string
  zip: string
  image_url: string
  hours: string
  tags: string[]
  created_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  icon: string
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
  { id: "1", name: "Restaurants", slug: "restaurants", icon: "UtensilsCrossed" },
  { id: "2", name: "Groceries", slug: "groceries", icon: "ShoppingCart" },
  { id: "3", name: "Education", slug: "education", icon: "GraduationCap" },
  { id: "4", name: "Health", slug: "health", icon: "Heart" },
  { id: "5", name: "Home Services", slug: "home-services", icon: "Home" },
  { id: "6", name: "Legal", slug: "legal", icon: "Scale" },
  { id: "7", name: "Real Estate", slug: "real-estate", icon: "Building2" },
  { id: "8", name: "Finance", slug: "finance", icon: "Landmark" },
]

const PLACEHOLDER_BUSINESSES: Business[] = [
  {
    id: "1",
    slug: "glatt-mart",
    name: "Glatt Mart",
    description:
      "A full-service kosher supermarket offering a wide selection of fresh produce, meats, baked goods, and pantry staples. Family-owned and serving the community for over 20 years.",
    category: "Groceries",
    phone: "(718) 555-0101",
    email: "info@glattmart.com",
    website: "https://glattmart.com",
    address: "1234 Main Street",
    city: "Brooklyn",
    state: "NY",
    zip: "11230",
    image_url: "",
    hours: "Sun-Thu 7am-10pm, Fri 7am-3pm",
    tags: ["kosher", "groceries", "supermarket", "fresh produce"],
    created_at: "2024-01-15T00:00:00Z",
  },
  {
    id: "2",
    slug: "torah-academy",
    name: "Torah Academy",
    description:
      "A premier educational institution offering comprehensive Torah and secular studies for boys and girls. Dedicated faculty and small class sizes ensure personalized attention.",
    category: "Education",
    phone: "(718) 555-0202",
    email: "admissions@torahacademy.edu",
    website: "https://torahacademy.edu",
    address: "5678 Oak Avenue",
    city: "Brooklyn",
    state: "NY",
    zip: "11204",
    image_url: "",
    hours: "Sun-Thu 8am-4pm, Fri 8am-12pm",
    tags: ["education", "yeshiva", "school", "torah"],
    created_at: "2024-02-10T00:00:00Z",
  },
  {
    id: "3",
    slug: "jerusalem-grill",
    name: "Jerusalem Grill",
    description:
      "Authentic Middle Eastern cuisine with the highest kosher standards. Enjoy shawarma, falafel, hummus, and grilled specialties in a warm family atmosphere.",
    category: "Restaurants",
    phone: "(718) 555-0303",
    email: "eat@jerusalemgrill.com",
    website: "https://jerusalemgrill.com",
    address: "910 Cedar Lane",
    city: "Brooklyn",
    state: "NY",
    zip: "11219",
    image_url: "",
    hours: "Sun-Thu 11am-11pm, Motzei Shabbos 8pm-12am",
    tags: ["restaurant", "kosher", "middle eastern", "grill"],
    created_at: "2024-03-05T00:00:00Z",
  },
  {
    id: "4",
    slug: "shalom-health",
    name: "Shalom Health Center",
    description:
      "Comprehensive family healthcare providing preventative care, urgent care, and specialty services. Board-certified physicians who understand and respect the needs of the frum community.",
    category: "Health",
    phone: "(718) 555-0404",
    email: "appointments@shalomhealth.com",
    website: "https://shalomhealth.com",
    address: "2468 Maple Drive",
    city: "Brooklyn",
    state: "NY",
    zip: "11223",
    image_url: "",
    hours: "Sun-Thu 8am-6pm, Fri 8am-1pm",
    tags: ["health", "medical", "doctor", "family care"],
    created_at: "2024-03-20T00:00:00Z",
  },
  {
    id: "5",
    slug: "chesed-real-estate",
    name: "Chesed Real Estate",
    description:
      "Helping families find their perfect home. Specializing in residential sales and rentals across Brooklyn and Lakewood with personalized service and deep community knowledge.",
    category: "Real Estate",
    phone: "(718) 555-0505",
    email: "homes@chesedrealestate.com",
    website: "https://chesedrealestate.com",
    address: "1357 Elm Street",
    city: "Brooklyn",
    state: "NY",
    zip: "11218",
    image_url: "",
    hours: "Sun-Thu 9am-7pm, Fri 9am-1pm",
    tags: ["real estate", "homes", "rentals", "apartments"],
    created_at: "2024-04-01T00:00:00Z",
  },
  {
    id: "6",
    slug: "goldberg-law",
    name: "Goldberg Law Offices",
    description:
      "Experienced legal counsel in family law, business law, real estate transactions, and estate planning. Serving the community with integrity and discretion for over 15 years.",
    category: "Legal",
    phone: "(718) 555-0606",
    email: "consult@goldberglaw.com",
    website: "https://goldberglaw.com",
    address: "7890 Pine Road",
    city: "Brooklyn",
    state: "NY",
    zip: "11214",
    image_url: "",
    hours: "Sun-Thu 9am-5pm",
    tags: ["legal", "lawyer", "attorney", "family law"],
    created_at: "2024-04-15T00:00:00Z",
  },
  {
    id: "7",
    slug: "bayit-neeman-services",
    name: "Bayit Ne'eman Services",
    description:
      "Professional home repair and renovation services you can trust. From plumbing and electrical to full kitchen remodels, our skilled team does it right the first time.",
    category: "Home Services",
    phone: "(718) 555-0707",
    email: "service@bayitneeman.com",
    website: "https://bayitneeman.com",
    address: "3691 Birch Boulevard",
    city: "Brooklyn",
    state: "NY",
    zip: "11210",
    image_url: "",
    hours: "Sun-Thu 8am-6pm, Fri 8am-12pm",
    tags: ["home services", "plumbing", "electrical", "renovation"],
    created_at: "2024-05-01T00:00:00Z",
  },
  {
    id: "8",
    slug: "simcha-financial",
    name: "Simcha Financial Group",
    description:
      "Comprehensive financial planning, tax preparation, and investment advisory services. We help families build financial security with personalized strategies and a Torah-guided approach.",
    category: "Finance",
    phone: "(718) 555-0808",
    email: "plan@simchafinancial.com",
    website: "https://simchafinancial.com",
    address: "4820 Walnut Street",
    city: "Brooklyn",
    state: "NY",
    zip: "11211",
    image_url: "",
    hours: "Sun-Thu 9am-5pm",
    tags: ["finance", "accounting", "tax", "investment"],
    created_at: "2024-05-20T00:00:00Z",
  },
]

// ─── Query functions ──────────────────────────────────────────────────────────
// These return placeholder data now. Replace with real Supabase queries once
// your database is set up.

export async function getNeighborhoods(): Promise<Neighborhood[]> {
  return PLACEHOLDER_NEIGHBORHOODS
}

export async function getCategories(): Promise<Category[]> {
  // const supabase = createClient()
  // const { data } = await supabase.from("categories").select("*").order("name")
  // return data ?? []
  return PLACEHOLDER_CATEGORIES
}

export async function getBusinesses(options?: {
  category?: string
  search?: string
  limit?: number
}): Promise<Business[]> {
  // const supabase = createClient()
  // let query = supabase.from("businesses").select("*")
  // if (options?.category) query = query.eq("category", options.category)
  // if (options?.search) query = query.ilike("name", `%${options.search}%`)
  // if (options?.limit) query = query.limit(options.limit)
  // const { data } = await query.order("created_at", { ascending: false })
  // return data ?? []

  let results = [...PLACEHOLDER_BUSINESSES]

  if (options?.category) {
    results = results.filter(
      (b) => b.category.toLowerCase() === options.category!.toLowerCase()
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

  if (options?.limit) {
    results = results.slice(0, options.limit)
  }

  return results
}

export async function getBusinessBySlug(
  slug: string
): Promise<Business | null> {
  // const supabase = createClient()
  // const { data } = await supabase
  //   .from("businesses")
  //   .select("*")
  //   .eq("slug", slug)
  //   .single()
  // return data
  return PLACEHOLDER_BUSINESSES.find((b) => b.slug === slug) ?? null
}

export async function getFeaturedBusinesses(): Promise<Business[]> {
  // const supabase = createClient()
  // const { data } = await supabase
  //   .from("businesses")
  //   .select("*")
  //   .eq("featured", true)
  //   .limit(4)
  // return data ?? []
  return PLACEHOLDER_BUSINESSES.slice(0, 4)
}

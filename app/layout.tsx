import React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: {
    default: "Kehilla | Community Business Directory",
    template: "%s | Kehilla",
  },
  description:
    "Kehilla connects you with reliable, community-recommended local businesses and services. Find trusted professionals in the frum community.",
}

export const viewport: Viewport = {
  themeColor: "#274b78",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}

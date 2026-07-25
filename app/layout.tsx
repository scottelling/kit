import type { Metadata } from "next"
import { Geist_Mono } from "next/font/google"

import "./globals.css"
import "./shared.css"

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://kit.scottelling.com"),
  title: {
    default: "Purple Rain — a hands-on UI kit",
    template: "%s — Purple Rain",
  },
  description:
    "See, touch, and compare every piece in the Purple Rain interface kit.",
  openGraph: {
    title: "Purple Rain — a hands-on UI kit",
    description: "See, touch, and compare every piece in Purple Rain.",
    type: "website",
    url: "/",
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={geistMono.variable}>
      <body>{children}</body>
    </html>
  )
}

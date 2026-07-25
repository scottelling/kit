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
    default: "Purple Rain — the complete design studio",
    template: "%s — Purple Rain",
  },
  description:
    "Describe a project in plain English, shape its complete design system, and take it all the way live.",
  openGraph: {
    title: "Purple Rain — the complete design studio",
    description: "From an English brief to a complete, proven live product.",
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

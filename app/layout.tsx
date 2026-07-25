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
    default: "kit — Purple Rain registry",
    template: "%s — kit",
  },
  description:
    "Install the Purple Rain design system into any shadcn project from a public component registry.",
  openGraph: {
    title: "kit — Purple Rain registry",
    description: "A public shadcn registry for the Purple Rain design system.",
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

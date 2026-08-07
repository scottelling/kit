import type { Metadata } from "next"
import {
  Bricolage_Grotesque,
  Fraunces,
  IBM_Plex_Sans,
  Instrument_Serif,
  Inter,
  JetBrains_Mono,
  Newsreader,
  Outfit,
  Source_Serif_4,
  Space_Grotesk,
} from "next/font/google"

import library from "@/lib/font-library.json"

import { FontLibrary, type FontCatalog } from "./font-library"
import "./fonts.css"

const outfit = Outfit({ subsets: ["latin"], variable: "--font-library-outfit", display: "swap", preload: false })
const inter = Inter({ subsets: ["latin"], variable: "--font-library-inter", display: "swap", preload: false })
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-library-space-grotesk", display: "swap", preload: false })
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-library-bricolage", display: "swap", preload: false })
const ibmPlex = IBM_Plex_Sans({ subsets: ["latin"], variable: "--font-library-ibm-plex", display: "swap", preload: false })
const instrumentSerif = Instrument_Serif({ subsets: ["latin"], weight: "400", variable: "--font-library-instrument-serif", display: "swap", preload: false })
const sourceSerif = Source_Serif_4({ subsets: ["latin"], variable: "--font-library-source-serif", display: "swap", preload: false })
const newsreader = Newsreader({ subsets: ["latin"], variable: "--font-library-newsreader", display: "swap", preload: false })
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-library-fraunces", display: "swap", preload: false })
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-library-jetbrains", display: "swap", preload: false })

export const metadata: Metadata = {
  title: "Font Library",
  description: "See every approved product font in real headings, reading text, controls, data, and paired systems.",
}

export default function FontLibraryPage() {
  const variables = [outfit, inter, spaceGrotesk, bricolage, ibmPlex, instrumentSerif, sourceSerif, newsreader, fraunces, jetbrains].map((font) => font.variable).join(" ")
  return <div className={variables}><FontLibrary library={library as FontCatalog} /></div>
}

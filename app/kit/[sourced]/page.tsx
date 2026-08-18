import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import sourcedKits from "@/lib/sourced-kits.generated.json"

import "../kit.css"

export const dynamicParams = false

export function generateStaticParams() {
  return sourcedKits.map((kit) => ({ sourced: kit.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ sourced: string }> }): Promise<Metadata> {
  const { sourced } = await params
  const kit = sourcedKits.find((entry) => entry.id === sourced)
  if (!kit) return {}
  return { title: `Explore the ${kit.title} Kit`, description: kit.description }
}

export default async function SourcedKitPage({ params }: { params: Promise<{ sourced: string }> }) {
  const { sourced } = await params
  const kit = sourcedKits.find((entry) => entry.id === sourced)
  if (!kit) notFound()

  return (
    <div className="kit-shell">
      <SiteHeader />
      <main className="kit-main">
        <nav className="kit-worlds" aria-label="Choose a kit">
          <span>Kits</span>
          <div>
            <Link href="/kit">Purple Rain <small>179 pieces</small></Link>
            <Link href="/kit/vanilla">Vanilla <small>179 pieces</small></Link>
            <Link href="/kit/jade">JADE <small>179 pieces</small></Link>
            <Link href="/kit/os">OS <small>179 pieces</small></Link>
            <Link href="/kit/animation">Animation <small>179 pieces</small></Link>
            <Link href="/kit/shadow">Shadow <small>12 elevations</small></Link>
            {sourcedKits.map((entry) => (
              <Link key={entry.id} aria-current={entry.id === kit.id ? "page" : undefined} href={entry.route}>
                {entry.title} <small>{entry.pieceCount} pieces</small>
              </Link>
            ))}
          </div>
        </nav>
        <section className="kit-index-intro" aria-labelledby="kit-title">
          <div className="kit-index-intro__copy">
            <h1 id="kit-title">The whole {kit.title} kit.</h1>
            <p>{kit.description}</p>
            <p className="sourced-provenance">
              Sourced from {kit.source}, audited {kit.audited}. Preserved exactly as authored — its own tokens, density,
              and rules — with every extracted and derived decision on record.
            </p>
          </div>
          <div className="kit-count" aria-label={`${kit.pieceCount} pieces in ${kit.sectionCount} sections`}>
            <strong>{kit.pieceCount}</strong>
            <span>pieces</span>
            <i aria-hidden="true" />
            <b>{kit.sectionCount} sections · {kit.themes.length} themes</b>
          </div>
        </section>
        <section className="sourced-document" aria-label={`${kit.title} kit document`}>
          <div className="sourced-actions">
            <a href={kit.documentUrl} target="_blank" rel="noreferrer">Open the full document</a>
            <a href={`/r/${kit.id}/registry.json`}>Get the code</a>
          </div>
          <iframe className="sourced-frame" src={kit.documentUrl} title={`${kit.title} kit document — every piece, live`} />
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

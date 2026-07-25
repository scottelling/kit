import { ArrowRight } from "lucide-react"
import Link from "next/link"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

import { HomePreview } from "./home-preview"
import "./home.css"

export default function Home() {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main>
        <section className="home-opening" aria-labelledby="home-title">
          <div className="home-opening__copy">
            <p className="home-opening__plain">One brief. One system. All the way to live.</p>
            <h1 id="home-title">Describe what you want to make.</h1>
            <p className="home-opening__lede">
              Shape the brand, product, interface, motion, content, and working team in plain English.
              Purple Rain keeps every decision joined up through release.
            </p>
            <div className="home-opening__actions">
              <Link className="primary-link" href="/studio">
                Open the Studio <ArrowRight aria-hidden="true" />
              </Link>
              <Link className="secondary-link" href="/kit">Explore the UI kit</Link>
            </div>
          </div>
          <HomePreview />
        </section>

        <section className="home-choices" aria-labelledby="choose-title">
          <div className="home-choices__heading">
            <h2 id="choose-title">Start wherever the project is.</h2>
            <p>A loose idea, a visual decision, or a nearly finished product can all enter the same complete system.</p>
          </div>
          <div className="home-choice-list">
            <Link href="/studio">
              <span className="home-choice-list__number">English brief</span>
              <strong>Shape the whole project</strong>
              <span>Brand, type, color, motion, templates, skills, team, and release.</span>
              <ArrowRight aria-hidden="true" />
            </Link>
            <Link href="/kit">
              <span className="home-choice-list__number">128 live pieces</span>
              <strong>Touch the interface kit</strong>
              <span>Every foundation, control, state, data view, and product pattern.</span>
              <ArrowRight aria-hidden="true" />
            </Link>
            <Link href="/demo">
              <span className="home-choice-list__number">Side by side</span>
              <strong>Pressure-test the style</strong>
              <span>Try Purple Rain beside another polished style.</span>
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter note="From plain English to a proven live product." />
    </div>
  )
}

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
            <p className="home-opening__plain">No setup lessons. No code to copy.</p>
            <h1 id="home-title">Point at what feels right.</h1>
            <p className="home-opening__lede">
              Browse the pieces, touch everything, then tell me in plain English what you want.
              I’ll handle the machinery behind it.
            </p>
            <div className="home-opening__actions">
              <Link className="primary-link" href="/kit">
                Explore every piece <ArrowRight aria-hidden="true" />
              </Link>
              <Link className="secondary-link" href="/demo">Compare two styles</Link>
            </div>
          </div>
          <HomePreview />
        </section>

        <section className="home-choices" aria-labelledby="choose-title">
          <div className="home-choices__heading">
            <h2 id="choose-title">Start with your eyes.</h2>
            <p>You only need to decide what feels clear. The rest is my job.</p>
          </div>
          <div className="home-choice-list">
            <Link href="/kit">
              <span className="home-choice-list__number">All pieces</span>
              <strong>See the whole kit</strong>
              <span>Colors, words, buttons, cards, fields, labels, and dialogs.</span>
              <ArrowRight aria-hidden="true" />
            </Link>
            <Link href="/demo">
              <span className="home-choice-list__number">Side by side</span>
              <strong>Compare the same task</strong>
              <span>Try Purple Rain beside another polished style.</span>
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter note="You describe it. I take care of the rest." />
    </div>
  )
}

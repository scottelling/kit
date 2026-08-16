import type { Metadata } from "next"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import elementLibrary from "@/lib/elements-library.json"

import { BeautifulUIShowroom } from "./beautiful-ui-showroom"
import { ElementShowroom } from "./element-showroom"
import "./elements.css"

export const metadata: Metadata = {
  title: "Elements",
  description: "Touch, tune, and reuse complete production interface elements, from signature effects to agent interfaces, data tools, and creation controls.",
}

export default function ElementsPage() {
  const knightRider = elementLibrary[0]
  const beautifulUi = elementLibrary.slice(1)
  return (
    <div className="elements-shell">
      <SiteHeader />
      <main className="elements-main">
        <section className="elements-opening" aria-labelledby="elements-title">
          <div>
            <p>Elements Library</p>
            <h1 id="elements-title">Touch the idea before you take it.</h1>
            <p>Every element is a complete working behavior. Play with it, open its exact source, or ask Codex to carry it into a project.</p>
          </div>
          <aside aria-label="Elements Library status">
            <span>Live collection</span>
            <strong>{String(elementLibrary.length).padStart(2, "0")}</strong>
            <p>Working elements</p>
          </aside>
        </section>

        <nav className="elements-index" aria-label="Element categories">
          <a href="#knight-rider"><span>01</span><strong>Signature Effects</strong><small>Knight Rider</small></a>
          <a href="#beautiful-ui" aria-current="page"><span>02</span><strong>Interactive Elements</strong><small>19 working patterns</small></a>
          <a href="#elements-standard"><span>03</span><strong>Our standard</strong><small>How every element earns its place</small></a>
        </nav>

        <ElementShowroom item={knightRider} />

        <BeautifulUIShowroom items={beautifulUi} />

        <section className="elements-standard" id="elements-standard" aria-labelledby="elements-standard-title">
          <div><span>Elements standard</span><h2 id="elements-standard-title">A beautiful experiment is only the beginning.</h2></div>
          <ol>
            <li><span>01</span><strong>It must be felt</strong><p>The real behavior is visible and touchable before anyone takes it.</p></li>
            <li><span>02</span><strong>It must survive reality</strong><p>Phone controls, reduced motion, focus, performance, and recovery are part of the element.</p></li>
            <li><span>03</span><strong>It must travel cleanly</strong><p>The exact working source and a one-step project handoff stay attached.</p></li>
          </ol>
        </section>
      </main>
      <SiteFooter note="Touch it. Shape it. Take the complete behavior." />
    </div>
  )
}

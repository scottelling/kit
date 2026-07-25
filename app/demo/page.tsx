import type { Metadata } from "next"

import { SiteHeader } from "@/components/site-header"

import { DemoComparison } from "./demo-comparison"
import "./demo.css"

export const metadata: Metadata = {
  title: "Purple Rain vs Origin UI",
  description:
    "A side-by-side, light-and-dark comparison of Purple Rain and Origin UI components in the same interface.",
}

export default function DemoPage() {
  return (
    <div className="demo-shell">
      <SiteHeader />
      <main className="demo-main">
        <div className="demo-intro">
          <span className="eyebrow">Component playground</span>
          <h1>Same task. Different systems.</h1>
          <p>
            Purple Rain and Origin UI render the same invitation workflow. Flip both surfaces
            together, open both dialogs, and judge the hierarchy—not a component dump.
          </p>
        </div>
        <DemoComparison />
      </main>
      <footer className="site-footer">
        <p>Compare the decision path, not the decoration.</p>
        <p>Purple Rain × Origin UI</p>
      </footer>
    </div>
  )
}

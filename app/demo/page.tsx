import type { Metadata } from "next"

import { SiteFooter } from "@/components/site-footer"
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
          <p className="demo-intro__plain">Same task. Two styles.</p>
          <h1>Which one feels clearer?</h1>
          <p>
            Type in the fields, switch the mood, and open both dialogs. The content stays the
            same so you can judge the feeling, not the words.
          </p>
        </div>
        <DemoComparison />
      </main>
      <SiteFooter note="Compare the decision path, not the decoration." />
    </div>
  )
}

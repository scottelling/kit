import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"

import { CopyCommand } from "@/components/copy-command"
import { SiteHeader } from "@/components/site-header"
import { Badge } from "@/registry/purple-rain/badge"
import { Button } from "@/registry/purple-rain/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/purple-rain/card"

import "./home.css"

const items = ["tokens", "button", "card", "input", "badge", "dialog"]

export default function Home() {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero__copy">
            <Badge variant="outline">Public shadcn registry</Badge>
            <h1 id="hero-title">Purple Rain, installed.</h1>
            <p>
              The tactile, task-first design system—packaged to move into any shadcn project
              with its tokens attached.
            </p>
            <div className="hero__actions">
              <Link className="primary-link" href="/demo">
                Compare the system <ArrowRight aria-hidden="true" />
              </Link>
              <a className="secondary-link" href="/r/registry.json">
                Inspect the registry
              </a>
            </div>
          </div>
          <div className="hero__command" aria-label="Install Purple Rain button">
            <span className="eyebrow">Start with one component</span>
            <CopyCommand command="npx shadcn add https://kit.scottelling.com/r/button.json" />
            <p>Tokens install automatically with every component.</p>
          </div>
        </section>

        <section className="workbench" aria-labelledby="registry-title">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Registry inventory</span>
              <h2 id="registry-title">Six useful starting points.</h2>
            </div>
            <p>Canonical dark values. Maintained light values. One dependency chain.</p>
          </div>
          <div className="registry-grid">
            {items.map((item, index) => (
              <a className="registry-item" href={`/r/${item}.json`} key={item}>
                <span className="registry-item__index">0{index + 1}</span>
                <span className="registry-item__name">{item}</span>
                <span className="registry-item__status">
                  <Check aria-hidden="true" /> JSON
                </span>
              </a>
            ))}
          </div>
        </section>

        <section className="principle" aria-labelledby="principle-title">
          <div className="principle__statement">
            <h2 id="principle-title">Decision stays visible.</h2>
            <p className="principle__copy">That is the Instant Legibility rule.</p>
          </div>
          <Card className="principle__card">
            <CardHeader>
              <Badge variant="positive">Ready to install</Badge>
              <CardTitle>Tokens travel with the component.</CardTitle>
              <CardDescription>
                No separate theme step. Registry dependencies merge the Purple Rain variables
                into your project when the component lands.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button type="button">Primary action</Button>
              <Button type="button" variant="secondary">
                Secondary action
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
      <footer className="site-footer">
        <p>Purple Rain is built for clarity under pressure.</p>
        <p>kit · public v1</p>
      </footer>
    </div>
  )
}

"use client"

import { Moon, Sun } from "lucide-react"
import { FormEvent, useState } from "react"

import { CopyCommand } from "@/components/copy-command"
import { Badge as OriginBadge } from "@/components/ui/badge"
import { Button as OriginButton } from "@/components/ui/button"
import {
  Dialog as OriginDialog,
  DialogContent as OriginDialogContent,
  DialogDescription as OriginDialogDescription,
  DialogFooter as OriginDialogFooter,
  DialogHeader as OriginDialogHeader,
  DialogTitle as OriginDialogTitle,
  DialogTrigger as OriginDialogTrigger,
} from "@/components/ui/dialog"
import { Input as OriginInput } from "@/components/ui/input"
import { Badge } from "@/registry/purple-rain/badge"
import { Button } from "@/registry/purple-rain/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/purple-rain/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/purple-rain/dialog"
import { Input } from "@/registry/purple-rain/input"

const registryBase = "https://kit.scottelling.com/r"
const installItems = ["tokens", "button", "card", "input", "badge", "dialog"]

type Theme = "light" | "dark"

function stopSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault()
}

export function DemoComparison() {
  const [theme, setTheme] = useState<Theme>("light")
  const dark = theme === "dark"

  return (
    <>
      <section className="demo-toolbar" aria-label="Comparison controls">
        <div>
          <span className="eyebrow">Shared display mode</span>
          <strong>{dark ? "Dark surfaces" : "Light surfaces"}</strong>
        </div>
        <div className="theme-toggle" role="group" aria-label="Display mode">
          <button
            type="button"
            aria-pressed={!dark}
            onClick={() => setTheme("light")}
          >
            <Sun aria-hidden="true" /> Light
          </button>
          <button
            type="button"
            aria-pressed={dark}
            onClick={() => setTheme("dark")}
          >
            <Moon aria-hidden="true" /> Dark
          </button>
        </div>
      </section>

      <section className="comparison-grid" aria-label="Purple Rain and Origin UI comparison">
        <article className={`comparison-panel purple-panel${dark ? " dark" : ""}`}>
          <header className="panel-heading">
            <h2>Purple Rain</h2>
            <Badge variant="positive">Tokens attached</Badge>
          </header>

          <Card className="task-card">
            <CardHeader>
              <div className="task-card__status">
                <Badge variant="secondary">Workspace</Badge>
                <span>2 seats left</span>
              </div>
              <CardTitle>Invite a collaborator</CardTitle>
              <CardDescription>
                Add a teammate to the Release Planning workspace.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="invite-form" onSubmit={stopSubmit}>
                <label htmlFor="purple-email">Work email</label>
                <Input id="purple-email" type="email" placeholder="teammate@company.com" />
                <label htmlFor="purple-role">Role</label>
                <Input id="purple-role" defaultValue="Editor" readOnly />
              </form>
              <div className="access-summary">
                <div>
                  <strong>Editor access</strong>
                  <span>Can update plans and leave decisions.</span>
                </div>
                <Badge variant="outline">Standard</Badge>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="button" variant="secondary">Save draft</Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button type="button">Review invite</Button>
                </DialogTrigger>
                <DialogContent
                  className={`purple-dialog-shell${dark ? " dark" : ""}`}
                  overlayClassName={dark ? "dark" : undefined}
                >
                  <DialogHeader>
                    <DialogTitle>Send this invitation?</DialogTitle>
                    <DialogDescription>
                      The collaborator will receive Editor access to Release Planning.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="dialog-review-row">
                    <span>teammate@company.com</span>
                    <Badge variant="positive">Editor</Badge>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="secondary">Keep editing</Button>
                    <Button type="button">Send invitation</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </article>

        <article className={`comparison-panel origin-panel${dark ? " dark" : ""}`}>
          <header className="panel-heading">
            <h2>Origin UI</h2>
            <OriginBadge variant="secondary">@originui</OriginBadge>
          </header>

          <div className="origin-task-card task-card">
            <div className="origin-card-header">
              <div className="task-card__status">
                <OriginBadge variant="secondary">Workspace</OriginBadge>
                <span>2 seats left</span>
              </div>
              <h3>Invite a collaborator</h3>
              <p>Add a teammate to the Release Planning workspace.</p>
            </div>
            <div className="origin-card-content">
              <form className="invite-form" onSubmit={stopSubmit}>
                <label htmlFor="origin-email">Work email</label>
                <OriginInput className="h-11" id="origin-email" type="email" placeholder="teammate@company.com" />
                <label htmlFor="origin-role">Role</label>
                <OriginInput className="h-11" id="origin-role" defaultValue="Editor" readOnly />
              </form>
              <div className="access-summary">
                <div>
                  <strong>Editor access</strong>
                  <span>Can update plans and leave decisions.</span>
                </div>
                <OriginBadge variant="outline">Standard</OriginBadge>
              </div>
            </div>
            <div className="origin-card-footer">
              <OriginButton className="h-11" type="button" variant="outline">Save draft</OriginButton>
              <OriginDialog>
                <OriginDialogTrigger asChild>
                  <OriginButton className="h-11" type="button">Review invite</OriginButton>
                </OriginDialogTrigger>
                <OriginDialogContent className={`origin-dialog-shell ${dark ? "origin-dark" : "origin-light"}`}>
                  <OriginDialogHeader>
                    <OriginDialogTitle>Send this invitation?</OriginDialogTitle>
                    <OriginDialogDescription>
                      The collaborator will receive Editor access to Release Planning.
                    </OriginDialogDescription>
                  </OriginDialogHeader>
                  <div className="dialog-review-row">
                    <span>teammate@company.com</span>
                    <OriginBadge variant="secondary">Editor</OriginBadge>
                  </div>
                  <OriginDialogFooter>
                    <OriginButton className="h-11" type="button" variant="outline">Keep editing</OriginButton>
                    <OriginButton className="h-11" type="button">Send invitation</OriginButton>
                  </OriginDialogFooter>
                </OriginDialogContent>
              </OriginDialog>
            </div>
          </div>
        </article>
      </section>

      <section className="install-manifest" aria-labelledby="install-title">
        <div className="install-manifest__heading">
          <div>
            <span className="eyebrow">Purple Rain install manifest</span>
            <h2 id="install-title">Copy any item.</h2>
          </div>
          <p>Every component pulls tokens through its registry dependency.</p>
        </div>
        <div className="install-manifest__grid">
          {installItems.map((item) => (
            <CopyCommand
              compact
              key={item}
              label={item}
              command={`npx shadcn add ${registryBase}/${item}.json`}
            />
          ))}
        </div>
      </section>

      <section className="comparison-notes" aria-label="Comparison provenance">
        <p>
          The live shadcn directory no longer lists Origin UI. Its established <code>@originui</code>
          namespace and maintained upstream source were verified before installation.
        </p>
        <a href="https://github.com/shadcn/originui">Inspect Origin UI source</a>
      </section>
    </>
  )
}

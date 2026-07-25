"use client"

import { Moon, Sun } from "lucide-react"
import { FormEvent, useState } from "react"

import { Badge as OriginBadge } from "@/components/ui/badge"
import { Button as OriginButton } from "@/components/ui/button"
import {
  Dialog as OriginDialog,
  DialogClose as OriginDialogClose,
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
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/purple-rain/dialog"
import { Input } from "@/registry/purple-rain/input"

type Theme = "light" | "dark"

function stopSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault()
}

export function DemoComparison() {
  const [theme, setTheme] = useState<Theme>("light")
  const [preference, setPreference] = useState<"purple" | "origin" | null>(null)
  const [purpleEmail, setPurpleEmail] = useState("")
  const [originEmail, setOriginEmail] = useState("")
  const dark = theme === "dark"

  return (
    <>
      <section className="demo-toolbar" aria-label="Comparison controls">
        <div>
          <span>Change the mood</span>
          <strong>{dark ? "Dark" : "Light"}</strong>
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
            <Badge variant="positive">Clear next step</Badge>
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
                <Input
                  id="purple-email"
                  type="email"
                  value={purpleEmail}
                  onChange={(event) => setPurpleEmail(event.target.value)}
                  placeholder="teammate@company.com"
                />
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
                    <span>{purpleEmail || "No email entered"}</span>
                    <Badge variant="positive">Editor</Badge>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">Keep editing</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button type="button">Send invitation</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </article>

        <article className={`comparison-panel origin-panel${dark ? " dark" : ""}`}>
          <header className="panel-heading">
            <h2>Origin</h2>
            <OriginBadge variant="secondary">Reference</OriginBadge>
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
                <OriginInput
                  className="h-11"
                  id="origin-email"
                  type="email"
                  value={originEmail}
                  onChange={(event) => setOriginEmail(event.target.value)}
                  placeholder="teammate@company.com"
                />
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
                    <span>{originEmail || "No email entered"}</span>
                    <OriginBadge variant="secondary">Editor</OriginBadge>
                  </div>
                  <OriginDialogFooter>
                    <OriginDialogClose asChild>
                      <OriginButton className="h-11" type="button" variant="outline">Keep editing</OriginButton>
                    </OriginDialogClose>
                    <OriginDialogClose asChild>
                      <OriginButton className="h-11" type="button">Send invitation</OriginButton>
                    </OriginDialogClose>
                  </OriginDialogFooter>
                </OriginDialogContent>
              </OriginDialog>
            </div>
          </div>
        </article>
      </section>

      <section className="comparison-choice" aria-labelledby="choice-title">
        <div>
          <h2 id="choice-title">Which one felt clearer?</h2>
          <p>Choose with your gut. You can change your mind.</p>
        </div>
        <div className="preference-buttons" role="group" aria-label="Choose the clearer style">
          <button
            type="button"
            aria-pressed={preference === "purple"}
            onClick={() => setPreference("purple")}
          >
            Purple Rain
          </button>
          <button
            type="button"
            aria-pressed={preference === "origin"}
            onClick={() => setPreference("origin")}
          >
            Origin
          </button>
        </div>
        <p className="preference-result" aria-live="polite">
          {preference === null
            ? "Try both before choosing."
            : preference === "purple"
              ? "Purple Rain is your current choice."
              : "Origin is your current choice."}
        </p>
      </section>

      <section className="comparison-notes" aria-label="What to notice">
        <div><strong>The next step</strong><span>Could you spot it without hunting?</span></div>
        <div><strong>What changed</strong><span>Did every press make its result clear?</span></div>
        <div><strong>What mattered</strong><span>Did the page stay calm around the decision?</span></div>
      </section>
    </>
  )
}

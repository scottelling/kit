"use client"

import { Check, CircleAlert, Moon, Sun } from "lucide-react"
import { FormEvent, useEffect, useRef, useState } from "react"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
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

type Mood = "light" | "dark"
type ActionState = "idle" | "loading" | "success"

const cards = [
  {
    id: "quiet",
    label: "Quiet",
    title: "Weekly notes",
    description: "A calm place for context that should stay available without shouting.",
  },
  {
    id: "decision",
    label: "Decision",
    title: "Approve the release",
    description: "The important choice and its consequence stay close together.",
  },
  {
    id: "status",
    label: "Status",
    title: "Launch checklist",
    description: "Progress is easy to scan, with one visible next move.",
  },
]

export function KitExperience() {
  const [mood, setMood] = useState<Mood>("light")
  const [actionState, setActionState] = useState<ActionState>("idle")
  const [selectedCard, setSelectedCard] = useState("decision")
  const [email, setEmail] = useState("")
  const [emailTouched, setEmailTouched] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const actionTimer = useRef<number | undefined>(undefined)
  const dark = mood === "dark"
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const emailStatus = !emailTouched ? "idle" : emailValid ? "success" : "error"

  function tryAction() {
    window.clearTimeout(actionTimer.current)
    setActionState("loading")
    actionTimer.current = window.setTimeout(() => setActionState("success"), 700)
  }

  function checkEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setEmailTouched(true)
    setSubmitted(emailValid)
  }

  useEffect(() => () => window.clearTimeout(actionTimer.current), [])

  return (
    <div className={`kit-shell${dark ? " dark" : ""}`}>
      <SiteHeader />
      <main className="kit-main">
        <section className="kit-intro" aria-labelledby="kit-title">
          <div>
            <h1 id="kit-title">Everything in Purple Rain.</h1>
            <p>
              Seven groups. Two moods. Every control is live, so your hands can decide before
              your words have to.
            </p>
          </div>
          <div className="mood-picker" role="group" aria-label="Choose light or dark">
            <button type="button" aria-pressed={!dark} onClick={() => setMood("light")}>
              <Sun aria-hidden="true" /> Light
            </button>
            <button type="button" aria-pressed={dark} onClick={() => setMood("dark")}>
              <Moon aria-hidden="true" /> Dark
            </button>
          </div>
        </section>

        <nav className="kit-jumps" aria-label="Jump to a group">
          <a href="#colors">Colors</a>
          <a href="#type">Type</a>
          <a href="#buttons">Buttons</a>
          <a href="#cards">Cards</a>
          <a href="#fields">Fields</a>
          <a href="#labels">Labels</a>
          <a href="#dialogs">Dialogs</a>
        </nav>

        <section className="catalogue-section color-section" id="colors" aria-labelledby="colors-title">
          <div className="catalogue-section__heading">
            <h2 id="colors-title">Colors</h2>
            <p>Soft plum surfaces, restrained orchid, and clear signals for ready and warning.</p>
          </div>
          <div className="palette-strip">
            <div className="swatch swatch--canvas"><strong>Canvas</strong><span>The room</span></div>
            <div className="swatch swatch--surface"><strong>Surface</strong><span>Raised work</span></div>
            <div className="swatch swatch--orchid"><strong>Orchid</strong><span>The next move</span></div>
            <div className="swatch swatch--ready"><strong>Ready</strong><span>Good to go</span></div>
            <div className="swatch swatch--warning"><strong>Warning</strong><span>Needs care</span></div>
          </div>
        </section>

        <section className="catalogue-section type-section" id="type" aria-labelledby="type-title">
          <div className="catalogue-section__heading">
            <h2 id="type-title">Type</h2>
            <p>Big ideas stay compact. Everyday words stay open and easy to scan.</p>
          </div>
          <div className="type-specimen">
            <p className="type-specimen__display">Make the next move obvious.</p>
            <div className="type-specimen__body">
              <strong>Release planning</strong>
              <p>
                Purple Rain keeps the current object, its state, and the next useful action visible
                at the same time.
              </p>
              <span>Small labels stay readable, never tiny.</span>
            </div>
          </div>
        </section>

        <section className="catalogue-section button-section" id="buttons" aria-labelledby="buttons-title">
          <div className="catalogue-section__heading">
            <h2 id="buttons-title">Buttons</h2>
            <p>Press, wait, finish, try again. Every action explains what is happening.</p>
          </div>
          <div className="button-stage">
            <div className="button-stage__live">
              <Badge variant={actionState === "success" ? "positive" : "secondary"}>
                {actionState === "success" ? <Check aria-hidden="true" /> : null}
                {actionState === "idle" ? "Ready" : actionState === "loading" ? "Working" : "Saved"}
              </Badge>
              <Button
                type="button"
                loading={actionState === "loading"}
                status={actionState === "success" ? "success" : "idle"}
                onClick={tryAction}
              >
                {actionState === "success" ? "Saved" : "Try the main action"}
              </Button>
              <Button type="button" variant="secondary" onClick={() => setActionState("idle")}>
                Try again
              </Button>
            </div>
            <p aria-live="polite">
              {actionState === "idle" ? "Press the main action to feel its full response." : actionState === "loading" ? "The action is working." : "The result is visible. No extra message needed."}
            </p>
          </div>
          <div className="button-catalogue" aria-label="Button styles">
            <Button type="button">Main action</Button>
            <Button type="button" variant="secondary">Secondary</Button>
            <Button type="button" variant="outline">Outline</Button>
            <Button type="button" variant="ghost">Quiet action</Button>
            <Button type="button" variant="destructive">Remove</Button>
            <Button type="button" variant="link">Text action</Button>
            <Button type="button" disabled>Unavailable</Button>
          </div>
        </section>

        <section className="catalogue-section card-section" id="cards" aria-labelledby="cards-title">
          <div className="catalogue-section__heading">
            <h2 id="cards-title">Cards</h2>
            <p>Choose one. The selected card becomes clearer without turning into a light show.</p>
          </div>
          <div className="card-catalogue">
            {cards.map((card) => {
              const selected = selectedCard === card.id
              return (
                <Card className={selected ? "is-selected" : undefined} key={card.id}>
                  <CardHeader>
                    <Badge variant={selected ? "positive" : "outline"}>
                      {selected ? <Check aria-hidden="true" /> : null}
                      {selected ? "Chosen" : card.label}
                    </Badge>
                    <CardTitle>{card.title}</CardTitle>
                    <CardDescription>{card.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="card-detail"><span>Owner</span><strong>Release team</strong></div>
                    <div className="card-detail"><span>State</span><strong>{selected ? "In focus" : "Available"}</strong></div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      type="button"
                      variant={selected ? "secondary" : "outline"}
                      aria-pressed={selected}
                      onClick={() => setSelectedCard(card.id)}
                    >
                      {selected ? "Chosen" : "Choose this"}
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        </section>

        <section className="catalogue-section field-section" id="fields" aria-labelledby="fields-title">
          <div className="catalogue-section__heading">
            <h2 id="fields-title">Fields</h2>
            <p>Type naturally. Helpful feedback appears after you leave the field, not while you are thinking.</p>
          </div>
          <div className="field-workspace">
            <form onSubmit={checkEmail} noValidate>
              <label htmlFor="kit-email">Email address</label>
              <Input
                id="kit-email"
                type="email"
                value={email}
                status={emailStatus}
                aria-describedby="kit-email-help"
                onChange={(event) => {
                  setEmail(event.target.value)
                  setSubmitted(false)
                }}
                onBlur={() => setEmailTouched(true)}
                placeholder="you@example.com"
              />
              <p className={`field-help${emailStatus === "error" ? " is-error" : ""}`} id="kit-email-help">
                {emailStatus === "error"
                  ? "That address is incomplete. Add a name, @, and domain."
                  : emailStatus === "success"
                    ? "That address is ready."
                    : "We’ll use this only for the invitation."}
              </p>
              <Button type="submit" status={submitted ? "success" : "idle"}>
                {submitted ? "Address checked" : "Check address"}
              </Button>
            </form>
            <div className="field-states" aria-label="More field states">
              <div>
                <label htmlFor="field-filled">Filled</label>
                <Input id="field-filled" defaultValue="Release planning" />
                <p>Existing words remain the strongest signal.</p>
              </div>
              <div>
                <label htmlFor="field-loading">Checking</label>
                <Input id="field-loading" status="loading" defaultValue="Looking for a match" />
                <p>The field stays editable while it works.</p>
              </div>
              <div>
                <label htmlFor="field-disabled">Unavailable</label>
                <Input id="field-disabled" disabled defaultValue="Managed by your workspace" />
                <p>This value cannot be changed here.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="catalogue-section label-section" id="labels" aria-labelledby="labels-title">
          <div className="catalogue-section__heading">
            <h2 id="labels-title">Labels</h2>
            <p>Small, readable markers for category, state, success, and warning.</p>
          </div>
          <div className="label-catalogue">
            <Badge>Selected</Badge>
            <Badge variant="secondary">Draft</Badge>
            <Badge variant="outline">Reference</Badge>
            <Badge variant="positive"><Check aria-hidden="true" /> Ready</Badge>
            <Badge variant="destructive"><CircleAlert aria-hidden="true" /> Needs care</Badge>
          </div>
        </section>

        <section className="catalogue-section dialog-section" id="dialogs" aria-labelledby="dialogs-title">
          <div className="catalogue-section__heading">
            <h2 id="dialogs-title">Dialogs</h2>
            <p>A focused surface for the one choice that deserves the whole room.</p>
          </div>
          <div className="dialog-stage">
            <div>
              <strong>Ready to feel the focus?</strong>
              <p>Open it, move through it with your keyboard, and close it any way you like.</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button type="button">Open the dialog</Button>
              </DialogTrigger>
              <DialogContent
                className={dark ? "kit-dialog-shell dark" : "kit-dialog-shell"}
                overlayClassName={dark ? "dark" : undefined}
              >
                <DialogHeader>
                  <DialogTitle>Keep this direction?</DialogTitle>
                  <DialogDescription>
                    The choice is specific, the consequence is close, and the way back stays visible.
                  </DialogDescription>
                </DialogHeader>
                <div className="dialog-choice">
                  <span>Current direction</span>
                  <Badge variant="positive"><Check aria-hidden="true" /> Purple Rain</Badge>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">Keep looking</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button type="button">Use this direction</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </section>
      </main>
      <SiteFooter note="Everything here is meant to be touched." />
    </div>
  )
}

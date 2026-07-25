"use client"

import { Check } from "lucide-react"
import { FormEvent, useState } from "react"

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

export function HomePreview() {
  const [name, setName] = useState("")
  const [saved, setSaved] = useState(false)

  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaved(true)
  }

  return (
    <div className="home-preview">
      <div className="home-preview__heading">
        <span>Try it here</span>
        <Badge variant={saved ? "positive" : "secondary"}>
          {saved ? <Check aria-hidden="true" /> : null}
          {saved ? "Choice saved" : "Ready"}
        </Badge>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Choose a starting point</CardTitle>
          <CardDescription>Type anything, press the buttons, and open the next step.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="home-preview__form" onSubmit={save}>
            <label htmlFor="home-idea">What are you making?</label>
            <Input
              id="home-idea"
              value={name}
              onChange={(event) => {
                setName(event.target.value)
                setSaved(false)
              }}
              placeholder="A calmer planning screen"
            />
            <Button type="submit" status={saved ? "success" : "idle"}>
              {saved ? "Saved" : "Save this thought"}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <Dialog>
            <DialogTrigger asChild>
              <Button type="button" variant="secondary">Open a dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>This is a focused choice.</DialogTitle>
                <DialogDescription>
                  The rest of the page steps back so the next decision is easy to see.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button">That feels clear</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  )
}

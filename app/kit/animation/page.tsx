import type { Metadata } from "next"

import animationLibrary from "@/lib/universal-library.json"

import { type LibraryItem } from "../component-preview"
import { KitExperience } from "../kit-experience"
import "../kit.css"
import "./animation.css"

export const metadata: Metadata = {
  title: "Explore the Animation Studio Kit",
  description: "A complete, tactile creative-workspace system for storyboards, canvas work, motion, timelines, code, and delivery.",
}

export default function AnimationKitPage() {
  return <KitExperience library={animationLibrary as LibraryItem[]} system="animation" />
}

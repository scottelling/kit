import type { Metadata } from "next"

import animationTokens from "@/lib/animation-tokens.json"
import jadeTokens from "@/lib/jade-tokens.json"
import motionLibrary from "@/lib/motion-library.json"
import osTokens from "@/lib/os-tokens.json"
import vanillaTokens from "@/lib/vanilla-kit-tokens.json"
import purpleRainRegistry from "@/registry.json"

import { MotionStudio, type MotionTheme } from "./motion-studio"
import "./motion.css"

export const metadata: Metadata = {
  title: "Motion Studio",
  description: "Touch, compare, refine, and carry purposeful interface motion into any Kit visual system.",
}

type TokenSet = Record<string, string>

const purpleRainTokens = purpleRainRegistry.items.find((item) => item.name === "tokens")?.cssVars

function theme(label: string, id: string, light: TokenSet, dark: TokenSet, shared: TokenSet, darkOnly = false): MotionTheme {
  return {
    id,
    label,
    darkOnly,
    light: { ...shared, ...light },
    dark: { ...shared, ...dark },
  }
}

const themes: MotionTheme[] = [
  theme("Vanilla", "vanilla", vanillaTokens.light, vanillaTokens.dark, vanillaTokens.theme),
  theme("Purple Rain", "purple-rain", purpleRainTokens?.light ?? {}, purpleRainTokens?.dark ?? {}, purpleRainTokens?.theme ?? {}),
  theme("JADE", "jade", jadeTokens.light, jadeTokens.dark, jadeTokens.theme),
  theme("OS", "os", osTokens.light, osTokens.dark, osTokens.theme),
  theme("Animation", "animation", animationTokens.source, animationTokens.source, animationTokens.theme, true),
]

export default function MotionStudioPage() {
  return <MotionStudio library={motionLibrary} themes={themes} />
}

export type ThemeKitId = "purple-rain" | "jade" | "os"
export type WorkshopMode = "light" | "dark"
export type ThemeDepth = "quiet" | "tactile" | "frontmost"
export type ThemeTypeStyle = "product" | "editorial" | "technical"

export type OklchColor = {
  l: number
  c: number
  h: number
  a?: number
}

export type ThemeModeTokens = {
  canvas: OklchColor
  ink: OklchColor
  surface: OklchColor
  raised: OklchColor
  action: OklchColor
  actionInk: OklchColor
  mutedInk: OklchColor
  line: OklchColor
  input: OklchColor
  focus: OklchColor
  positive: OklchColor
  positiveInk: OklchColor
  danger: OklchColor
  dangerInk: OklchColor
}

export type ThemeVariant = {
  version: 1
  id: string
  name: string
  baseKit: ThemeKitId
  light: ThemeModeTokens
  dark: ThemeModeTokens
  radius: number
  density: number
  depth: ThemeDepth
  typeStyle: ThemeTypeStyle
  applied: boolean
  createdAt: string
  updatedAt: string
  publishedAt?: string
}

const color = (l: number, c: number, h: number, a?: number): OklchColor => ({ l, c, h, ...(a === undefined ? {} : { a }) })

export const themeKitNames: Record<ThemeKitId, string> = {
  "purple-rain": "Purple Rain",
  jade: "JADE",
  os: "OS",
}

export const themeBases: Record<ThemeKitId, { light: ThemeModeTokens; dark: ThemeModeTokens; radius: number; depth: ThemeDepth; typeStyle: ThemeTypeStyle }> = {
  "purple-rain": {
    light: {
      canvas: color(0.972, 0.011, 313),
      ink: color(0.2, 0.03, 308),
      surface: color(0.992, 0.006, 313),
      raised: color(0.955, 0.015, 313),
      action: color(0.5, 0.17, 305),
      actionInk: color(0.985, 0.008, 313),
      mutedInk: color(0.46, 0.032, 313),
      line: color(0.83, 0.022, 311),
      input: color(0.86, 0.02, 311),
      focus: color(0.5, 0.17, 305),
      positive: color(0.52, 0.09, 160),
      positiveInk: color(0.985, 0.008, 313),
      danger: color(0.57, 0.18, 7),
      dangerInk: color(0.985, 0.008, 313),
    },
    dark: {
      canvas: color(0.1513, 0.0205, 309.47),
      ink: color(0.9583, 0.0118, 313.22),
      surface: color(0.2068, 0.029, 306.88),
      raised: color(0.2136, 0.0328, 306.72),
      action: color(0.7756, 0.1104, 304.73),
      actionInk: color(0.2225, 0.0446, 308.27),
      mutedInk: color(0.7149, 0.0278, 316.1),
      line: color(0.2694, 0.0317, 309.88),
      input: color(0.2694, 0.0317, 309.88),
      focus: color(0.7756, 0.1104, 304.73),
      positive: color(0.8036, 0.0583, 159.85),
      positiveInk: color(0.1706, 0.0218, 307.03),
      danger: color(0.7497, 0.1244, 7.15),
      dangerInk: color(0.1706, 0.0218, 307.03),
    },
    radius: 14,
    depth: "tactile",
    typeStyle: "product",
  },
  jade: {
    light: {
      canvas: color(0.95859, 0.00345, 174.48),
      ink: color(0.18455, 0.00945, 184.05),
      surface: color(0.997, 0.001, 178),
      raised: color(0.93674, 0.00448, 179.73),
      action: color(0.8063, 0.14727, 177.61),
      actionInk: color(0.26113, 0.04314, 179.94),
      mutedInk: color(0.5349, 0.01409, 177.61),
      line: color(0.18455, 0.00945, 184.05, 0.08),
      input: color(0.91476, 0.00554, 183.02),
      focus: color(0.38154, 0.01225, 180.77),
      positive: color(0.65094, 0.14028, 161.1),
      positiveInk: color(0.18455, 0.00945, 184.05),
      danger: color(0.59554, 0.19038, 22.77),
      dangerInk: color(0.997, 0.001, 178),
    },
    dark: {
      canvas: color(0.18905, 0.0094, 184.09),
      ink: color(0.95379, 0.00594, 170.44),
      surface: color(0.24331, 0.01213, 178.37),
      raised: color(0.26744, 0.01318, 180.25),
      action: color(0.8063, 0.14727, 177.61),
      actionInk: color(0.26113, 0.04314, 179.94),
      mutedInk: color(0.61006, 0.01367, 177.73),
      line: color(0.95379, 0.00594, 170.44, 0.07),
      input: color(0.14052, 0.00596, 174.67),
      focus: color(0.8063, 0.14727, 177.61),
      positive: color(0.72, 0.14, 161.1),
      positiveInk: color(0.14052, 0.00596, 174.67),
      danger: color(0.68, 0.17, 22.77),
      dangerInk: color(0.95379, 0.00594, 170.44),
    },
    radius: 16,
    depth: "tactile",
    typeStyle: "product",
  },
  os: {
    light: {
      canvas: color(0.96229, 0.00532, 286.3),
      ink: color(0.24415, 0.00772, 274.63),
      surface: color(1, 0, 0),
      raised: color(0.95628, 0.00532, 286.3),
      action: color(0.52272, 0.1807, 258.51),
      actionInk: color(1, 0, 0),
      mutedInk: color(0.48, 0.012, 278),
      line: color(0.82, 0.009, 278),
      input: color(0.9206, 0.00807, 286.24),
      focus: color(0.52272, 0.1807, 258.51),
      positive: color(0.53434, 0.10204, 147.98),
      positiveInk: color(1, 0, 0),
      danger: color(0.53098, 0.15508, 32.8),
      dangerInk: color(1, 0, 0),
    },
    dark: {
      canvas: color(0.26092, 0.00759, 274.66),
      ink: color(0.94, 0.008, 275),
      surface: color(0.29007, 0.00917, 276.8),
      raised: color(0.32204, 0.00893, 276.86),
      action: color(0.60713, 0.19791, 259.58),
      actionInk: color(0.16, 0.03, 258),
      mutedInk: color(0.7, 0.01, 276),
      line: color(0.48, 0.01, 276),
      input: color(0.24415, 0.00772, 274.63),
      focus: color(0.72, 0.15, 259),
      positive: color(0.71859, 0.183, 148.48),
      positiveInk: color(0.18, 0.035, 148),
      danger: color(0.69345, 0.19653, 26.69),
      dangerInk: color(0.2, 0.03, 27),
    },
    radius: 9,
    depth: "quiet",
    typeStyle: "product",
  },
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))
const round = (value: number, digits = 4) => Number(value.toFixed(digits))
const finiteNumber = (value: unknown, fallback: number) => {
  const number = Number(value)
  return Number.isFinite(number) ? number : fallback
}

function cloneMode(mode: ThemeModeTokens): ThemeModeTokens {
  return Object.fromEntries(Object.entries(mode).map(([key, value]) => [key, { ...value }])) as ThemeModeTokens
}

function variantId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID()
  return `theme-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function createThemeVariant(baseKit: ThemeKitId = "purple-rain", name?: string): ThemeVariant {
  const base = themeBases[baseKit]
  const now = new Date().toISOString()
  return {
    version: 1,
    id: variantId(),
    name: name?.trim() || `${themeKitNames[baseKit]} working copy`,
    baseKit,
    light: cloneMode(base.light),
    dark: cloneMode(base.dark),
    radius: base.radius,
    density: 1,
    depth: base.depth,
    typeStyle: base.typeStyle,
    applied: true,
    createdAt: now,
    updatedAt: now,
  }
}

function safeColor(value: unknown, fallback: OklchColor): OklchColor {
  if (!value || typeof value !== "object") return { ...fallback }
  const input = value as Partial<OklchColor>
  return {
    l: round(clamp(finiteNumber(input.l, fallback.l), 0, 1)),
    c: round(clamp(finiteNumber(input.c, fallback.c), 0, 0.4)),
    h: round(((finiteNumber(input.h, fallback.h) % 360) + 360) % 360, 2),
    ...(input.a === undefined
      ? fallback.a === undefined ? {} : { a: fallback.a }
      : { a: round(clamp(finiteNumber(input.a, fallback.a ?? 1), 0, 1), 3) }),
  }
}

function safeMode(value: unknown, fallback: ThemeModeTokens): ThemeModeTokens {
  const input = value && typeof value === "object" ? value as Partial<ThemeModeTokens> : {}
  return Object.fromEntries(Object.entries(fallback).map(([key, base]) => [key, safeColor(input[key as keyof ThemeModeTokens], base)])) as ThemeModeTokens
}

export function normalizeThemeVariant(value: unknown): ThemeVariant | null {
  if (!value || typeof value !== "object") return null
  const input = value as Partial<ThemeVariant>
  const baseKit: ThemeKitId = input.baseKit === "jade" || input.baseKit === "os" ? input.baseKit : "purple-rain"
  const base = themeBases[baseKit]
  const now = new Date().toISOString()
  return {
    version: 1,
    id: typeof input.id === "string" && input.id ? input.id.slice(0, 120) : variantId(),
    name: typeof input.name === "string" && input.name.trim() ? input.name.trim().slice(0, 80) : `${themeKitNames[baseKit]} working copy`,
    baseKit,
    light: safeMode(input.light, base.light),
    dark: safeMode(input.dark, base.dark),
    radius: round(clamp(finiteNumber(input.radius, base.radius), 0, 32), 1),
    density: round(clamp(finiteNumber(input.density, 1), 0.78, 1.25), 2),
    depth: input.depth === "quiet" || input.depth === "frontmost" ? input.depth : "tactile",
    typeStyle: input.typeStyle === "editorial" || input.typeStyle === "technical" ? input.typeStyle : "product",
    applied: input.applied !== false,
    createdAt: typeof input.createdAt === "string" ? input.createdAt : now,
    updatedAt: typeof input.updatedAt === "string" ? input.updatedAt : now,
    ...(typeof input.publishedAt === "string" ? { publishedAt: input.publishedAt } : {}),
  }
}

export function parseThemeVariant(value: string | null | undefined) {
  if (!value) return null
  try {
    return normalizeThemeVariant(JSON.parse(value))
  } catch {
    return null
  }
}

export function themeColorString(value: OklchColor) {
  const alpha = value.a === undefined ? "" : ` / ${round(value.a, 3)}`
  return `oklch(${round(value.l)} ${round(value.c)} ${round(value.h, 2)}${alpha})`
}

function oklchToLinearRgb(value: OklchColor) {
  const angle = (value.h * Math.PI) / 180
  const a = value.c * Math.cos(angle)
  const b = value.c * Math.sin(angle)
  const lRoot = value.l + 0.3963377774 * a + 0.2158037573 * b
  const mRoot = value.l - 0.1055613458 * a - 0.0638541728 * b
  const sRoot = value.l - 0.0894841775 * a - 1.291485548 * b
  const l = lRoot ** 3
  const m = mRoot ** 3
  const s = sRoot ** 3
  return {
    r: 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    g: -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    b: -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  }
}

function linearToSrgb(value: number) {
  const channel = clamp(value, 0, 1)
  return channel <= 0.0031308 ? 12.92 * channel : 1.055 * channel ** (1 / 2.4) - 0.055
}

export function oklchToHex(value: OklchColor) {
  const rgb = oklchToLinearRgb(value)
  const channel = (number: number) => Math.round(linearToSrgb(number) * 255).toString(16).padStart(2, "0")
  return `#${channel(rgb.r)}${channel(rgb.g)}${channel(rgb.b)}`
}

function srgbToLinear(value: number) {
  const channel = value / 255
  return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
}

export function hexToOklch(hex: string, fallback: OklchColor): OklchColor {
  const match = /^#?([0-9a-f]{6})$/i.exec(hex)
  if (!match) return { ...fallback }
  const raw = match[1]
  const r = srgbToLinear(parseInt(raw.slice(0, 2), 16))
  const g = srgbToLinear(parseInt(raw.slice(2, 4), 16))
  const b = srgbToLinear(parseInt(raw.slice(4, 6), 16))
  const lRoot = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b)
  const mRoot = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b)
  const sRoot = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b)
  const l = 0.2104542553 * lRoot + 0.793617785 * mRoot - 0.0040720468 * sRoot
  const a = 1.9779984951 * lRoot - 2.428592205 * mRoot + 0.4505937099 * sRoot
  const bValue = 0.0259040371 * lRoot + 0.7827717662 * mRoot - 0.808675766 * sRoot
  const c = Math.sqrt(a * a + bValue * bValue)
  const h = ((Math.atan2(bValue, a) * 180) / Math.PI + 360) % 360
  return safeColor({ l, c, h, a: fallback.a }, fallback)
}

function luminance(value: OklchColor) {
  const rgb = oklchToLinearRgb(value)
  return 0.2126 * clamp(rgb.r, 0, 1) + 0.7152 * clamp(rgb.g, 0, 1) + 0.0722 * clamp(rgb.b, 0, 1)
}

export function contrastRatio(a: OklchColor, b: OklchColor) {
  const first = luminance(a)
  const second = luminance(b)
  return round((Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05), 2)
}

export function themeQuality(variant: ThemeVariant) {
  const checks = [
    { id: "light-reading", label: "Light reading", pass: contrastRatio(variant.light.canvas, variant.light.ink) >= 7 },
    { id: "dark-reading", label: "Dark reading", pass: contrastRatio(variant.dark.canvas, variant.dark.ink) >= 7 },
    { id: "light-action", label: "Light action", pass: contrastRatio(variant.light.action, variant.light.actionInk) >= 4.5 },
    { id: "dark-action", label: "Dark action", pass: contrastRatio(variant.dark.action, variant.dark.actionInk) >= 4.5 },
    { id: "light-quiet", label: "Light supporting text", pass: contrastRatio(variant.light.canvas, variant.light.mutedInk) >= 4.5 },
    { id: "dark-quiet", label: "Dark supporting text", pass: contrastRatio(variant.dark.canvas, variant.dark.mutedInk) >= 4.5 },
  ]
  return { checks, passed: checks.filter((check) => check.pass).length, total: checks.length, ready: checks.every((check) => check.pass) }
}

function bestInk(background: OklchColor) {
  const paper = color(0.985, 0.005, background.h)
  const ink = color(0.16, 0.025, background.h)
  return contrastRatio(background, paper) >= contrastRatio(background, ink) ? paper : ink
}

export function repairThemeContrast(variant: ThemeVariant): ThemeVariant {
  const next = normalizeThemeVariant(variant) as ThemeVariant
  for (const modeName of ["light", "dark"] as const) {
    const mode = next[modeName]
    if (contrastRatio(mode.canvas, mode.ink) < 7) mode.ink = modeName === "light" ? color(0.16, 0.025, mode.canvas.h) : color(0.975, 0.008, mode.canvas.h)
    if (contrastRatio(mode.canvas, mode.mutedInk) < 4.5) mode.mutedInk = modeName === "light" ? color(0.39, 0.025, mode.canvas.h) : color(0.78, 0.02, mode.canvas.h)
    if (contrastRatio(mode.action, mode.actionInk) < 4.5) mode.actionInk = bestInk(mode.action)
  }
  return { ...next, updatedAt: new Date().toISOString(), publishedAt: undefined }
}

function moveHue(current: number, target: number, amount: number) {
  const delta = ((target - current + 540) % 360) - 180
  return (current + delta * amount + 360) % 360
}

function mapThemeColors(variant: ThemeVariant, update: (value: OklchColor, key: keyof ThemeModeTokens, mode: WorkshopMode) => OklchColor) {
  for (const modeName of ["light", "dark"] as const) {
    const mode = variant[modeName]
    for (const key of Object.keys(mode) as (keyof ThemeModeTokens)[]) mode[key] = update(mode[key], key, modeName)
  }
}

export function applyThemeDirection(variant: ThemeVariant, direction: string) {
  const next = normalizeThemeVariant(variant) as ThemeVariant
  const prompt = direction.toLowerCase()
  const changes: string[] = []
  const colorWords: Record<string, number> = { red: 25, orange: 48, amber: 75, yellow: 95, lime: 125, green: 150, jade: 178, teal: 195, cyan: 215, blue: 255, violet: 285, purple: 305, plum: 320, pink: 345, rose: 10 }
  const matchedColor = Object.entries(colorWords).find(([word]) => prompt.includes(word))

  if (matchedColor) {
    const [, hue] = matchedColor
    for (const modeName of ["light", "dark"] as const) {
      const mode = next[modeName]
      mode.action = { ...mode.action, h: hue, c: clamp(Math.max(mode.action.c, 0.12), 0, 0.24) }
      mode.focus = { ...mode.action }
      mode.raised = { ...mode.raised, h: hue, c: clamp(Math.max(mode.raised.c, 0.015), 0, 0.05) }
    }
    changes.push(`Moved the decision color toward ${matchedColor[0]}`)
  }
  if (/warm|earth|human|inviting/.test(prompt)) {
    mapThemeColors(next, (value, key) => ["positive", "danger"].includes(key) ? value : { ...value, h: moveHue(value.h, 45, 0.22) })
    changes.push("Warmed the color family")
  }
  if (/cool|calm blue|crisp/.test(prompt)) {
    mapThemeColors(next, (value, key) => ["positive", "danger"].includes(key) ? value : { ...value, h: moveHue(value.h, 245, 0.22) })
    changes.push("Cooled the color family")
  }
  if (/quiet|calm|muted|subtle|minimal/.test(prompt)) {
    mapThemeColors(next, (value, key) => ["action", "focus", "positive", "danger"].includes(key) ? { ...value, c: clamp(value.c * 0.82, 0, 0.4) } : { ...value, c: clamp(value.c * 0.72, 0, 0.4) })
    next.depth = "quiet"
    changes.push("Quieted color and depth")
  }
  if (/bold|vivid|strong|energetic|playful/.test(prompt)) {
    for (const modeName of ["light", "dark"] as const) {
      const mode = next[modeName]
      mode.action = { ...mode.action, c: clamp(mode.action.c * 1.22, 0.08, 0.26) }
      mode.focus = { ...mode.action }
    }
    next.depth = "tactile"
    changes.push("Strengthened the decision signal")
  }
  if (/contrast|legible|accessible|clearer|clarity/.test(prompt)) {
    const repaired = repairThemeContrast(next)
    next.light = repaired.light
    next.dark = repaired.dark
    changes.push("Repaired reading and action contrast")
  }
  if (/round|soft|friendly|playful/.test(prompt)) {
    next.radius = clamp(next.radius + 5, 0, 32)
    changes.push("Softened the shape")
  }
  if (/sharp|square|precise|technical/.test(prompt)) {
    next.radius = clamp(next.radius - 5, 0, 32)
    changes.push("Sharpened the shape")
  }
  if (/roomy|spacious|air|generous/.test(prompt)) {
    next.density = clamp(next.density + 0.1, 0.78, 1.25)
    changes.push("Added breathing room")
  }
  if (/compact|dense|tight/.test(prompt)) {
    next.density = clamp(next.density - 0.1, 0.78, 1.25)
    changes.push("Tightened the spacing")
  }
  if (/editorial|literary|publication|serif/.test(prompt)) {
    next.typeStyle = "editorial"
    changes.push("Changed the type voice to editorial")
  }
  if (/technical|developer|console|mono/.test(prompt)) {
    next.typeStyle = "technical"
    changes.push("Changed the type voice to technical")
  }
  if (/product|neutral|utility/.test(prompt)) {
    next.typeStyle = "product"
    changes.push("Changed the type voice to product")
  }
  if (/flat|no shadow/.test(prompt)) {
    next.depth = "quiet"
    changes.push("Reduced elevation")
  }
  if (/front|dramatic depth|strong depth/.test(prompt)) {
    next.depth = "frontmost"
    changes.push("Strengthened functional elevation")
  }

  return {
    variant: repairThemeContrast({ ...next, updatedAt: new Date().toISOString(), publishedAt: undefined }),
    changes: changes.length ? changes.slice(0, 4) : ["Kept the visual system unchanged because the direction did not name a design change"],
    understood: changes.length > 0,
  }
}

export function themeDepthShadow(variant: ThemeVariant, mode: WorkshopMode) {
  const ink = mode === "dark" ? "oklch(0.04 0.01 309 / 0.84)" : "oklch(0.12 0.02 309 / 0.2)"
  if (variant.depth === "quiet") return `0 8px 20px -20px ${ink}`
  if (variant.depth === "frontmost") return `0 28px 64px -32px ${ink}, 0 12px 28px -22px ${ink}`
  return `0 18px 42px -28px ${ink}, 0 8px 18px -16px ${ink}`
}

export function themeFontStack(typeStyle: ThemeTypeStyle) {
  if (typeStyle === "editorial") return "ui-serif, Georgia, Cambria, 'Times New Roman', serif"
  if (typeStyle === "technical") return "var(--font-geist-mono), ui-monospace, monospace"
  return "var(--font-relay-sans), ui-sans-serif, sans-serif"
}

function registryFontStack(typeStyle: ThemeTypeStyle) {
  if (typeStyle === "editorial") return "ui-serif, Georgia, Cambria, 'Times New Roman', serif"
  if (typeStyle === "technical") return "ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace"
  return "ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
}

export function themePreviewStyle(variant: ThemeVariant, mode: WorkshopMode) {
  const tokens = variant[mode]
  return {
    "--workshop-canvas": themeColorString(tokens.canvas),
    "--workshop-ink": themeColorString(tokens.ink),
    "--workshop-surface": themeColorString(tokens.surface),
    "--workshop-raised": themeColorString(tokens.raised),
    "--workshop-action": themeColorString(tokens.action),
    "--workshop-action-ink": themeColorString(tokens.actionInk),
    "--workshop-muted-ink": themeColorString(tokens.mutedInk),
    "--workshop-line": themeColorString(tokens.line),
    "--workshop-input": themeColorString(tokens.input),
    "--workshop-focus": themeColorString(tokens.focus),
    "--workshop-positive": themeColorString(tokens.positive),
    "--workshop-positive-ink": themeColorString(tokens.positiveInk),
    "--workshop-danger": themeColorString(tokens.danger),
    "--workshop-danger-ink": themeColorString(tokens.dangerInk),
    "--workshop-radius": `${variant.radius}px`,
    "--workshop-space": variant.density,
    "--workshop-shadow": themeDepthShadow(variant, mode),
    "--workshop-font": themeFontStack(variant.typeStyle),
  } as Record<string, string | number>
}

export function workshopCssVars(variant: ThemeVariant, mode: WorkshopMode) {
  const tokens = variant[mode]
  return {
    background: themeColorString(tokens.canvas),
    foreground: themeColorString(tokens.ink),
    card: themeColorString(tokens.surface),
    "card-foreground": themeColorString(tokens.ink),
    popover: themeColorString(tokens.surface),
    "popover-foreground": themeColorString(tokens.ink),
    primary: themeColorString(tokens.action),
    "primary-foreground": themeColorString(tokens.actionInk),
    secondary: themeColorString(tokens.raised),
    "secondary-foreground": themeColorString(tokens.ink),
    muted: themeColorString(tokens.raised),
    "muted-foreground": themeColorString(tokens.mutedInk),
    accent: themeColorString(tokens.raised),
    "accent-foreground": themeColorString(tokens.ink),
    destructive: themeColorString(tokens.danger),
    "destructive-foreground": themeColorString(tokens.dangerInk),
    positive: themeColorString(tokens.positive),
    "positive-foreground": themeColorString(tokens.positiveInk),
    border: themeColorString(tokens.line),
    input: themeColorString(tokens.input),
    ring: themeColorString(tokens.focus),
    "chart-1": themeColorString(tokens.action),
    "chart-2": themeColorString(tokens.positive),
    "chart-3": themeColorString(tokens.danger),
    "chart-4": themeColorString({ ...tokens.action, h: (tokens.action.h + 55) % 360 }),
    "chart-5": themeColorString({ ...tokens.action, h: (tokens.action.h + 110) % 360 }),
    sidebar: themeColorString(tokens.raised),
    "sidebar-foreground": themeColorString(tokens.ink),
    "sidebar-primary": themeColorString(tokens.action),
    "sidebar-primary-foreground": themeColorString(tokens.actionInk),
    "sidebar-accent": themeColorString(tokens.surface),
    "sidebar-accent-foreground": themeColorString(tokens.ink),
    "sidebar-border": themeColorString(tokens.line),
    "sidebar-ring": themeColorString(tokens.focus),
    radius: `${variant.radius / 16}rem`,
    "radius-control": `${variant.radius / 16}rem`,
    "radius-card": `${(variant.radius + 6) / 16}rem`,
    "radius-sheet": `${(variant.radius + 12) / 16}rem`,
    "kit-space-base": `${round(12 * variant.density, 1)}px`,
    "kit-space-section": `${round(32 * variant.density, 1)}px`,
    "shadow-panel": themeDepthShadow(variant, mode),
  }
}

export function workshopRegistryItem(value: unknown) {
  const variant = normalizeThemeVariant(value) ?? createThemeVariant()
  const slug = variant.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 48) || "theme-workshop-copy"
  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: slug,
    type: "registry:theme",
    title: variant.name,
    description: `A ${themeKitNames[variant.baseKit]} theme variant shaped and quality-checked in Kit's Theme Workshop.`,
    cssVars: {
      theme: {
        "font-sans": registryFontStack(variant.typeStyle),
      },
      light: workshopCssVars(variant, "light"),
      dark: workshopCssVars(variant, "dark"),
    },
    docs: "This theme was created as a reversible copy in Kit's Theme Workshop. Apply it to a project without changing its source kit.",
  }
}

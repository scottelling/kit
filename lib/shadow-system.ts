export const shadowDepths = [
  { id: "xs", name: "Whisper", use: "Tiny controls and quiet separation" },
  { id: "sm", name: "Seated", use: "Cards and compact supporting surfaces" },
  { id: "md", name: "Raised", use: "Menus, popovers, and primary cards" },
  { id: "lg", name: "Floating", use: "Toasts and focused tools" },
  { id: "xl", name: "Focused", use: "Sheets and important overlays" },
  { id: "2xl", name: "Frontmost", use: "Dialogs and singular decisions" },
] as const

export type ShadowDepth = (typeof shadowDepths)[number]["id"]

export const shadowSource = {
  name: "Smooth Shadow Plugin",
  homepage: "https://shadow.floriankiem.com",
  repository: "https://github.com/flornkm/shadow-plugin",
  commit: "fa08d31819aac37b044564ffc77dfe9c91a435ec",
  license: "MIT",
  author: "Florian Kiem",
} as const

export const shadowRecipeCount = shadowDepths.length * 2

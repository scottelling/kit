# Project Brain — kit

## Mission

Make Purple Rain a complete design engineering studio: effortless to shape in plain English,
visible and tactile in public, reusable by agents, and installable behind the scenes.

## Canonical decisions

- Studio Purple Rain `2.0.0-rc.1` is the design authority.
- Dark mode preserves the exact Studio foundation values.
- Light mode preserves the same plum/orchid hue relationships while reversing lightness; it is a maintained registry extension because Studio 2.0 did not define light tokens.
- Registry tokens are published as OKLCH CSS variables.
- The tokens item also carries Studio’s exact maintained typography, measure, base/section spacing, 44px control, weight, and motion foundation values as `--pr-*` theme variables.
- Components are source-owned shadcn components, not package wrappers.
- The tokens item includes both schema-native `cssVars` and equivalent trailing CSS rules. This is intentional: shadcn v4 overwrites variables for a directly installed theme, but preserves existing semantic variables when that theme arrives as a transitive registry dependency. The trailing rules make automatic token delivery complete in both paths.
- Origin UI comparison uses the verified legacy namespace `@originui` mapped to its maintained source registry because it is no longer present in the current built-in directory index.
- The public registry is unauthenticated in v1.
- The human-facing site is a plain-language showroom. Commands, source, file formats, and registry language stay behind explicit “Get the code” or technical handoff actions rather than occupying the primary experience.
- `/kit` is the canonical Purple Rain visual inventory: 175 installable pieces across the shared interface families plus optional OS and Animation specialist patterns, all live in light and dark.
- `/kit/jade` is the complete JADE visual inventory with the same 175-piece production contract and its own OKLCH light/dark foundations. It preserves JADE's owned tactile DNA while using Kit's product structure, accessibility, responsive rules, and proof standards; Studio's implementation and governance do not travel with it.
- `/kit/jade/compare` preserves the original synchronized JADE and Purple Rain launch-review test.
- `/kit/os` is the complete rebuilt OS inventory: all 175 pieces, including the OS-native desktop, window, menu bar, dock, widget, master-detail, split-view, command bar, and settings structures and the optional Animation specialist patterns. Its five source theme moods are maintained as solid OKLCH systems with 44px controls; glass, aura, glow, raw colors, and source application governance do not travel.
- `/kit/animation` is the complete rebuilt Animation Studio inventory: all 175 pieces, including the studio-native storyboard, canvas, inspector, motion, timeline, code, template, delivery, and recovery structures and the optional OS specialist patterns. It preserves the inspected CUE dark source authority, semantic motion purposes, dense geometry, and canvas-first product hierarchy while excluding CUE data, AI, persistence, rendering, Remotion, legacy Operations, undersized controls, and unsupported effects.
- `/kit/shadow` is the focused Shadow elevation kit: six inspected stacked depths, ringless and integrated-hairline treatments, independent shadow and edge tinting, automatic light/dark hairlines, real-surface touch tests, and an MIT-carrying public registry item under `/r/shadow/`.
- Shadow is a foundation kit, not a third visual identity. It may strengthen Purple Rain, JADE, or another compatible system without replacing that system's palette, type, spacing, shape, or interaction rules.
- `lib/kit-capability-contract.json` is the shared release contract. Purple Rain, JADE, OS, and Animation Studio must carry the same state coverage, responsive range, accessibility requirements, and production application patterns before any can claim broader capability.
- `registry.json` publishes Purple Rain under `/r/`; `registry/jade/registry.json` publishes JADE under `/r/jade/`; `registry/os/registry.json` publishes OS under `/r/os/`; `registry/animation/registry.json` publishes Animation Studio under `/r/animation/`. Every installed piece carries only its chosen system tokens automatically.
- `lib/purple-rain-library.json` is the 138-piece everyday inventory; `lib/os-library.json` and `lib/animation-library.json` preserve the specialist source ownership; `lib/universal-library.json` is the 175-piece catalog exposed through all four systems. Specialist pieces are individually available but never pulled into a project unless requested.
- `lib/system-catalog.json` records the shared, specialist, and product-owned layers. New reusable components are promoted once into this catalog; product routes, data, and business behavior never travel with them.
- The global finder accepts ordinary phrases and takes visitors directly to any matching family or individual piece.
- `/demo` keeps Purple Rain and Origin on the same task, but asks visitors to judge the felt decision path rather than implementation details.
- `/studio` is the complete system configurator. It joins a brief, direction, type, color, motion, text treatment, brand tools, template, skills, and specialist team, then opens the result directly in saved Build Mode.
- `/studio/icons` is the tactile gallery for 6,017 approved symbols across Lucide and Material Symbols Rounded, with search, family and category filters, light/dark proof, tuning, and a saved project shelf.
- `/studio/fonts` is the tactile gallery for eleven approved families and eight tested role pairings, with real headings, paragraphs, controls, labels, and numbers.
- `/studio/swap` creates the preserve, repair, change, proof, and rollback brief that protects a target product before any visual-system work begins.
- `/build` is the canonical project workspace. It turns an ordinary-English brief into a saved five-screen project, keeps all visual choices live, and publishes a shareable preview.
- `/projects` keeps draft, built, approved, and archived work together. The newest fifty complete project records persist on the device; older oversized records are normalized automatically, with a private-session fallback when normal browser storage is restricted.
- `/templates` carries eight complete project families and forty connected screens: launch, product, commerce, publication, portfolio, documentation, marketplace, and campaign.
- `/labs` opens directly into Theme Workshop, where Purple Rain, JADE, or OS is copied rather than edited. A saved copy can be shaped in plain English or with direct controls, proved on a working interface in light and dark, checked automatically, applied to the project, published as a portable public handoff, and restored to the exact source kit without deleting the copy. Brand, type, color, text, and motion labs remain alongside it.
- `/elements` is the tactile behavior library. Its counted inventory, live playground, exact source viewer, English project prompt, and isolated public registry travel together. Knight Rider / Larson Scanner is the first item under Signature Effects.
- Signature Effects are not Purple Rain components or new visual systems. Their purpose-bound behavior may use a locally isolated effect that would be forbidden in product chrome; the surrounding site remains Purple Rain, and every effect must pause offscreen, become static for reduced motion, start audio muted, preserve 44px controls, and install independently.
- `/quality` exposes eighteen actual or inherited release checks and applies the approval mark automatically only when all eighteen pass.
- `lib/studio-library.ts` is the counted Studio inventory: 113 tools across fonts (13), icons (2), palettes (12), motion (16), text (12), brand (12), templates (16), prompts (16), skills (8), and agents (6).
- `plugins/purple-rain-studio` packages eight validated abilities: Studio Director, Template Foundry, Creative Labs, Design & Ship, Brand System, Interface System, Release Proof, and Smooth Elevation.
- The personal `purple-rain-studio` Codex plugin is installed by default from the personal marketplace, so English requests can carry the same workflow outside this repository.
- The public experience never claims to generate an arbitrary product in the browser. Build Mode assembles and preserves complete Purple Rain project systems; the reusable Codex plugin performs open-ended project execution.

- `SPEC.md` defines the KIT format (2026-08-11): tokens are the shared language,
  published in three dialects from one source — shadcn items, framework-free
  `tokens.css`, and `design-tokens.json`. shadcn is a dialect, not the
  foundation; a project with no React or Tailwind adopts the same language
  through `tokens.css` and the vanilla pieces.
- The universal variable set (the intersection of all four complete systems'
  root scopes, 53 variables including the `--kit-*` foundations) is the only
  vocabulary allowed in cross-system pieces; `verify:dialects` enforces it.
- `/vanilla` is the living proof: one plain HTML page whose entire visual
  system swaps by changing a single stylesheet link.
- `/r/doctrine.json` is the machine-readable rulebook agents load before
  styling any consumer; `/r/checksums.json` + `kit-manifest.json` +
  `scripts/kit-doctor.mjs` make consumer drift visible instead of silent.
- Tailwind `@theme` self-references (`radius-x: var(--radius-x)`) are namespace
  glue and are deliberately not emitted into the plain-CSS dialect; wildcard
  `@utility` rules are omitted with a documented manual equivalent.

## Product truth

Purple Rain is not violet wallpaper. Accent marks selection, focus, progress, and the primary decision. Tonal planes and directional depth carry hierarchy. The current object and next action stay obvious.

## Forbidden

- Glass or backdrop blur
- Translucent decorative surfaces
- Glow or shadow blooms in Purple Rain, JADE, foundation kits, or showroom chrome; a Signature Effect may own purpose-built light only inside its isolated effect frame
- Decorative gradients or ambient blobs
- Floating-card hover lift
- Looping resting motion in product UI; Signature Effects must be pausable, offscreen-paused, and static under reduced motion
- Tiny touch targets

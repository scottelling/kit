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
- The human-facing site is a plain-language showroom. Commands, source links, file formats, and registry language stay off the public pages.
- `/kit` is the canonical visual inventory: 128 installable pieces across Foundations, Actions, Forms, Navigation, Overlays, Feedback, Data, and Patterns, all live in light and dark.
- `/kit/jade` is the first clean-room visual-system intake pilot. It preserves JADE's owned tactile DNA while using Kit's product structure, accessibility, responsive rules, and proof standards; Studio's implementation and governance do not travel with it.
- `lib/purple-rain-library.json` is the counted public inventory; `scripts/generate-library.mjs` regenerates the matching registry source and entries so the showroom and delivery system cannot drift apart.
- The global finder accepts ordinary phrases and takes visitors directly to any matching family or individual piece.
- `/demo` keeps Purple Rain and Origin on the same task, but asks visitors to judge the felt decision path rather than implementation details.
- `/studio` is the complete system configurator. It joins a brief, direction, type, color, motion, text treatment, brand tools, template, skills, and specialist team, then opens the result directly in saved Build Mode.
- `/build` is the canonical project workspace. It turns an ordinary-English brief into a saved five-screen project, keeps all visual choices live, and publishes a shareable preview.
- `/projects` keeps draft, built, approved, and archived work together. The newest fifty complete project records persist on the device; older oversized records are normalized automatically, with a private-session fallback when normal browser storage is restricted.
- `/templates` carries eight complete project families and forty connected screens: launch, product, commerce, publication, portfolio, documentation, marketplace, and campaign.
- `/labs` applies brand, type, color, text, and motion choices to the current saved project.
- `/quality` exposes eighteen actual or inherited release checks and applies the approval mark automatically only when all eighteen pass.
- `lib/studio-library.ts` is the counted Studio inventory: 109 tools across fonts (12), palettes (12), motion (16), text (12), brand (12), templates (16), prompts (16), skills (7), and agents (6).
- `plugins/purple-rain-studio` packages seven validated abilities: Studio Director, Template Foundry, Creative Labs, Design & Ship, Brand System, Interface System, and Release Proof.
- The personal `purple-rain-studio` Codex plugin is installed by default from the personal marketplace, so English requests can carry the same workflow outside this repository.
- The public experience never claims to generate an arbitrary product in the browser. Build Mode assembles and preserves complete Purple Rain project systems; the reusable Codex plugin performs open-ended project execution.

## Product truth

Purple Rain is not violet wallpaper. Accent marks selection, focus, progress, and the primary decision. Tonal planes and directional depth carry hierarchy. The current object and next action stay obvious.

## Forbidden

- Glass or backdrop blur
- Translucent decorative surfaces
- Glow or shadow blooms
- Decorative gradients or ambient blobs
- Floating-card hover lift
- Looping resting motion
- Tiny touch targets

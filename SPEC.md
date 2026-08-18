# KIT Format — SPEC

Version: 1.2.0 (2026-08-17) — adds Vanilla as the neutral complete system and
the `kit-project-starter/1` swap-ready project foundation.

This file is the source of truth for the KIT format: how visual systems, tokens,
pieces, doctrine, and consumers speak one language. The shadcn registry is one
dialect of this format, not its foundation. If implementation and SPEC disagree,
fix one and record the correction in `docs/LEDGER.md`. The SPEC is
amendable; silent deviation is not.

## 1. The idea

- **Tokens are the language.** Every system publishes the same variable names.
  Values are literal law: never re-derived, renamed, or approximated.
- **Pieces are expressions.** A piece may be delivered in any dialect (vanilla,
  React/shadcn) as long as it uses the token language and obeys the doctrine.
- **Consumers declare what they installed** in a manifest, so the registry and
  the fleet can see each other. Drift is detectable, not silent.

## 2. Systems

Complete systems (each styles the entire 179-piece catalog):

| id | tokens root |
| --- | --- |
| `purple-rain` | `/r/` |
| `jade` | `/r/jade/` |
| `os` | `/r/os/` |
| `animation` | `/r/animation/` |
| `vanilla-kit` | `/r/vanilla-kit/` |

Foundation kits supplement a system without replacing its identity: `shadow`
(`/r/shadow/`). Animation is a dark-authority system: both appearance contexts
intentionally receive the same inspected foundation.

## 2a. Sourced kits

A sourced kit is a system Scott hands over (an audit, a single file, a repo)
that enters the registry **as authored** — native token format, native names,
native density and rules. Quirks are the product; nothing is normalized. The
full process lives in `docs/KIT-INTAKE.md`; the first example is `space`
(`/r/space/`, showroom `/kit/space`).

Sourced kits publish under `/r/<kit-id>/`:

| artifact | format | carries |
| --- | --- | --- |
| `registry.json` | `kit-sourced-registry/1` | identity, install URLs, piece inventory with per-piece `extracted`/`derived` flags |
| `tokens.css` | native | the kit's tokens, plus *additive-only* compatibility (e.g. kit's dark-mode selectors alongside the native theme mechanism) |
| `kit.css` (+ `kit.js` if the system ships behavior) | native | the installable system layer, chrome excluded |
| `provenance.json` | `kit-provenance/1` | source, audit method, extracted vs derived, quirks, **doctrine deltas**, cautions, font licensing |
| `bridge.json` | `kit-bridge/1` | honest partial map from native tokens to universal roles; `null` where no true counterpart exists |

Rules:

- The original artifact is archived verbatim under `sources/<kit-id>/` and
  never edited.
- A **doctrine delta** is a declared, justified conflict with
  `/r/doctrine.json` (e.g. Space's 30px Finder-density rows vs the 44px
  minimum). Deltas are legal inside the sourced kit's own products and
  showroom, never in universal pieces or complete systems, and never silent.
- The bridge never changes the kit. Adapters crossing it convert format at the
  boundary (e.g. Space's RGB channel triplets → complete color values).
- Sourced kits do not claim the universal catalog; their piece inventory is
  their own. Checksums and kit-doctor cover them like every other artifact.

## 3. Token artifacts

Every system root publishes three token dialects generated from one source:

| artifact | dialect | consumer |
| --- | --- | --- |
| `tokens.css` | plain CSS custom properties | any page with a stylesheet |
| `design-tokens.json` | `kit-design-tokens/1` (`$value`/`$type` groups) | tools and agents |
| `tokens.json` (`smooth-shadow.json` for shadow) | shadcn registry item | Next/Tailwind/shadcn projects |

Rules:

- Variable names and values are identical across dialects. The build fails if
  the shadcn item's trailing CSS disagrees with its declared variables.
- `tokens.css` structure: `:root` carries theme + light variables; `.dark` and
  `[data-kit-appearance="dark"]` carry dark overrides; extra rules (OS moods,
  shadow utilities-as-classes) follow verbatim. Tailwind-only value-
  parameterized utilities are omitted and documented in a trailing comment.
- Fonts are referenced by the tokens but loaded by the consuming project.
- The **universal set** is the intersection of variables present in all five
  complete systems' `tokens.css` `:root` scope (53 variables today, including
  the `--kit-*` foundation namespace, semantic colors, planes, radius roles,
  and shadow roles). Anything portable must restrict itself to this set.

## 4. Pieces

A piece is one installable interface unit. Dialects:

- **vanilla** — zero-dependency HTML/CSS(/JS) under `/r/vanilla/`. Uses only
  universal variables, so one source renders correctly under every complete
  system's `tokens.css`. Index: `/r/vanilla/registry.json`; bundles:
  `/r/vanilla/kit.css` + `/r/vanilla/kit.js`; live proof: `/vanilla`.
- **react (shadcn)** — the per-system registry items under each system root.

Piece JSON (`kit-piece/1`):

```json
{
  "format": "kit-piece/1",
  "name": "button",
  "title": "Button",
  "description": "…",
  "dialect": "vanilla",
  "systems": "universal",
  "requires": { "tokens": "a system tokens.css" },
  "files": [{ "path": "button.css", "type": "css", "content": "…" }]
}
```

Piece rules (enforced by doctrine, verified before release):

- 44px effective touch targets (`--kit-control-height`); a smaller visual mark
  is allowed inside a ≥44px hit row.
- Visible `:focus-visible` outline using `--ring`.
- Motion uses `--kit-fast`/`--kit-standard` with `--kit-ease`;
  `prefers-reduced-motion: reduce` makes every time-based signal static.
- No glass, glow, translucent decoration, hover lift, or resting loops.
- Vanilla JS is declarative (data attributes), delegated, and each file is a
  self-terminated IIFE safe to concatenate.

### Shared safety patterns

The complete systems expose the same five safety-critical pieces:

- `alert-dialog` is a real focus-contained modal confirmation, never a
  disclosure disguised as one. The safe action receives first focus.
- `visibility-publication-control` expresses private, draft, unlisted, public,
  inherited, and explicit local-override states plus save progress, failure,
  warnings, and preview. On phones it reduces to a status row that opens a
  focused native choice sheet; the full choices remain inline on larger views.
- `evidence-source-block` expresses provenance, confidence, freshness,
  limitations, loading, failure, conflict, and missing-source states.
- `share-qr-panel` expresses a visible link, copy, native share, a product-owned
  QR slot, and draft, loading, failed, revoked, and offline states. Link and QR
  readiness are separate: a failed or loading QR must not disable a ready text
  link. The product callback is named `onCopyLink` so it cannot collide with
  the browser's native clipboard event.
- `destructive-action` expresses explicit confirmation, pending work, failure,
  completion, optional undo, undo progress, and undo failure. Confirmation is
  a full-screen task on phones and a contained modal on larger views.

Kit owns these pieces' semantics, interaction states, responsive behavior,
keyboard and touch behavior, focus handling, and visual expression. Consumers
own authorization, publishing policy, source trust policy, QR generation,
destructive side effects, retention, and the duration or availability of undo.
Product names, routes, data, and policy copy may not be embedded in the shared
piece source.

## 4a. Vanilla Project Starter

Vanilla is also the neutral complete visual system under `/r/vanilla-kit/`.
The name describes appearance; the lowercase vanilla dialect above describes
framework-free delivery. They are separate layers and can be combined or used
independently.

`/r/vanilla/starter.json` (`kit-project-starter/1`) publishes a complete,
framework-free starting foundation with app, landing, shop, and content shapes,
the shared component bundle, durable agent context, and a `kit-manifest.json`.
Its live proof is `/vanilla`.

Starter ownership is non-negotiable:

- The product owns routes, data, behavior, content, journeys, and permissions.
- The selected kit owns tokens, typography, component expression, states,
  responsive rules, motion, and density.
- Changing the system token source must restyle the same populated interface
  without changing product-owned markup or behavior.

## 5. Doctrine

`/r/doctrine.json` (`kit-doctrine/1`) is the machine-readable rulebook: token
law, minimums, bans, motion, plain-language rules, reversibility, required
states, and proof widths. Agents styling any consumer read it before writing
interface code. The plain-language contracts stay alongside it:
`/r/adoption-contract.json` (swap protection),
`/r/adoption-assessment.json` (journey-by-journey Kit fit), and
`/r/system-catalog.json` (shared vs specialist vs product-owned layers).

## 6. Consumer manifest

A consumer project declares its installed artifacts in `kit-manifest.json` at
its repo root (`kit-manifest/1`):

```json
{
  "format": "kit-manifest/1",
  "project": "threads",
  "system": "purple-rain",
  "registry": "https://kit.scottelling.com",
  "installed": [
    {
      "artifact": "r/tokens.css",
      "sha256": "<sha256 of the artifact as installed>",
      "installedAt": "2026-08-11",
      "files": ["src/styles/kit-tokens.css"]
    }
  ]
}
```

`artifact` is the registry-relative path exactly as it appears in
`/r/checksums.json`. `files` records where the artifact landed in the consumer
(possibly adapted); the hash is of the registry artifact, not the adapted file.

## 7. Drift protocol

- `/r/checksums.json` (`kit-checksums/1`) carries a sha256 for every published
  artifact and a `registryVersion` fingerprint of the whole registry. It is
  regenerated last in every build.
- `scripts/kit-doctor.mjs <consumer-dir>` compares a manifest against the live
  checksums and reports each artifact as `current`, `behind`, or `unknown`.
  Exit 0 = clean, 1 = drift, 2 = cannot check. `KIT_CHECKSUMS_FILE` points it
  at a local checksums file for offline runs.

## 8. Installation contract (agents)

The installer for this format is an agent, not a package manager:

1. Read `/r/doctrine.json` and this SPEC.
2. Pick the dialect by the consumer's stack: shadcn projects install registry
   items; everything else starts from `tokens.css` + vanilla pieces.
3. Tokens install literally — exact file, exact names. Pieces may be adapted
   into the consumer's idiom, but only universal variables and doctrine-legal
   patterns may be used.
4. Record every installed artifact in `kit-manifest.json` with its sha256 from
   `/r/checksums.json`.
5. Prove per the adoption contract: proof widths, both appearances when owned,
   pointer + keyboard, clean console, and a reversible appearance switch.

## 9. Versioning

`registryVersion` identifies the registry as a whole; per-artifact sha256
identifies each artifact. There is no per-artifact semver yet — a change is a
new hash, and "behind" simply means the registry moved. If per-artifact
version numbers become necessary, they will be added to `checksums.json` and
this SPEC first.

## 10. What is deliberately out (v1)

- No authentication on the public registry.
- No auto-update push into consumers; kit-doctor reports, agents act.
- No claim that every piece exists in the vanilla dialect yet (12 today —
  the everyday starter set; the catalog grows piece by piece).
- No invented light mode for Animation, per its source authority.

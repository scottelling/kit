# Glohhh readiness handoff

## Decision

Glohhh correctly identified four reusable gaps in the shared catalog. Kit owns
the repairs before Glohhh adopts Vanilla. No Glohhh source is changed during
this work.

## What Kit now supplies

- A visibility and publication control with private, draft, unlisted, public,
  inherited, saving, saved, failed, sensitive, destination, and preview states.
- An evidence and source block with provenance, confidence, freshness,
  limitations, loading, failed, conflicting, stale, and missing-source states.
- A share and QR panel with a visible link, copy, native share, a supplied QR
  image slot, retry, draft, loading, failed, revoked, and offline states.
- A destructive action pattern with confirmation, typed confirmation when
  required, pending work, failure, completion, optional undo, undo progress,
  and undo failure.
- A repaired alert dialog that behaves as a true modal, contains focus, labels
  itself correctly, and places first focus on the safe action.

All five complete visual systems expose the same pieces. Installing one brings
only that piece and the selected visual system's foundations.

## What Glohhh must still decide

Glohhh owns who may publish, what each visibility state means, how medical or
commercial claims are sourced, what confidence means, how share links and QR
images are created, what deletion actually removes, and whether recovery is
available. Those rules must be passed into Kit's pieces rather than copied into
the shared library.

## Adoption order

1. Review the live Vanilla specimens and confirm that the shared states cover
   Glohhh's real workflows.
2. Map Glohhh's product rules and data into the shared pieces without changing
   routes, content, permissions, or business behavior.
3. Install Vanilla foundations and only the pieces Glohhh actually uses.
4. Prove the same populated Glohhh screens and actions in light and dark at
   phone, tablet, and desktop widths.
5. Keep the kit choice isolated so Vanilla can later be replaced without
   rewriting the product.

## Glohhh adoption finding — 2026-08-17

The first real Glohhh TypeScript integration found a non-blocking shared type
defect in `share-qr-panel`. `ShareQrPanelProps` extends the native section
props while also defining a product callback named `onCopy`. That name
collides with the native clipboard-event handler, so a consumer-supplied
`(url: string) => void` callback is inferred as also needing to accept a
`ClipboardEvent`.

The shared component's built-in `navigator.clipboard.writeText` path remains
usable, so Glohhh does not need a local substitute and can continue adopting
the published piece without changing it. Kit should rename the product
callback (for example, `onCopyLink`) or omit native `onCopy` from the inherited
section props, then re-run the downstream TypeScript install proof.

### Kit resolution

Kit now uses the unambiguous `onCopyLink` callback and explicitly excludes the
browser's native `onCopy` event from the component contract. A compile-only
consumer fixture permanently checks that an ordinary `(url: string) => void`
callback is accepted. A fresh outside Next/shadcn product then installed the
three refined safety pieces from the live Vanilla registry, compiled that
callback, exercised the phone and desktop behavior, and passed its production
build.

## Final adoption approval — 2026-08-17

Glohhh is approved to adopt Vanilla from the live Kit registry. Kit has no
remaining shared blocker from the submitted review. Glohhh still owns its
medical language, evidence policy, permissions, publishing rules, real QR
generation, destructive side effects, and recovery policy; those product
decisions must be made during its own adoption work rather than copied into
the shared kit.

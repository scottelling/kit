# KIT Intake — how a new kit enters the system

This is the standing process for onboarding a kit Scott hands over (a single
HTML file, a live-site audit, a repo, a spec). It applies every time. The goal
is stated by Scott directly: **fit each kit into our system without eliminating
what makes it different.** Quirks are the product; normalization is the failure
mode.

Both agents follow this document. `AGENTS.md` points here; if you are reading
that file, you are already bound by this one.

## 0. Decide the class first

| Class | Contract | Precedents |
| --- | --- | --- |
| **Complete system** | Rebuilt to kit's production rules; styles the full universal catalog (175 pieces); OKLCH; 44px; universal variable names | Vanilla, Purple Rain, JADE, OS, Animation |
| **Foundation kit** | Supplements a system without replacing its identity | Shadow |
| **Sourced kit** | Preserved as-authored: native token format, native names, native density and rules; bridged to the system, never converted | Space |

A rebuild (like OS) *replaces* source quirks with kit law — use
`docs/OS-KIT-INTAKE.md` as the model and expect months of parity work. A
sourced kit *keeps* its quirks and ships in days. Default for new hand-offs is
**sourced kit** unless Scott says he wants a full rebuild.

## 1. Preserve the original

- Store the artifact **verbatim** in `sources/<kit-id>/` (never edited, ever).
- Record where it came from, when, and how it was produced (extraction method,
  audit date). If the source labels provenance (extracted vs derived), that
  labeling is load-bearing — carry it through everything downstream.

## 2. Deconstruct

Read the whole artifact and inventory five things:

1. **Tokens** — every variable, grouped by scope (themes, scale, motion), in
   the kit's *native format*. Note format quirks explicitly (e.g. Space ships
   space-separated RGB channels so alpha composes — that is a feature, not a
   deviation to fix).
2. **Pieces** — every component, with its class names and its provenance flag.
3. **Rules** — the governing rules that make the kit itself (Space: grey body
   copy, one border width, flat unless floating, 400–500 weights only, mono
   for metadata, pills for controls / 6–8px for surfaces). These go into the
   registry as data, because agents restyle by rules, not vibes.
4. **Chrome vs system** — separate the documentation shell from the design
   system (Space marks these `.k-*` vs `.sp-*`). Only the system ships as
   installable artifacts; the whole file survives as the showroom.
5. **Cautions** — everything unresolved or dangerous (unlicensable fonts,
   inferred values, missing responsive story). Never silently resolve a
   caution; publish it.

## 3. Keep the quirks, add only non-destructive compatibility

- Native token names, formats, control heights, densities, and motion values
  stay exactly as authored.
- Compatibility is **additive only**: e.g. appending kit's standard dark-mode
  selectors (`.dark`, `[data-kit-appearance="dark"]`) *alongside* the kit's
  native theme mechanism, or scoping global resets so pieces install cleanly
  into someone else's page. Every such addition is recorded as `derived` in
  provenance.
- Never rename a token to match the universal vocabulary. That is what the
  bridge is for.

## 4. Bridge, don't convert

Publish `/r/<kit-id>/bridge.json` (`kit-bridge/1`): an honest, *partial* map
from native tokens to the universal roles, with format notes. Where no true
counterpart exists, say `null`. The bridge is how cross-kit tooling reasons
about a sourced kit; the kit itself never changes to satisfy it. Adapters that
cross the bridge must convert format at the boundary (e.g. RGB channels →
complete color values), never inside the kit.

## 5. Declare doctrine deltas

Sourced kits may violate `/r/doctrine.json` where the violation *is* the
identity (Space's 30px Finder-density rows vs kit's 44px minimum). Each
conflict becomes a **doctrine delta** in provenance: the rule, the kit's
value, and the source justification. Deltas are legal inside the sourced kit's
own products and showroom; they never flow back into universal pieces or
complete systems. No delta may be silent.

## 6. Emit through the standard pipeline

Author under `registry/sourced/<kit-id>/`:

```
meta.json         kit-sourced-meta/1 — id, title, source, showroom route
tokens.css        native tokens + additive compatibility selectors
kit.css           the installable system layer (chrome excluded)
kit.js            only if the system itself ships behavior (usually absent)
provenance.json   kit-provenance/1 — source, method, extracted/derived,
                  quirks, doctrine deltas, cautions, font licensing
bridge.json       kit-bridge/1 — partial map to universal roles
pieces.json       piece inventory with per-piece provenance
showroom.html     the presentable single-file document (usually the source
                  file, at most minimally adapted)
```

`npm run registry:build` publishes them to `/r/<kit-id>/`, serves the document
at `/kit-<kit-id>.html`, and regenerates `lib/sourced-kits.generated.json` —
which the site imports at build time, so **every sourced kit automatically
appears in the Explore kit switcher and gets its `/kit/<kit-id>` showroom
page** (the shared `app/kit/[sourced]` shell: same switcher, same hero format,
with the full document embedded). No per-kit site code is needed. Checksums
cover the artifacts automatically (kit-doctor therefore works with zero extra
effort), and `verify:dialects` gates the formats, the bridge targets, the
manifest, and the showroom route.

## 7. Record and ship

- Write `docs/<KIT-ID>-KIT-INTAKE.md`: source authority, class decision, what
  was preserved, what was derived, the bridge stance, open cautions.
- Add the kit to `AGENTS.md` canonical URLs, `README.md`, `docs/BRAIN.md`,
  and the live checks in `docs/DEPLOYMENT.md`.
- Ledger entry, `npm run check`, `./ship.sh`, live curls. Same bar as any
  release: the intake is not done until the kit is live and verified.

## 8. Consumers

A project adopts a sourced kit with that kit's own conventions — install its
`tokens.css` + `kit.css`, use its native class names, respect its deltas.
Record installs in `kit-manifest.json` exactly as with any system. The
`/kit` skill and doctrine still apply, *except* where a documented delta
overrides them inside that kit's territory.

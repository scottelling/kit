# kit

The public design-engineering registry for Vanilla, Purple Rain, JADE, OS, Animation Studio, Voltage, and focused foundation kits.

```bash
npx shadcn add https://kit.scottelling.com/r/button.json
```

Every component carries the `tokens` registry dependency, so Purple Rain’s OKLCH light and dark variables merge automatically.

## The KIT format

`SPEC.md` defines the format underneath the registry: tokens are the shared
language, and shadcn is one dialect of it, not the foundation. A project with
no React, Tailwind, or build step adopts the same language directly:

```html
<link rel="stylesheet" href="https://kit.scottelling.com/r/tokens.css" />
```

- Framework-free tokens: `/r/tokens.css` + `/r/design-tokens.json` per system
- Swap-ready Vanilla project starter: `/r/vanilla/starter.json`, live at `/vanilla`
- Framework-free pieces (zero-dependency HTML/CSS/JS): `/r/vanilla/registry.json`
- Machine-readable doctrine for agents: `/r/doctrine.json`
- Drift detection: `/r/checksums.json` + a consumer `kit-manifest.json` + `npm run doctor -- <project-dir>`

Sourced kits enter the registry as authored — quirks preserved, provenance and
doctrine deltas declared, bridged to the universal roles instead of converted
(`docs/KIT-INTAKE.md`). The first is **Space**, a Finder-adjacent filesystem
kit: showroom at `/kit/space`, installable from `/r/space/registry.json`.

Vanilla, Purple Rain, JADE, OS, Animation Studio, and Voltage each expose the same 179-piece catalog. The 142 everyday pieces and 37 specialist patterns are all available, but each is installed individually so unrelated layouts never arrive by accident.

The everyday catalog includes shared safety patterns for visibility and publication, evidence and sources, share and QR handoff, destructive actions with recovery, and true modal confirmation. Kit owns their interaction quality and accessibility, including focused phone behavior and tactile state explorers. Each product still owns its permissions, publishing rules, evidence policy, QR generation, deletion behavior, and recovery window.

Vanilla is the neutral starting system for a new project. It includes a complete app, landing, shop, and content foundation, then swaps to any other complete kit by changing only the shared visual roles. The product's pages, content, data, and behavior remain intact.

JADE exposes the same production component contract with its own tactile light and dark foundations under `https://kit.scottelling.com/r/jade/`.

OS adds the full shared component contract plus the desktop, window, menu bar, dock, widget, master-detail, split-view, command bar, and settings patterns that make its product language distinct. Its five theme moods are rebuilt with solid OKLCH surfaces and 44-pixel controls under `https://kit.scottelling.com/r/os/`.

Animation Studio adds the full shared component contract plus 28 creative-workspace structures for storyboards, canvas work, inspectors, motion, timelines, code, templates, delivery, and recovery. It preserves the source product's canonical dark foundation without inventing a light theme under `https://kit.scottelling.com/r/animation/`.

Voltage carries the same complete catalog through a vivid desktop language: deep violet structure, solid multi-color status blocks, generous object-like corners, seated depth, and maintained light and dark appearances under `https://kit.scottelling.com/r/voltage/`.

The Studio includes a searchable icon library at `https://kit.scottelling.com/studio/icons`, a tactile font library at `https://kit.scottelling.com/studio/fonts`, a shared Motion Studio at `https://kit.scottelling.com/studio/motion`, and a plain-language kit-swap workspace at `https://kit.scottelling.com/studio/swap`. Motion Studio provides five interactive, independently installable behaviors that inherit any active visual kit without forcing its colors, type, shape, or layout. The swap workspace checks every real product journey before approval and separates reusable Kit gaps from compositions and product-owned work.

Shadow adds six exact stacked depths, integrated hairline edges, independent tinting, and an agent rule for elevated surfaces under `https://kit.scottelling.com/r/shadow/`. It is a foundation kit that strengthens Purple Rain or JADE without replacing either system.

Theme Workshop at `https://kit.scottelling.com/labs` creates a safe copy of Purple Rain, JADE, or OS, lets the copy be shaped in plain English or by touch, proves it on a working interface, and publishes a portable theme without changing the source kit.

Elements at `https://kit.scottelling.com/elements` is the live behavior library. Knight Rider / Larson Scanner is the first isolated Signature Effect, with a tactile playground, exact visible source, an English project prompt, and an independent public handoff.

## Local work

```bash
npm install
npm run dev
npm run check
```

- Registry source: `registry/purple-rain/`
- Registry manifest: `registry.json`
- JADE registry manifest: `registry/jade/registry.json`
- OS registry manifest: `registry/os/registry.json`
- Animation Studio registry manifest: `registry/animation/registry.json`
- Vanilla registry manifest: `registry/vanilla-kit/registry.json`
- Voltage registry manifest: `registry/voltage/registry.json`
- Shadow registry manifest: `registry/shadow/registry.json`
- Elements registry manifest: `registry/elements/registry.json`
- Motion registry manifest: `registry/motion/registry.json`
- Built JSON: `public/r/`, `public/r/jade/`, `public/r/os/`, `public/r/animation/`, `public/r/vanilla-kit/`, `public/r/voltage/`, `public/r/shadow/`, `public/r/elements/`, and `public/r/motion/`
- Complete showrooms: `/kit`, `/kit/jade`, `/kit/os`, `/kit/animation`, `/kit/vanilla`, `/kit/voltage`, and `/kit/shadow`
- Same-product comparison: `/kit/jade/compare`
- Side-by-side demo: `/demo`
- Theme Workshop: `/labs`
- Public theme handoff: `/r/workshop/theme.json`
- Elements Library: `/elements`
- Icon Library: `/studio/icons`
- Font Library: `/studio/fonts`
- Motion Studio: `/studio/motion`
- Kit Swap Studio: `/studio/swap`
- Public system catalog: `/r/system-catalog.json`
- Public adoption contract: `/r/adoption-contract.json`
- Knight Rider handoff: `/r/elements/larson-scanner.json`
- Shared motion handoff: `/r/motion/registry.json`
- Production: `https://kit.scottelling.com`

## Develop

```bash
npm install
npm run registry:build
npm run dev
```

Open `http://localhost:3000/kit/vanilla` for Vanilla, `http://localhost:3000/vanilla` for the swap-ready starter, and the other `/kit/*` routes for the complete visual systems.

## Verify

```bash
npm run check
```

The counted inventories and shared capability contract keep all six visual systems aligned around the same 179-piece catalog while their palettes, shapes, depth, declared color modes, and motion remain distinct. Specialist patterns remain opt-in, and product-owned layouts never travel during a swap.

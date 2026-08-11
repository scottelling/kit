# kit

The public design-engineering registry for Purple Rain, JADE, OS, Animation Studio, and focused foundation kits.

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
- Vanilla pieces (zero-dependency HTML/CSS/JS): `/r/vanilla/registry.json`, live at `/vanilla`
- Machine-readable doctrine for agents: `/r/doctrine.json`
- Drift detection: `/r/checksums.json` + a consumer `kit-manifest.json` + `npm run doctor -- <project-dir>`

Purple Rain, JADE, OS, and Animation Studio each expose the same 175-piece catalog. The 138 everyday pieces and 37 specialist patterns are all available, but each is installed individually so unrelated layouts never arrive by accident.

JADE exposes the same production component contract with its own tactile light and dark foundations under `https://kit.scottelling.com/r/jade/`.

OS adds the full shared component contract plus the desktop, window, menu bar, dock, widget, master-detail, split-view, command bar, and settings patterns that make its product language distinct. Its five theme moods are rebuilt with solid OKLCH surfaces and 44-pixel controls under `https://kit.scottelling.com/r/os/`.

Animation Studio adds the full shared component contract plus 28 creative-workspace structures for storyboards, canvas work, inspectors, motion, timelines, code, templates, delivery, and recovery. It preserves the source product's canonical dark foundation without inventing a light theme under `https://kit.scottelling.com/r/animation/`.

The Studio includes a searchable icon library at `https://kit.scottelling.com/studio/icons`, a tactile font library at `https://kit.scottelling.com/studio/fonts`, and a plain-language kit-swap workspace at `https://kit.scottelling.com/studio/swap`.

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
- Shadow registry manifest: `registry/shadow/registry.json`
- Elements registry manifest: `registry/elements/registry.json`
- Built JSON: `public/r/`, `public/r/jade/`, `public/r/os/`, `public/r/animation/`, `public/r/shadow/`, and `public/r/elements/`
- Complete showrooms: `/kit`, `/kit/jade`, `/kit/os`, `/kit/animation`, and `/kit/shadow`
- Same-product comparison: `/kit/jade/compare`
- Side-by-side demo: `/demo`
- Theme Workshop: `/labs`
- Public theme handoff: `/r/workshop/theme.json`
- Elements Library: `/elements`
- Icon Library: `/studio/icons`
- Font Library: `/studio/fonts`
- Kit Swap Studio: `/studio/swap`
- Public system catalog: `/r/system-catalog.json`
- Public adoption contract: `/r/adoption-contract.json`
- Knight Rider handoff: `/r/elements/larson-scanner.json`
- Production: `https://kit.scottelling.com`

## Develop

```bash
npm install
npm run registry:build
npm run dev
```

Open `http://localhost:3000/kit` for Purple Rain, `http://localhost:3000/kit/jade` for JADE, `http://localhost:3000/kit/os` for OS, `http://localhost:3000/kit/animation` for Animation Studio, `http://localhost:3000/kit/shadow` for Shadow, and `http://localhost:3000/kit/jade/compare` for the matched-product comparison.

## Verify

```bash
npm run check
```

The counted inventories and shared capability contract keep all four visual systems aligned around the same 175-piece catalog while their palettes, shapes, depth, declared color modes, and motion remain distinct. Specialist patterns remain opt-in, and product-owned layouts never travel during a swap.

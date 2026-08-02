# kit

The public design-engineering registry for Purple Rain, JADE, and focused foundation kits.

```bash
npx shadcn add https://kit.scottelling.com/r/button.json
```

Every component carries the `tokens` registry dependency, so Purple Rain’s OKLCH light and dark variables merge automatically.

JADE exposes the same production component contract with its own tactile light and dark foundations under `https://kit.scottelling.com/r/jade/`.

Shadow adds six exact stacked depths, integrated hairline edges, independent tinting, and an agent rule for elevated surfaces under `https://kit.scottelling.com/r/shadow/`. It is a foundation kit that strengthens Purple Rain or JADE without replacing either system.

Theme Workshop at `https://kit.scottelling.com/labs` creates a safe copy of Purple Rain or JADE, lets the copy be shaped in plain English or by touch, proves it on a working interface, and publishes a portable theme without changing the source kit.

## Local work

```bash
npm install
npm run dev
npm run check
```

- Registry source: `registry/purple-rain/`
- Registry manifest: `registry.json`
- JADE registry manifest: `registry/jade/registry.json`
- Shadow registry manifest: `registry/shadow/registry.json`
- Built JSON: `public/r/`, `public/r/jade/`, and `public/r/shadow/`
- Complete showrooms: `/kit`, `/kit/jade`, and `/kit/shadow`
- Same-product comparison: `/kit/jade/compare`
- Side-by-side demo: `/demo`
- Theme Workshop: `/labs`
- Public theme handoff: `/r/workshop/theme.json`
- Production: `https://kit.scottelling.com`

## Develop

```bash
npm install
npm run registry:build
npm run dev
```

Open `http://localhost:3000/kit` for Purple Rain, `http://localhost:3000/kit/jade` for JADE, `http://localhost:3000/kit/shadow` for Shadow, and `http://localhost:3000/kit/jade/compare` for the matched-product comparison.

## Verify

```bash
npm run check
```

The counted inventory and shared capability contract keep both visual systems aligned while their palettes, shapes, depth, and motion remain distinct.

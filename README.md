# kit

The public design-engineering registry for Purple Rain and JADE.

```bash
npx shadcn add https://kit.scottelling.com/r/button.json
```

Every component carries the `tokens` registry dependency, so Purple Rain’s OKLCH light and dark variables merge automatically.

JADE exposes the same production component contract with its own tactile light and dark foundations under `https://kit.scottelling.com/r/jade/`.

## Local work

```bash
npm install
npm run dev
npm run check
```

- Registry source: `registry/purple-rain/`
- Registry manifest: `registry.json`
- JADE registry manifest: `registry/jade/registry.json`
- Built JSON: `public/r/` and `public/r/jade/`
- Complete showrooms: `/kit` and `/kit/jade`
- Same-product comparison: `/kit/jade/compare`
- Side-by-side demo: `/demo`
- Production: `https://kit.scottelling.com`

## Develop

```bash
npm install
npm run registry:build
npm run dev
```

Open `http://localhost:3000/kit` for Purple Rain, `http://localhost:3000/kit/jade` for JADE, and `http://localhost:3000/kit/jade/compare` for the matched-product comparison.

## Verify

```bash
npm run check
```

The counted inventory and shared capability contract keep both visual systems aligned while their palettes, shapes, depth, and motion remain distinct.

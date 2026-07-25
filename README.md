# kit

The public shadcn registry for Purple Rain 2.0.

```bash
npx shadcn add https://kit.scottelling.com/r/button.json
```

Every component carries the `tokens` registry dependency, so Purple Rain’s OKLCH light and dark variables merge automatically.

## Local work

```bash
npm install
npm run dev
npm run check
```

- Registry source: `registry/purple-rain/`
- Registry manifest: `registry.json`
- Built JSON: `public/r/`
- Side-by-side demo: `/demo`
- Production: `https://kit.scottelling.com`

The public Purple Rain component registry.

## Install

```bash
npx shadcn@latest add https://kit.scottelling.com/r/button.json
```

## Develop

```bash
npm install
npm run registry:build
npm run dev
```

Open `http://localhost:3000` for the registry product page and `http://localhost:3000/demo` for the Purple Rain versus Origin UI comparison.

## Verify

```bash
npm run check
```

The registry source lives in `registry/purple-rain/`; generated install payloads live in `public/r/`.

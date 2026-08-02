<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# kit — Agent Orientation

`kit` is the public shadcn registry for the Purple Rain design system.

## Canonical

- Path: `/Users/scott/ScottAI/01_Active_Projects/kit`
- Repo: `github.com/scottelling/kit`
- Live: `https://kit.scottelling.com`
- Registry catalog: `https://kit.scottelling.com/r/registry.json`
- Shadow showroom: `https://kit.scottelling.com/kit/shadow`
- Shadow registry: `https://kit.scottelling.com/r/shadow/smooth-shadow.json`
- Theme Workshop: `https://kit.scottelling.com/labs`
- Public theme handoff: `https://kit.scottelling.com/r/workshop/theme.json`
- Elements Library: `https://kit.scottelling.com/elements`
- Signature Effects registry: `https://kit.scottelling.com/r/elements/registry.json`
- Stack: Next.js App Router, TypeScript, Tailwind CSS v4, shadcn

## Product contract

- `registry.json` is the source registry catalog.
- `registry/purple-rain/` owns the distributable source.
- `registry/shadow/` owns the cleanly separated Shadow foundation registry and its MIT notice.
- `registry/elements/` owns independently installable behaviors that do not inherit Purple Rain or JADE tokens.
- `npm run registry:build` must emit installable JSON into `public/r/`.
- Every component item depends on the local `tokens` registry item.
- Purple Rain uses tonal depth, directional dark shadows, restrained orchid, and visible focus. No glass, translucency, glow, ambient blobs, or decorative looping motion.
- `/demo` compares the same task interface in Purple Rain and Origin UI.
- `/kit/shadow` is the tactile elevation showroom. Shadow supplements complete visual systems; it does not claim 138-component parity.
- `/labs` creates immutable-source theme copies. Apply and publish the copy, or restore the exact Purple Rain/JADE source without losing the work.
- Published Theme Workshop copies must install cleanly into an unrelated shadcn project and merge both light and dark foundations.
- `/elements` keeps one counted inventory, a live tactile playground, exact visible source, an English project prompt, and a separate public registry in sync.
- A Signature Effect may use a purpose-bound local effect only inside its isolated frame. It must start sound muted, pause offscreen, become fully static for reduced motion, preserve 44px controls, and leave Purple Rain chrome untouched.

## Working rules

- Read `PROJECT_BRAIN.md`, `docs/AGENT_LEDGER.md`, and `docs/DEPLOYMENT.md` before meaningful work.
- Run `npm run check` before commit or deploy.
- Prove registry changes with a throwaway consumer app, not only schema validation.
- Keep secrets out of source and logs.
- Update `docs/AGENT_LEDGER.md` after meaningful product, registry, or deployment changes.

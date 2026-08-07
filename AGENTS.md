<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# kit — Agent Orientation

`kit` is the public design-engineering registry for Purple Rain, JADE, OS, Animation Studio, focused foundations, and isolated interface behaviors.

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
- OS showroom: `https://kit.scottelling.com/kit/os`
- OS registry: `https://kit.scottelling.com/r/os/registry.json`
- Animation Studio showroom: `https://kit.scottelling.com/kit/animation`
- Animation Studio registry: `https://kit.scottelling.com/r/animation/registry.json`
- Icon library: `https://kit.scottelling.com/studio/icons`
- Font library: `https://kit.scottelling.com/studio/fonts`
- Kit-swap workspace: `https://kit.scottelling.com/studio/swap`
- Shared system catalog: `https://kit.scottelling.com/r/system-catalog.json`
- Public swap contract: `https://kit.scottelling.com/r/adoption-contract.json`
- Stack: Next.js App Router, TypeScript, Tailwind CSS v4, shadcn

## Product contract

- `registry.json` is the source registry catalog.
- `registry/purple-rain/` owns the distributable source.
- `registry/shadow/` owns the cleanly separated Shadow foundation registry and its MIT notice.
- `registry/elements/` owns independently installable behaviors that do not inherit Purple Rain or JADE tokens.
- `registry/os/` owns the rebuilt OS visual system and its OS-native desktop, window, widget, phone, command, and settings structures.
- `registry/animation/` owns the rebuilt Animation Studio visual system and its storyboard, canvas, inspector, motion, timeline, code, template, delivery, and recovery structures.
- Purple Rain, JADE, OS, and Animation Studio each expose the same 175 individually installable interface pieces: 138 everyday pieces plus 37 opt-in specialist patterns. Installing one piece never pulls unrelated specialist layouts into a project.
- Product screens, routes, data, and behavior stay owned by the target product during a kit swap. The kit changes foundations and component expression; it does not silently replace the product.
- `npm run registry:build` must emit installable JSON into `public/r/`.
- Every component item depends on the local `tokens` registry item.
- Purple Rain uses tonal depth, directional dark shadows, restrained orchid, and visible focus. No glass, translucency, glow, ambient blobs, or decorative looping motion.
- `/demo` compares the same task interface in Purple Rain and Origin UI.
- `/kit/shadow` is the tactile elevation showroom. Shadow supplements complete visual systems; it does not claim 138-component parity.
- `/labs` creates immutable-source theme copies. Apply and publish the copy, or restore the exact Purple Rain/JADE source without losing the work.
- `/kit/os` is the complete OS showroom. It preserves theme-wide identity and desktop/phone/widget composition while replacing glass, glow, raw colors, and small controls with Kit's solid, OKLCH, 44-pixel production rules.
- Every shared OS component and OS-native pattern depends on the public OS tokens item under `/r/os/`.
- Every shared Animation Studio component and studio-native pattern depends on the public Animation tokens item under `/r/animation/`.
- `/studio/icons` is the visual source of truth for the approved Lucide and Material Symbols Rounded families. New custom interface icons are a last resort; verified brand marks remain separate.
- `/studio/fonts` is the visual source of truth for approved font families and pairings. Finished products load only the chosen families and weights.
- `/studio/swap` creates the plain-language preserve, repair, change, proof, and rollback brief used before work begins in a target product.
- Animation Studio is an honest dark-authority system. Default and dark installation contexts intentionally receive the same inspected source foundation; no light direction is invented.
- Published Theme Workshop copies must install cleanly into an unrelated shadcn project and merge both light and dark foundations.
- `/elements` keeps one counted inventory, a live tactile playground, exact visible source, an English project prompt, and a separate public registry in sync.
- A Signature Effect may use a purpose-bound local effect only inside its isolated frame. It must start sound muted, pause offscreen, become fully static for reduced motion, preserve 44px controls, and leave Purple Rain chrome untouched.

## Working rules

- Read `PROJECT_BRAIN.md`, `docs/AGENT_LEDGER.md`, and `docs/DEPLOYMENT.md` before meaningful work.
- Run `npm run check` before commit or deploy.
- Prove registry changes with a throwaway consumer app, not only schema validation.
- Keep secrets out of source and logs.
- Update `docs/AGENT_LEDGER.md` after meaningful product, registry, or deployment changes.

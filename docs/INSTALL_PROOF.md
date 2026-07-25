# Live install proof

Verified against production on 2026-07-25.

## Consumer

- Throwaway app: `/tmp/kit-consumer-final-proof`
- Stack: clean Next.js App Router, TypeScript, Tailwind v4, shadcn initialized with current defaults
- Command: `npx shadcn@latest add https://kit.scottelling.com/r/button.json --yes --overwrite`

Current `shadcn init` creates a starter `components/ui/button.tsx`, so the registry command correctly reported that file as updated rather than newly created.

## Exact changes

Only two files changed from the initialized-app baseline:

- `components/ui/button.tsx`: replaced by the Purple Rain button; 36 added lines and 29 removed lines. Its final content matched the `content` field served by the live `button.json` exactly.
- `app/globals.css`: Purple Rain’s token dependency merged automatically; 106 added lines and 37 removed lines. Existing semantic light and dark variables were replaced, and Purple Rain-specific typography, measure, spacing, control, theme, plane, radius, motion, and shadow variables were added.

No package or configuration file changed during the component installation.

Verified merged values:

- Light background: `oklch(0.972 0.011 313)`
- Light primary: `oklch(0.5 0.17 305)`
- Dark background: `oklch(0.1513 0.0205 309.47)`
- Dark primary: `oklch(0.7756 0.1104 304.73)`
- Canonical type sizes: `12px` compact, `15px` body, `14px` control, `38px` heading
- Canonical spacing: `12px` base, `32px` section
- Canonical control height: `44px`

The throwaway app passed its own `next build` after installation.

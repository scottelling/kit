# Animation Studio downstream install proof

## Consumer

- Throwaway app: `/tmp/animation-kit-proof-1786072945`
- Fresh Next.js App Router, TypeScript, Tailwind v4, and default shadcn initialization.
- The baseline was committed inside the throwaway app before the Animation Studio install.

## Install exercised

The locally built public `studio-shell` payload was installed through shadcn. During this pre-publication proof only, the generator pointed its automatic `tokens` dependency to the local Kit server. The registry was rebuilt immediately afterward with the canonical public dependency:

`https://kit.scottelling.com/r/animation/tokens.json`

This local override proves the same transitive install path without publishing unfinished work.

## Exact consumer changes

- Created `components/ui/studio-shell.tsx`.
- Updated `app/globals.css` with the complete Animation Studio foundation: 249 inserted lines and 63 replaced baseline theme lines.
- Changed no package, lock, shadcn configuration, or other project file.
- The installed component matches the component content in the canonical public payload exactly.
- The merged CSS contains the exact Animation background, primary action, information role, typography, spacing, shape, depth, and motion variables.
- Default and dark installation contexts intentionally contain the same inspected dark foundation.

## Result

- The unrelated consumer production build passed.
- The generated canonical component depends on `https://kit.scottelling.com/r/animation/tokens.json`.
- Live-domain installation remains intentionally unproved until the release is explicitly approved and published.

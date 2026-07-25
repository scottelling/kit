# Agent Ledger

## 2026-07-25 — Plain-language visual showroom

- Agent: Codex
- Scope: replace the developer-facing public experience with a visual, tactile, plain-language Purple Rain showroom while preserving the working registry behind it
- Delivered: new `/kit` gallery with live light/dark colors, type, buttons, cards, fields, labels, and dialogs; plain-language global finder; simplified home; simplified Purple Rain vs Origin comparison with a visible preference choice
- Removed from public pages: commands, registry terminology, source links, package namespaces, file formats, and install language
- Interaction proof: finder search and section landing; shared light/dark mood; button loading/success; card selection; form error/success; typed email carried into both comparison dialogs; every dialog action closes cleanly
- Browser QA: local and production checked at 320/375/414/768 and 1280×800; no page-level horizontal overflow, no undersized touch targets, no console errors
- Build proof: registry schema valid; six items rebuilt and verified; ESLint, TypeScript, and Next production build passed
- Live proof: home, `/kit`, `/demo`, and `/r/button.json` return `200`; critical interactions repeated on `kit.scottelling.com`
- Hallmark: Catalogue macrostructure; N13 plain-language finder; Ft2 one-line footer; 58/58 slop gates passed
- Deployment: Vercel production deployment `dpl_HAaF5K1qm97DVoMWwDt96Zjo58dh`; GitHub `main` pushed to `scottelling/kit`
- Open loops: none

## 2026-07-25 — Project birth

- Agent: Codex
- Scope: create the public Purple Rain shadcn registry and comparison product
- Deploy mode: Vercel CLI direct deploy
- Authority: Studio Purple Rain `2.0.0-rc.1`
- Verification: registry schema valid; six items built; dependency and effect audit passed; ESLint, TypeScript, and Next production build passed
- Live check: production `200`; registry, home, and demo publicly reachable at `kit.scottelling.com`; Vercel project and custom domain verified
- Delivered locally: public registry source/build, responsive home, matched-task Purple Rain vs Origin UI demo, shared light/dark control, copyable install commands, project birth certificate, deployment script
- Security: production dependency audit reports zero vulnerabilities; patched current transitive PostCSS, Sharp, and Hono releases with npm overrides
- Registry hardening: verified shadcn v4’s transitive-theme merge behavior in a clean consumer; added schema-native CSS-variable fallbacks so semantic palette values override correctly when `tokens` arrives automatically through a component dependency
- Browser QA: production checked at 320/375/414/768 and 1280×800/1440 desktop; no horizontal overflow, no undersized controls, no console errors; shared theme toggle, copy controls, and both dialogs passed
- Downstream proof: live button install changed only `components/ui/button.tsx` and `app/globals.css`; payload match, light/dark variable merge, and consumer production build passed; full receipt in `docs/INSTALL_PROOF.md`
- Deployment: Vercel production deployment `dpl_4LA4pK7nYAqT9SYCe84zbcJSNWc1`; GitHub `main` pushed to `scottelling/kit`
- Open loops: none

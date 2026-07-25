# Agent Ledger

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
- Deployment: Vercel production deployment `dpl_6Pv22ZEgYq34P2XR2KZLC2nfxnc5`; GitHub `main` pushed to `scottelling/kit`
- Open loops: none

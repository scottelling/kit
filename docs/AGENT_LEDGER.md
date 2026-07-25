# Agent Ledger

## 2026-07-25 — Project birth

- Agent: Codex
- Scope: create the public Purple Rain shadcn registry and comparison product
- Deploy mode: Vercel CLI direct deploy
- Authority: Studio Purple Rain `2.0.0-rc.1`
- Verification: registry schema valid; six items built; dependency and effect audit passed; ESLint, TypeScript, and Next production build passed
- Live check: pending
- Delivered locally: public registry source/build, responsive home, matched-task Purple Rain vs Origin UI demo, shared light/dark control, copyable install commands, project birth certificate, deployment script
- Security: production dependency audit reports zero vulnerabilities; patched current transitive PostCSS, Sharp, and Hono releases with npm overrides
- Registry hardening: verified shadcn v4’s transitive-theme merge behavior in a clean consumer; added schema-native CSS-variable fallbacks so semantic palette values override correctly when `tokens` arrives automatically through a component dependency
- Open loops: browser QA, production redeploy, downstream live install proof

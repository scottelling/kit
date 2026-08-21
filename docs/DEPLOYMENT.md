# Deployment

Primary mode: Vercel CLI direct deploy, with GitHub as the canonical source repository.

Shared source of truth:

`/Users/scott/ScottAI/02_Operating_Layer/continuity/DEPLOYMENT_AND_SESSION_SOURCE_OF_TRUTH.md`

## Target

- Vercel project: `kit`
- Production domain: `kit.scottelling.com`
- GitHub repository: `scottelling/kit`

## Ship

```bash
./ship.sh
```

The script runs the complete local check, pushes the already-committed `main` branch, deploys production through Vercel, and verifies the live registry endpoint. It deliberately refuses to invent a commit message or sweep unrelated work into a commit.

## Required live checks

```bash
curl -fsS https://kit.scottelling.com/r/registry.json
curl -fsS https://kit.scottelling.com/r/button.json
curl -fsS https://kit.scottelling.com/r/calendar.json
curl -fsS https://kit.scottelling.com/r/shadow/smooth-shadow.json
curl -fsS https://kit.scottelling.com/r/workshop/theme.json
curl -fsS https://kit.scottelling.com/r/elements/registry.json
curl -fsS https://kit.scottelling.com/r/elements/larson-scanner.json
curl -fsS https://kit.scottelling.com/r/motion/registry.json
curl -fsS https://kit.scottelling.com/r/motion/motion-menu.json
curl -fsS https://kit.scottelling.com/r/os/registry.json
curl -fsS https://kit.scottelling.com/r/os/tokens.json
curl -fsS https://kit.scottelling.com/r/os/window-shell.json
curl -fsS https://kit.scottelling.com/r/animation/registry.json
curl -fsS https://kit.scottelling.com/r/animation/tokens.json
curl -fsS https://kit.scottelling.com/r/animation/studio-shell.json
curl -fsS https://kit.scottelling.com/r/jade/motion-timeline.json
curl -fsS https://kit.scottelling.com/r/animation/window-shell.json
curl -fsS https://kit.scottelling.com/r/system-catalog.json
curl -fsS https://kit.scottelling.com/r/guides/catalog.json
curl -fsS https://kit.scottelling.com/r/guides/button.json
curl -fsS https://kit.scottelling.com/r/guides/button.md
curl -fsS https://kit.scottelling.com/r/guides/install/kit-component-guides.json
curl -fsS https://kit.scottelling.com/r/icon-catalog.json
curl -fsS https://kit.scottelling.com/r/adoption-contract.json
curl -fsS https://kit.scottelling.com/r/adoption-assessment.json
curl -fsS https://kit.scottelling.com/r/tokens.css
curl -fsS https://kit.scottelling.com/r/design-tokens.json
curl -fsS https://kit.scottelling.com/r/jade/tokens.css
curl -fsS https://kit.scottelling.com/r/os/tokens.css
curl -fsS https://kit.scottelling.com/r/animation/tokens.css
curl -fsS https://kit.scottelling.com/r/shadow/tokens.css
curl -fsS https://kit.scottelling.com/r/doctrine.json
curl -fsS https://kit.scottelling.com/r/checksums.json
curl -fsS https://kit.scottelling.com/r/vanilla/registry.json
curl -fsS https://kit.scottelling.com/r/vanilla/kit.css
curl -fsS https://kit.scottelling.com/r/vanilla/kit.js
curl -fsS https://kit.scottelling.com/r/vanilla/button.json
curl -fsS https://kit.scottelling.com/r/vanilla-kit/alert-dialog.json
curl -fsS https://kit.scottelling.com/r/vanilla-kit/visibility-publication-control.json
curl -fsS https://kit.scottelling.com/r/vanilla-kit/evidence-source-block.json
curl -fsS https://kit.scottelling.com/r/vanilla-kit/share-qr-panel.json
curl -fsS https://kit.scottelling.com/r/vanilla-kit/destructive-action.json
curl -fsS https://kit.scottelling.com/r/voltage/registry.json
curl -fsS https://kit.scottelling.com/r/voltage/tokens.json
curl -fsS https://kit.scottelling.com/r/voltage/tokens.css
curl -fsS https://kit.scottelling.com/r/voltage/button.json
curl -fsS https://kit.scottelling.com/r/calm/registry.json
curl -fsS https://kit.scottelling.com/r/calm/tokens.json
curl -fsS https://kit.scottelling.com/r/calm/tokens.css
curl -fsS https://kit.scottelling.com/r/calm/button.json
curl -fsS https://kit.scottelling.com/vanilla
curl -fsS https://kit.scottelling.com/r/space/registry.json
curl -fsS https://kit.scottelling.com/r/space/tokens.css
curl -fsS https://kit.scottelling.com/r/space/kit.css
curl -fsS https://kit.scottelling.com/r/space/provenance.json
curl -fsS https://kit.scottelling.com/r/space/bridge.json
curl -fsS https://kit.scottelling.com/kit/space
curl -fsS https://kit.scottelling.com/demo
curl -fsS https://kit.scottelling.com/labs
curl -fsS https://kit.scottelling.com/elements
curl -fsS https://kit.scottelling.com/kit/os
curl -fsS https://kit.scottelling.com/kit/animation
curl -fsS https://kit.scottelling.com/kit/voltage
curl -fsS https://kit.scottelling.com/kit/calm
curl -fsS https://kit.scottelling.com/studio
curl -fsS https://kit.scottelling.com/studio/icons
curl -fsS https://kit.scottelling.com/studio/fonts
curl -fsS https://kit.scottelling.com/studio/motion
curl -fsS https://kit.scottelling.com/studio/guides
curl -fsS https://kit.scottelling.com/studio/swap
curl -fsS https://kit.scottelling.com/kit/shadow
```

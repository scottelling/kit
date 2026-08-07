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
curl -fsS https://kit.scottelling.com/r/os/registry.json
curl -fsS https://kit.scottelling.com/r/os/tokens.json
curl -fsS https://kit.scottelling.com/r/os/window-shell.json
curl -fsS https://kit.scottelling.com/r/animation/registry.json
curl -fsS https://kit.scottelling.com/r/animation/tokens.json
curl -fsS https://kit.scottelling.com/r/animation/studio-shell.json
curl -fsS https://kit.scottelling.com/r/jade/motion-timeline.json
curl -fsS https://kit.scottelling.com/r/animation/window-shell.json
curl -fsS https://kit.scottelling.com/r/system-catalog.json
curl -fsS https://kit.scottelling.com/r/icon-catalog.json
curl -fsS https://kit.scottelling.com/r/adoption-contract.json
curl -fsS https://kit.scottelling.com/demo
curl -fsS https://kit.scottelling.com/labs
curl -fsS https://kit.scottelling.com/elements
curl -fsS https://kit.scottelling.com/kit/os
curl -fsS https://kit.scottelling.com/kit/animation
curl -fsS https://kit.scottelling.com/studio
curl -fsS https://kit.scottelling.com/studio/icons
curl -fsS https://kit.scottelling.com/studio/fonts
curl -fsS https://kit.scottelling.com/studio/swap
curl -fsS https://kit.scottelling.com/kit/shadow
```

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
curl -fsS https://kit.scottelling.com/demo
curl -fsS https://kit.scottelling.com/labs
curl -fsS https://kit.scottelling.com/studio
curl -fsS https://kit.scottelling.com/kit/shadow
```

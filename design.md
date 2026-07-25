# Design — Purple Rain

A locked visual system for the public Purple Rain showroom. Every public page reads this before
changing its layout or interaction language. The public site is for visual, tactile evaluation;
the delivery machinery stays working but does not appear in the human-facing experience.

## Genre

Playful, tactile, and exact. Friendly without being childish. Purple Rain’s canonical values win
over catalogue theme defaults.

## Macrostructure family

- Public pages: Catalogue — an even-handed visual inventory with hairline row divisions.
- Showroom page: Catalogue — live specimens grouped by kind.
- Comparison page: Catalogue — two equal task specimens followed by a plain choice.

## Theme

Purple Rain `2.0.0-rc.1`. Dark mode preserves Studio’s exact foundation. Light mode preserves the
same plum and orchid relationships while reversing lightness.

- Paper: `oklch(0.972 0.011 313)`
- Raised paper: `oklch(0.992 0.006 313)`
- Ink: `oklch(0.2 0.03 308)`
- Muted ink: `oklch(0.46 0.032 313)`
- Rule: `oklch(0.83 0.022 311)`
- Accent: `oklch(0.5 0.17 305)`
- Focus: `oklch(0.5 0.17 305)`

No glass, translucency, glow, gradients, ambient blobs, or floating-card hover lifts.

## Typography

- Display: Relay Sans, weight 700, normal style.
- Body: Relay Sans, weight 400.
- Outlier: Geist Mono, weight 600, wordmark only.
- Display tracking: `-0.035em` to `-0.058em` by size.
- Type scale anchor: `clamp(2.75rem, 5vw + 1rem, 5.25rem)`.

## Spacing

Named 4-point-derived scale from `--space-3xs` through `--space-4xl`. Pages use the names from
`tokens.css`; they do not introduce one-off spacing values.

## Motion

- Easings: `--ease-out`, `--ease-in`, and `--ease-in-out` from `tokens.css`.
- Only three motion ideas: press feedback, visible state change, dialog open/close.
- No page reveals and no resting loops.
- Reduced motion: spatial motion removed, feedback retained at ≤ 150 ms.

## Microinteractions stance

- Success is silent when the result is already visible.
- Form feedback appears on blur, then updates while editing.
- Focus is immediate and always visible.
- Every touch target is at least 44 × 44 CSS pixels.

## CTA voice

- Primary: solid orchid, rounded control shape, specific verb.
- Secondary: tonal plum or hairline outline, same height as primary.
- Labels stay on one line and describe the action they perform.

## Per-page allowances

- The home page may show one live, contained sample.
- The showroom contains all live components and foundation specimens.
- The comparison page must show the same task and copy in both systems.
- The public pages do not show commands, source links, formats, package names, or machine terms.

## What pages MUST share

- The Purple Rain wordmark.
- The exact light and dark palette.
- Relay Sans, with Geist Mono restricted to the wordmark.
- Button shape, 44 px control height, focus treatment, and press response.
- Hairline catalogue divisions and left-biased headings.
- The visible “What are you looking for?” finder.
- The one-line footer.

## What pages MAY differ on

- Which live specimen carries the first interaction.
- Grid collapse according to the content on that page.
- The amount of explanatory copy, while keeping labels plain.

## Exports

These are records for the delivery system. They are not shown on the public site.

### tokens.css

```css
:root {
  --color-paper: oklch(0.972 0.011 313);
  --color-paper-2: oklch(0.955 0.015 313);
  --color-paper-3: oklch(0.925 0.024 310);
  --color-ink: oklch(0.2 0.03 308);
  --color-muted: oklch(0.46 0.032 313);
  --color-neutral: oklch(0.55 0.03 314);
  --color-rule: oklch(0.83 0.022 311);
  --color-accent: oklch(0.5 0.17 305);
  --color-accent-ink: oklch(0.985 0.008 313);
  --color-focus: oklch(0.5 0.17 305);
  --color-error: oklch(0.57 0.18 7);
  --color-success: oklch(0.52 0.09 160);

  --font-display: "Relay Sans", ui-sans-serif, sans-serif;
  --font-body: "Relay Sans", ui-sans-serif, sans-serif;
  --font-outlier: var(--font-geist-mono), ui-monospace, monospace;

  --space-3xs: 0.125rem;
  --space-2xs: 0.25rem;
  --space-xs: 0.5rem;
  --space-sm: 0.75rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2.5rem;
  --space-2xl: 4rem;
  --space-3xl: 6rem;
  --space-4xl: 9rem;

  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-md: 1.25rem;
  --text-lg: 1.5625rem;
  --text-xl: 1.953rem;
  --text-2xl: 2.441rem;
  --text-3xl: 3.052rem;
  --text-display: clamp(2.75rem, 5vw + 1rem, 5.25rem);

  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in: cubic-bezier(0.7, 0, 0.84, 0);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --dur-micro: 120ms;
  --dur-short: 180ms;
  --dur-long: 300ms;
  --rule-hair: 1px;
  --radius-input: 0.875rem;
  --radius-card: 1.25rem;
  --radius-pill: 999px;
}
```

The complete source of truth, including exact dark values and shadows, remains `tokens.css`.

### Tailwind v4 `@theme`

```css
@theme {
  --color-paper: oklch(0.972 0.011 313);
  --color-paper-2: oklch(0.955 0.015 313);
  --color-paper-3: oklch(0.925 0.024 310);
  --color-ink: oklch(0.2 0.03 308);
  --color-muted: oklch(0.46 0.032 313);
  --color-rule: oklch(0.83 0.022 311);
  --color-accent: oklch(0.5 0.17 305);
  --color-focus: oklch(0.5 0.17 305);
  --font-display: "Relay Sans", ui-sans-serif, sans-serif;
  --font-body: "Relay Sans", ui-sans-serif, sans-serif;
  --font-outlier: var(--font-geist-mono), ui-monospace, monospace;
  --spacing-xs: 0.5rem;
  --spacing-sm: 0.75rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2.5rem;
  --text-sm: 0.875rem;
  --text-md: 1.25rem;
  --text-xl: 1.953rem;
  --radius-input: 0.875rem;
  --radius-card: 1.25rem;
  --radius-pill: 999px;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in: cubic-bezier(0.7, 0, 0.84, 0);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
}
```

### DTCG `tokens.json`

```json
{
  "$schema": "https://design-tokens.github.io/community-group/format/",
  "color": {
    "paper": { "$value": "oklch(0.972 0.011 313)", "$type": "color" },
    "paper-2": { "$value": "oklch(0.955 0.015 313)", "$type": "color" },
    "paper-3": { "$value": "oklch(0.925 0.024 310)", "$type": "color" },
    "ink": { "$value": "oklch(0.2 0.03 308)", "$type": "color" },
    "muted": { "$value": "oklch(0.46 0.032 313)", "$type": "color" },
    "rule": { "$value": "oklch(0.83 0.022 311)", "$type": "color" },
    "accent": { "$value": "oklch(0.5 0.17 305)", "$type": "color" },
    "focus": { "$value": "oklch(0.5 0.17 305)", "$type": "color" },
    "error": { "$value": "oklch(0.57 0.18 7)", "$type": "color" },
    "success": { "$value": "oklch(0.52 0.09 160)", "$type": "color" }
  },
  "font": {
    "display": { "$value": "Relay Sans, ui-sans-serif, sans-serif", "$type": "fontFamily" },
    "body": { "$value": "Relay Sans, ui-sans-serif, sans-serif", "$type": "fontFamily" },
    "outlier": { "$value": "Geist Mono, ui-monospace, monospace", "$type": "fontFamily" }
  },
  "space": {
    "xs": { "$value": "0.5rem", "$type": "dimension" },
    "sm": { "$value": "0.75rem", "$type": "dimension" },
    "md": { "$value": "1rem", "$type": "dimension" },
    "lg": { "$value": "1.5rem", "$type": "dimension" },
    "xl": { "$value": "2.5rem", "$type": "dimension" }
  },
  "duration": {
    "micro": { "$value": "120ms", "$type": "duration" },
    "short": { "$value": "180ms", "$type": "duration" },
    "long": { "$value": "300ms", "$type": "duration" }
  }
}
```

### shadcn/ui CSS variables

```css
:root {
  --background: oklch(0.972 0.011 313);
  --foreground: oklch(0.2 0.03 308);
  --card: oklch(0.992 0.006 313);
  --card-foreground: oklch(0.2 0.03 308);
  --popover: oklch(0.992 0.006 313);
  --popover-foreground: oklch(0.2 0.03 308);
  --primary: oklch(0.5 0.17 305);
  --primary-foreground: oklch(0.985 0.008 313);
  --secondary: oklch(0.925 0.024 310);
  --secondary-foreground: oklch(0.25 0.035 308);
  --muted: oklch(0.94 0.018 313);
  --muted-foreground: oklch(0.46 0.032 313);
  --accent: oklch(0.91 0.045 305);
  --accent-foreground: oklch(0.25 0.04 308);
  --destructive: oklch(0.57 0.18 7);
  --destructive-foreground: oklch(0.985 0.008 313);
  --border: oklch(0.83 0.022 311);
  --input: oklch(0.86 0.02 311);
  --ring: oklch(0.5 0.17 305);
  --radius: 0.875rem;
}

.dark {
  --background: oklch(0.1513 0.0205 309.47);
  --foreground: oklch(0.9583 0.0118 313.22);
  --card: oklch(0.2068 0.029 306.88);
  --card-foreground: oklch(0.9583 0.0118 313.22);
  --popover: oklch(0.2136 0.0328 306.72);
  --popover-foreground: oklch(0.9583 0.0118 313.22);
  --primary: oklch(0.7756 0.1104 304.73);
  --primary-foreground: oklch(0.2225 0.0446 308.27);
  --secondary: oklch(0.2434 0.0379 307.89);
  --secondary-foreground: oklch(0.9583 0.0118 313.22);
  --muted: oklch(0.2136 0.0328 306.72);
  --muted-foreground: oklch(0.7149 0.0278 316.1);
  --accent: oklch(0.2434 0.0379 307.89);
  --accent-foreground: oklch(0.9583 0.0118 313.22);
  --destructive: oklch(0.7497 0.1244 7.15);
  --destructive-foreground: oklch(0.1706 0.0218 307.03);
  --border: oklch(0.2694 0.0317 309.88);
  --input: oklch(0.2694 0.0317 309.88);
  --ring: oklch(0.7756 0.1104 304.73);
}
```

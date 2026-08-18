# Animation Studio Kit intake

## Authority

- Portable handoff supplied by Scott on 2026-08-06.
- Canonical product source inspected read-only at `/Users/scott/ScottAI/01_Active_Projects/animation`.
- Inspected source commit: `f5e9efc19859b82f64d03ea97dee81ec06f5d7ed`.
- Live product checked at `https://animation.scottelling.com/` on desktop and a 390 × 844 phone viewport.
- The current CUE workbench at the product root is authoritative. The older `/operations` surface is not a design source for this kit.

## Preserved identity

- The canvas is the hero. Storyboard, inspector, toolbar, and timeline support the work instead of competing with it.
- The current object and next action remain obvious.
- Dense geometry is kept compact without shrinking effective phone controls below 44 pixels.
- Purple is reserved for selection, focus, progress, and the primary decision.
- Information, warning, success, and danger keep distinct semantic roles.
- Outfit owns product and interface text. JetBrains Mono owns timing and metadata. Durable system fallbacks ship without adding a font package.
- Panels are solid work surfaces. One region owns scrolling in each part of the workspace.
- Motion is named by purpose: explanation, focus, continuity, feedback, or delight.
- Canonical easing and timing remain available: linear; ease out `0.23, 1, 0.32, 1`; ease in/out `0.77, 0, 0.175, 1`; drawer `0.32, 0.72, 0, 1`; Rise and directional entrances at 420ms; Pop at 360ms; Fade at 280ms; Exit at 300ms.

## Exact source foundation

- Background: `#0c0c11`
- Rail: `#101017`
- Panel: `#16161f`
- Strong panel: `#1f1f2c`
- Primary text: `#ececf2`
- Decision purple: `#bb86fc`
- Information blue: `#82b1ff`
- Warning yellow: `#ffd740`
- Success green: `#69f0ae`
- Danger red: `#ff6b6b`
- Spacing steps: 2, 4, 6, 8, 10, 12, 14, 16, 18, and 22 pixels.
- Tight shape: 6–7 pixels. Controls: 8–11 pixels. Groups: 12 pixels. Panels: 10–16 pixels. Media: 14–18 pixels. Pills: fully round.
- Desktop workbench: 58-pixel header; 244 / flexible canvas / 304-pixel main columns; 48-pixel transport with a 154-pixel timeline.
- Responsive authority: narrower columns below 1120 pixels; Story, Preview, Code, and Inspect workspaces below 920 pixels; stacked delivery and compact timeline below 620 pixels.

The installable registry translates these roles to OKLCH. It does not create a second color direction.

## Corrected before distribution

- The live source still has several effective phone controls below 44 pixels. Kit raises every reusable control to at least 44 pixels.
- The source references a small shadow variable that is not defined. Kit supplies the restrained existing panel-depth recipe as the missing small depth.
- Font loading is embedded inside the product component. Kit centralizes font roles and ships fallbacks without a new package.
- Reusable interface pieces are coupled to project data, AI commands, persistence, and rendering. Kit separates the interface from all product services.
- Source effects that depend on light blooms or translucent masking do not travel. Solid focus, selection, and current-object treatments replace them.
- The source uses legacy hex and RGB values. Registry roles are semantic OKLCH.
- The large CUE studio file and its `@ts-nocheck` boundary do not travel. Native kit pieces are typed, composable, and independently installable.

## Complete kit boundary

Animation Studio owns all 142 everyday production pieces plus 28 studio-native pieces. The universal registry also makes the nine OS specialist patterns available in Animation styling, bringing the public system to 179 individually installable pieces without forcing any specialist layout into a project:

1. Studio Shell
2. Studio Header
3. Workspace Switcher
4. Project Switcher
5. Storyboard Rail
6. Scene List Item
7. Stage Viewport
8. Device Frame
9. Preview Toolbar
10. AI Director
11. Command Suggestions
12. Inspector Panel
13. Layer List
14. Style Inspector
15. Motion Inspector
16. Motion Preset Picker
17. Transport
18. Motion Timeline
19. Timeline Segment
20. Playhead
21. Delivery Workspace
22. Delivery Action
23. Render Status
24. Motion Check
25. Code Panel
26. Template Gallery
27. Guided Tour
28. Workspace Error Boundary

The counted total proves complete shared coverage plus the creative-workspace structures. It does not mean every everyday component needs a unique Animation-only implementation.

## Explicit exclusions

- CUE project data, persistence, AI parsing, render services, and Remotion adapters remain owned by the Animation product.
- The legacy Operations design system does not travel.
- Authored-media treatments are content, not application chrome.
- No light theme is invented. The public showroom and contract state that Animation Studio is a dark-authority system. The registry intentionally repeats that source foundation for default and dark installation contexts so automatic token delivery remains reliable.
- Animation Studio is not a Theme Workshop source until an approved second color mode exists or the Workshop gains an explicit single-mode editing contract.

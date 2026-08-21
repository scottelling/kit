# Calm Desktop App UI/UX Kit

Use this file as binding design and interaction authority for the project.

The product brief decides **what the product does**. This kit decides **how the product looks, feels, and behaves**. Adapt every noun, field, command, and workflow to the product's real domain. Do not import assumptions, data structures, content, or features from another product merely because they appear in an example.

The finished result should feel like a small, premium native desktop application: calm, dense, fast, editable, keyboard-friendly, and immediately understandable.

---

## 1. First actions

Before changing files:

1. Open the exact project root.
2. Read its agent instructions, product brief, current design system, package manifest, deployment notes, and existing application code.
3. Preserve the established framework, package manager, styling system, component library, and architecture unless they genuinely prevent the requested result.
4. Identify the product's primary object, primary navigation structure, primary work surface, and contextual tools.
5. Write one short implementation receipt covering the audience, core job, required surfaces, source of truth, constraints, and proof of completion.

Do not begin by installing a new framework or generating a competing application structure.

---

## 2. Experience thesis

Build a restrained desktop operating interface inspired by the interaction density and panel behavior of modern AI desktop applications, without copying trademarks, logos, branded language, or proprietary assets.

The interface should be:

- quiet enough to use for hours;
- dense enough that navigation feels immediate;
- flat and structural rather than card-heavy;
- editable in place rather than form-driven;
- clear about the currently selected object;
- honest about loading, saving, failure, permissions, and capability;
- equally usable with a mouse or keyboard.

The application is not a typical SaaS dashboard. Avoid decorative metrics, giant cards, bento grids, oversized marketing headings, gradients, glass effects, ambient blobs, strong shadows, and colorful widgets.

---

## 3. Structural signature

Use a three-area desktop shell when the product has navigation, a primary work object, and contextual utilities:

```text
┌────────────────────┬──────────────────────────────────┬──────────────────────┐
│ Navigation         │ Primary workspace                │ Context / utilities  │
│                    │                                  │                      │
│ Browse, search,    │ The selected object remains      │ Inspector, activity, │
│ filter, create,    │ the stable center of attention.  │ research, preview,   │
│ organize           │                                  │ or supporting tools  │
└────────────────────┴──────────────────────────────────┴──────────────────────┘
                         Persistent command surface
```

Recommended desktop widths:

| Area | Default | Allowed range | Behavior |
|---|---:|---:|---|
| Left navigation | 280px | 232–420px | Resizable and collapsible |
| Main workspace | Fluid | — | Centers readable content |
| Right utility panel | 380px | 300–520px | Resizable and collapsible |
| Main content column | 800–900px | Shrinks with available space | Never stretches prose edge to edge |

Rules:

- Use subtle 1px draggable dividers with a wider invisible hit target.
- Save panel widths and collapse state when the product has persistence.
- Keep exactly one scroll owner per pane.
- Apply `min-width: 0`, `min-height: 0`, and explicit overflow rules to every grid/flex pane. Long navigation content must never inflate the full page height.
- Reopening either panel must be immediate and obvious.
- The selected central object remains stable while the side panels provide changing context.

If the product does not need three areas, preserve the same visual language in a two-pane or single-pane shell. Do not create an empty panel merely to match the diagram.

---

## 4. Visual system

### 4.1 Color roles

Start with these dark-mode roles. Adjust only when the product already has an established accessible brand system.

```css
:root {
  color-scheme: dark;

  --app: #101011;
  --sidebar: #0c0c0d;
  --panel: #141415;
  --surface: #19191a;
  --surface-raised: #202022;
  --hover: #1d1d1f;
  --selected: #29292c;

  --border: #29292b;
  --border-soft: #202022;

  --text: #eeece9;
  --text-secondary: #b4b1ad;
  --text-muted: #777571;

  --accent: #9ea8ff;
  --accent-surface: #272a3f;
  --danger: #ff9797;

  --radius: 10px;
  --radius-small: 7px;
  --focus-ring: 0 0 0 2px #101011, 0 0 0 4px #9ea8ff;
}
```

Color rules:

- Warm off-white is more comfortable than pure white.
- Muted text must remain readable; do not use gray so dark that labels disappear.
- Spend the accent on selection, focus, progress, drag targets, links, and the primary decision.
- Do not flood navigation, backgrounds, or large cards with the accent.
- Danger color is reserved for destructive actions and errors.
- Borders communicate structure or state. They are not decoration.
- Shadows appear only on transient floating layers such as menus, command surfaces, and modals.

### 4.2 Typography

Use a system-first sans-serif stack:

```css
font-family:
  Inter,
  ui-sans-serif,
  -apple-system,
  BlinkMacSystemFont,
  "SF Pro Text",
  "Segoe UI",
  sans-serif;
```

Recommended scale:

| Use | Size | Weight | Notes |
|---|---:|---:|---|
| Primary object title | 27–38px | 700–740 | Tight tracking, restrained line height |
| Section heading | 14–16px | 620–700 | No oversized card titles |
| Navigation row | 12–13px | 450–620 | Compact but readable |
| Body/editor | 13–15px | 400–500 | Line height around 1.55–1.7 |
| Control | 11–13px | 500–650 | Clear action names |
| Eyebrow/metadata | 9–11px | 650–760 | Muted; uppercase only for short labels |

Do not create hierarchy by making everything large. Use weight, spacing, alignment, and color first.

### 4.3 Spacing and shape

Use a shared 4px-based spacing rhythm:

```text
4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64
```

Shape rules:

- Standard row radius: 7–8px.
- Input and compact-control radius: 7–9px.
- Menu and popover radius: 10px.
- Floating command surface radius: 14–16px.
- Avoid fully rounded pills except tags, filter chips, or tiny state indicators.
- Do not place every section inside a rounded container.

---

## 5. Navigation system

The navigation area should feel like a native file/chat/project navigator.

### Required structure

Use only the controls the product needs, selected from:

- compact product identity and collapse control;
- one primary `New` control;
- immediate search;
- compact filters;
- compact sort;
- grouped or hierarchical item rows;
- low-priority settings/data controls at the bottom.

### Row anatomy

A navigation row should generally contain:

```text
[small icon] [truncated label................] [quiet state] [••• on hover/focus]
```

Row specifications:

- Default height: 32–36px.
- Two-line search result: about 42px.
- Horizontal padding: 7–10px.
- Hover: subtle tonal lift.
- Selected: slightly stronger graphite surface, never a bright filled bar.
- Long text: one-line ellipsis plus a tooltip.
- Indentation communicates hierarchy.
- Optional controls appear on hover **and keyboard focus**.
- Primary actions must never be hover-only.

### Search, filters, and sort

- Search updates while typing.
- Search all fields that matter to the real product, not only the title.
- When hierarchy makes search hard to scan, flatten results and show a muted breadcrumb.
- Filters combine unless the product explicitly requires mutually exclusive modes.
- Show active filter count or chips without adding a large filter summary.
- Calculated sorting and manual ordering are separate concepts. Manual drag order matters only in a custom/manual sort mode.
- Always provide a clear way to clear search and filters.

### Context menus

- Support native-feeling right-click menus when useful.
- Expose the same menu from a visible `•••` control for touch, keyboard, and discoverability.
- Clamp menus to the viewport.
- Use grouped actions and a separator before destructive actions.
- Keep menu labels explicit: name the object and consequence when ambiguity exists.
- Inline rename should select the current name; Enter commits and Escape cancels.

---

## 6. Primary workspace

The main workspace is the product. Sidebars support it.

### Header

A restrained object header may include:

- breadcrumb or parent context;
- editable object name;
- two or three high-frequency state actions;
- compact status/priority/type controls;
- one direct source/open action;
- an overflow menu.

Do not turn the header into an enterprise detail card or a wall of badges.

### Editing model

Prefer:

- click-to-edit or always-ready understated fields;
- autosave;
- local draft state for fields that cannot be temporarily blank;
- immediate persistence for committed changes;
- subtle saved feedback only when it is truthful and useful;
- no giant global Edit/Save mode.

Editing rules:

- Typing must not move the cursor or reset the field.
- A reload immediately after an edit must not lose committed work.
- Do not trim or reject every keystroke in a way that prevents normal editing. Validate on commit when appropriate.
- Debounce expensive network writes, but flush pending state before unload and prove immediate reload safety.
- Empty optional metadata should not create visual clutter.

### Sections and content

For modular content, use quiet horizontal structure:

- subtle top divider;
- drag handle or accessible move alternative;
- collapse control;
- editable title;
- quiet type label when useful;
- overflow actions;
- content editor below.

Do not reproduce a full block-editor or Notion clone unless the product actually needs it.

---

## 7. Right utility panel

The right panel is contextual, not a duplicate of the main workspace.

Good uses include:

- inspector/context;
- activity/history;
- browser/research;
- preview;
- related objects;
- supporting tools.

Use a compact tab switcher when multiple modes are needed. Three tabs is a useful upper default before the panel becomes a second application.

Panel rules:

- Each tab has its own honest empty, loading, success, blocked, and failure states.
- Keep summaries concise; the center remains the place to edit the full object.
- If remote content can be blocked, never leave a blank iframe and imply success.
- Provide an external-open fallback.
- Treat remote content as untrusted. Do not inject scripts or unsanitized markup.
- Do not proxy private authenticated sessions unless the product has a deliberate secure architecture for it.

---

## 8. Persistent command surface

If the product benefits from global commands, AI, search, or navigation, place a compact command surface at the bottom center of the main workspace.

Collapsed state:

```text
[subtle command icon]  Ask or command…                         [⌘K]
```

Expanded state may contain:

- compact chips for the selected object, parent context, and active tool;
- the response or proposed action;
- one growing text input;
- explicit Apply/Cancel controls for broad changes;
- a short footer explaining the Enter action or operating mode.

Behavior:

- `⌘K` / `Ctrl+K` opens and focuses it.
- Escape closes it.
- Enter submits; Shift+Enter creates a line break where multiline input is allowed.
- It expands upward so it does not cover the current work.
- Toasts sit above it, never on top of it.
- Routine reversible actions may execute directly.
- Destructive, broad, paid, external, or irreversible actions require a preview.
- Model output must produce validated typed actions. It must never mutate application internals directly.
- A useful deterministic mode should remain when no AI provider is configured.

If the product does not need a command surface, omit it. Do not ship a dead chatbot-shaped decoration.

---

## 9. Interaction standards

### Drag and drop

- Show a clear insertion indicator or target surface.
- Use correct grab/grabbing cursor states.
- Lower opacity slightly while dragging; do not make the object disappear.
- Auto-expand a collapsed target only after deliberate hover.
- Cancel a pending auto-expand timer the moment the pointer leaves that target.
- Give every rendered drag instance a unique internal ID, even when the same underlying object appears in multiple lists.
- Prevent layout jumps while dragging.
- Persist successful moves immediately.
- Provide an accessible menu-based move alternative.
- Expose Undo after organizational moves.

### Undo and receipts

- Use a compact bottom toast: `[What changed] — Undo`.
- Keep Undo above the command surface.
- Undo the entire user gesture, not only the last internal reducer step.
- Do not offer fake Undo for irreversible external effects.
- Meaningful changes should leave a human-readable activity entry when the product benefits from history.

### Keyboard

Use only shortcuts that fit the product. Recommended defaults:

| Shortcut | Behavior |
|---|---|
| `⌘K` / `Ctrl+K` | Open command surface |
| `⌘P` / `Ctrl+P` | Open fuzzy object switcher |
| `⌘Shift+N` / `Ctrl+Shift+N` | Create primary object |
| `Esc` | Close the active transient surface |
| `Enter` | Commit inline edit or open selected result |
| `F2` | Rename selected navigation item when appropriate |

Do not trigger global shortcuts while a person is typing unless the shortcut intentionally applies there.

---

## 10. Controls and transient surfaces

### Icon buttons

- Visual size: about 32×32px on desktop.
- Rounded rectangle, transparent at rest.
- Subtle tonal hover and visible focus.
- Every icon button has an accessible name and tooltip.
- Use one outline-icon family consistently; 14–18px icons are the normal range.

### Inputs

- Inputs should feel recessed, not raised.
- Use borders or tonal shifts only strong enough to communicate affordance.
- Focus is immediate and visible.
- Placeholders are hints, never labels.
- Every field needs a programmatic label.

### Menus and popovers

- Dark raised surface around `#202022`.
- 1px crisp border.
- 10px radius.
- Strong shadow only because the layer is transient.
- Minimum menu row around 32px desktop; at least 44px effective touch area on touch layouts.
- Close on outside click and Escape.
- Restore focus logically.

### Empty states

- Compact, useful, and specific.
- One short heading, one sentence, and at most one obvious action.
- No cartoon illustration.
- Never use an empty state to advertise unrelated features.

---

## 11. Responsive behavior

Desktop is the primary composition, but narrow layouts must remain fully usable.

At approximately 1100px and below:

- the main workspace becomes the only grid column;
- the left and right panels become fixed overlays/drawers;
- both side panels begin closed unless restoring an intentional narrow-layout preference;
- clear reopen buttons remain at the top corners;
- resizer dividers disappear;
- the command surface remains reachable.

At approximately 600px and below:

- main content uses about 14px side padding;
- title size settles near 29px;
- secondary header actions may move into overflow;
- metadata wraps naturally;
- multi-column transient pickers become one column;
- link rows stack rather than clip;
- drag handles may be hidden only when accessible move controls remain;
- touch targets are effectively at least 44px;
- page-level horizontal overflow is zero.

Never solve mobile by shrinking desktop until it technically fits.

---

## 12. Motion

Motion explains origin, state, progress, or consequence. It is never decoration.

- Use short, interruptible transitions.
- Animate opacity and transform where practical.
- Do not animate stable chrome on every load.
- Do not use resting loops, pulsing glows, floating objects, or theatrical page entrances.
- Respect `prefers-reduced-motion`.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}
```

---

## 13. Accessibility

Accessibility is part of the interaction model, not a cleanup pass.

- All features work without a mouse.
- Focus states are visible against dark surfaces.
- Icon-only buttons have accessible names.
- Inputs have real labels; placeholders do not count.
- Tabs, menus, dialogs, trees, and listboxes use the correct roles and states.
- Context menus can be reached through a normal button.
- Drag/drop always has a menu or keyboard alternative.
- Text and muted controls retain adequate contrast.
- Menus never render off-screen.
- Escape closes only the top transient layer.
- After a modal or menu closes, focus returns to a logical control.

Test accessibility through real interaction. A scripted DOM `.click()` is not proof that a person can reach or activate the control.

---

## 14. Architecture rules

Keep these concerns separate:

```text
domain/        real objects, validation, and state transitions
store/         state ownership and persistence
commands/      typed read and mutation registry
components/    surface UI only
platform/      undo, activity, drag, overlays, keyboard, import/export
api/           server-only trust boundaries and provider credentials
```

Adapt the directories to the current codebase; preserve the separation even when names differ.

Rules:

- Stable IDs outlive display names.
- UI components do not directly edit storage.
- Mutations are command-shaped, validated, and reversible where honest.
- Read and write capabilities are separate.
- Model/provider output passes through the same validated action layer as deterministic commands.
- Persisted data is versioned and migrated on read.
- Seed/example data runs only when no user data exists.
- UI-only state does not enter durable domain storage unless restoring it is genuinely valuable.
- Credentials remain server-side.
- Remote content, imported files, and model output are untrusted inputs.
- Do not place the entire application inside one giant component or one giant store action.
- Do not introduce enterprise architecture for a small personal tool.

---

## 15. Honest capability rules

Never ship dead UI.

- A control must work, be hidden, or show a real fallback.
- Do not claim `Saved` until durable persistence succeeds.
- Do not claim `Sent`, `Published`, `Imported`, or `Automated` without provider or storage evidence.
- Do not display a blank embedded page as if it loaded.
- Do not invent URLs, records, sources, people, metrics, or activity.
- Loading, empty, blocked, failure, and success states must be distinguishable.
- Broad or destructive changes name their scope and consequence before applying.
- If a provider is missing, explain what still works.

---

## 16. Implementation order

Build in this dependency order:

1. Establish tokens, typography, viewport ownership, and the responsive shell.
2. Build navigation, selection, search, and the central primary-object view.
3. Connect real editing and persistence; prove immediate reload safety.
4. Add organization, menus, drag/drop, keyboard access, Undo, and contextual tools.
5. Add the optional command surface, provider boundary, secondary polish, and complete verification.

Do not overbuild AI, animation, or secondary panels while core navigation and editing remain unreliable.

---

## 17. Verification contract

Do not call the work complete from code inspection or a passing build alone.

### Required automated checks

Run the repository's equivalents of:

- type checking;
- focused domain/state tests;
- production build;
- end-to-end browser flows;
- dependency/security audit.

### Required rendered checks

Inspect at minimum:

| Viewport | Purpose |
|---|---|
| 1440×900 | Primary desktop balance and pane density |
| 768px wide | Tablet/narrow transition |
| 390×844 | Mobile reachability and overflow |

Also test 320, 375, and 414px widths when the product has meaningful mobile use.

Verify with real pointer and keyboard interactions:

1. Open the product and confirm meaningful content renders.
2. Create or edit the primary object.
3. Navigate, search, filter, and clear the search.
4. Perform one real pointer drag and its accessible menu alternative.
5. Reload immediately and confirm all committed state survives.

Then verify:

- no project-owned console errors;
- no framework error overlay;
- no page-level horizontal overflow;
- each pane scrolls independently;
- menus stay on-screen;
- focus remains visible;
- narrow-screen panels open and close correctly;
- command surface and Undo never cover each other;
- production serves the exact new build, not a stale alias.

Every failure found during verification becomes either a fix plus regression test or a clearly documented remaining limitation.

---

## 18. Final visual review

Ask these questions while looking at the real rendered product:

- Does it read as one coherent native-style tool rather than a collection of web cards?
- Is the selected object always obvious?
- Is the information density calm rather than cramped?
- Are the side panels useful but visually subordinate to the main work?
- Is anything louder than the decision it supports?
- Does editing feel immediate and safe?
- Do drag, menus, keyboard navigation, and responsive drawers feel deliberate?
- Can a person use it for hours without decorative noise?

If any answer is no, iterate before shipping.

---

## 19. Definition of done

This UI/UX system is successfully applied when:

- the product's existing stack and real domain remain intact;
- the application has a calm graphite interface with consistent shared tokens;
- navigation, editing, transient surfaces, and supporting panels feel like one product;
- the current object and next useful action are always clear;
- every visible control works or presents an honest fallback;
- pointer, keyboard, touch, responsive, persistence, and error states are verified;
- the release build passes and the live deployment is inspected directly.

Ship the working product, not a wireframe, static mockup, or decorative shell.

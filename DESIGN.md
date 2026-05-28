---
name: Jason Joel Pinto Portfolio
description: Editorial-console portfolio for a Berlin data analyst. Dark-by-default tinted neutrals with a single editorial cobalt accent.
colors:
  # Brand accent (the Editorial Cobalt) — paired light/dark values.
  primary-light: "oklch(0.45 0.18 256)"
  primary-dark: "oklch(0.72 0.165 256)"
  primary-foreground-light: "oklch(0.985 0.003 256)"
  primary-foreground-dark: "oklch(0.14 0.018 256)"
  ring-light: "oklch(0.55 0.17 256)"
  ring-dark: "oklch(0.65 0.16 256)"
  accent-light: "oklch(0.94 0.022 256)"
  accent-dark: "oklch(0.32 0.05 256)"
  accent-foreground-light: "oklch(0.35 0.16 256)"
  accent-foreground-dark: "oklch(0.88 0.08 256)"
  # Tinted neutrals (chroma 0.005–0.018 toward hue 256). Light theme.
  background-light: "oklch(0.995 0.002 256)"
  foreground-light: "oklch(0.16 0.012 256)"
  card-light: "oklch(1 0 0)"
  muted-light: "oklch(0.97 0.006 256)"
  muted-foreground-light: "oklch(0.52 0.018 256)"
  secondary-light: "oklch(0.955 0.008 256)"
  border-light: "oklch(0.91 0.008 256)"
  input-background-light: "oklch(0.975 0.006 256)"
  # Tinted neutrals — dark theme (the default surface).
  background-dark: "oklch(0.13 0.012 256)"
  foreground-dark: "oklch(0.965 0.006 256)"
  card-dark: "oklch(0.195 0.014 256)"
  muted-dark: "oklch(0.235 0.012 256)"
  muted-foreground-dark: "oklch(0.72 0.012 256)"
  secondary-dark: "oklch(0.255 0.014 256)"
  border-dark: "oklch(0.275 0.016 256)"
  input-background-dark: "oklch(0.19 0.013 256)"
  # Destructive (rare, used only for error states).
  destructive-light: "oklch(0.577 0.245 27.325)"
  destructive-dark: "oklch(0.55 0.18 25)"
typography:
  display:
    fontFamily: "Inter Tight, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 4rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "Inter Tight, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 4vw, 2.75rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Inter Tight, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Inter Tight, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "0"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.2em"
rounded:
  sm: "0.375rem"
  md: "0.5rem"
  lg: "0.625rem"
  xl: "0.875rem"
  full: "9999px"
spacing:
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2.5rem"
  section: "7rem"
components:
  button-primary:
    backgroundColor: "{colors.primary-dark}"
    textColor: "{colors.primary-foreground-dark}"
    rounded: "{rounded.lg}"
    padding: "0.5rem 1rem"
    height: "2.5rem"
  button-outline:
    backgroundColor: "{colors.background-dark}"
    textColor: "{colors.foreground-dark}"
    rounded: "{rounded.lg}"
    padding: "0.5rem 1rem"
    height: "2.5rem"
  button-ghost:
    backgroundColor: "{colors.background-dark}"
    textColor: "{colors.muted-foreground-dark}"
    rounded: "{rounded.lg}"
    padding: "0.5rem 1rem"
    height: "2.5rem"
  card:
    backgroundColor: "{colors.card-dark}"
    textColor: "{colors.foreground-dark}"
    rounded: "{rounded.lg}"
    padding: "1.5rem"
  input:
    backgroundColor: "{colors.input-background-dark}"
    textColor: "{colors.foreground-dark}"
    rounded: "{rounded.lg}"
    padding: "0 0.875rem"
    height: "2.75rem"
  badge-secondary:
    backgroundColor: "{colors.secondary-dark}"
    textColor: "{colors.foreground-dark}"
    rounded: "{rounded.md}"
    padding: "0.125rem 0.5rem"
  badge-outline:
    backgroundColor: "{colors.background-dark}"
    textColor: "{colors.foreground-dark}"
    rounded: "{rounded.md}"
    padding: "0.125rem 0.5rem"
  tabs-trigger-active:
    backgroundColor: "{colors.background-dark}"
    textColor: "{colors.foreground-dark}"
    rounded: "{rounded.md}"
    padding: "0.375rem 0.75rem"
---

# Design System: Jason Joel Pinto Portfolio

## 1. Overview

**Creative North Star: "The Editorial Console"**

This is a hiring-funnel portfolio designed to read as a working analyst's surface, not a marketing page. Magazine-grade typography meets terminal-native craft: oversized display headings sit next to JetBrains Mono microlabels, a real cmd+K palette opens with `⌘K`, a hero terminal block prints actual text. Every piece of visible craft is functional. The site demonstrates the kind of attention Jason brings to a brief by *being* that brief.

The system commits to a dark-by-default surface tinted toward a single hue (cobalt blue, hue 256 in OKLCH). Light theme is supported and equally considered, but the default scene is a focused analyst reading at a desk in low ambient light. Editorial Cobalt is the only accent in the entire system, used sparingly: the brand mark, primary CTAs, hover states, metric values, and the `:focus-visible` ring. When cobalt appears, it means "pay attention here." Restraint is the brand.

This system explicitly rejects: generic developer-portfolio templates (hero photo, "I love clean code", 3-up identical card grids), SaaS-cream marketing patterns (pastel pills, hero-metric template, "Trusted by" rows), ambient decorative motion (full-page WebGL shaders, glitch text, dancing icons, 3D card tilts), stiff corporate / Big-4 consulting (third-person bios, navy-and-gold, stock photography), and crypto / Web3 neon (saturated gradients on black, holographic glows).

**Key Characteristics:**

- Dark-by-default; light theme as a first-class secondary, not an afterthought.
- One accent (Editorial Cobalt) at restrained dose. Everything else is tinted neutral.
- OKLCH tokens throughout; no `#fff`, no `#000`, no untinted grays.
- Mono microlabels (JetBrains Mono, 11px, 0.2em tracking, uppercase) as the connective tissue between sections, lists, and meta.
- Flat at rest, reactive on state. Cards lift on hover with a tinted cobalt shadow; the header re-mixes its blur and tint as the page scrolls.
- Motion is cursor-driven, hover-driven, or scroll-driven. Never autonomous, never ambient.

## 2. Colors

A tightly-edited palette: one accent (Editorial Cobalt), one cool-tinted neutral scale (hue 256, chroma 0.005–0.018), one destructive role. No tertiary palette; no secondary accent. The narrowness is the point.

### Primary

- **Editorial Cobalt** (light: `oklch(0.45 0.18 256)`, dark: `oklch(0.72 0.165 256)`): The single brand accent across the system. Used for the header brand-mark chip, primary CTAs (CV download, Send message), metric values in case studies, hover states on links and cards, the `:focus-visible` ring, the "@ Company" / "@ Institution" highlight in Experience tabs, the active dot on bullet lists, and accent edges on the card-lift hover shadow. Capped at ~10% of any given surface; its rarity is the doctrine.
- **Cobalt Foreground** (light: `oklch(0.985 0.003 256)`, dark: `oklch(0.14 0.018 256)`): Text on top of Editorial Cobalt fills. Auto-paired: cool near-white on light, near-black-cobalt on dark.

### Accent (subdued cobalt tint, not a second brand color)

- **Cobalt Wash** (light: `oklch(0.94 0.022 256)`, dark: `oklch(0.32 0.05 256)`): A heavily diluted cobalt used for subtle hover backgrounds, the active state on menu items, and the cmd+K command-highlight row. Reads as "cobalt's whisper" rather than a second accent.

### Neutral (cool-tinted, hue 256, dark-theme defaults shown; light values in frontmatter)

- **Stage** (`oklch(0.13 0.012 256)`): The body background. Deep near-black with a measured cobalt tint. Never `#000`.
- **Card** (`oklch(0.195 0.014 256)`): Elevated surface for Card, Dialog, popovers, project tiles. ~0.065 lightness step above Stage; depth via tone, not shadow.
- **Muted** (`oklch(0.235 0.012 256)`): Section backgrounds (Skills, Experience), input fills, tab-list backgrounds. The "I'm a region, not an element" surface.
- **Border** (`oklch(0.275 0.016 256)`): All hairline strokes, list dividers, card outlines. Single pixel, no exceptions.
- **Foreground** (`oklch(0.965 0.006 256)`): Primary text on Stage and Card.
- **Muted Foreground** (`oklch(0.72 0.012 256)`): Secondary text — section ledes, body paragraphs, supporting copy. WCAG AA against Stage.

### Destructive

- **Alert Red** (light: `oklch(0.577 0.245 27.325)`, dark: `oklch(0.55 0.18 25)`): Error-only. Form validation errors, destructive-confirm buttons. Should appear vanishingly rarely; if it appears on a marketing surface, the surface is wrong.

### Named Rules

**The One Cobalt Rule.** Editorial Cobalt appears on no more than ~10% of any given screen. There is no secondary accent, ever. If a new surface wants a second color, it is wrong. Add hierarchy through type weight, size, or border before reaching for a new hue.

**The Tinted Neutral Rule.** Every neutral carries chroma 0.005–0.018 toward hue 256. Pure `#fff`, pure `#000`, and untinted grays (oklch chroma 0) are forbidden anywhere in the system, including SVG icons, focus rings, and inline styles. Tools that auto-generate flat grays must be patched at the token before they ship.

**The Dark-Default Rule.** Dark is the explicit default. The pre-paint inline script in `BaseLayout.astro` adds the `.dark` class unless `localStorage.theme === 'light'`. Light theme exists and works, but the canonical screenshot, the OG image, and the design intent are dark. New surfaces should be designed dark-first.

## 3. Typography

**Display Font:** Inter Tight (with system-ui, sans-serif fallback)
**Body Font:** Inter Tight (single-family system, weight contrast carries hierarchy)
**Label/Mono Font:** JetBrains Mono (with ui-monospace, SFMono-Regular fallback)

**Character:** A single-family display + body in Inter Tight does the heavy lifting. The character is contemporary-editorial, slightly condensed at display sizes, comfortable at body. JetBrains Mono handles every label, number, prompt, and meta marker, providing the only visual contrast the system needs.

### Hierarchy

- **Display** (600, `clamp(2.5rem, 6vw, 4rem)`, line-height 1.05, letter-spacing -0.015em): Hero name, project detail page H1. Appears at most once per page.
- **Headline** (600, `clamp(1.875rem, 4vw, 2.75rem)`, line-height 1.08, letter-spacing -0.015em): Section titles (`<SectionHead title>`). One per section; numbered with mono microlabel beside.
- **Title** (600, 1.25rem, line-height 1.15, letter-spacing -0.01em): Project titles, job titles in Experience tabs, card titles. Often paired with a "@ Company" cobalt-highlighted suffix.
- **Body** (400, 1rem, line-height 1.75, letter-spacing 0): Section ledes, About paragraphs, project summaries. Capped at 65–75ch via `max-w-[62ch]` to `max-w-prose` containers.
- **Label** (500, 0.6875rem / 11px, letter-spacing 0.2em, uppercase, JetBrains Mono): Section numbers (`01 / about`), microlabels above cards, contact-row keys, footer meta, year/role tags above project titles, metric labels.

### Named Rules

**The Mono-Label Rule.** Every meta marker — section number, project year, metric label, contact row key, tabs trigger affordance, "01", "TOOLKIT", "FEATURED" — is JetBrains Mono uppercase at 10–11px with 0.18–0.22em tracking. Body copy and titles are never mono. The font switch *is* the hierarchy signal.

**The Negative-Tracking Rule.** All Inter Tight headings (Display, Headline, Title) carry `letter-spacing: -0.015em` (or -0.01em at Title). This is what makes Inter Tight read editorial rather than utilitarian at large sizes. Do not zero this out.

**The Line-Length Cap.** Body paragraphs are constrained to 62–75ch via `max-w-[62ch]`, `max-w-[58ch]` (lede), or `max-w-prose`. Never run a paragraph the full width of a section. If you find yourself disabling the cap, the section's layout is wrong.

## 4. Elevation

Flat-by-default with reactive lift. Surfaces rest flat; depth is conveyed through tonal layering (Stage → Muted → Card, ~0.065 lightness steps in dark mode) and hairline borders. Shadow only appears as a response to state.

### Shadow Vocabulary

- **`shadow-sm`** (`0 1px 2px 0 rgba(0,0,0,0.05)`, Tailwind default): On Cards at rest. Just enough to seat the card on its background.
- **Card-Lift Shadow** (`0 10px 28px -14px color-mix(in oklab, var(--primary) 22%, transparent), 0 2px 6px -2px color-mix(in oklab, var(--foreground) 8%, transparent)`): On `.card-lift:hover`. The diffuse glow is tinted with Editorial Cobalt at 22% opacity. The shadow itself carries brand information.
- **Liquid-Glass Shadow** (parametric, scroll-driven): Header. Re-mixes inset specular highlight + drop shadow as `--glass-amount` ticks from 0 to 1 across the first 160px of scroll.

### Named Rules

**The Reactive Lift Rule.** Surfaces are flat at rest. Shadows appear only as a response to state: hover (card-lift), scroll (header liquid-glass), focus (focus-visible ring). A constant ambient shadow on a static card is forbidden — it dilutes the cobalt-tinted hover shadow that signals interactivity.

**The Tonal-Depth Rule.** Three layers, three lightness values: Stage (0.13) → Muted (0.235) → Card (0.195). Yes, Card is lighter than Muted; the Muted "section band" sits between Stage sections and the Card islands above it, so the eye reads Muted as a recessed track and Card as a raised tile without a single drop shadow.

## 5. Components

The system is built on shadcn-style primitives (`src/components/ui/`) with two distinctive custom components: the indexed project list and the liquid-glass header.

### Buttons

- **Shape:** Modestly rounded (10px / `--radius` / `rounded-lg`). Default size 40px tall, sm 36px, lg 44px.
- **Primary:** `bg-primary` (Editorial Cobalt) + `text-primary-foreground`. Hover collapses to `opacity-90`; no color shift. The size of the button is what changes weight, not its color.
- **Outline:** `bg-background` + hairline `border-border` + `hover:bg-muted`. Default treatment for secondary CTAs (GitHub, Dashboard).
- **Ghost:** Transparent fill, muted-foreground text, `hover:bg-muted hover:text-foreground`. For tertiary in-card actions ("Case study →").
- **Focus:** 2px `ring-ring` (cobalt) with 2px offset. Always visible on keyboard navigation; never removed.
- **Icon slot:** Lucide icons sized via `[&_svg]:size-4` (16px) inside the button class. Always paired with a label except in icon-only size.

### Cards

- **Corner Style:** `rounded-lg` (10px).
- **Background:** `bg-card` (one step above Stage).
- **Border:** 1px `border-border` (cobalt-tinted hairline).
- **Shadow:** `shadow-sm` at rest. `.card-lift:hover` raises 2px translateY and applies the Card-Lift Shadow described in §4.
- **Internal Padding:** `p-6` (24px) on Header, Content, Footer; `pt-0` on Content/Footer when they sit under a Header to avoid double-padding.
- **Composition:** Header (gap-1.5, p-6) → Title (text-lg, 600, tracking-tight) → Content → Footer. Never nest a Card inside another Card.

### Badges

- **Shape:** `rounded-md` (8px), `px-2 py-0.5`, 12px text.
- **Default:** Cobalt fill. Reserve for the rare "this is the brand color of the badge" case (e.g. live status).
- **Secondary:** `bg-secondary` (subtle muted fill). Default for tech-stack chips inside project tiles.
- **Outline:** `bg-background` + hairline border. For "+N" overflow indicators.

### Inputs / Textareas

- **Shape:** `rounded-lg` (10px).
- **Height:** Inputs 44px (slightly taller than buttons; touch-target friendly). Textarea min-height 120–180px.
- **Background:** `bg-[var(--input-background)]` — a tone lighter than Muted, so inputs read as recessed wells.
- **Border:** 1px `border-border` at rest.
- **Focus:** 2px `ring-ring` (cobalt) + `border-primary/40`. No box-shadow glow.
- **Labels:** Mono microlabel above (11px, 0.18em tracking, uppercase muted-foreground). Never inline-placeholder-as-label.

### Tabs (Radix)

- **List:** `bg-muted` pill (10px radius), 4px internal padding, holds triggers.
- **Trigger (inactive):** Mono-adjacent feel, muted-foreground text, 6px-radius slot.
- **Trigger (active):** `bg-background` + `text-foreground` + `shadow-sm`. The active tab visually "lifts out" of the muted pill.
- **Used for:** Experience / Education toggle. Centered above content.

### Navigation (Header)

- **Style:** Fixed-top, full-width, `liquid-glass` surface. Translucent + blurred only when scrolled; transparent at the top of the page.
- **Brand:** Cobalt initials chip (`bg-primary`, 32px, `rounded-md`) + full name in 14px 600 tracking-tight.
- **Links:** 14px 500, muted-foreground, hover to foreground. No underline, no pill background, no active state on the home page (the indicator is scroll position).
- **Actions:** CommandPalette icon button → ThemeToggle → CV download Button → Mobile sheet trigger.

### Indexed Project List (signature component)

The home page's Projects section uses a custom indexed list (`src/components/sections/ProjectIndex.tsx`) instead of a card grid.

- **Row:** Three-column grid (mono index, title block, year + arrow), `py-7 sm:py-9`, hairline bottom border.
- **Index:** Mono 11px uppercase 0.2em tracking, muted-foreground, zero-padded (01, 02, 03).
- **Title:** Title typography (2xl→3xl). On hover, the entire row shifts 6px right with an `ease-out-expo` curve; sibling rows dim to 40% opacity.
- **Tech line:** Below title, 12px muted-foreground, separated by middot glyphs. Caps at 5 items + "+N" overflow.
- **Cursor preview:** A fixed 320×200 thumbnail tracks the cursor on fine-pointer devices, lerping at 0.22 toward the target position via rAF. Hidden on coarse pointers and `prefers-reduced-motion`.

### Terminal Block (signature component)

A static-but-real terminal in the hero. Mono prompt, sequential output reveal on mount, no looping animation. Demonstrates competence by being a real working surface, not a decorative motif.

## 6. Do's and Don'ts

### Do:

- **Do** keep Editorial Cobalt at ≤10% of any given screen. Every additional cobalt element should remove an existing one.
- **Do** use JetBrains Mono uppercase 0.2em-tracked microlabels above every section, list group, and meta row. The font switch *is* the hierarchy signal.
- **Do** tint every neutral toward hue 256 with chroma 0.005–0.018. Cool-cobalt-tinted, not warm-gray.
- **Do** design dark-first. The default scene is a focused reader at a desk in low ambient light. Validate light theme as a second pass, but never let the light treatment lead.
- **Do** keep surfaces flat at rest and lift them on state. Card-lift hover uses a cobalt-tinted shadow; that tinted lift carries information.
- **Do** use OKLCH for every color token. Reduce chroma as lightness approaches 0 or 100.
- **Do** cap body paragraphs at 62–75ch via the existing `max-w-` utilities. Wide-running prose is broken layout.
- **Do** honor `prefers-reduced-motion` in every motion island via `useReducedMotion()`. The global CSS rule in `globals.css` is a backstop, not the primary mechanism.
- **Do** use `transform` and `opacity` for animation. Both are GPU-accelerated and don't trigger layout.
- **Do** ease out with `--ease-out-quart`, `--ease-out-quint`, or `--ease-out-expo`. Match the existing curves.

### Don't:

- **Don't** use `#fff` or `#000` anywhere. Including in SVG icons, focus rings, and OG image generation. Every neutral must carry hue-256 chroma.
- **Don't** add a second accent color. There is one cobalt. If a new surface wants two accents, it is wrong; rework the hierarchy with weight and size instead.
- **Don't** ship generic developer-portfolio patterns: hero photo over a gradient, "Hi, I'm Jason" lede, same-shape project cards in a 3-up grid, skills bar chart. If a hiring manager has seen the layout twice this week, the design has failed.
- **Don't** ship SaaS-cream marketing patterns: pastel pills, "Trusted by" logo row, hero-metric template, gradient accent on every CTA.
- **Don't** add ambient decorative motion: no full-page WebGL noise shaders, no glitch text scramble, no dancing skill icons, no 3D card tilts, no bobbing orbs, no cursor companions. Visible motion is cursor-driven, hover-driven, or scroll-driven, never autonomous.
- **Don't** use side-stripe borders (`border-left` or `border-right` greater than 1px as a colored accent). Use full hairline borders, background tints, leading numbers, or nothing.
- **Don't** use gradient text (`background-clip: text` over a gradient). Emphasis via weight or size; cobalt as a solid color, not as a smear.
- **Don't** use glassmorphism decoratively. The liquid-glass header is the one purposeful use; new glass surfaces need a real reason.
- **Don't** ship the hero-metric template (big number, small label, supporting stats, gradient accent). It's a SaaS cliché. The Skills stats row is the only place this pattern lives, and it is deliberately mono-restrained.
- **Don't** nest a Card inside a Card. If a layout needs visual grouping inside a card, use a hairline divider or a muted-background section, not a second card.
- **Don't** reach for a Modal as the first thought. Exhaust inline expansion, slide-in panels, and full-page navigation first. The only Modals in this system are the cmd+K palette and the mobile sheet, both Radix Dialog primitives with `scrollbar-gutter: stable` to prevent shift.
- **Don't** animate `width`, `height`, `top`, `left`, `box-shadow` values, or `backdrop-filter` strength outside the existing liquid-glass surface. Animate `transform` and `opacity` only.
- **Don't** add Layout / Motion / Responsive sections to this file. Six sections, in this order, character-for-character. Fold cross-cutting concerns into Overview or Components.
- **Don't** use em dashes (—) in prose copy, content YAML, or page titles. Use commas, colons, semicolons, periods, or parentheses. Middot (·) is the approved separator glyph in meta rows.

# Product

## Register

brand

## Users

**Primary:** Hiring managers and recruiters at data, BI, and ML teams in Berlin and the wider EU. Skim mode. They land from LinkedIn, a CV link, or a referral, give the site 10–30 seconds to decide if Jason is worth a call, and need a fast answer to: "what does he actually ship?" and "is he within reach?" (location, work authorization, availability, English fluency).

**Secondary:** Senior data leaders, peer analysts, and engineers who join the hiring loop later, click through to projects, and read for depth. They want to see how Jason reasons about data, codebases, and tradeoffs, not just outcome bullets.

Both audiences are evaluating Jason against a stack of other candidates. The site has to win on first impression and reward the second visit.

## Product Purpose

A hiring-funnel portfolio for Jason Joel Pinto, a data analyst with three years of shipping work spanning SQL pipelines, automation, BI dashboards, and applied ML. The near-term goal is a full-time role in Berlin or the EU.

The site does four jobs, in priority order:

1. **Convert.** Make it trivial to download the CV or open an email thread.
2. **Prove.** Case studies and metrics that show specific outcomes, not capabilities lists.
3. **Imprint.** Leave a visitor who didn't act today with a clear, recognizable sense of who Jason is, so a later inbound from another channel is already warmed.
4. **Stay open.** The framing accommodates consulting or freelance inquiries without bending toward them.

Success is measured in interview invites originating from the site, not pageviews.

## Brand Personality

**Sharp. Technical. Opinionated.**

- Voice is direct and specific. Concrete nouns, real numbers, no hedging adjectives. "Drove a 40% improvement" beats "helped improve significantly."
- Tone treats the reader as a technical peer even when they're a recruiter. Doesn't dumb down; doesn't show off either.
- Confident about the work, modest about the persona. The portfolio talks about what was shipped, not how brilliant the shipper is.
- A trace of craft visible in the surface itself (terminal block, cmd+K palette, indexed project list, scroll-driven liquid glass). The site is, in part, a working sample of the kind of attention Jason brings to a brief.

## Anti-references

What this portfolio must NOT read as:

- **Generic developer-portfolio template.** Hero photo over a gradient. "Hi, I'm Jason. I love clean code." Same-shaped project cards in a 3-up grid. A skills bar chart. The reflex output of any portfolio generator or YouTube tutorial. If a hiring manager has seen the layout twice this week, the design has failed.
- **SaaS-cream marketing site.** Pastel pills, "Trusted by" logo row, hero-metric template, gradient accent on every CTA. This is a person's portfolio, not a Series-A landing page.
- **Ambient decorative motion.** Full-page WebGL noise shaders, glitch text scramble, dancing skill icons, 3D card tilts, bobbing orbs, cursor companions. Visible motion must be cursor-driven, hover-only, or scroll-driven, never autonomous.
- **Stiff corporate / Big-4 consulting feel.** Third-person bio, stock photography, formal navy-and-gold, dense paragraphs of corporate language.
- **Crypto / Web3 neon.** Saturated gradients on near-black, holographic glows, animated grid backgrounds.

## Design Principles

Strategic principles. Use them as decision filters when a visual choice is in doubt.

1. **Proof over claims.** Every assertion of skill is paired with a shipped outcome, a metric, or a named system. The CV doesn't list "Python, advanced"; it shows what Python did. If a section is making a claim without proof, the section is wrong.

2. **Skim in 10 seconds; reward at 10 minutes.** The fold answers "data analyst, Berlin, available, here's the CV." Scroll past it for case studies with real numbers. Click into a project for the full detail view. Each layer rewards a deeper visitor without punishing a shallow one.

3. **Build, don't decorate.** Visible craft has to be functional. The terminal block is real text. The cmd+K palette is a real navigation. The indexed project list has a working preview. We do not add visual flourish for its own sake; we use the surface to demonstrate competence. When a tempting decorative effect appears, ask: "does this earn its complexity?" If no, cut it.

4. **Restrained, then committed where it counts.** Tinted neutrals carry 90% of the surface; the editorial cobalt accent shows up at decision points (hover state, metrics, primary CTA, brand mark). The accent is rare on purpose so that when it appears, it means "pay attention here."

5. **Honest specificity.** Berlin, CET, English / German / Hindi, M.Sc. in progress, three years at Almasons. The site never pretends to be a global generalist brand; it commits to a real person in a real city with a real timeline. Recruiters need that signal in the first paragraph, not after a contact-form round-trip.

## Accessibility & Inclusion

WCAG 2.1 AA, applied honestly. Specifically:

- Body text and meaningful UI meet 4.5:1 contrast against their background in both light and dark themes.
- All interactive elements have a visible focus ring (`:focus-visible` outline tied to `--ring`).
- Keyboard navigation works end-to-end, including cmd+K, the project index, and the mobile sheet.
- `prefers-reduced-motion` is honored globally (animation durations collapse to 0.001ms via the existing CSS rule) and respected explicitly in motion islands via `useReducedMotion()`.
- Semantic HTML throughout: `<header>`, `<nav>`, `<section>`, `<article>`, `<dl>` for definition pairs, `<ol>` for ordered project list.
- Images carry meaningful `alt` text or `aria-hidden="true"` when decorative.
- Color is never the sole carrier of meaning (metrics use weight + size, not color, for hierarchy).

No specific known user needs to design around beyond the standard care above.

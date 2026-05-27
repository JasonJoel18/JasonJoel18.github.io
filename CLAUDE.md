# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun install          # one-time install
bun run dev          # http://localhost:4321 with HMR
bun run build        # astro check (typecheck) + astro build → ./dist
bun run preview      # preview the production build locally
bun run typecheck    # astro check on its own
```

Bun 1.x. There are no test scripts — visual + Lighthouse checks are the verification path.

## What this project is

Personal portfolio for **Jason Joel Pinto**, deployed for free to GitHub Pages at `https://JasonJoel18.github.io/`. Static-only build (no SSR), CI deploy via `.github/workflows/deploy.yml`.

## Stack & why

- **Astro 5** — static-first shell. Most components ship 0 KB JS.
- **React 19** — only used inside islands (`client:load` / `client:visible` / `client:idle`).
- **Framer Motion** — the only animation library. Lazy-loaded with each island that needs it. ~40 KB gzip — gated to islands that animate.
- **Tailwind CSS v4** with `@theme` tokens declared in `src/styles/globals.css`.
- **Content Collections** with Zod schemas in `src/content.config.ts` validate every YAML/MDX entry at build time.

## Editing site content

The site is **YAML-driven**. Component files almost never need touching to update content.

- `src/content/site/site.yaml` — SEO meta, top-nav links, hero CTAs, footer
- `src/content/profile/profile.yaml` — name, title, hero copy, avatar, location, socials, About paragraphs
- `src/content/cv/cv.yaml` — full CV data (work, education, skills, languages, certifications)
- `src/content/projects/<slug>.yaml` — one file per project

All three single-entry YAMLs are wrapped under a top-level key matching their entry id (`site:`, `profile:`, `cv:`) — required by the Astro `file()` loader. Don't unwrap them.

The CV PDF is `public/cv.pdf` — overwrite to replace; the Download buttons already point at `/cv.pdf`.

### Adding a project

Drop a `.yaml` in `src/content/projects/`. Schema in `src/content.config.ts` (`projects` collection). The `media` field is a discriminated union — type must be one of `image | video | gif | embed`. See README for examples of each.

For a project case study (full deep-dive page at `/projects/<slug>`), set `caseStudy: true` and create a matching `<slug>.mdx` file with the body content.

## Architecture

```
Routes:
  /                  → home (single-page narrative, all sections)
  /cv                → rendered CV from cv.yaml + Download PDF button
  /projects/<slug>   → only generated when a project has caseStudy: true
  /404               → custom not-found

src/
  layouts/BaseLayout.astro        — html shell, fonts, OG/SEO meta, JSON-LD Person, gradient bg
  components/
    nav/                          — Header (sticky glass), ActiveSectionNav, MobileMenu, Footer
    sections/                     — Hero, About, Experience, Projects, Skills, Education, Contact
    motion/                       — Reveal, MagneticButton, HeroIntro (the only animated islands)
    media/                        — ProjectMedia (image|video|gif|embed renderer), EmbedFrame
    ui/                           — Button, Chip, SectionHeader, SocialIcon
  styles/globals.css              — Tailwind import + @theme tokens + global rules + print + reduced-motion
  lib/                            — cn (clsx wrapper), motion-presets
  content.config.ts               — Zod schemas for all content collections
public/
  profile.png, cv.pdf, favicon.svg, og-image.svg, robots.txt, projects/*
```

## Animation rules (do not break)

The whole motion strategy assumes these constraints. Violating them will tank Lighthouse and introduce jank.

- **Animate only `transform` and `opacity`.** Never `width`, `height`, `top`, `box-shadow`, `backdrop-filter` values.
- **Glassmorphism is static.** `backdrop-blur` is set once on `.glass`, never tweened.
- **`will-change`** is only applied to elements actively animating (`will-change-transform` class) and Framer manages it automatically on `motion` components — don't add it speculatively.
- **`whileInView` reveals fire once.** Always pass `viewport={{ once: true, margin: '-15%' }}` to avoid re-running animations on scroll-back.
- **Honor reduced motion.** Use `useReducedMotion()` in any new motion island. The global CSS rule in `globals.css` is a backstop, not the primary mechanism.
- **Lazy-mount heavy media.** Project hover videos and embed iframes only attach their `src` on first interaction / IntersectionObserver hit. Don't preload them.

## Content collection gotchas

- The `file()` loader in `src/content.config.ts` expects YAML files keyed by entry id — that's why `site.yaml` starts with `site:`, `profile.yaml` with `profile:`, `cv.yaml` with `cv:`. Don't restructure them.
- The `projects` collection uses `glob()`, so each project file is its own entry, keyed by filename.
- Adding a new collection field? Update the Zod schema in `src/content.config.ts` first, then the YAML, then read it in components.

## Deployment

- Pushes to `master` trigger `.github/workflows/deploy.yml` → builds `dist/` → uploads as Pages artifact → deploys.
- One-time manual setup: GitHub repo **Settings → Pages → Source: GitHub Actions** (not "Deploy from a branch").
- `astro.config.mjs` has `site: 'https://JasonJoel18.github.io'` and no `base` — this repo is a user-site, served at the domain root.

# JasonJoel18.github.io

Personal portfolio for **Jason Joel Pinto** — Data Analyst, Berlin.
Live at **<https://JasonJoel18.github.io/>**.

Built with **Astro 5 · React 19 · Tailwind CSS v4 · Framer Motion**, deployed for free to **GitHub Pages** via GitHub Actions.

---

## Local development

```bash
bun install        # one-time
bun run dev        # starts http://localhost:4321
bun run build      # type-checks + builds to ./dist
bun run preview    # preview the production build
lsof -ti :4321 | xargs kill -9 2>/dev/null # Kill port 4321
```

Bun 1.x. (Node 20+ also works if you swap the commands back to `npm`.)

## Editing content (no code required)

All site content lives under `src/content/`. Edit the YAML, save, refresh.

| File | What it controls |
|---|---|
| `src/content/site/site.yaml` | SEO meta, top-nav links, hero CTAs, footer copy |
| `src/content/profile/profile.yaml` | Name, title, hero subtitle, avatar, location, socials, About paragraphs |
| `src/content/cv/cv.yaml` | Full CV: summary, work, education, skills, languages, certifications |
| `src/content/projects/<slug>.yaml` | One file per project — see schema below |

### Adding a project

Create `src/content/projects/my-project.yaml`:

```yaml
title: "Project name"
summary: "One-line description that ends up on the project card."
year: 2024
featured: true        # featured projects sort to the top
order: 1              # tiebreaker among featured
tech: [Python, SQL, Tableau]
media:
  type: image          # image | video | gif | embed
  src: /projects/my-project-cover.png
  alt: "Description of the visual"
links:
  github: "https://github.com/JasonJoel18/repo"
  live: null
  demo: null           # e.g. Tableau Public URL
caseStudy: false       # set true to enable /projects/<slug> page (also create my-project.mdx)
```

#### Media variants

```yaml
# Hover-play video preview (autoplays muted on hover, pauses on leave)
media:
  type: video
  src: /projects/demo.mp4
  poster: /projects/demo-poster.jpg
  alt: "Demo of the dashboard interaction"

# Embedded Tableau Public / Power BI / YouTube — full-width card
media:
  type: embed
  provider: tableau            # tableau | powerbi | iframe | youtube
  src: "https://public.tableau.com/views/.../sheet?:embed=y&:showVizHome=no"
  aspect: "16/9"               # 16/9 | 4/3 | 21/9 | 1/1
  alt: "Embedded warehouse KPI dashboard"
```

Place media assets in `public/projects/`.

### Adding a CV section item

Open `src/content/cv/cv.yaml` and add another entry under `work`, `education`, `skills`, `certifications`, etc. The `/cv` page and home page sections re-render automatically.

### Replacing the CV PDF

Drop the new file at `public/cv.pdf` (overwrite). The Download buttons point to `/cv.pdf` and don't need updating.

---

## Deploying

The repo deploys to GitHub Pages automatically on every push to `master` via `.github/workflows/deploy.yml`.

### One-time setup (must do once after switching from Jekyll)

1. Go to **Settings → Pages** on the GitHub repo.
2. Under **Build and deployment → Source**, select **GitHub Actions** (not "Deploy from a branch").
3. Push to `master`. The Action will build and deploy. Watch progress under the **Actions** tab.

After this, every push to `master` triggers a deploy.

---

## Architecture (short version)

- **Astro** for the static shell — most pages ship 0 KB JS.
- **React islands** (`client:load`, `client:visible`, `client:idle`) only on components that need interaction (Hero intro, ProjectCards, scroll reveals, sticky-nav active section, mobile menu).
- **Framer Motion** is the only animation library, lazy-loaded on islands. All animations use `transform` and `opacity` only — no width/height/blur tweens.
- **Content collections** (`src/content.config.ts`) Zod-validate every YAML at build time. A typo fails the build, not the deploy.

See `CLAUDE.md` for the full developer guide.

---

## License

Code released under MIT. Profile photo and CV content are personal — please don't reuse without permission.

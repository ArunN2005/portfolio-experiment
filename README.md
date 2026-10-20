# Arun N — Thoughtfully engineered

Live website: https://arunn2005.github.io/portfolio-experiment/

An original, responsive portfolio built around Arun's actual resume. React, TypeScript, Vite, custom CSS, locally served fonts, and a lightweight interactive canvas sculpture.

## Run

Use Node.js 24 LTS (tested with 24.19.0) and npm 11.

```sh
npm ci
npm run dev
```

In this cloud workspace, use a writable npm cache:

```sh
cd /workspace/portfolio-experiment
npm ci --cache /workspace/.npm-cache --no-audit --no-fund
npm run dev -- --port 5173 --strictPort
```

The existing checkout is already isolated. Do not create a Git worktree unless explicitly requested. No credentials, environment variables, database, or backend services are required.

## Build and validate

```sh
npm run build
npm run preview -- --port 4173 --strictPort
```

`dist/` is the production artifact. Serve it with any static web host. If hosted under a subpath, set Vite's `base` and update root-relative public asset links to match. Add the final public domain to social metadata before publishing.

Browser tests:

```sh
# On a machine without a browser installed:
npx playwright install chromium
npm test

# In this cloud environment, use the provided browser:
CHROMIUM_PATH=/usr/bin/chromium npm test
```

Tests use the production build on port 4173. Run `npm run build` after code changes before testing. Desktop and mobile Chromium coverage includes filters, dialogs and focus return, command navigation, persisted theme, migration stages, validation rules, civic scoring, resume download, email draft validation, viewport overflow, and axe WCAG AA checks. These are mobile emulation checks, not real iPhone/Safari certification.

## Interactions

- Drag or use arrow keys on the wire sculpture; cycle its three forms.
- Filter projects and open their detailed case studies.
- Press **Ctrl/Cmd+K** to search site commands.
- Expand experience entries and explore skills by purpose.
- Run the migration walkthrough, invalidate solar readings, and adjust civic prioritization.
- Toggle dark mode or motion; preferences persist locally.
- Download the original resume or copy the email address.
- Compose an email draft without sending personal data to a server.

## Edit

- `src/data.ts`: project narratives, work history, skills, and contact links.
- `src/App.tsx`: page sections, dialogs, commands, and preferences.
- `src/Lab.tsx`: explanatory project experiments and sample rules.
- `src/Sculpture.tsx`: canvas geometry and interaction.
- `src/ProjectArt.tsx`: original project illustrations.
- `src/styles.css`: colors, responsive layout, typography, and motion.
- `public/Arun-N-Resume.pdf`: the supplied original resume.

See [the resume analysis](docs/RESUME-ANALYSIS.md) for content decisions and future evidence to add, and [design research](docs/DESIGN-RESEARCH.md) for inspected sources, inspiration, and implementation boundaries.

The About section uses a custom monogram. The inline portrait in the conversation was not provided as a downloadable workspace image; no unrelated portrait has been substituted.

## Delivery boundaries

The contact form opens the visitor's email application; it is not a message delivery API. Project illustrations and playground results use explanatory sample data. Real cloud migration, civic reports, blockchain writes, and analytics are not performed. Only verified project URLs are linked. The site is deployed to GitHub Pages from the `gh-pages` branch. Source is on `main`. See [deployment instructions](docs/DEPLOYMENT.md) when publishing updates.

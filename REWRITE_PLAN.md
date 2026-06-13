# Website Rewrite Plan (May 27, 2026)

## Current State Review

- **Stack**: Static HTML/CSS/JS with jQuery-era template code and no build system.
- **Entry points**: `index.html` for profile/links and `photos.html` for gallery.
- **Assets**: Pixelarity template structure under `assets/` with Sass sources checked in but no local build tooling in repo.
- **Content model**: Content is hard-coded directly in HTML, including very long remote image URLs in `photos.html`.
- **Navigation model**: Multi-page static site (`index.html` -> `photos.html`) without SPA-like tab state.
- **Operational model**: Deployed as static files to AWS S3 + Route 53 (cheap, reliable for current scale).

## Recommended Technical Direction

### 1) Framework choice for a single-page, client-rendered site

Use **React + Vite + TypeScript** as the primary rewrite stack.

Why:
- Excellent fit for a single `index.html` app with in-page tab switching.
- Zero server requirement; output is static assets only.
- Fast local development and straightforward deployment.
- Easy long-term iteration (component model + typed data/content schemas).

Alternative options:
- **Preact + Vite** if ultra-small bundle is top priority.
- **SvelteKit (static adapter)** if you prefer less boilerplate and less React ceremony.

Recommendation: start with React+Vite now, keep architecture framework-agnostic via plain JSON/MD content files.

### 2) Hosting recommendation

Keep static hosting. Your instincts are right.

Primary recommendation:
- **Stay on AWS but add CloudFront in front of S3** for edge caching, HTTPS management, SPA rewrite behavior, and better cache headers.

Other good options:
- **Cloudflare Pages**: excellent DX + previews + global edge, low/no cost at your scale.
- **Netlify/Vercel static**: easy previews and deploy pipelines, but less alignment if you prefer AWS-native control.

### 3) Information architecture + content format

Implement a single-page app with tabs/routes:
- Home (intro + quick links)
- Resume (dynamic timeline + downloadable PDF)
- Bio (long-form “about me”)
- Photography (gallery + micro-blog blurbs)
- Contact / Links

Content strategy:
- Store all profile content in `/src/content/*.json` or `.md` files.
- For resume:
  - Keep source of truth as structured JSON (roles, dates, impact bullets, tech tags).
  - Optionally also maintain a LaTeX source in `/content/resume/resume.tex` for polished PDF export.
  - Render timeline from JSON in SPA; link to generated PDF.
- Photography:
  - `photos.json` with `title`, `location`, `date`, `camera`, `tags`, `blurb`, `src`, `thumb`.
  - Optional filters by tag/location/year.

## UX / Visual Design Plan (Nautical + Professional Dark Theme)

### Design principles
- Calm, low-contrast dark palette (slate/navy/sea-green accents).
- Motion should be subtle and slow; avoid attention theft.
- Strong readability: high contrast text layers on frosted panels.

### Ocean background implementation
Use layered animation with graceful performance fallback:
1. CSS gradient base (always on).
2. Lightweight canvas/WebGL wave shader (optional enhancement).
3. Respect `prefers-reduced-motion` to disable heavy animation.

Recommended technical approach:
- Start with **canvas 2D procedural noise waves** (low complexity).
- Upgrade later to a small Three.js shader only if desired.

### Page/tab transition concept (“wave wash”)
- Implement a short 300–500ms transition overlay:
  - Semi-transparent curved mask sweeps across content.
  - Crossfade old/new section under the mask.
- Keep easing smooth (`cubic-bezier`) and avoid large displacement motion.

## Suggested Feature Set (Phase-by-Phase)

### Phase 1 (foundation)
- SPA shell, routing/tab system, dark theme tokens, responsive layout.
- Home/Bio/Links pages.
- Data-driven resume timeline.
- Photography grid + modal + micro-blurbs.

### Phase 2 (polish)
- Ocean motion background and wave-transition effect.
- Search/filter on resume and photos.
- SEO/social metadata, OG image, sitemap.

### Phase 3 (quality of life)
- JSON schema validation for content files.
- Automated image optimization pipeline.
- Accessibility audit (focus order, keyboard nav, contrast).

## Deployment + Safety Strategy for Parallel Old/New Site

Do **not** develop directly on production root.

Recommended rollout:
1. Keep current production artifacts intact.
2. Deploy rewrite to a **preview path** first (e.g., `/new/`) or preview domain (`next.louisjarvis.com`).
3. Add SPA fallback rules only within preview scope during development.
4. When ready, swap CloudFront/S3 origin path or promote build to root.
5. Keep previous site snapshot archived in `legacy-site/` or separate release artifact for rollback.

Important note:
- URL pattern like `/index.html/new-site` is awkward for static hosting and SPA routing.
- Prefer `/new/` prefix or subdomain for cleaner routing and simpler cache rules.

## Proposed Project Structure

```
/
  legacy-site/                # optional archived old site
  src/
    app/
    components/
    pages/
    content/
      bio.md
      resume.json
      photos.json
    styles/
      tokens.css
      theme.css
      motion.css
  public/
    favicon.ico
  scripts/
    optimize-images.ts
  package.json
```

## Tooling & Process

- Package manager: `pnpm` (or npm if preferred).
- Lint/format: ESLint + Prettier.
- Type checks: TypeScript strict mode.
- CI: build + lint + typecheck on PR.
- Deploy: GitHub Actions to S3/CloudFront (or Pages provider).

## Initial Next Steps (Execution Plan)

1. Scaffold React+Vite+TS app in a new `rewrite/` directory.
2. Implement SPA tab layout and content schemas.
3. Migrate existing identity and links first.
4. Add resume timeline + photo data model.
5. Add dark nautical design system (without heavy animation first).
6. Add motion/background effects once content and accessibility are stable.
7. Publish to `/new/` or `next.` preview and iterate.


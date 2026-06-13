# Website Design Variants Spec

This document is a build asset for a future Codex `/goal` session. It expands `REWRITE_PLAN.md` into a concrete plan for generating **10 distinct website variants** under separate project directories, so each concept can be built, compared, and iterated independently before selecting a final direction.

## Relationship to `REWRITE_PLAN.md`

The variants in this spec assume the rewrite direction already captured in `REWRITE_PLAN.md`:

- Build a client-rendered, single-`index.html` personal site using React + Vite + TypeScript or an equivalent static SPA stack.
- Keep the site deployable as static assets with no application server.
- Preserve a tab/page structure for Home, Resume, Bio, Photography, and Contact/Links.
- Use structured content files for resume, bio, photos, and links.
- Explore a professional dark nautical/surfing aesthetic with subtle dynamic ocean behavior.
- Respect accessibility, readability, performance, and `prefers-reduced-motion` throughout.

## Output Expected from the Future `/goal` Session

Create a new top-level directory named `design-variants/` with one subdirectory per variant:

```text
design-variants/
  01-abyssal-glass/
  02-current-lines/
  03-surf-tab-runner/
  04-moonlit-tide/
  05-chartplotter-console/
  06-minimal-dev/
  07-photo-tidepool/
  08-ship-log/
  09-kinetic-resume-buoys/
  10-lighthouse-focus/
```

Each variant directory should be self-contained enough to run independently during exploration. Prefer a shared root package if convenient, but do not couple variant code in a way that makes deleting or rewriting one variant difficult.

Each variant should include:

```text
<variant>/
  README.md                    # design intent, run instructions, notable tradeoffs
  index.html                   # Vite entry or static preview entry
  package.json                 # if each variant is independent
  src/
    App.tsx
    main.tsx
    components/
    content/
      profile.ts
      resume.ts
      photos.ts
      links.ts
    styles/
      tokens.css
      base.css
      motion.css
  public/
    assets/                    # placeholder images, generated textures, SVGs, etc.
```

If using a monorepo-style shared setup, keep the conceptual equivalent of the above structure and document how to run each variant in `design-variants/README.md`.

## Shared Product Requirements for All Variants

Every variant must implement the same core product so visual/interaction differences can be compared fairly.

### Required tabs / pages

1. **Home**: name, short professional tagline, concise intro, primary contact CTA.
2. **Resume**: dynamic work-history timeline, impact bullets, skill tags, downloadable PDF placeholder.
3. **Bio**: longer narrative with personal/professional context.
4. **Photography**: responsive gallery with per-photo micro-blog blurb.
5. **Links**: LinkedIn, GitHub, Twitter/X, email, and optional resume download.

### Required interaction model

- Single-page navigation that updates visible content without loading a new document.
- Deep-linkable tab state via hash or client route, such as `/#resume` or `/resume` behind SPA fallback.
- Keyboard-accessible navigation and photo modal interactions.
- Reduced-motion fallback for all dynamic ocean, pointer, and transition effects.
- Responsive layouts for mobile, tablet, and desktop.

### Shared content fixtures

Use placeholder content where exact production copy is not yet available, but keep the data shape production-ready:

- `profile`: name, headline, location, short intro, portrait URL.
- `resume`: roles, employers, dates, location, bullets, technologies, featured achievements.
- `photos`: title, location, date, image URL, thumbnail URL, tags, short blurb.
- `links`: label, URL, icon key, priority.

### Accessibility / performance guardrails

- Text contrast must remain readable over animated backgrounds.
- Use dark overlays, blur panels, or solid content surfaces when needed.
- Do not make motion mandatory for navigation comprehension.
- Respect `prefers-reduced-motion` by disabling or simplifying animations.
- Keep the initial JavaScript bundle lightweight; heavy effects should be lazy-loaded or optional.
- Avoid audio, autoplay video, or effects that distract from the professional reference-site purpose.

## Shared Design Tokens

Each variant may reinterpret these tokens, but should start from a consistent semantic system:

```css
:root {
  --color-bg-deep: #03131f;
  --color-bg-surface: rgba(8, 24, 38, 0.72);
  --color-bg-surface-solid: #081826;
  --color-text-primary: #e8f4ff;
  --color-text-muted: #9fb6c7;
  --color-accent-seafoam: #62d6c8;
  --color-accent-coral: #ff8f70;
  --color-accent-gold: #f5c76b;
  --color-border-soft: rgba(226, 244, 255, 0.16);
  --shadow-panel: 0 24px 80px rgba(0, 0, 0, 0.35);
  --radius-panel: 28px;
  --motion-fast: 180ms;
  --motion-medium: 420ms;
  --motion-slow: 1200ms;
}
```

## Build Strategy for the Future `/goal` Session

The `/goal` session should proceed in this order:

1. Create shared content fixtures and a reusable navigation/page schema.
2. Scaffold all 10 directories with minimal runnable apps.
3. Implement the clean baseline layout for every variant first.
4. Add each variant's unique visual system and interaction signature.
5. Add reduced-motion fallbacks for each variant as soon as motion is introduced.
6. Add README notes per variant describing what to evaluate.
7. Run format/lint/build checks for each variant.
8. Capture screenshots or short screen recordings for comparison if the environment supports it.

## Variant 01 — Abyssal Glass

### Core concept

A polished dark portfolio floating above a slow, deep-ocean glass texture. This should feel calm, premium, and professional: a high-end technical consultant site with an oceanic atmosphere rather than a literal beach theme.

### Visual language

- Near-black navy background with subtle caustic highlights.
- Frosted-glass content cards with soft borders and restrained blur.
- Seafoam accent lines for active tabs and timeline markers.
- Rounded panels and generous whitespace.

### Dynamic ocean behavior

- Background: layered CSS gradients plus a low-opacity canvas caustic pattern drifting slowly under the content.
- Page transition: a translucent wave-shaped overlay sweeps left-to-right, briefly refracting the outgoing card before the next tab appears.
- Hover states: buttons produce a faint ripple ring that dissipates.

### Implementation notes

- Use a `CanvasCausticsBackground` component with low frame rate or requestAnimationFrame throttling.
- Keep the background below 15% contrast relative to the base color.
- Use `clip-path` or SVG mask for the wave transition.
- Add a static gradient fallback for reduced motion.

### Evaluation questions

- Does the site feel premium without feeling like a dashboard?
- Are the glass panels readable over the moving texture?
- Does the wave transition feel elegant rather than gimmicky?

## Variant 02 — Current Lines

### Core concept

A design inspired by nautical charts, current maps, bathymetry, and oceanographic linework. The site looks technical and refined, with motion expressed through contour lines and flow vectors.

### Visual language

- Dark slate/navy base.
- Thin contour-line patterns in muted blue-gray.
- Active tab indicated by a bright current stream flowing under the nav label.
- Resume timeline resembles charted routes with waypoint markers.

### Dynamic ocean behavior

- Background: animated contour lines that slowly drift like ocean-current visualizations.
- Page transition: old content is “redrawn” into contour lines, then resolves into the new page.
- Photo gallery: image cards display coordinate-like metadata on hover.

### Implementation notes

- Use SVG patterns for contour lines rather than large images.
- Animate `stroke-dashoffset` and subtle transforms for movement.
- Keep the line density low around text-heavy sections.
- Use CSS variables for current speed and opacity.

### Evaluation questions

- Does the linework reinforce a technical/professional brand?
- Is the motion visible enough to be distinctive but not distracting?
- Could this become the most scalable design system for future features?

## Variant 03 — Surf Tab Runner

### Core concept

A playful but still polished surfing interaction: a tiny surfer pointer rides a wave along the header navigation and “lands” on the selected tab. This is the most literal surfing concept and should test whether personality can coexist with professionalism.

### Visual language

- Clean dark background with a horizontal animated swell behind the nav.
- Small minimalist surfer silhouette or SVG icon as the active nav indicator.
- Professional content panels below, kept restrained to counterbalance the playful nav.
- Accent palette: seafoam, moonlit white, muted coral.

### Dynamic ocean behavior

- Header nav: active indicator is a surfer icon that follows a sinusoidal wave path between tabs.
- Page transition: selecting a tab triggers a short wave crest animation across the header, then content fades/slides in.
- Cursor option: when hovering over nav only, the cursor can become a board/surfer silhouette; outside nav, use the system cursor.

### Implementation notes

- Implement the surfer as an SVG component, not an image asset.
- Use measured tab positions to animate the surfer with CSS transform or Framer Motion.
- Do not replace the global cursor site-wide; limit novelty to navigation zones.
- Reduced-motion mode should replace surfing travel with a simple active underline.

### Evaluation questions

- Does this feel charming or too whimsical for a professional site?
- Is the nav understandable without the surfer animation?
- Would this be memorable enough to justify the added complexity?

## Variant 04 — Moonlit Tide

### Core concept

A quiet, cinematic night-ocean site: moonlight, tides, and soft gradients. This variant emphasizes calm and emotional resonance over visible UI complexity.

### Visual language

- Dark indigo-to-navy gradient background.
- Soft moon-glow radial gradient in one corner.
- Minimal line icons and refined typography.
- Content cards feel like paper illuminated by moonlight.

### Dynamic ocean behavior

- Background: slow tide motion using layered blurred gradient bands.
- Page transition: content lowers slightly as a tide wash passes over it, then rises into the new page.
- Photography page: gallery masonry receives subtle moonlit edge highlights.

### Implementation notes

- Prefer pure CSS gradients and transforms; avoid heavy canvas here.
- Use CSS `@property` only if browser support/fallback is handled cleanly.
- Maintain a very slow animation pace: 8–20 second loops.
- Reduced-motion fallback should be almost identical visually, just static.

### Evaluation questions

- Is this the strongest “calm professional” option?
- Does the mood work for both resume content and photography?
- Does it avoid looking like a generic dark landing page?

## Variant 05 — Chartplotter Console

### Core concept

A modern marine navigation console crossed with a personal portfolio. This variant leans into technical credibility: grids, panels, coordinates, route traces, instrumentation, and precise microinteractions.

### Visual language

- Dark console UI with subtle grid overlays.
- Monospace labels paired with readable sans-serif body copy.
- Data chips, route lines, and panel headers.
- Accent colors: radar green/seafoam, warning amber, deep cyan.

### Dynamic ocean behavior

- Background: radar sweep or sonar-like pulse that very slowly scans behind content.
- Page transition: tab change behaves like switching navigation modes; panels reconfigure with a route-trace animation.
- Resume timeline: career path appears as plotted waypoints on a chart.

### Implementation notes

- Keep console elements decorative and semantic content clean.
- Use CSS/SVG for scanlines and route paths.
- Consider using `aria-hidden="true"` for purely decorative instrumentation.
- Avoid excessive sci-fi styling; this should remain nautical, not spaceship.

### Evaluation questions

- Does the console metaphor support the “technical software consultant” identity?
- Is it too busy compared with the desired simple professional reference site?
- Are route/timeline metaphors useful enough to carry forward?

## Variant 06 — Minimal Dev

### Core concept

A very clean developer portfolio: restrained, text-first, almost no ocean decoration. Think TypeScript documentation aesthetics, excellent typography, fast load, and clear content hierarchy.

### Visual language

- Dark but neutral background.
- Syntax-inspired accent colors: blue, cyan, muted purple.
- Compact tabs, precise spacing, thin borders.
- Monospace headings or labels with highly readable body typography.

### Dynamic ocean behavior

- Minimal nautical reference only: a barely visible wave underline for active tabs or section separators.
- Page transition: simple fade/slide with optional 1px wave-line wipe.
- Background: static dark gradient, no canvas.

### Implementation notes

- This should be the performance and readability benchmark.
- Keep dependencies minimal.
- Use no heavy animation libraries unless shared scaffolding already includes them.
- Make this variant the fallback design if the ocean-forward versions prove too visually complex.

### Evaluation questions

- Does the site still feel personal enough?
- Is this the best production-ready baseline?
- Which details from ocean variants could be added without compromising clarity?

## Variant 07 — Photo Tidepool

### Core concept

A photography-forward design where image cards feel like tidepools or windows into coastal scenes. This variant prioritizes the photography page and uses the portfolio/resume content as supporting structure.

### Visual language

- Organic rounded image masks.
- Dark rocky/coastal palette with sea-glass highlights.
- Gallery cards have tactile depth and subtle reflection.
- Text content remains organized in clean panels.

### Dynamic ocean behavior

- Background: subtle water shimmer near gallery sections only.
- Page transition: content reveals through expanding organic “water pool” masks.
- Photo interactions: opening a photo creates a ripple from the click point; the micro-blog blurb slides up like a caption card.

### Implementation notes

- Use CSS `clip-path` or SVG masks for organic card shapes.
- Ensure photo thumbnails can still be laid out in a predictable responsive grid.
- Keep organic masks optional; rectangular fallback should be acceptable.
- Avoid distorting the photos themselves unless intentional and subtle.

### Evaluation questions

- Does this best showcase photography without weakening resume/bio pages?
- Are organic shapes elegant or too informal?
- Could this become a dedicated photography sub-design later?

## Variant 08 — Ship Log

### Core concept

A personal “captain's log” / field-notes aesthetic: refined editorial pages, log entries, routes, timestamps, and photography captions. This variant supports future micro-blogging and incremental writing especially well.

### Visual language

- Dark editorial layout with notebook/logbook influence.
- Serif or humanist headings paired with crisp sans-serif body text.
- Date stamps, entry numbers, and route/location metadata.
- Subtle nautical dividers: knots, bearings, wave glyphs.

### Dynamic ocean behavior

- Background: extremely subtle paper-grain plus slow tide gradient.
- Page transition: a log page “turns” or washes with ink-like water diffusion.
- Photography micro-blog: each photo opens as a log entry with location/date notes.

### Implementation notes

- Consider Markdown-driven content heavily for this variant.
- Use motion sparingly; editorial readability is the priority.
- Implement a reusable `LogEntryCard` for bio snippets, resume highlights, and photo blurbs.
- Reduced-motion fallback should be a clean crossfade.

### Evaluation questions

- Is this the most extensible version for future posts/notes?
- Does it feel modern enough despite the logbook metaphor?
- Does the writing format encourage ongoing site updates?

## Variant 09 — Kinetic Resume Buoys

### Core concept

A resume-first interactive concept: work history is visualized as buoys, markers, or floating nodes connected by swells. It tests whether resume content can be dynamic and memorable while remaining scannable.

### Visual language

- Structured dark layout with a prominent central timeline.
- Timeline nodes resemble buoy lights or nautical markers.
- Skills appear as floating tags that gently bob within their section.
- Strong active/focus states for keyboard navigation.

### Dynamic ocean behavior

- Resume timeline nodes bob subtly on hover/focus.
- Page transition: selected tab sends a swell through the timeline/nav marker system.
- Background: slow parallax layers resembling horizon, swell, and depth.

### Implementation notes

- Avoid making the resume timeline physically unstable; bobbing should be tiny and decorative.
- Timeline must work as a normal vertical list on mobile.
- Use CSS transforms and delays, not physics libraries, unless needed.
- Reduced-motion fallback should keep all nodes fixed.

### Evaluation questions

- Does the dynamic resume help or hurt comprehension?
- Are buoy markers a useful metaphor for career milestones?
- Is this better as a specific Resume page design than as the whole-site direction?

## Variant 10 — Lighthouse Focus

### Core concept

A focused, high-contrast portfolio organized around a lighthouse/searchlight metaphor. The design highlights one content panel at a time while maintaining calm oceanic ambience.

### Visual language

- Deep black-blue background.
- One illuminated content region with strong readability.
- Lighthouse beam or soft spotlight moves subtly in the background.
- Minimal nav with beacon-like active indicator.

### Dynamic ocean behavior

- Background: slow rotating or sweeping light beam over very faint ocean texture.
- Page transition: the “beam” sweeps across the viewport and reveals the next page.
- Contact CTA: beacon pulse draws attention without flashing aggressively.

### Implementation notes

- Use radial/conic gradients for the beam; avoid actual flashing.
- Ensure no content becomes unreadable when the beam moves away.
- Beam should be atmospheric, not the sole source of contrast.
- Reduced-motion fallback keeps the beam fixed behind the active panel.

### Evaluation questions

- Does the focus metaphor make the site feel composed and intentional?
- Is the lighthouse theme too literal or just enough?
- Does the spotlight transition feel smoother than the wave-wash alternatives?

## Cross-Variant Comparison Matrix

The future `/goal` session should maintain this table as variants are built and evaluated.

| Variant | Primary strength | Main risk | Motion intensity | Best page fit | Production readiness |
| --- | --- | --- | --- | --- | --- |
| 01 Abyssal Glass | Premium calm polish | Glass readability | Medium | Whole site | High |
| 02 Current Lines | Technical nautical identity | Pattern density | Medium | Resume/Bio | High |
| 03 Surf Tab Runner | Memorable personality | Too playful | High | Navigation | Medium |
| 04 Moonlit Tide | Calm atmosphere | Generic dark look | Low | Whole site | High |
| 05 Chartplotter Console | Technical consultant signal | Busy UI | Medium-high | Resume | Medium |
| 06 Minimal Dev | Clarity/performance | Less personal | Low | Whole site | Very high |
| 07 Photo Tidepool | Strong photography showcase | Organic shapes too casual | Medium | Photography | Medium |
| 08 Ship Log | Future writing/micro-blogging | Editorial theme may feel niche | Low-medium | Bio/Photos | High |
| 09 Kinetic Resume Buoys | Dynamic resume concept | Scannability | Medium-high | Resume | Medium |
| 10 Lighthouse Focus | Strong focus and reveal metaphor | Theme literalness | Medium | Whole site | High |

## Recommended Evaluation Criteria

Use the same scorecard for every variant:

1. **Professional credibility**: Would this work as a reference site for recruiters, clients, and colleagues?
2. **Personal resonance**: Does it authentically reflect nautical/surfing/ocean interests?
3. **Readability**: Can long resume and bio content be read comfortably?
4. **Motion restraint**: Are animations calming, optional, and non-distracting?
5. **Implementation complexity**: Can this be maintained and extended by one person?
6. **Static hosting fit**: Does it remain compatible with static build output and no app server?
7. **Mobile quality**: Does the concept survive on a small screen?
8. **Content scalability**: Can new photos, roles, posts, and links be added cleanly?

## Final Deliverable from the Future `/goal` Session

After building the 10 variants, produce:

- A short README summary for each variant.
- Screenshots of Home, Resume, and Photography for each variant.
- A recommendation memo ranking the variants.
- A suggested final direction, which may combine elements, such as:
  - Variant 06 structure and performance baseline.
  - Variant 01 glass panels.
  - Variant 02 current-line accents.
  - Variant 03 surfer nav as an optional easter egg or prototype-only experiment.
  - Variant 08 content model for future writing/photo blurbs.

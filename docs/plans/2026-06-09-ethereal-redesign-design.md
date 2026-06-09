# ethereal redesign — design doc

date: 2026-06-09
status: approved (validated via mockups: `v4-index.html`, `v4-essay.html` in this folder)

## intent

replace the soft-plum editorial design with an ethereal, luminous, contemplative aesthetic that matches the writing (presence, healing, somatic practice). the feeling: sense of wonder, soft glow, holy without iconography — light itself is the sacred element. apple-keynote-grade typography.

rejected directions along the way (kept for context): terminal zine (too techno for the writing), ember/candlelight (warmer but still off), midnight indigo + temple gold with spiritual-eye emblem (too literal, read as SRF logo). explicit user vetoes: no cursive/script fonts, no taglines under the name, no religious symbols.

## design language

**color** — dark only, no theme toggle.

| token | value | use |
|---|---|---|
| `--bg` | `#06060F` | page background (deep space) |
| `--fg` | `#F2F1F7` | primary text |
| `--dim` | `#8E8CA3` | secondary text, nav |
| `--faint` | `#55536B` | metadata, numbers, dates |
| `--line` | `rgba(255,255,255,0.07)` | hairline rules |
| `--violet` | `#A78BFA` | accent, glows |
| `--blue` | `#7DABF8` | gradient partner |

- text gradient (titles, name): `linear-gradient(180deg, #FFFFFF 30%, #B9B4D8 100%)` via background-clip
- accent gradient (labels, "now" key): `linear-gradient(100deg, #C4B5FD, #93C5FD)`
- selection: violet bg `rgba(167,139,250,0.85)`, near-black text

**aurora background** — 2–3 large blurred radial orbs (violet `rgba(124,108,255,0.16–0.20)`, blue `rgba(96,165,250,0.10–0.13)`, blush `rgba(244,182,255,0.09)`) fixed near the top of the viewport, `filter: blur(90px)`, drifting on 36–52s ease-in-out loops. barely perceptible motion. respect `prefers-reduced-motion` (freeze orbs and breathing animations).

**typography** — Inter (variable), -apple-system fallback. no serif, no mono, no script.
- site title / essay h1: weight ~250, tracking −0.03em, gradient fill
- body prose: 17.5px, weight ~320, line-height 1.85, color `#DDDBE8`
- section headers (h3 in posts): 13px, weight 550, letterspaced 0.18em uppercase, accent gradient
- metadata/labels: 11–12px, letterspaced
- blockquotes: 22px ultralight italic, centered, accent gradient + soft drop-shadow glow

**interaction = luminance** (this was the through-line the user loved): nothing inverts or moves on hover, it glows.
- index rows: faint violet wash bg + title brightens to white with violet text-shadow halo
- nav/footer links: brighten + glow
- essay links: violet, underline via border, glow on hover

**signature details**
- breathing point of light: 5px violet dot with glow, scale/opacity cycle over exactly 10s (coherent-breathing rate, ~6 breaths/min — references the "Coherent Relaxing" post). appears as the divider between index and footer, and as the dinkus inside essays.
- `now —` footer line: hand-edited italic one-liner of current obsessions; only the word "now" carries the accent gradient.
- footer copy: `© <year> · made with wonder`

## structure

**homepage = the index.** no featured/secondary hierarchy, no separate `/blog` page (collapse it; redirect `/blog` → `/`, keep `/blog/[slug]` URLs working so nothing breaks).
- centered masthead: name in gradient (clamp 34–46px), nav links: Index · About · RSS
- index list: every post, numbered descending (newest = highest, tabular nums), title, ISO date (date hidden < 540px). hairline rules between rows.
- breathing dot divider, then centered footer: now-line, social links (GitHub, Twitter, Substack, OpenUX), copyright.

**essay page**
- compact masthead: name top-left (same gradient treatment as homepage, 19px, weight 250, glow on hover), nav top-right
- centered header: `No. <n>` letterspaced gradient label, gradient h1, meta line (date · read time)
- prose column, max-width 600px
- footer: hairline, `← Index` left, `Next · <title> →` right

**about page** — same masthead/footer; content style: prose treatment as essays. (layout not mocked; keep simple single column.)

## implementation notes

- current stack stays: next.js app router, tailwind v4 alpha, MDX posts in `app/blog/posts/`
- delete: theme toggle / theme-provider (dark only), soft-plum tokens, Instrument Serif + DM Sans + Geist font loads. load Inter via `next/font/google` (variable, with `font-display: swap`).
- keep: reading-progress bar (restyle: violet gradient fill), rss, og image route (restyle og card to match: dark bg, gradient title), sitemap, analytics
- speed reader: keep the feature, restyle to v4 tokens (dark bg, gradient focus word, violet guides)
- post numbering: derive from chronological rank (oldest = 1) so numbers are stable as new posts are added
- `last update` status line was dropped from final design — not present in v4.1
- mockups are the source of truth for all values: `docs/plans/v4-index.html`, `docs/plans/v4-essay.html`

# AGENTS.md — Tiệm Bánh Mây

Static landing page for a Vietnamese cake shop. Single-page, no framework, no build step.

## Quick start

```powershell
cd C:\Users\Lecoo\Desktop\bai21
python -m http.server 8123          # serve at http://localhost:8123/
npx html-validate index.html        # zero errors required
```

## Project structure

```
index.html                # single page: all sections live here
assets/css/style.css      # ~1400 lines, mobile-first, CSS custom properties
assets/js/main.js         # chip nav, clipboard copy, header shadow, FAQ
assets/fonts/             # self-hosted WOFF2 (Baloo 2 + Be Vietnam Pro, OFL)
images/                   # 6 Pexels stock photos + srcset variants (400/800/1200)
  CREDITS.md              # image attribution & replacement instructions
content.md                # human-readable copy reference (not consumed by page)
plan.md                   # phased checklist, gate status, Lighthouse history
design-system/tiem-banh-may/MASTER.md   # design tokens & component spec
```

## Editing

- **No build step.** Edit `index.html`, `style.css`, or `main.js` directly; refresh the browser.
- CSS variables live in `:root` inside `style.css`. Use the existing tokens — don't hardcode colours.
- Every Zalo link must include a `data-zalo-message` attribute. The JS copies this text to clipboard when the user clicks, then shows a toast. Missing the attribute = UX gap.
- Images use `srcset` with 400w/800w/1200w variants. When replacing images, keep square 1200×1200 and regenerate the three sizes.

## Design constraints

- **Mobile-first at 375 px.** Breakpoints: 640, 768, 900, 1080.
- **Vietnamese locale.** All visible text, `lang="vi"`, SEO meta, and JSON-LD must stay in Vietnamese.
- **Fonts are self-hosted.** Don't link Google Fonts. The WOFF2 files are subset to Vietnamese + Latin.
- `scroll-margin-top` is tuned per breakpoint: 88 px default, 128 px on mobile (to clear the sticky header + chip nav). Changing header height or nav height must update these values.

## Behaviour notes

- The mobile **chip nav** (`.section-nav`) is hidden at load and shown via JS after the user scrolls ~60% past the hero. It uses `visibility: hidden` (not `display: none`) so ARIA landmarks remain in the tree. Active chip state is driven by `IntersectionObserver`-style scroll math, not CSS.
- **Clipboard copy** fires on `pointerdown` (mouse/touch) and `click` with `detail===0` (keyboard). It only copies if `navigator.clipboard` exists and the context is secure. If clipboard fails, the Zalo link still opens normally.
- The **FAQ** uses native `<details name="faq">`. A JS fallback enforces single-open behaviour for browsers that don't support the `name` attribute on `<details>`.
- The **sticky mobile CTA** at the bottom is hidden ≥900 px. `body` has `padding-bottom: 84px` to prevent it from covering content.
- The **signature cake** (`.product--signature`) spans the full product grid width. Its image aspect ratio changes from `16/11` (mobile) to `auto` (tablet/desktop) so the card shifts from stacked to side-by-side layout. The `sizes` attribute in its `<img>` is different from the other product cards.

## Quality checks

```powershell
# HTML validity
npx html-validate index.html

# Lighthouse (server must be running on 8123)
npx lighthouse http://localhost:8123/ --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=_shots/lighthouse.json --form-factor=mobile --screenEmulation.mobile --quiet

# Visual breakpoints (via OpenCode Playwright)
# 375 × 812, 768 × 1024, 1440 × 900 — verify scrollWidth equals clientWidth
```

- Lighthouse runs are noisy on this machine due to CPU contention. Expect performance 85–98 depending on load. Accessibility, Best Practices, and SEO should always be 100.
- Full-page screenshots land in `_shots/`.

## Placeholder data — do not publish

| Item | Current state |
|---|---|
| Zalo number | `0908 686 888` (real — user supplied) |
| Address | `Số 1 Tôn Đức Thắng, TP. Hồ Chí Minh` (real) |
| Hours | `9:00 – 17:00` (real) |
| Instagram | `instagram.com/tiembanhmay` (real) |
| Product images | Pexels stock, labelled "Ảnh minh hoạ" |
| Customer reviews | AI-generated, labelled "Đánh giá mẫu" |
| Founder story | AI-generated, labelled as demo content |

The page has visible disclaimer labels and a footer notice. Before publishing, replace all three demo items with real content and remove the labels.
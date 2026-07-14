---
name: VELOCITY
description: Bold direct-to-consumer storefront for premium performance running shoes.
colors:
  volt: "#c9ff12"
  ink: "#11110f"
  ink-surface: "#1c1c1a"
  paper: "#f4f2eb"
  panel: "#ebe8df"
  clay: "#e5744c"
  moss-deep: "#526900"
  muted: "#706f68"
  line: "#d7d4cb"
  focus: "#005fcc"
  error: "#8d1f00"
typography:
  display:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: "clamp(72px, 7.1vw, 112px)"
    fontWeight: 700
    lineHeight: 0.82
    letterSpacing: "-0.065em"
  headline:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: "clamp(34px, 4vw, 54px)"
    fontWeight: 700
    lineHeight: 0.92
    letterSpacing: "-0.05em"
  title:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: "22px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "0.06em"
rounded:
  sharp: "0"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "14px"
  md: "24px"
  lg: "46px"
  xl: "56px"
components:
  button-pill-dark:
    backgroundColor: "{colors.ink}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    padding: "0 26px"
    height: "48px"
    typography: "{typography.label}"
  button-pill-dark-hover:
    backgroundColor: "{colors.ink}"
    textColor: "#ffffff"
  text-link:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
  choice-chip:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.sharp}"
    padding: "0 14px"
    height: "44px"
    typography: "{typography.label}"
  choice-chip-selected:
    backgroundColor: "{colors.ink}"
    textColor: "#ffffff"
  product-card-volt:
    backgroundColor: "{colors.volt}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sharp}"
    padding: "24px"
  product-card-ink:
    backgroundColor: "{colors.ink-surface}"
    textColor: "#ffffff"
    rounded: "{rounded.sharp}"
    padding: "24px"
  product-card-clay:
    backgroundColor: "{colors.clay}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sharp}"
    padding: "24px"
  input-field:
    backgroundColor: "#ffffff"
    textColor: "{colors.ink}"
    rounded: "{rounded.sharp}"
    padding: "0 14px"
    height: "48px"
---

# Design System: VELOCITY

## 1. Overview

**Creative North Star: "The Track Meet"**

VELOCITY is designed like the moment before a race. Everything is charged, tuned, and pointed forward. The whole surface reads at high contrast: near-black ink on warm paper, cut through by a single electric lane of Volt Green. The type is set the way stadium boards are, uppercase and weight-900, letters crushed together with deep negative tracking so the words themselves lean into motion. Nothing is decorative for its own sake; density and quiet exist only to make the loud parts land.

This system is for a Thai direct-to-consumer running audience deciding, in one scroll, whether the brand is credible and worth the price. So it earns premium through craft and specificity (real spec tables, honest THB pricing, working cart and quick-view flows) rather than through gloss. Volt Green is the brand's voice, and its rarity is the entire point: it owns the hero and the CTAs and almost nothing else.

It explicitly rejects the safe megabrand template (a stock hero photo over an evenly-spaced polite product grid), the warm cream/beige "AI-editorial restraint" look with tiny tracked eyebrows on every section, the cluttered Lazada/Shopee discount-sticker density, and the soft pastel wellness aesthetic. VELOCITY is loud, kinetic, and composed at once.

**Key Characteristics:**
- One electric accent (Volt Green) used sparingly against a warm-paper-and-ink base.
- Uppercase display type, weight 900, tracking as tight as -0.065em: the type is the graphic.
- Flat by default. Sharp corners on surfaces, full pills on buttons. Depth appears only on interaction.
- Trust and specificity are load-bearing: THB pricing, delivery, returns, spec tables, reviews.
- Motion is short, exponential, forward. Reduced-motion kills it cleanly.

## 2. Colors

A warm-neutral base held at high contrast, detonated by a single electric accent. Product surfaces rotate through three saturated tones so the grid has rhythm without needing photography.

### Primary
- **Volt Green** (`#c9ff12`): The brand's signature and its loudest voice. Owns the hero background, the cart badge, story-section accents, the membership band, and the primary product card. Rare by rule: it must never become the page's general background color.

### Secondary
- **Clay** (`#e5744c`): A warm burnt-orange counterweight to Volt. Carries the third product card and the Studio Form training line, giving the palette warmth without going pastel.

### Tertiary
- **Moss Deep** (`#526900`): A dark olive used only for small accent text (tech-section numerals, `.accent-dark` labels) where Volt itself would fail contrast on paper. It is Volt's readable understudy, never a surface.

### Neutral
- **Ink** (`#11110f`): The primary text color and the dark surface (story section, dark pill buttons, header text). Near-black, faintly warm.
- **Ink Surface** (`#1c1c1a`): The slightly-lifted dark used for the Terra Shift product card and story contour panel, distinct from pure Ink.
- **Paper** (`#f4f2eb`): The default body background. A warm off-white, never a cream/beige "editorial" tint. It reads as gym-floor neutral, not parchment.
- **Panel** (`#ebe8df`): The recessed surface for tech cards, content panels, search results, and galleries: one step darker than Paper for quiet layering.
- **Muted** (`#706f68`): Reserved for de-emphasized captions and figcaptions only. Verified ≥4.5:1 on Paper; never used for primary body copy.
- **Line** (`#d7d4cb`): Hairline borders and dividers. 1px only.
- **Focus** (`#005fcc`): The universal focus-ring blue. Deliberately outside the brand palette so it is unmistakable against Volt, Ink, and Paper alike.
- **Error** (`#8d1f00`): Form error text (e.g. missing-size warning). Weight 900, paired with a role="alert", never color alone.

### Named Rules
**The One Lane Rule.** Volt Green appears on at most one major surface per viewport plus small accents. Its scarcity is what makes it read as electric; flood the page with it and it becomes wallpaper.

**The No Cream Rule.** Paper is a true warm off-white at low chroma. It is forbidden to drift toward sand, beige, or parchment. Warmth in this brand comes from Clay and from type, never from a tinted near-white background.

## 3. Typography

**Display Font:** Inter (with Arial, sans-serif fallback)
**Body Font:** Inter (with Arial, sans-serif fallback)

**Character:** One family, worked across its full weight range from 400 to 900. The system gets its personality not from pairing typefaces but from extremes: featherweight body text against black-weight uppercase display, set with aggressive negative tracking so headlines read as a single dense mass moving forward. Loaded via `next/font/google` with `display: swap`.

### Hierarchy
- **Display** (900 / `clamp(72px, 7.1vw, 112px)` / line-height 0.82 / tracking -0.065em): The hero H1 only. Uppercase, hard-wrapped into stacked lines ("Move / without / limits."). The tightest tracking in the system.
- **Headline** (700–900 / 40–54px / line-height ~0.92 / tracking -0.05em): Story and membership H2s. Uppercase.
- **Title** (700–900 / 22–42px / tracking -0.03em to -0.05em): Section headings, tech H2, product card names, dialog titles. Uppercase.
- **Body** (400 / 15–16px / line-height 1.5): Hero and story paragraphs, spec values, review quotes. The only place text is not uppercase. Cap measure at 65–75ch; the hero body holds ~490px max-width.
- **Label** (800–900 / 11–12px / tracking 0.04–0.12em / uppercase): Eyebrows, nav, button text, product index, badges, stock and swatch chips. The connective tissue of the whole interface.

### Named Rules
**The Uppercase Structure Rule.** Uppercase carries structure (labels, nav, headings, buttons); sentence case carries prose (body paragraphs, spec values, reviews). Body copy is never set in all-caps. A paragraph in caps is a bug, not a style.

**The Tracking Floor Rule.** Display tracking bottoms out at -0.065em and goes no tighter. Beyond that, glyphs collide, and cramped is not the same as fast.

## 4. Elevation

Flat by default. The system conveys hierarchy through tonal layering (Paper → Panel → Ink surfaces) and hairline `--line` borders, not through resting shadows. Depth is a *response*, not a state: it appears only on interaction, then leaves.

### Shadow Vocabulary
- **Hover lift** (`box-shadow: 0 18px 50px rgb(17 17 15 / 0.16)`): Applied to product cards on hover/focus, paired with a -5px translateY. The card rises toward the cursor, then settles.
- **Hero product drop** (`filter: drop-shadow(0 24px 18px rgb(17 17 15 / 0.18))`): Grounds the floating hero shoe so it reads as a real object above the Volt field.
- **Drawer / modal cast** (`box-shadow: -30px 0 80px rgb(0 0 0 / 0.25)`): The heavy directional shadow that separates the cart drawer, search dialog, and quick-view from the dimmed backdrop.

### Named Rules
**The Flat-At-Rest Rule.** No surface carries a shadow while idle. If a card looks lifted before you touch it, the shadow is wrong. Shadows are earned by hover, focus, and overlay only.

## 5. Components

Components are raw and sure-footed: hard edges, blunt weight, uppercase labels, and motion that reacts instantly. Nothing looks soft or tentative.

### Buttons
- **Shape:** Full pills for actions (`999px`); sharp `0` radius for in-context choice chips. The pill is the only rounded thing in the system, which is what makes CTAs read as pressable.
- **Primary (`.pill-dark`):** Ink background, white text, uppercase label at weight 900, padding `0 26px`, min-height 48px. Used for every conversion action (Shop now, Add to cart, Checkout, Join free).
- **Hover:** `translateY(-2px)`. **Disabled:** opacity 0.45, no transform, `not-allowed` cursor (e.g. Add to cart before a size is chosen).
- **Text link (`.text-link`):** Transparent, uppercase weight-900 label with an animated underline that wipes in left-to-right on hover/focus (a 2px `currentColor` bar). The system's secondary action.

### Chips
- **Choice chips (color / size):** Sharp `0` radius, 1px Ink border, transparent background, uppercase weight-900 label, min-height 44px. **Selected** inverts to solid Ink background with white text: no accent color, just a hard fill.
- **Swatch / stock chips:** Pill outline (`999px`, 1px currentColor), tiny uppercase label; inherit the card's text color so they read on Volt, Ink, and Clay alike.

### Cards / Containers
- **Corner Style:** Sharp (`0` radius). No rounded cards anywhere.
- **Background:** Product cards use the saturated tone triad (Volt / Ink Surface / Clay). Recessed content uses Panel (`#ebe8df`) on Paper.
- **Shadow Strategy:** Flat at rest; hover lift only (see Elevation).
- **Border:** 1px `--line` on tech cards, reviews, and panels. Full borders only, never a colored side-stripe.
- **Internal Padding:** 18–24px on cards; 34px on editorial content panels.

### Inputs / Fields
- **Style:** White background, sharp `0` radius, 1px Ink border, min-height 48px. Blunt and industrial, matching the buttons.
- **Focus:** Global `:focus-visible` ring: 3px `#005fcc` solid, 4px offset. The same ring on every interactive element.
- **Error:** Message in Error red (`#8d1f00`), weight 900, announced via `role="alert"`. Never signalled by border color alone.

### Navigation
- Sticky header, uppercase weight-800 links at 12px, with the same left-to-right underline wipe as text links. Header sits on a `rgb(244 242 235 / 0.93)` paper wash with `backdrop-filter: blur(18px)`. Below 1100px the desktop nav collapses to a full-height mobile drawer opened by a hamburger, with a focus trap and Escape-to-close.

### Overlays (Signature)
- **Drawer / Dialog / Quick-view:** Cart and mobile nav slide from the right; search and quick-view center over a `rgb(17 17 15 / 0.62)` backdrop. All share a focus trap, Escape-to-close, restored focus on close, and `body.is-locked` scroll-lock. The quick-view is a two-column gallery-plus-buy panel: the storefront's most complex surface and the one that closes the sale.

## 6. Do's and Don'ts

### Do:
- **Do** keep Volt Green rare: one major surface per viewport plus small accents (The One Lane Rule).
- **Do** set headings uppercase, weight 900, tracking between -0.03em and -0.065em.
- **Do** keep surfaces flat at rest; reserve shadow for hover, focus, and overlays (The Flat-At-Rest Rule).
- **Do** use Moss Deep (`#526900`) for small accent text on Paper where Volt Green would fail contrast.
- **Do** keep THB pricing, delivery, returns, reviews, and secure-checkout signals visible: trust is the close.
- **Do** give every overlay a focus trap, Escape-to-close, restored focus, and scroll-lock.
- **Do** signal state (stock, selection, error) with text plus fill, never color alone (WCAG 2.1 AA).

### Don't:
- **Don't** let Paper drift toward cream, beige, sand, or parchment. This is not the warm "AI-editorial" look (The No Cream Rule).
- **Don't** put muted or light text on Volt Green; it is a bright surface and only Ink reads on it.
- **Don't** build the safe megabrand template: a stock hero photo over an evenly-spaced polite product grid.
- **Don't** add discount stickers, slashed-price badges, or countdown clutter. VELOCITY is premium, not a marketplace bargain bin.
- **Don't** soften the system with pastels, rounded cards, or a calm wellness palette. Only buttons are pill-shaped; everything else is sharp.
- **Don't** use `border-left`/`border-right` greater than 1px as a colored accent stripe on cards or alerts. Full borders only.
- **Don't** set body copy in all-caps, and don't track display type tighter than -0.065em.

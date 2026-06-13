# DenChou Design Direction

DenChou is a fork of Senren focused on one clear goal: **a gentle, beautiful, lightweight AnkiDroid-first deck UI for Japanese study**.

Senren already gives DenChou a strong base: responsive layout, rich card behavior, dictionary display, pitch accent support, image handling, and in-review preferences. DenChou should not throw that away. The direction is to **keep the useful engine, calm the surface, and make the learner feel less buried under controls**.

## Product North Star

DenChou should feel like a quiet study desk, not a dashboard.

- The learner opens a card and instantly knows where to look.
- The word, reading, sentence, image, audio, and definition have a clear visual order.
- The UI stays soft on the eyes during long mobile sessions.
- Advanced Senren features remain available, but they should not shout over the study content.
- The deck should stay light enough for AnkiDroid: small CSS surface, minimal runtime work, no decorative heaviness that slows review.

## Evidence From Current Senren/DenChou

Files inspected before setting this direction:

1. `DenChou/README.md:1-2` is currently identical to `Senren/README.md:1-2`: both still use the `# Senren・洗練` title and the same feature-rich Senren description. DenChou has not been visually or textually re-identified yet.
2. `DenChou/Template/styling.css:70-82` defines typography around Klee, Noto Sans CJK JP, Noto Serif CJK JP, Hiragino, Yu Mincho, and Segoe UI. There is no DenChou-specific default font identity yet.
3. `DenChou/Template/_senren_defaults_v5.1.0.css:261-351` stores the main palette as HEX, named colors, and RGBA. This conflicts with the DenChou rule that all authored colors should use OKLCH and no pure black/white.
4. `DenChou/docs/mobile.md:1-4` says the template is tested on AnkiDroid and AnkiMobile. Mobile is already a first-class target, so DenChou should sharpen that instead of treating desktop as the default mental model.
5. `DenChou/docs/responsive_layout.md:5-8` defines breakpoints down to a one-column small-screen layout. The fork can build on this by designing the small-screen reading flow first.
6. `DenChou/docs/Preferences.md:9-35` shows an in-review preferences system with temporary mobile settings and permanent PC/AnkiConnect saves. This is powerful, but DenChou should reduce the default need to open settings while reviewing.
7. Gen Interface JP's upstream README describes it as a digital interface typeface that harmonizes Inter and Noto Sans JP, with separate Body/UI and Display families, 8 weights, webfont support, and SIL OFL 1.1 licensing. That matches DenChou's bilingual UI + Japanese study use case.

## Core Design Principles

### 1. AnkiDroid-first, not desktop-shrunk

Design the card as if the user is reviewing on a phone in bed, on a train, or during a tired evening session.

- Primary flow: word/reading → sentence/audio → image → definition.
- One-column mobile layout is the baseline experience.
- Desktop can enhance the layout, but must not introduce a different mental model.
- Tap targets should be comfortable and forgiving.
- Hidden controls should be discoverable, but not visually noisy.

### 2. Gentle hierarchy over feature density

Senren's strength is configurability. DenChou's strength should be calmness.

- The answer side should not feel like five panels fighting for attention.
- The main word and sentence get the strongest contrast.
- Definitions and glossary blocks should feel like supporting paper slips.
- Tags, links, counters, and misc info should visually recede.
- Preferences remain available, but the default preset should already feel polished.

### 3. Pure black/white ban

DenChou should avoid `#000`, `#fff`, `black`, `white`, and equivalent harsh surfaces.

Use warm near-light and soft near-dark instead:

```css
--denchou-paper: oklch(96% 0.018 92);
--denchou-ink: oklch(24% 0.026 260);
--denchou-night: oklch(22% 0.028 270);
--denchou-night-ink: oklch(91% 0.018 92);
```

Reason: pure black/white is like a flashlight on paper in a dark room. It looks clean for screenshots, but it bites during long review sessions.

### 4. OKLCH-only authored palette

All new DenChou-authored colors should be written in OKLCH.

Allowed:

```css
color: oklch(28% 0.03 260);
background: oklch(96% 0.018 92 / 0.92);
box-shadow: 0 12px 32px oklch(20% 0.02 260 / 0.14);
```

Avoid in new DenChou code:

```css
color: #222;
background: rgba(255, 255, 255, 0.8);
color: black;
```

Legacy Senren values can be migrated gradually. New DenChou-authored styles must use OKLCH; existing Senren values should be replaced group-by-group as they are touched, not in a separate mass-conversion pass. Do not rewrite the whole palette blindly in one giant pass; that creates visual regressions that are hard to review.

### 5. Gen Interface JP as default UI/body font

Default DenChou typography:

```css
--denchou-font-ui: "Gen Interface JP", "Noto Sans CJK JP", "Hiragino Kaku Gothic ProN", system-ui, sans-serif;
--denchou-font-display: "Gen Interface JP Display", "Gen Interface JP", "Noto Sans CJK JP", sans-serif;
```

Recommended use:

- UI, sentence, definition, tags: `Gen Interface JP`
- Main word/display moments: `Gen Interface JP Display` or a controlled Japanese display fallback
- Long dictionary text: regular weight, generous line-height
- Avoid defaulting to decorative handwritten fonts for body text. They are charming for one word, tiring for paragraphs.

For AnkiDroid reliability, self-host the font files in `collection.media` when possible instead of depending only on a remote CDN. Remote CSS may fail offline; local media is boring but dependable. Ship only the weights DenChou actually uses; the full Body/UI + Display family is unnecessary for a lightweight deck.

### 6. Lightweight by default

DenChou should keep motion and decoration modest.

- Prefer CSS variables and existing structure over large new JS.
- Avoid extra libraries.
- Avoid layout effects that require heavy DOM scanning during review.
- Animations should be short, calm, and optional.
- Any visual improvement must survive repeated daily review, not just look impressive once.

## Visual Direction

### Mood

Soft digital paper, quiet blue-violet ink, restrained Japanese learning accents.

The feeling should be:

- calm
- precise
- modern
- friendly
- not childish
- not sterile

### Suggested Palette Roles

Use role tokens first. Do not scatter raw colors across components.

```css
:root {
  --denchou-bg: oklch(96% 0.018 92);
  --denchou-surface: oklch(98% 0.012 92 / 0.88);
  --denchou-surface-raised: oklch(99% 0.01 92 / 0.94);
  --denchou-text: oklch(24% 0.026 260);
  --denchou-text-muted: oklch(52% 0.035 260);
  --denchou-border: oklch(86% 0.025 92);

  --denchou-accent: oklch(58% 0.12 255);
  --denchou-accent-soft: oklch(90% 0.055 255);
  --denchou-warn: oklch(67% 0.14 55);
  --denchou-good: oklch(66% 0.11 155);
}

.custom-dark-mode,
.card.nightMode {
  --denchou-bg: oklch(22% 0.028 270);
  --denchou-surface: oklch(27% 0.032 270 / 0.86);
  --denchou-surface-raised: oklch(31% 0.036 270 / 0.92);
  --denchou-text: oklch(91% 0.018 92);
  --denchou-text-muted: oklch(72% 0.026 260);
  --denchou-border: oklch(39% 0.04 270);

  --denchou-accent: oklch(74% 0.11 255);
  --denchou-accent-soft: oklch(36% 0.06 255);
}
```

### Pitch Accent Colors

Pitch colors are learning signals, not decoration. Keep them vivid enough to distinguish, but softer than neon.

- Heiban / blue role: stable, calm blue — `oklch(63% 0.13 250)`
- Atamadaka / red role: clear but not alarm-red — `oklch(62% 0.15 25)`
- Nakadaka / orange role: warm, visible — `oklch(70% 0.15 65)`
- Odaka / green role: calm green — `oklch(66% 0.12 155)`
- Unknown / purple role: secondary, not dominant — `oklch(64% 0.12 300)`

All pitch colors should also be OKLCH tokens.

## Interaction Direction

### Defaults

- Front side: word first, sentence hidden unless the card type needs it.
- Back side: sentence and definition visible enough to study without hunting.
- Image controls should stay quiet until image interaction.
- Advanced metadata should collapse or fade into the footer.

### Taps

Use taps for learning reveals, not for guessing where the UI is.

- Main word tap: reveal/hide sentence where applicable.
- Definition switch: left/right controls can remain, but need subtle visual affordance.
- Image tap: lightbox.
- Settings: available, but visually secondary.

### Motion

Motion should feel like paper sliding, not app fireworks.

- 120–180ms for tiny hover/tap feedback.
- 180–240ms for card/content reveal.
- No long bouncy transitions by default.
- Respect the existing `--enable-animations` control for general motion. Treat `--enable-fade-in` as a separate card-flip option, not a global animation switch.

## Implementation Strategy

### Phase 1 — Identity layer

Add DenChou design tokens without changing every component yet.

- Add Gen Interface JP font-face or local media plan.
- Add DenChou OKLCH role tokens.
- Map existing major variables to DenChou tokens gradually.
- Keep Senren behavior intact.

### Phase 2 — Mobile polish

Refine the small-screen card experience first.

- Improve spacing and reading order under the existing `624px` small breakpoint.
- Reduce control noise in the header.
- Make dictionary/definition blocks easier to scan with one thumb.
- Keep image handling reliable on AnkiDroid.

### Phase 3 — Palette migration

Move authored color values to OKLCH in small, reviewable groups.

Suggested order:

1. Core background/text/surface tokens.
2. Header/buttons/footer controls.
3. Definition/glossary/cards.
4. Pitch accent colors.
5. Settings modal.

Do not mass-convert all HEX/RGBA values at once. Visual systems are like seasoning soup: if everything changes in one pour, you cannot tell which spice ruined it.

### Phase 4 — DenChou preset

Create one default DenChou preset that feels finished.

- DenChou Light
- DenChou Dark
- Optional DenChou Soft Contrast for tired eyes

The default should not require the user to spend ten minutes tuning settings before review feels good.

## Non-goals

- Do not remove Senren's advanced capabilities just to look minimal.
- Do not add a framework or build step unless there is a clear Anki-compatible reason.
- Do not optimize for a desktop screenshot over real AnkiDroid review.
- Do not use pure black/white in new DenChou-authored styles.
- Do not scatter raw color values outside token definitions.

## Definition of Done for DenChou UI Changes

A DenChou visual change is acceptable when:

1. It improves the mobile review flow.
2. It uses OKLCH for authored colors.
3. It avoids pure black and pure white.
4. It keeps Gen Interface JP as the default UI/body font path.
5. It does not add unnecessary JS or external dependencies.
6. It keeps Senren's useful features available.
7. It can be reviewed in small chunks without guessing what changed.

## Short Direction Statement

DenChou is **Senren made calmer, warmer, more mobile-native, and more typographically consistent**.

Keep the engine. Replace the mood.

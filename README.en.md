# DenChou・電帳

DenChou is an Anki note type for studying Japanese.

This fork lives at [GoRakuDo/DenChou](https://github.com/GoRakuDo/DenChou).
It is based on [Senren](https://github.com/BrenoAqua/Senren), but its direction is different: calm, lightweight, AnkiDroid-first review cards that stay comfortable during long study sessions.

The goal is not to make Anki look busy.
The goal is to make the next card easier to read.

## What DenChou focuses on

- A soft mobile-first layout for AnkiDroid
- Clear reading order for word, sentence, image, audio, and definitions
- Gentle dark and light themes with no pure black or pure white surfaces
- OKLCH-authored colors for more predictable contrast and tuning
- Gen Interface JP as the default UI/body font, with natural Japanese fallbacks
- Inline Lucide SVG icons instead of loading a full icon font
- A built-in preferences panel for changing card behavior inside review
- Lightweight defaults, including AnkiDroid auto-optimization for narrow screens

## Design direction

DenChou should feel like a quiet study desk, not a dashboard.

Senren gives this project a strong engine: responsive cards, rich settings, dictionary display, pitch accent support, image handling, audio controls, and review-time customization.
DenChou keeps that foundation, then softens the surface.

The card should guide your eyes instead of competing for them.

## Color and typography

DenChou-authored styles use OKLCH colors.
New design work should avoid raw hex, RGB, named CSS colors, and harsh `black` / `white` values.

The default UI font is Gen Interface JP.
If the font is not available locally or through the CDN, DenChou falls back to common Japanese system fonts.

## Mobile-first behavior

DenChou is tuned for AnkiDroid.

Small screens get lighter effects, quieter controls, and reduced runtime work where possible.
The desktop layout can be wider, but it should not become a different product.

## Getting started

DenChou is still being reshaped, so the safest setup path is manual for now.

Use the files in [`Template/`](Template/) and follow the template update flow in [`Template/README.md`](Template/README.md): replace the Front Template, Back Template, and Styling sections in Anki.

If you are moving from Senren, the `sentenceTranslation` field is no longer used in DenChou. Rename that field manually to `SentenceL1Note` in your Anki note type.

The older setup docs in [`docs/setup_overview.md`](docs/setup_overview.md) are inherited from Senren and may still contain upstream names while this fork is cleaned up.

## Project status

DenChou is actively being reshaped from Senren.

Some inherited documentation and behavior may still refer to Senren while the fork is cleaned up.
When in doubt, the DenChou template files and [`Template/DESIGN.md`](Template/DESIGN.md) are the source of truth for this fork.

## Credits and license

DenChou exists because Senren already did a lot of hard work.

Original project: [Senren・洗練](https://github.com/BrenoAqua/Senren)

License: GPLv3. See [`LICENSE`](LICENSE).

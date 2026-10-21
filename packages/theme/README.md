# slidev-theme-lightning-talks

The shared look and feel of every deck in this repo: the glow-polygon background, the dark code styling, the `night-owl` Shiki theme and the common frontmatter (fonts, transition, colour schema, ...).

Use it from a deck's `slides.md`:

```yaml
---
theme: lightning-talks
title: My talk
---
```

The theme builds on `@slidev/theme-default`, which it pulls in as an addon so the stock layouts and components stay available. Slidev resolves that addon from the deck folder, so `@slidev/theme-default` is a root `devDependency` of the workspace rather than a per-deck one.

## Glow colours

The background gradient colours can be changed per deck or per slide with `glowColors` (three CSS colours, right / left / top gradient):

```yaml
defaults:
  glowColors:
    - '#00dcc2'
    - '#2366a6'
    - '#5523a6'
```

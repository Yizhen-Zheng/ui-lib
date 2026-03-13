# Bauhaus UI — Getting Started

> A Bauhaus-inspired React component library.  
> Three layers: **Atoms** → **Layout** → **Composites**.

---

## 1. Prerequisites

Your project needs React + a CSS bundler (Vite, Next.js, CRA, etc.).  
The library ships as **raw TSX + a CSS file** — no npm package needed.

```bash
# These are already in 02_ui_lib, just reference them directly.
# No install required.
```

---

## 2. Project Setup

### 2-a. Copy (or symlink) the source

Point your project at the three source folders:

```
your-project/
├── src/
└── bauhaus/            ← copy or symlink 01_bauhaus/ here
    ├── tokens.css
    ├── atoms/
    ├── layout/
    └── composites/
```

### 2-b. Add path aliases (Vite example)

`vite.config.ts`

```ts
import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@atoms':      path.resolve(__dirname, './bauhaus/atoms'),
      '@layout':     path.resolve(__dirname, './bauhaus/layout'),
      '@composites': path.resolve(__dirname, './bauhaus/composites'),
    },
  },
})
```

`tsconfig.app.json` — add under `compilerOptions`:

```json
"paths": {
  "@atoms":        ["./bauhaus/atoms/index.ts"],
  "@atoms/*":      ["./bauhaus/atoms/*"],
  "@layout":       ["./bauhaus/layout/index.ts"],
  "@layout/*":     ["./bauhaus/layout/*"],
  "@composites":   ["./bauhaus/composites/index.ts"],
  "@composites/*": ["./bauhaus/composites/*"]
},
"include": ["src", "./bauhaus/atoms", "./bauhaus/layout", "./bauhaus/composites"]
```

---

## 3. Load the Design Tokens

Import `tokens.css` **once**, at the very top of your app entry:

```tsx
// src/main.tsx  (or _app.tsx / layout.tsx)
import '../bauhaus/tokens.css'
```

This exposes all CSS variables globally:

```css
var(--color-blue)       /* #1A56DB */
var(--color-red)        /* #E8401C */
var(--color-yellow)     /* #F5C400 */
var(--color-pink)       /* #F4A7B5 */
var(--color-bg)         /* #F5F0E8  warm cream */
var(--space-4)          /* 16px */
var(--text-xl)          /* 1.5rem */
var(--duration-normal)  /* 250ms */
/* ...see tokens.css for the full list */
```

---

## 4. Component Reference

### Layer 1 — Atoms `@atoms`

Pure SVG shapes. They always fill **100% of their parent**. Never position themselves.

```tsx
import { Circle, HalfCircle, Triangle, Rectangle } from '@atoms'
import { Checkerboard, Sunburst, GridLines }       from '@atoms'
```

| Component | Key props | Notes |
|---|---|---|
| `<Circle />` | `fill`, `stroke`, `strokeWidth` | Perfect circle |
| `<HalfCircle />` | `orientation` (`bottom`\|`top`\|`left`\|`right`), `fill` | D-shaped semicircle |
| `<Triangle />` | `direction` (`up`\|`down`\|`left`\|`right`), `fill` | Right-angle triangle |
| `<Rectangle />` | `fill`, `stroke`, `strokeWidth` | 100%×100% filled rect |
| `<Checkerboard />` | `cols`, `rows`, `colorA`, `colorB` | SVG grid pattern |
| `<Sunburst />` | `rays`, `stroke`, `strokeWidth` | Radial line burst |
| `<GridLines />` | `cols`, `rows`, `stroke` | Thin grid overlay |

**Rule:** atoms never have layout props (`width`, `top`, etc.). The parent decides size.

---

### Layer 2 — Layout `@layout`

Control **size, proportion, layering, position**.

```tsx
import { RatioBox, ShapeStack, Slot, BauhausGrid } from '@layout'
```

#### `<RatioBox ratio="w:h">`

Enforces a fixed aspect ratio. Put any atom inside and it fills the box.

```tsx
<RatioBox ratio="1:1" bg="var(--color-blue)">
  <Circle fill="var(--color-white)" />    {/* diameter = side length */}
</RatioBox>

<RatioBox ratio="2:1">                    {/* landscape */}
  <Checkerboard cols={6} rows={3} />
</RatioBox>

<RatioBox ratio="1:2">                    {/* portrait */}
  <HalfCircle orientation="bottom" fill="var(--color-yellow)" />
</RatioBox>
```

Available ratios: `"1:1"` `"2:1"` `"1:2"` `"3:2"` `"4:3"` `"16:9"`

---

#### `<ShapeStack>` + `<Slot>`

Stack multiple shapes on top of each other. Use `<Slot>` to position/size/rotate each layer.

```tsx
<ShapeStack ratio={1} bg="var(--color-blue)">

  {/* Layer 1 — fills the full area */}
  <Circle fill="var(--color-white)" />

  {/* Layer 2 — a positioned sub-region */}
  <Slot top="25%" left="25%" width="50%">
    <Circle fill="var(--color-red)" />
  </Slot>

  {/* Layer 3 — rotated */}
  <Slot top="10%" left="10%" width="80%" rotate="45deg">
    <HalfCircle fill="var(--color-yellow)" />
  </Slot>

</ShapeStack>
```

> **Size rule:**  
> - Direct child of `ShapeStack` (no Slot) → fills **100%** automatically  
> - Inside `<Slot width="X%">` → fills **X%** of the ShapeStack  
> - This is intentional — `Slot` is where you *explicitly* set size & position

`Slot` props: `top` `left` `bottom` `right` `width` `height` `rotate`

---

#### `<BauhausGrid layout="NxM">`

A CSS grid for tiling shapes into panel layouts.

```tsx
<BauhausGrid layout="2x2" gap="2px">
  <RatioBox ratio="1:1" bg="var(--color-black)"><Circle fill="var(--color-white)" /></RatioBox>
  <RatioBox ratio="1:1"><Checkerboard /></RatioBox>
  <RatioBox ratio="1:1" bg="var(--color-yellow)"><Triangle /></RatioBox>
  <RatioBox ratio="1:1" bg="var(--color-blue)"><HalfCircle /></RatioBox>
</BauhausGrid>

<BauhausGrid layout="3x3" gap="0">
  {/* 9 cells — each a RatioBox with an atom */}
</BauhausGrid>
```

Available layouts: `"1x1"` `"2x1"` `"1x2"` `"2x2"` `"3x2"` `"2x3"` `"3x3"`

---

### Layer 3 — Composites `@composites`

Pre-assembled illustrations matching specific Bauhaus motifs.  
Drop in and resize with `width`.

```tsx
import {
  BauhausEye,
  HeroGrid,
  DiagonalBars,
  PricingComposition,
  IndustryComposition,
} from '@composites'
```

| Component | Reference section | Key props |
|---|---|---|
| `<BauhausEye />` | Hero — eye motif | `bg`, `ringColor`, `pupilColor`, `highlightColor` |
| `<HeroGrid />` | Hero 3×3 panel | `gap` |
| `<DiagonalBars />` | Ops Team illustration | `ratio` |
| `<PricingComposition />` | Pricing section | — |
| `<IndustryComposition />` | Industry experts | — |

```tsx
{/* Resize by wrapping in a sized container or passing width */}
<div style={{ width: '320px' }}>
  <BauhausEye bg="var(--color-black)" ringColor="var(--color-yellow)" />
</div>

<div style={{ maxWidth: '460px' }}>
  <HeroGrid />
</div>
```

---

## 5. Full Example — Build a Card

```tsx
import '../bauhaus/tokens.css'
import { Circle, HalfCircle, Checkerboard } from '@atoms'
import { RatioBox, ShapeStack, Slot, BauhausGrid } from '@layout'
import { BauhausEye } from '@composites'

export function BauhausCard() {
  return (
    <div style={{
      width: '300px',
      fontFamily: 'var(--font-body)',
      background: 'var(--color-bg)',
      border: '1px solid var(--color-black)',
      padding: 'var(--space-4)',
    }}>

      {/* Illustration */}
      <BauhausGrid layout="2x2" gap="2px">
        <RatioBox ratio="1:1" bg="var(--color-blue)">
          <BauhausEye />
        </RatioBox>
        <RatioBox ratio="1:1">
          <Checkerboard cols={4} rows={4}
            colorA="var(--color-black)"
            colorB="var(--color-white)" />
        </RatioBox>
        <RatioBox ratio="1:1" bg="var(--color-yellow)">
          <HalfCircle orientation="bottom" fill="var(--color-red)" />
        </RatioBox>
        <RatioBox ratio="1:1" bg="var(--color-red)">
          <Circle fill="var(--color-white)" />
        </RatioBox>
      </BauhausGrid>

      {/* Text */}
      <p style={{
        fontSize: 'var(--text-base)',
        color: 'var(--color-black)',
        marginTop: 'var(--space-4)',
        lineHeight: 'var(--leading-normal)',
      }}>
        Your content here.
      </p>
    </div>
  )
}
```

---

## 6. Mental Model

```
tokens.css          ← the only source of colors / spacing / type
    ↓
<Circle />          ← "what does it look like?" (atoms)
    ↓ inside
<RatioBox />        ← "how big / what proportion?" (layout)
    ↓ inside
<ShapeStack>        ← "how are layers stacked?"   (layout)
  <Slot />          ← "where exactly in the stack?"
    ↓
<BauhausEye />      ← "what's the complete motif?" (composites)
```

**Atoms** only know their shape.  
**Layout** only knows position, size, layering.  
**Composites** assemble both into finished illustrations.

Never pass layout props (`width`, `top`, `rotate`) to an atom directly —  
always use a Layout component or Slot for that.

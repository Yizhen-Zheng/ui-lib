---
name: add-composite
description: Incrementally add a new Level 3 composite component to an existing Bauhaus-style design system by referencing a design image.
---

### 🧩 Add Composite — Incremental Level 3 Workflow

**When to use**: The base design system (Level 0–2) already exists, and you want to recreate a specific illustration/motif from a reference image as a new composite component.

---

#### Step 1: Analyze the Reference

- Receive a reference image (or a highlighted region of one).
- Decompose the visual into existing Level 1 atoms and Level 2 containers.
- Identify which atoms are needed (Circle, Triangle, Checkerboard, etc.), their colors (as token references), orientations, and relative positions/sizes.

#### Step 2: Check Existing Inventory

- Review `atoms/index.ts` and `layout/index.ts` — confirm all needed primitives already exist.
- If a new atom or layout primitive is needed, create it at the correct level first (do not embed one-off SVG in the composite).

#### Step 3: Compose

- Build the composite using only existing atoms + layout containers.
- The composite itself should have a **transparent background** — any page/section background color is the caller's responsibility.
- Use design token references (`var(--color-*)`) for all colors; never hardcode hex values.
- Keep the props API minimal — composites are specific motifs, not generic widgets. Typical props: `className`, `style`, and perhaps a few color overrides.

#### Step 4: Export & Preview

- Add the component and its prop types to `composites/index.ts`.
- Add a preview entry in the `preview/` app under the Level 3 section.
- Visually compare the rendered output against the reference image.

#### Step 5: Iterate

- Adjust orientations, proportions, and layering until the output matches the reference at a pixel-proportional level.
- Pay special attention to: triangle directions, half-circle orientations, checkerboard color alternation across adjacent cells, and z-ordering in `ShapeStack`.

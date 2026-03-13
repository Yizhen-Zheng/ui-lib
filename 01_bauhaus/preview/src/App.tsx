import React from "react";
import "../../tokens.css";
import "./App.css";
import { Circle, HalfCircle, Triangle, Rectangle, Checkerboard, Sunburst, GridLines } from "@atoms";
import { RatioBox, ShapeStack, Slot, BauhausGrid } from "@layout";
import {
  BauhausEye,
  HeroGrid,
  GridElementCombination,
  DiagonalBars,
  PricingComposition,
  IndustryComposition,
} from "@composites";

/* ── Small helpers ─────────────────────────────────────────── */

interface SwatchProps {
  label: string;
  color: string;
}
const Swatch: React.FC<SwatchProps> = ({ label, color }) => (
  <div className="swatch">
    <div className="swatch-block" style={{ background: color }} />
    <code className="swatch-label">{label}</code>
    <code className="swatch-hex">{color}</code>
  </div>
);

interface PreviewCellProps {
  label: string;
  children: React.ReactNode;
}
const Cell: React.FC<PreviewCellProps> = ({ label, children }) => (
  <div className="cell">
    <div className="cell-canvas">{children}</div>
    <code className="cell-label">{label}</code>
  </div>
);

/** FreeCell — like Cell but no forced aspect-ratio, so RatioBox shows real proportions */
const FreeCell: React.FC<PreviewCellProps> = ({ label, children }) => (
  <div className="cell">
    <div className="cell-canvas-free">{children}</div>
    <code className="cell-label">{label}</code>
  </div>
);

/* ── Section Components ────────────────────────────────────── */

/** Level 0 — Color Tokens */
function Level0() {
  return (
    <section className="section">
      <h2>🎨 Level 0 — Color Tokens</h2>
      <div className="swatch-row">
        <Swatch label="--color-red" color="var(--color-red)" />
        <Swatch label="--color-blue" color="var(--color-blue)" />
        <Swatch label="--color-yellow" color="var(--color-yellow)" />
        <Swatch label="--color-pink" color="var(--color-pink)" />
        <Swatch label="--color-black" color="var(--color-black)" />
        <Swatch label="--color-white" color="var(--color-white)" />
        <Swatch label="--color-bg" color="var(--color-bg)" />
      </div>
    </section>
  );
}

/** Level 1a — Shape Primitives */
function Level1Shapes() {
  return (
    <section className="section">
      <h2>🔷 Shape Primitives</h2>
      <div className="grid">
        <Cell label='<Circle fill="red" />'>
          <Circle fill="var(--color-red)" />
        </Cell>

        <Cell label='<Circle fill="blue" stroke="black" />'>
          <Circle fill="var(--color-white)" stroke="var(--color-black)" strokeWidth={3} />
        </Cell>

        <Cell label='<HalfCircle orientation="bottom" fill="blue" />'>
          <HalfCircle orientation="bottom" fill="var(--color-blue)" />
        </Cell>

        <Cell label='<HalfCircle orientation="top" fill="yellow" />'>
          <HalfCircle orientation="top" fill="var(--color-yellow)" />
        </Cell>

        <Cell label='<HalfCircle orientation="left" fill="pink" />'>
          <HalfCircle orientation="left" fill="var(--color-pink)" />
        </Cell>

        <Cell label='<HalfCircle orientation="right" fill="red" />'>
          <HalfCircle orientation="right" fill="var(--color-red)" />
        </Cell>

        <Cell label='<Triangle direction="up" fill="red" />'>
          <Triangle direction="up" fill="var(--color-red)" />
        </Cell>

        <Cell label='<Triangle direction="right" fill="yellow" />'>
          <Triangle direction="right" fill="var(--color-yellow)" />
        </Cell>

        <Cell label='<Triangle direction="down" fill="blue" />'>
          <Triangle direction="down" fill="var(--color-blue)" />
        </Cell>

        <Cell label='<Triangle direction="left" fill="pink" />'>
          <Triangle direction="left" fill="var(--color-pink)" />
        </Cell>

        <Cell label='<Rectangle fill="yellow" />'>
          <Rectangle fill="var(--color-yellow)" />
        </Cell>

        <Cell label='<Rectangle fill="none" stroke="black" />'>
          <Rectangle fill="none" stroke="var(--color-black)" strokeWidth={3} />
        </Cell>
      </div>
    </section>
  );
}

/** Level 1b — Pattern Fills */
function Level1Patterns() {
  return (
    <section className="section">
      <h2>🟡 Pattern Fills</h2>
      <div className="grid">
        <Cell label="<Checkerboard cols={4} rows={4} />">
          <Checkerboard cols={4} rows={4} colorA="var(--color-black)" colorB="var(--color-white)" />
        </Cell>

        <Cell label='<Checkerboard colorA="blue" colorB="yellow" />'>
          <Checkerboard cols={4} rows={4} colorA="var(--color-blue)" colorB="var(--color-yellow)" />
        </Cell>

        <Cell label="<Sunburst rays={16} /> (line mode)">
          <Sunburst rays={16} stroke="var(--color-black)" strokeWidth={1} />
        </Cell>

        <Cell label="<Sunburst rays={12} filled /> (wedge mode)">
          <Sunburst rays={12} filled fillColor="var(--color-red)" />
        </Cell>

        <Cell label="<GridLines cols={4} rows={4} />">
          <GridLines cols={4} rows={4} stroke="var(--color-black)" strokeWidth={1} />
        </Cell>

        <Cell label="<GridLines cols={3} rows={3} showBorder />">
          <GridLines cols={3} rows={3} stroke="var(--color-blue)" strokeWidth={1.5} showBorder />
        </Cell>
      </div>
    </section>
  );
}

/** Level 1c — Colour Combinations */
function Level1Combos() {
  return (
    <section className="section">
      <h2>🎭 Bauhaus Colour Combinations</h2>
      <p className="hint">Quick sanity check — multi-color layering visible in the reference image.</p>
      <div className="grid combos">
        <Cell label="Red circle over blue square">
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <Rectangle fill="var(--color-blue)" />
            <div style={{ position: "absolute", top: "25%", left: "25%", width: "50%", height: "50%" }}>
              <Circle fill="var(--color-red)" />
            </div>
          </div>
        </Cell>

        <Cell label="Yellow half + Checkerboard">
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <Checkerboard cols={4} rows={4} colorA="var(--color-black)" colorB="transparent" />
            <div style={{ position: "absolute", top: "50%", left: "0", width: "100%", height: "50%" }}>
              <HalfCircle orientation="bottom" fill="var(--color-yellow)" />
            </div>
          </div>
        </Cell>

        <Cell label="Sunburst + pink circle overlay">
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <Sunburst rays={24} stroke="var(--color-black)" strokeWidth={0.8} />
            <div style={{ position: "absolute", top: "30%", left: "30%", width: "40%", height: "40%" }}>
              <Circle fill="var(--color-pink)" />
            </div>
          </div>
        </Cell>

        <Cell label="Red triangle over grid">
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <GridLines cols={4} rows={4} stroke="var(--color-black)" strokeWidth={1} />
            <div style={{ position: "absolute", inset: 0 }}>
              <Triangle direction="right" fill="var(--color-red)" />
            </div>
          </div>
        </Cell>
      </div>
    </section>
  );
}

/** Level 2 — Layout Containers */
function Level2() {
  return (
    <section className="section">
      <h2>📐 Level 2 — Layout Containers</h2>
      <p className="hint">
        Containers control size, proportion, layering &amp; position. Atoms remain pure — only the wrapper changes.
      </p>

      {/* ── RatioBox ──────────────────────────────────────── */}
      <h3 className="sub-heading">RatioBox — enforced aspect ratio</h3>
      <div className="grid">
        <FreeCell label='<RatioBox ratio="1:1"><Circle /></RatioBox>'>
          <RatioBox ratio="1:1" bg="var(--color-blue)">
            <Circle fill="var(--color-white)" />
          </RatioBox>
        </FreeCell>

        <FreeCell label='<RatioBox ratio="2:1"><Checkerboard /></RatioBox>'>
          <RatioBox ratio="2:1">
            <Checkerboard cols={6} rows={3} colorA="var(--color-black)" colorB="var(--color-white)" />
          </RatioBox>
        </FreeCell>

        <FreeCell label='<RatioBox ratio="1:2"><HalfCircle /></RatioBox>'>
          <RatioBox ratio="1:2" bg="var(--color-yellow)">
            <HalfCircle orientation="bottom" fill="var(--color-red)" />
          </RatioBox>
        </FreeCell>
      </div>

      {/* ── ShapeStack + Slot ──────────────────────────────── */}
      <h3 className="sub-heading">ShapeStack + Slot — compositor</h3>
      <div className="grid combos">
        <Cell label="ShapeStack: blue bg + white circle + red circle">
          <ShapeStack ratio={1} bg="var(--color-blue)">
            <Circle fill="var(--color-white)" />
            <Slot top="25%" left="25%" width="50%">
              <Circle fill="var(--color-red)" />
            </Slot>
          </ShapeStack>
        </Cell>

        <Cell label="ShapeStack: Sunburst + rotated yellow HalfCircle">
          <ShapeStack ratio={1} bg="var(--color-bg)">
            <Sunburst rays={20} stroke="var(--color-black)" strokeWidth={0.8} />
            <Slot top="10%" left="10%" width="80%" rotate="45deg">
              <HalfCircle orientation="bottom" fill="var(--color-yellow)" />
            </Slot>
          </ShapeStack>
        </Cell>

        <Cell label="ShapeStack: Checkerboard + pink circle + triangle">
          <ShapeStack ratio={1}>
            <Checkerboard cols={4} rows={4} colorA="var(--color-black)" colorB="var(--color-white)" />
            <Slot top="0" left="0" width="100%" height="50%">
              <HalfCircle orientation="bottom" fill="var(--color-pink)" />
            </Slot>
            <Slot top="50%" left="25%" width="50%">
              <Triangle direction="up" fill="var(--color-yellow)" />
            </Slot>
          </ShapeStack>
        </Cell>

        <Cell label="ShapeStack: framed with border prop">
          <ShapeStack ratio={1} bg="var(--color-white)" border="2px solid var(--color-black)">
            <Slot top="0" left="0" width="50%" height="50%">
              <Rectangle fill="var(--color-blue)" />
            </Slot>
            <Slot top="0" left="50%" width="50%" height="50%">
              <Circle fill="var(--color-red)" />
            </Slot>
            <Slot top="50%" left="0" width="50%" height="50%">
              <Triangle direction="up" fill="var(--color-yellow)" />
            </Slot>
            <Slot top="50%" left="50%" width="50%" height="50%">
              <Checkerboard cols={2} rows={2} colorA="var(--color-black)" colorB="transparent" />
            </Slot>
          </ShapeStack>
        </Cell>
      </div>

      {/* ── BauhausGrid ────────────────────────────────────── */}
      <h3 className="sub-heading">BauhausGrid — panel system</h3>
      <div className="grid combos">
        <Cell label='<BauhausGrid layout="2x2" gap="2px" />'>
          <BauhausGrid layout="2x2" gap="2px" showBorder>
            <RatioBox ratio="1:1" bg="var(--color-red)">
              <Circle fill="var(--color-white)" />
            </RatioBox>
            <RatioBox ratio="1:1">
              <Checkerboard cols={3} rows={3} colorA="var(--color-black)" colorB="var(--color-white)" />
            </RatioBox>
            <RatioBox ratio="1:1" bg="var(--color-yellow)">
              <Triangle direction="up" fill="var(--color-black)" />
            </RatioBox>
            <RatioBox ratio="1:1" bg="var(--color-blue)">
              <HalfCircle orientation="bottom" fill="var(--color-white)" />
            </RatioBox>
          </BauhausGrid>
        </Cell>

        <Cell label='<BauhausGrid layout="3x3" gap="0" />'>
          <BauhausGrid layout="3x3" gap="0" showBorder>
            <RatioBox ratio="1:1">
              <Checkerboard cols={2} rows={2} colorA="var(--color-black)" colorB="var(--color-white)" />
            </RatioBox>
            <RatioBox ratio="1:1" bg="var(--color-blue)">
              <Circle fill="var(--color-yellow)" />
            </RatioBox>
            <RatioBox ratio="1:1" bg="var(--color-red)">
              <Triangle direction="right" fill="var(--color-white)" />
            </RatioBox>
            <RatioBox ratio="1:1" bg="var(--color-yellow)">
              <HalfCircle orientation="top" fill="var(--color-red)" />
            </RatioBox>
            <RatioBox ratio="1:1">
              <Sunburst rays={12} stroke="var(--color-black)" strokeWidth={1} />
            </RatioBox>
            <RatioBox ratio="1:1" bg="var(--color-blue)">
              <Rectangle fill="var(--color-white)" />
            </RatioBox>
            <RatioBox ratio="1:1" bg="var(--color-pink)">
              <Triangle direction="down" fill="var(--color-white)" />
            </RatioBox>
            <RatioBox ratio="1:1" bg="var(--color-black)">
              <Circle fill="var(--color-yellow)" />
            </RatioBox>
            <RatioBox ratio="1:1">
              <Checkerboard cols={2} rows={2} colorA="var(--color-blue)" colorB="var(--color-yellow)" />
            </RatioBox>
          </BauhausGrid>
        </Cell>
      </div>
    </section>
  );
}

/** Level 3 — Composite Components */
function Level3() {
  return (
    <section className="section">
      <h2>🧭 Level 3 — Composite Components</h2>
      <p className="hint">
        Assembled from Level 1 atoms + Level 2 containers. Each matches a specific illustration motif from the{" "}
        <strong>01.jpeg</strong> reference.
      </p>

      {/* ── BauhausEye ─────────────────────────────────── */}
      <h3 className="sub-heading">BauhausEye — eye motif</h3>
      <div className="grid">
        <Cell label="<BauhausEye /> (default)">
          <BauhausEye />
        </Cell>
        <Cell label="<BauhausEye bg=black ringColor=yellow />">
          <BauhausEye bg="var(--color-black)" ringColor="var(--color-yellow)" pupilColor="var(--color-pink)" />
        </Cell>
        <Cell label="<BauhausEye bg=red ringColor=white />">
          <BauhausEye
            bg="var(--color-red)"
            ringColor="var(--color-white)"
            pupilColor="var(--color-blue)"
            highlightColor="var(--color-yellow)"
          />
        </Cell>
      </div>

      {/* ── HeroGrid ─────────────────────────────────────── */}

      {/* ── GridElementCombination ────────────────────────── */}
      <h3 className="sub-heading">GridElementCombination — transparent background variant</h3>
      <div style={{ maxWidth: "460px" }}>
        <GridElementCombination />
      </div>

      {/* ── DiagonalBars ────────────────────────────────── */}
      <h3 className="sub-heading">DiagonalBars — Ops Team illustration</h3>
      <div style={{ maxWidth: "480px" }}>
        <DiagonalBars />
      </div>

      {/* ── PricingComposition ────────────────────────────── */}
      <h3 className="sub-heading">PricingComposition — pricing section</h3>
      <div className="grid combos">
        <Cell label="<PricingComposition /> (default)">
          <PricingComposition />
        </Cell>
      </div>

      {/* ── IndustryComposition ───────────────────────────── */}
      <h3 className="sub-heading">IndustryComposition — industry experts</h3>
      <div className="grid combos">
        <Cell label="<IndustryComposition /> (default)">
          <IndustryComposition />
        </Cell>
      </div>
    </section>
  );
}

/* ── App ───────────────────────────────────────────────────── */

export default function App() {
  return (
    <div className="app">
      <header className="page-header">
        <h1>
          Bauhaus Design System — <span>Atoms &amp; Layout</span>
        </h1>
        <p>
          Visual verification of all atom components against the <strong>01.jpeg</strong> reference.
        </p>
      </header>

      <Level0 />
      <Level1Shapes />
      <Level1Patterns />
      <Level1Combos />
      <Level2 />
      <Level3 />

      <footer className="page-footer">
        <p>
          Bauhaus UI Lib — Level 0 ✓ &nbsp;|&nbsp; Level 1 Atoms ✓ &nbsp;|&nbsp; Level 2 Layout ✓ &nbsp;|&nbsp; Level 3
          Composites ✓ &nbsp;🎉
        </p>
      </footer>
    </div>
  );
}

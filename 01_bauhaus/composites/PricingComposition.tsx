import React from 'react';
import { ShapeStack } from '../layout/ShapeStack';
import { Slot } from '../layout/Slot';
import { Circle } from '../atoms/Circle';
import { HalfCircle } from '../atoms/HalfCircle';
import { Triangle } from '../atoms/Triangle';
import { Rectangle } from '../atoms/Rectangle';
import { Sunburst } from '../atoms/Sunburst';

export interface PricingCompositionProps {
  /** Width of the component. Default: `'100%'` */
  width?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * PricingComposition — The "All-inclusive pricing" section illustration.
 *
 * Shows an outlined double-frame box with floating Bauhaus shapes inside:
 * - Red double half-circles at the top (butterfly / bow-tie motif)
 * - Yellow left-pointing triangle (left)
 * - Pink rectangle (right edge)
 * - Blue filled square (center-right)
 * - Small sunburst (center-bottom, lightly)
 *
 * The composition uses a thin-stroke outer frame (double rectangle outline)
 * matching the "framed illustration" style in the reference.
 *
 * ## Usage
 * ```tsx
 * <PricingComposition width="320px" />
 * ```
 */
export const PricingComposition: React.FC<PricingCompositionProps> = ({
  width = '100%',
  className,
  style,
}) => (
  <div
    className={className}
    style={{ position: 'relative', width, ...style }}
  >
    {/* Outer frame — double-rule border effect */}
    <div style={{
      padding: '8px',
      border: '1.5px solid var(--color-black)',
      position: 'relative',
    }}>
      <div style={{
        border: '1px solid var(--color-black)',
        position: 'relative',
      }}>
        <ShapeStack ratio={1.25} bg="var(--color-bg)">
          {/* Red half-circle top-left (flat side right, → facing left) */}
          <Slot top="5%" left="10%" width="35%" height="38%">
            <HalfCircle orientation="left" fill="var(--color-red)" />
          </Slot>

          {/* Red half-circle top-right (flat side left, → facing right) */}
          <Slot top="5%" left="42%" width="35%" height="38%">
            <HalfCircle orientation="right" fill="var(--color-red)" />
          </Slot>

          {/* Yellow triangle left-pointing */}
          <Slot top="52%" left="4%" width="22%" height="26%">
            <Triangle direction="left" fill="var(--color-yellow)" />
          </Slot>

          {/* Pink rectangle right side */}
          <Slot top="52%" left="74%" width="18%" height="30%">
            <Rectangle fill="var(--color-pink)" />
          </Slot>

          {/* Blue square center-right */}
          <Slot top="44%" left="50%" width="26%" height="30%">
            <Rectangle fill="var(--color-blue)" />
          </Slot>

          {/* Sunburst center-bottom: light decoration */}
          <Slot top="50%" left="28%" width="22%" height="22%">
            <Sunburst rays={12} stroke="var(--color-black)" strokeWidth={0.6} />
          </Slot>
        </ShapeStack>
      </div>
    </div>
  </div>
);

export default PricingComposition;

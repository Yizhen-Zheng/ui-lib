import React from 'react';
import { ShapeStack } from '../layout/ShapeStack';
import { Slot } from '../layout/Slot';
import { Circle } from '../atoms/Circle';
import { HalfCircle } from '../atoms/HalfCircle';
import { Rectangle } from '../atoms/Rectangle';
import { Sunburst } from '../atoms/Sunburst';

export interface IndustryCompositionProps {
  /** Width of the component. Default: `'100%'` */
  width?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * IndustryComposition — The "Industry experts" section illustration.
 *
 * A loose asymmetric arrangement of atoms around a dominant blue half-circle:
 * - Large blue half-circle (flat side right) — the dominant shape
 * - Orange/red filled circle — lower center
 * - Pink small circle — top-left floating
 * - Yellow square — left-center floating
 * - Thin outlined rectangle — wraps behind left shapes (sketch feel)
 * - Sunburst — glows behind, center
 *
 * Uses a transparent background so it floats on the page.
 *
 * ## Usage
 * ```tsx
 * <IndustryComposition width="380px" />
 * ```
 */
export const IndustryComposition: React.FC<IndustryCompositionProps> = ({
  width = '100%',
  className,
  style,
}) => (
  <ShapeStack
    ratio={1.1}
    bg="transparent"
    className={className}
    style={{ width, ...style }}
  >
    {/* Sunburst background — center glow */}
    <Slot top="18%" left="28%" width="45%">
      <Sunburst rays={20} stroke="var(--color-black)" strokeWidth={0.5} />
    </Slot>

    {/* Large blue half-circle — dominant, right half of composition */}
    <Slot top="10%" left="38%" width="62%" height="80%">
      <HalfCircle orientation="right" fill="var(--color-blue)" />
    </Slot>

    {/* Outlined thin rectangle — left background frame */}
    <Slot top="25%" left="2%" width="32%" height="55%">
      <Rectangle fill="none" stroke="var(--color-black)" strokeWidth={1.5} />
    </Slot>

    {/* Yellow filled square — left-center */}
    <Slot top="42%" left="4%" width="22%" height="22%">
      <Rectangle fill="var(--color-yellow)" />
    </Slot>

    {/* Pink small circle — top-left floating */}
    <Slot top="5%" left="5%" width="16%">
      <Circle fill="var(--color-pink)" />
    </Slot>

    {/* Orange/red circle — lower center, overlaps blue half */}
    <Slot top="52%" left="28%" width="30%">
      <Circle fill="var(--color-red)" />
    </Slot>
  </ShapeStack>
);

export default IndustryComposition;

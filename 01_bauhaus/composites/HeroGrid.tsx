import React from 'react';
import { BauhausGrid } from '../layout/BauhausGrid';
import { RatioBox } from '../layout/RatioBox';
import { ShapeStack } from '../layout/ShapeStack';
import { Slot } from '../layout/Slot';
import { Circle } from '../atoms/Circle';
import { HalfCircle } from '../atoms/HalfCircle';
import { Triangle } from '../atoms/Triangle';
import { Rectangle } from '../atoms/Rectangle';
import { Checkerboard } from '../atoms/Checkerboard';
import { Sunburst } from '../atoms/Sunburst';
import { BauhausEye } from './BauhausEye';

export interface HeroGridProps {
  /** Panel gap. Default: `'0'` */
  gap?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * HeroGrid — The 3×3 illustration panel from the hero section of the reference design.
 *
 * Exactly matches the composition visible in the top-right of 01.jpeg:
 *
 * ```
 * [ Sunburst     ] [ Orange Circle ] [ Checkerboard     ]
 * [ Eye (blue)   ] [ Yellow Half   ] [ Checkerboard     ]
 * [ Sunburst     ] [ Orange Tri    ] [ Pink Tri + Blue  ]
 * ```
 *
 * Each cell is a 1:1 RatioBox so the overall grid stays proportional at any width.
 *
 * ## Usage
 * ```tsx
 * <HeroGrid />                    // default 100% width
 * <HeroGrid gap="2px" />          // with visible seams
 * ```
 */
export const HeroGrid: React.FC<HeroGridProps> = ({
  gap = '0',
  className,
  style,
}) => (
  <BauhausGrid layout="3x3" gap={gap} className={className} style={style}>
    {/* Row 1 */}
    {/* [0,0] Sunburst top-left */}
    <RatioBox ratio="1:1" bg="var(--color-bg)">
      <Sunburst rays={16} stroke="var(--color-black)" strokeWidth={0.8} />
    </RatioBox>

    {/* [0,1] Large orange/red circle */}
    <RatioBox ratio="1:1" bg="var(--color-bg)">
      <Circle fill="var(--color-red)" />
    </RatioBox>

    {/* [0,2] Black/white checkerboard */}
    <RatioBox ratio="1:1">
      <Checkerboard cols={4} rows={4} colorA="var(--color-black)" colorB="var(--color-white)" />
    </RatioBox>

    {/* Row 2 */}
    {/* [1,0] BauhausEye */}
    <RatioBox ratio="1:1">
      <BauhausEye width="100%" />
    </RatioBox>

    {/* [1,1] Yellow half-circle (flat side down) */}
    <RatioBox ratio="1:1" bg="var(--color-bg)">
      <HalfCircle orientation="bottom" fill="var(--color-yellow)" />
    </RatioBox>

    {/* [1,2] Black/white checkerboard (continued) */}
    <RatioBox ratio="1:1">
      <Checkerboard cols={4} rows={4} colorA="var(--color-black)" colorB="var(--color-white)" />
    </RatioBox>

    {/* Row 3 */}
    {/* [2,0] Sunburst bottom-left */}
    <RatioBox ratio="1:1" bg="var(--color-bg)">
      <Sunburst rays={16} stroke="var(--color-black)" strokeWidth={0.8} />
    </RatioBox>

    {/* [2,1] Orange right-angled triangle (right-pointing bottom) */}
    <RatioBox ratio="1:1" bg="var(--color-red)">
      <Triangle direction="right" fill="var(--color-red)" />
    </RatioBox>

    {/* [2,2] Pink triangle + blue rectangle split */}
    <RatioBox ratio="1:1">
      <ShapeStack ratio={1} bg="var(--color-bg)">
        <Slot top="0" left="0" width="100%" height="60%">
          <Triangle direction="right" fill="var(--color-pink)" />
        </Slot>
        <Slot top="40%" left="0" width="100%" height="60%">
          <Rectangle fill="var(--color-blue)" />
        </Slot>
      </ShapeStack>
    </RatioBox>
  </BauhausGrid>
);

export default HeroGrid;

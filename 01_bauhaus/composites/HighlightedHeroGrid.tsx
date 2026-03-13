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

export interface HighlightedHeroGridProps {
  className?: string;
  style?: React.CSSProperties;
}

/**
 * A perfect recreation of the cyan-highlighted top-right graphic 
 * from the reference image, matching the transparent SVG backgrounds.
 */
export const HighlightedHeroGrid: React.FC<HighlightedHeroGridProps> = ({
  className,
  style,
}) => (
  // The light-yellow background ("淡黄色的 background") is applied on the container.
  <div 
    className={className} 
    style={{ ...style, backgroundColor: 'var(--color-bg)', width: '100%' }}
  >
    <BauhausGrid layout="3x3" gap="0">
      {/* Row 1 */}
      
      {/* [0,0] Sunburst top-left */}
      <RatioBox ratio="1:1" bg="transparent">
        <Sunburst rays={16} stroke="var(--color-black)" strokeWidth={0.8} />
      </RatioBox>

      {/* [0,1] Large orange/red circle */}
      <RatioBox ratio="1:1" bg="transparent">
        <Circle fill="var(--color-red)" />
      </RatioBox>

      {/* [0,2] Black/white checkerboard */}
      <RatioBox ratio="1:1" bg="transparent">
        <Checkerboard cols={3} rows={3} colorA="var(--color-black)" colorB="transparent" />
      </RatioBox>

      {/* Row 2 */}
      
      {/* [1,0] BauhausEye */}
      <RatioBox ratio="1:1" bg="transparent">
        <BauhausEye width="100%" />
      </RatioBox>

      {/* [1,1] Yellow half-circle */}
      <RatioBox ratio="1:1" bg="transparent">
        <HalfCircle orientation="bottom" fill="var(--color-yellow)" />
      </RatioBox>

      {/* [1,2] Checkerboard (continued seamlessly!) */}
      {/* Flipped colorA and colorB to correctly alternate and connect to the top cell's rows. */}
      <RatioBox ratio="1:1" bg="transparent">
        <Checkerboard cols={3} rows={3} colorA="transparent" colorB="var(--color-black)" />
      </RatioBox>

      {/* Row 3 */}
      
      {/* [2,0] Sunburst bottom-left */}
      <RatioBox ratio="1:1" bg="transparent">
        <Sunburst rays={16} stroke="var(--color-black)" strokeWidth={0.8} />
      </RatioBox>

      {/* [2,1] Orange right-angled triangle */}
      {/* Using 'left' direction perfectly places the right-angle at the bottom-right, matching the image. */}
      <RatioBox ratio="1:1" bg="transparent">
        <Triangle direction="left" fill="var(--color-red)" />
      </RatioBox>

      {/* [2,2] Pink triangle + blue rectangle split */}
      <RatioBox ratio="1:1" bg="transparent">
        <ShapeStack ratio={1} bg="transparent">
          <Slot top="0" left="0" width="100%" height="60%">
            <Triangle direction="right" fill="var(--color-pink)" />
          </Slot>
          <Slot top="40%" left="0" width="100%" height="60%">
            <Rectangle fill="var(--color-blue)" />
          </Slot>
        </ShapeStack>
      </RatioBox>

    </BauhausGrid>
  </div>
);

export default HighlightedHeroGrid;

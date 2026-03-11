import React from 'react';
import { ShapeStack } from '../layout/ShapeStack';
import { Slot } from '../layout/Slot';
import { Circle } from '../atoms/Circle';
import { Rectangle } from '../atoms/Rectangle';

export interface BauhausEyeProps {
  /** Width of the component. Height equals width (always square). Default: `'100%'` */
  width?: string;
  /** Background color of the square backing. Default: `var(--color-blue)` */
  bg?: string;
  /** Color of the outer ring (iris). Default: `var(--color-white)` */
  ringColor?: string;
  /** Color of the pupil ellipse. Default: `var(--color-red)` */
  pupilColor?: string;
  /** Color of the pupil highlight dot. Default: `var(--color-white)` */
  highlightColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * BauhausEye — The iconic eye motif from the reference illustration.
 *
 * Composition (back → front):
 * 1. Blue square (Rectangle as background)
 * 2. White full circle (iris ring) — 90% of frame
 * 3. Red oval (pupil) — 50% wide, 35% tall, centered
 * 4. Tiny white dot (specular highlight) — top-right of pupil
 *
 * ## Usage
 * ```tsx
 * <BauhausEye width="200px" />
 * <BauhausEye bg="var(--color-black)" ringColor="var(--color-yellow)" />
 * ```
 */
export const BauhausEye: React.FC<BauhausEyeProps> = ({
  width = '100%',
  bg = 'var(--color-blue)',
  ringColor = 'var(--color-white)',
  pupilColor = 'var(--color-red)',
  highlightColor = 'var(--color-white)',
  className,
  style,
}) => (
  <ShapeStack
    ratio={1}
    bg={bg}
    className={className}
    style={{ width, ...style }}
  >
    {/* Iris ring — large white circle filling nearly full frame */}
    <Slot top="5%" left="5%" width="90%">
      <Circle fill={ringColor} />
    </Slot>

    {/* Pupil — red oval: wide 50%, tall 35%, vertically centered */}
    <Slot top="32.5%" left="25%" width="50%" height="35%">
      <Circle fill={pupilColor} />
    </Slot>

    {/* Highlight — small white dot top-right of pupil */}
    <Slot top="34%" left="55%" width="12%">
      <Circle fill={highlightColor} />
    </Slot>
  </ShapeStack>
);

export default BauhausEye;

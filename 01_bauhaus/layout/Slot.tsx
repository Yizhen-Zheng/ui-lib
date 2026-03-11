import React from 'react';

export interface SlotProps {
  /**
   * Position from the top of the parent (ShapeStack / RatioBox).
   * Accepts any CSS length: `"25%"`, `"20px"`, `"var(--space-4)"`.
   */
  top?: string;
  left?: string;
  bottom?: string;
  right?: string;
  /** Width of this slot. Default: `'50%'` */
  width?: string;
  /** Height of this slot. Defaults to match width (square slot). */
  height?: string;
  /**
   * Rotation applied to the slot's content.
   * Matches the Bauhaus motif of tilted shapes (e.g. `"45deg"`).
   */
  rotate?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

/**
 * Slot — a positioned sub-region inside a `<ShapeStack>` or `<RatioBox>`.
 *
 * ## Design principle (from SKILL.md)
 * "形状（Shapes）只负责'长什么样'，由容器（Layout/Composites）负责'在哪、多大、转多少度'"
 *
 * `Slot` is the container that says "where, how big, and at what angle".
 * The atom inside says "what shape".
 *
 * ## Usage
 * ```tsx
 * <ShapeStack ratio={1} bg="var(--color-blue)">
 *   {/* Background: white circle filling the whole area *\/}
 *   <Circle fill="var(--color-white)" />
 *   {/* Foreground: small red circle in the centre *\/}
 *   <Slot top="25%" left="25%" width="50%" height="50%">
 *     <Circle fill="var(--color-red)" />
 *   </Slot>
 * </ShapeStack>
 * ```
 *
 * ## Rotation
 * ```tsx
 * <Slot top="10%" left="10%" width="80%" height="80%" rotate="45deg">
 *   <HalfCircle fill="var(--color-yellow)" />
 * </Slot>
 * ```
 */
export const Slot: React.FC<SlotProps> = ({
  top,
  left,
  bottom,
  right,
  width = '50%',
  height,
  rotate,
  className,
  style,
  children,
}) => (
  <div
    className={className}
    style={{
      position: 'absolute',
      top,
      left,
      bottom,
      right,
      width,
      height: height ?? width,   // square by default
      transform: rotate ? `rotate(${rotate})` : undefined,
      transformOrigin: 'center center',
      pointerEvents: 'none',
      ...style,
    }}
  >
    {children}
  </div>
);

export default Slot;

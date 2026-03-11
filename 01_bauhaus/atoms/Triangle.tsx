import React from 'react';

export interface TriangleProps {
  /**
   * Pointing direction of the apex:
   * - `up` (default) — equilateral triangle pointing up
   * - `down`
   * - `left`
   * - `right`
   */
  direction?: 'up' | 'down' | 'left' | 'right';
  fill?: string;
  stroke?: string;
  strokeWidth?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

const ROTATIONS: Record<NonNullable<TriangleProps['direction']>, number> = {
  up: 0,
  right: 90,
  down: 180,
  left: 270,
};

/**
 * Triangle — right-angled triangle (Bauhaus style, fills a square).
 * The right angle is always at the bottom-left corner;
 * the hypotenuse runs top-left → bottom-right.
 * Rotate via `direction` prop for the four orientations visible in the design.
 */
export const Triangle: React.FC<TriangleProps> = ({
  direction = 'up',
  fill = 'currentColor',
  stroke = 'none',
  strokeWidth = 0,
  className,
  style,
}) => {
  const rotation = ROTATIONS[direction];
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      aria-hidden="true"
      className={className}
      style={style}
    >
      {/*
       * Right-angle triangle: corners at (0,100), (100,100), (0,0).
       * This is the classic Bauhaus half-square motif.
       */}
      <g transform={`rotate(${rotation} 50 50)`}>
        <polygon
          points="0,100 100,100 0,0"
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinejoin="miter"
        />
      </g>
    </svg>
  );
};

export default Triangle;

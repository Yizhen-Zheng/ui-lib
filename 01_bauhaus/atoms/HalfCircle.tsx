import React from 'react';

export interface HalfCircleProps {
  /**
   * Which flat edge faces:
   * - `bottom` (default) — flat edge at bottom, dome up
   * - `top`    — flat edge at top, dome down
   * - `left`   — flat edge at left, dome right
   * - `right`  — flat edge at right, dome left
   */
  orientation?: 'bottom' | 'top' | 'left' | 'right';
  fill?: string;
  stroke?: string;
  strokeWidth?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

const ROTATIONS: Record<NonNullable<HalfCircleProps['orientation']>, number> = {
  bottom: 0,
  top: 180,
  left: 90,
  right: -90,
};

/**
 * HalfCircle — a D-shaped SVG (semicircle).
 * The `orientation` prop controls which edge is flat.
 * Size is 100% × 100% of parent; parent sets actual dimensions.
 */
export const HalfCircle: React.FC<HalfCircleProps> = ({
  orientation = 'bottom',
  fill = 'currentColor',
  stroke = 'none',
  strokeWidth = 0,
  className,
  style,
}) => {
  const rotation = ROTATIONS[orientation];
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
       * Arc path: start at left (0,50), arc to right (100,50), then close
       * up through the straight edge — produces a dome-up half circle.
       * We then rotate the whole group to achieve other orientations.
       */}
      <g transform={`rotate(${rotation} 50 50)`}>
        <path
          d="M 0 50 A 50 50 0 0 1 100 50 Z"
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default HalfCircle;

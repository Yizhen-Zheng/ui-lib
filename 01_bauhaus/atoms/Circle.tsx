import React from 'react';

export interface CircleProps {
  /** Fill color — use a CSS variable e.g. `var(--color-red)` or `currentColor` */
  fill?: string;
  /** Stroke color */
  stroke?: string;
  /** Stroke width (px, unitless for SVG) */
  strokeWidth?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Circle — full disk, 100% × 100% of parent container.
 * Controls "what it looks like"; parent controls size & position.
 */
export const Circle: React.FC<CircleProps> = ({
  fill = 'currentColor',
  stroke = 'none',
  strokeWidth = 0,
  className,
  style,
}) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    aria-hidden="true"
    className={className}
    style={style}
  >
    <circle
      cx="50"
      cy="50"
      r={stroke === 'none' ? 50 : 50 - Number(strokeWidth) / 2}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
    />
  </svg>
);

export default Circle;

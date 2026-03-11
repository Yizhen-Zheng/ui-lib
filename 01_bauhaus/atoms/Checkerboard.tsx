import React from 'react';

export interface CheckerboardProps {
  /**
   * Number of columns (and rows) in the grid.
   * Default: 4 (matches 4×4 grid visible in the design)
   */
  cols?: number;
  rows?: number;
  colorA?: string;  /* "dark" squares — default black */
  colorB?: string;  /* "light" squares — default transparent */
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Checkerboard — pure SVG pattern fill.
 * Uses an SVG `<pattern>` so the tiling is resolution-independent.
 * `colorA` / `colorB` accept CSS variable strings: `var(--color-black)`.
 */
export const Checkerboard: React.FC<CheckerboardProps> = ({
  cols = 4,
  rows = 4,
  colorA = 'var(--color-black)',
  colorB = 'transparent',
  className,
  style,
}) => {
  const cellW = 100 / cols;
  const cellH = 100 / rows;
  const patternId = React.useId();

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
      <defs>
        <pattern
          id={patternId}
          x="0"
          y="0"
          width={cellW * 2}
          height={cellH * 2}
          patternUnits="userSpaceOnUse"
        >
          {/* 2×2 super-cell: top-left A, top-right B, bottom-left B, bottom-right A */}
          <rect x="0"     y="0"     width={cellW} height={cellH} fill={colorA} />
          <rect x={cellW} y="0"     width={cellW} height={cellH} fill={colorB} />
          <rect x="0"     y={cellH} width={cellW} height={cellH} fill={colorB} />
          <rect x={cellW} y={cellH} width={cellW} height={cellH} fill={colorA} />
        </pattern>
      </defs>
      <rect x="0" y="0" width="100" height="100" fill={`url(#${patternId})`} />
    </svg>
  );
};

export default Checkerboard;

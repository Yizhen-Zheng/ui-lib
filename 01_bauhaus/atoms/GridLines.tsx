import React from 'react';

export interface GridLinesProps {
  /**
   * Number of vertical divisions (columns).
   * Default: 4
   */
  cols?: number;
  /**
   * Number of horizontal divisions (rows).
   * Default: 4
   */
  rows?: number;
  stroke?: string;
  strokeWidth?: number | string;
  /** If true, also render the outer bounding rect */
  showBorder?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * GridLines — an orthogonal grid of horizontal and vertical lines.
 * Matches the framed-grid / outline-box motif seen in the pricing section.
 * No fill; transparent background so shapes can overlap underneath.
 */
export const GridLines: React.FC<GridLinesProps> = ({
  cols = 4,
  rows = 4,
  stroke = 'var(--color-black)',
  strokeWidth = 'var(--stroke-weight-thin)',
  showBorder = true,
  className,
  style,
}) => {
  const colStep = 100 / cols;
  const rowStep = 100 / rows;

  const verticals = Array.from({ length: cols - 1 }, (_, i) => {
    const x = (i + 1) * colStep;
    return <line key={`v${i}`} x1={x} y1="0" x2={x} y2="100" stroke={stroke} strokeWidth={strokeWidth} />;
  });

  const horizontals = Array.from({ length: rows - 1 }, (_, i) => {
    const y = (i + 1) * rowStep;
    return <line key={`h${i}`} x1="0" y1={y} x2="100" y2={y} stroke={stroke} strokeWidth={strokeWidth} />;
  });

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
      {showBorder && (
        <rect
          x="0" y="0" width="100" height="100"
          fill="none"
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
      )}
      {verticals}
      {horizontals}
    </svg>
  );
};

export default GridLines;

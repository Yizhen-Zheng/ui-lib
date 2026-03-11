import React from 'react';

export interface RectangleProps {
  /**
   * Aspect ratio shorthand:
   * - `square` (default) — 1:1
   * - `wide`             — 2:1 (viewBox 200×100)
   * - `tall`             — 1:2 (viewBox 100×200)
   */
  aspect?: 'square' | 'wide' | 'tall';
  fill?: string;
  stroke?: string;
  strokeWidth?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

const VIEWBOXES: Record<NonNullable<RectangleProps['aspect']>, string> = {
  square: '0 0 100 100',
  wide:   '0 0 200 100',
  tall:   '0 0 100 200',
};

const POINTS: Record<NonNullable<RectangleProps['aspect']>, { w: number; h: number }> = {
  square: { w: 100, h: 100 },
  wide:   { w: 200, h: 100 },
  tall:   { w: 100, h: 200 },
};

/**
 * Rectangle — a solid-filled rect that fills its viewBox.
 * Use `aspect` to set proportions; actual size comes from the parent container.
 */
export const Rectangle: React.FC<RectangleProps> = ({
  aspect = 'square',
  fill = 'currentColor',
  stroke = 'none',
  strokeWidth = 0,
  className,
  style,
}) => {
  const { w, h } = POINTS[aspect];
  const sw = Number(strokeWidth);
  return (
    <svg
      viewBox={VIEWBOXES[aspect]}
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      aria-hidden="true"
      className={className}
      style={style}
    >
      <rect
        x={stroke === 'none' ? 0 : sw / 2}
        y={stroke === 'none' ? 0 : sw / 2}
        width={stroke === 'none' ? w : w - sw}
        height={stroke === 'none' ? h : h - sw}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

export default Rectangle;

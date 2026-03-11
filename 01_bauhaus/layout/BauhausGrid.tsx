import React from 'react';

export type GridLayout =
  | '1x1' | '1x2' | '2x1'
  | '2x2' | '2x3' | '3x2'
  | '3x3' | '4x4'
  | { cols: number; rows?: number };

export interface BauhausGridProps {
  /**
   * Grid layout preset or custom `{ cols, rows }` object.
   * - Preset strings like `"2x2"` are `columns × rows` notation.
   * - Default: `"2x2"`
   */
  layout?: GridLayout;
  /**
   * Gap between cells. Accepts any CSS length.
   * Default: `var(--gap-shape-grid)` (≈ 8px)
   */
  gap?: string;
  /**
   * If true, draws a border around the entire grid panel.
   * Matches the framed illustration panels in the design.
   */
  showBorder?: boolean;
  borderColor?: string;
  borderWidth?: string;
  /** Background behind the whole grid (outside cells) */
  bg?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

function parseLayout(layout: GridLayout): { cols: number; rows: number } {
  if (typeof layout === 'object') {
    return { cols: layout.cols, rows: layout.rows ?? layout.cols };
  }
  const [c, r] = layout.split('x').map(Number);
  return { cols: c, rows: r };
}

/**
 * BauhausGrid — A CSS-grid-based panel system.
 *
 * Matches the multi-shape illustration panels visible in the reference design
 * (e.g., the 3×3 hero grid, the 2×2 pricing panel).
 *
 * Each child occupies one grid cell. Children are responsible for their own
 * content (usually a `<RatioBox>` or `<ShapeStack>` wrapping a Level 1 atom).
 *
 * ## Usage
 * ```tsx
 * <BauhausGrid layout="2x2" gap="4px" showBorder>
 *   <RatioBox ratio="1:1"><Circle fill="var(--color-red)" /></RatioBox>
 *   <RatioBox ratio="1:1"><Checkerboard /></RatioBox>
 *   <RatioBox ratio="1:1"><Triangle fill="var(--color-yellow)" /></RatioBox>
 *   <RatioBox ratio="1:1"><HalfCircle fill="var(--color-blue)" /></RatioBox>
 * </BauhausGrid>
 * ```
 */
export const BauhausGrid: React.FC<BauhausGridProps> = ({
  layout = '2x2',
  gap = 'var(--gap-shape-grid)',
  showBorder = false,
  borderColor = 'var(--stroke-color-default)',
  borderWidth = 'var(--stroke-weight-thin)',
  bg = 'transparent',
  className,
  style,
  children,
}) => {
  const { cols } = parseLayout(layout);

  return (
    <div
      className={className}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap,
        backgroundColor: bg,
        border: showBorder ? `${borderWidth} solid ${borderColor}` : 'none',
        overflow: 'hidden',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default BauhausGrid;

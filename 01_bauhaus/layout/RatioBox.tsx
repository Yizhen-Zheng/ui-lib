import React from 'react';

export interface RatioBoxProps {
  /**
   * Aspect ratio as `width / height`.
   * Preset aliases:
   * - `"1:1"` → 1
   * - `"2:1"` → 2
   * - `"1:2"` → 0.5
   * - `"4:3"` → 4/3
   * - Or pass a raw number directly, e.g. `{16/9}`
   */
  ratio?: '1:1' | '2:1' | '1:2' | '4:3' | '3:4' | number;
  /** Optional background color (CSS var or hex). Default: transparent */
  bg?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const RATIO_PRESETS: Record<string, number> = {
  '1:1': 1,
  '2:1': 2,
  '1:2': 0.5,
  '4:3': 4 / 3,
  '3:4': 3 / 4,
};

/**
 * RatioBox — A container that enforces a specific aspect ratio on its children.
 *
 * Uses the padding-top % trick: a container with `padding-top: (1/ratio * 100%)` and
 * absolutely positioned children fills any available width while maintaining the ratio.
 *
 * ## Usage
 * ```tsx
 * <RatioBox ratio="1:1">
 *   <Circle fill="var(--color-red)" />
 * </RatioBox>
 * ```
 *
 * ## Design principle
 * This is the core sizing primitive at Level 2. Atoms (Level 1) are always 100%×100%
 * of their parent — `RatioBox` IS that parent. It decouples "what shape" from "how big".
 */
export const RatioBox: React.FC<RatioBoxProps> = ({
  ratio = '1:1',
  bg = 'transparent',
  className,
  style,
  children,
}) => {
  const numericRatio = typeof ratio === 'number'
    ? ratio
    : RATIO_PRESETS[ratio] ?? 1;

  const paddingTop = `${(1 / numericRatio) * 100}%`;

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        paddingTop,
        backgroundColor: bg,
        ...style,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default RatioBox;

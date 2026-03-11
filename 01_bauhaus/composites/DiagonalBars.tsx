import React from 'react';

export interface DiagonalBarsProps {
  /** Width of the component. Default: `'100%'` */
  width?: string;
  /** Aspect ratio (width / height). Default: `2.2` (landscape) */
  ratio?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * DiagonalBars — The "Ops Team" section illustration from the reference design.
 *
 * Shows overlapping colored parallelogram bands (red, pink, blue, yellow, black)
 * at a ~25° angle, with thin zigzag triangle outlines drawn over them in SVG.
 *
 * ## Design notes
 * - The bars are CSS-transformed `<div>`s rotated ~-20deg with skewX(-10deg)
 * - The zigzag overlays are pure SVG polylines on top
 * - No atoms needed — this composite is purely SVG + CSS
 *
 * ## Usage
 * ```tsx
 * <DiagonalBars />
 * <DiagonalBars width="480px" ratio={2.4} />
 * ```
 */
export const DiagonalBars: React.FC<DiagonalBarsProps> = ({
  width = '100%',
  ratio = 2.2,
  className,
  style,
}) => {
  const bars = [
    { color: 'var(--color-red)',    x: '5%',  w: '28%' },
    { color: 'var(--color-pink)',   x: '18%', w: '28%' },
    { color: 'var(--color-blue)',   x: '32%', w: '28%' },
    { color: 'var(--color-yellow)', x: '46%', w: '28%' },
    { color: 'var(--color-black)',  x: '60%', w: '28%' },
  ];

  // Zigzag paths: each is a polyline that looks like 2 mountain peaks
  const zigzags = [
    'M 12 90 L 25 10 L 37 90',
    'M 30 90 L 43 10 L 56 90',
    'M 48 90 L 61 10 L 74 90',
  ];

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width,
        paddingTop: `${(1 / ratio) * 100}%`,
        overflow: 'hidden',
        ...style,
      }}
    >
      <div style={{ position: 'absolute', inset: 0 }}>
        {/* Colored parallelogram bars */}
        {bars.map((bar, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: '-30%',
              left: bar.x,
              width: bar.w,
              height: '160%',
              backgroundColor: bar.color,
              transform: 'skewX(-22deg)',
              transformOrigin: 'top left',
            }}
          />
        ))}

        {/* Zigzag SVG overlays */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        >
          {zigzags.map((d, i) => (
            <polyline
              key={i}
              points={d.replace('M ', '').replace(/L /g, ' ')}
              fill="none"
              stroke="var(--color-bg)"
              strokeWidth="1.5"
              strokeLinejoin="miter"
            />
          ))}
        </svg>
      </div>
    </div>
  );
};

export default DiagonalBars;

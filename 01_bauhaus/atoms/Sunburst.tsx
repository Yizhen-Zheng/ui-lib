import React from 'react';

export interface SunburstProps {
  /**
   * Number of rays radiating from the center.
   * Default: 16 (matches the burst pattern in the design)
   */
  rays?: number;
  /** Color of the ray lines */
  stroke?: string;
  strokeWidth?: number | string;
  /** If true, render as a filled alternating-wedge sunburst; false = line rays only */
  filled?: boolean;
  fillColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Sunburst — a starburst of rays radiating from center (50, 50).
 * Visible in the design as thin-line radiating patterns on the hero image.
 * Line-only mode matches the "asterisk / snowflake" look in the illustration.
 */
export const Sunburst: React.FC<SunburstProps> = ({
  rays = 16,
  stroke = 'var(--color-black)',
  strokeWidth = 'var(--stroke-weight-thin)',
  filled = false,
  fillColor = 'var(--color-yellow)',
  className,
  style,
}) => {
  const cx = 50;
  const cy = 50;
  const outerR = 50;

  const lines: React.ReactElement[] = [];
  const wedges: React.ReactElement[] = [];

  for (let i = 0; i < rays; i++) {
    const angleDeg = (i * 360) / rays;
    const angleRad = (angleDeg * Math.PI) / 180;
    const x2 = cx + outerR * Math.cos(angleRad);
    const y2 = cy + outerR * Math.sin(angleRad);

    if (!filled) {
      lines.push(
        <line
          key={i}
          x1={cx}
          y1={cy}
          x2={x2}
          y2={y2}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      );
    } else {
      // Filled wedge (alternating slices)
      if (i % 2 === 0) {
        const nextAngleDeg = ((i + 1) * 360) / rays;
        const nextAngleRad = (nextAngleDeg * Math.PI) / 180;
        const nx2 = cx + outerR * Math.cos(nextAngleRad);
        const ny2 = cy + outerR * Math.sin(nextAngleRad);
        wedges.push(
          <path
            key={i}
            d={`M ${cx} ${cy} L ${x2} ${y2} A ${outerR} ${outerR} 0 0 1 ${nx2} ${ny2} Z`}
            fill={fillColor}
            stroke="none"
          />
        );
      }
    }
  }

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
      {filled ? wedges : lines}
    </svg>
  );
};

export default Sunburst;

import React from 'react';

export interface ShapeStackProps {
  /**
   * Width of the stack container. Accepts any CSS width value.
   * Height is determined by the `ratio` of the container.
   * Default: `'100%'`
   */
  width?: string;
  /**
   * Aspect ratio of the stack area (width / height).
   * Used with padding-top trick so the stack stays proportional.
   * Default: 1 (square)
   */
  ratio?: number;
  /** Optional background fill for the whole stack area */
  bg?: string;
  /** Optional CSS border for the stack area */
  border?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

/**
 * ShapeStack — A layering container where all direct children are stacked
 * absolutely on top of each other, filling 100% of the container.
 *
 * ## Design principle
 * This is the compositor for Level 3 composites. Instead of nesting
 * `position: absolute` manually in every composite component, you pass
 * multiple atoms as children and they all occupy the same space:
 *
 * ```tsx
 * <ShapeStack ratio={1} bg="var(--color-blue)">
 *   <Circle fill="var(--color-white)" />                    // fills whole area
 *   <Slot top="25%" left="25%" width="50%" height="50%">   // positioned sub-slot
 *     <Circle fill="var(--color-red)" />
 *   </Slot>
 * </ShapeStack>
 * ```
 *
 * Children are rendered in DOM order (last child = topmost layer).
 */
export const ShapeStack: React.FC<ShapeStackProps> = ({
  width = '100%',
  ratio = 1,
  bg = 'transparent',
  border,
  className,
  style,
  children,
}) => {
  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width,
        paddingTop: `${(1 / ratio) * 100}%`,
        backgroundColor: bg,
        border,
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* Each child is absolutely inset to fill the full stack area */}
      {React.Children.map(children, (child, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default ShapeStack;

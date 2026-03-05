import * as React from "react";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "../../lib/utils";

interface AnimatedCircleWordProps {
  children: React.ReactNode;
  className?: string;
  circleClassName?: string;
  duration?: number;
}

/**
 * Wraps a word with an SVG ellipse that draws (pathLength 0→1) when the section enters view.
 */
export const AnimatedCircleWord: React.FC<AnimatedCircleWordProps> = ({
  children,
  className,
  circleClassName,
  duration = 1.2,
}) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { amount: 0.8, once: true });

  return (
    <span
      ref={containerRef}
      className={cn("relative inline-block px-1.5", className)}
    >
      {children}
      <motion.svg
        className={cn(
          "absolute inset-0 -m-4 w-[calc(100%+2rem)] h-[calc(100%+1.5rem)] text-current pointer-events-none",
          circleClassName,
        )}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M 50 4 A 46 44 0 1 1 49.99 4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            isInView
              ? { pathLength: 1, opacity: 1 }
              : { pathLength: 0, opacity: 0 }
          }
          transition={{
            duration,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        />
      </motion.svg>
    </span>
  );
};

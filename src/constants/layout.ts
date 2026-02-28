/**
 * Shared layout class names for consistency across sections and layout components.
 */

/** Section outer padding: horizontal and vertical */
export const SECTION_PADDING = "px-6 md:px-12 py-20 md:py-32";

/** Section top border (subtle divider) */
export const SECTION_BORDER = "border-t border-black/5 dark:border-white/5";

/** Common max-width containers */
export const CONTAINER = {
  narrow: "max-w-3xl mx-auto",
  medium: "max-w-4xl mx-auto",
  wide: "max-w-5xl mx-auto",
  full: "max-w-[1400px] mx-auto",
} as const;

/** Text that appears above section headings (eyebrow) */
export const EYEBROW_CLASSES =
  "text-xs font-bold tracking-[0.2em] uppercase text-text-secondary dark:text-gray-400";

/** Primary section heading (h2) */
export const SECTION_HEADING_CLASSES =
  "text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-primary dark:text-white leading-tight";

/** Body text in sections */
export const SECTION_BODY_CLASSES =
  "text-lg md:text-xl font-light leading-relaxed text-text-secondary dark:text-gray-300";

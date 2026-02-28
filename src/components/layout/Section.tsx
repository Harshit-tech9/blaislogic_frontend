import React from "react";
import { cn } from "../../lib/utils";
import { SECTION_PADDING, SECTION_BORDER } from "../../constants/layout";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Semantic element; default "section" */
  as?: "section" | "div" | "article";
  /** Whether to show top border; default true */
  withBorder?: boolean;
  /** Extra class for the outer wrapper */
  className?: string;
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({
  as: Component = "section",
  withBorder = true,
  className,
  children,
  ...props
}) => {
  return (
    <Component
      className={cn(
        SECTION_PADDING,
        withBorder && SECTION_BORDER,
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

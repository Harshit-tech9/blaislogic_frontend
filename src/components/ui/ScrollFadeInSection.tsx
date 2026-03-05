import React from "react";
import { ScrollFadeIn } from "./ScrollFadeIn";

interface ScrollFadeInSectionProps {
  children: React.ReactNode;
}

/**
 * Wraps each direct child in ScrollFadeIn. Use for landing page sections.
 */
export const ScrollFadeInSection: React.FC<ScrollFadeInSectionProps> = ({
  children,
}) => {
  return (
    <>
      {React.Children.map(children, (child) =>
        child != null ? <ScrollFadeIn>{child}</ScrollFadeIn> : null
      )}
    </>
  );
};

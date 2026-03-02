import React from "react";
import { Hero } from "../components/landing/Hero";
import { Philosophy } from "../components/landing/Philosophy";
import { Infrastructure } from "../components/landing/Infrastructure";
import { VisualBreak } from "../components/landing/VisualBreak";
import { CTA } from "../components/landing/CTA";
import { ScrollFadeIn } from "../components/ui/ScrollFadeIn";

/**
 * Home page: assembles landing sections (Hero, Philosophy, Infrastructure, VisualBreak, CTA) in order.
 */
export const HomePage: React.FC = () => {
  return (
    <>
      <ScrollFadeIn>
        <Hero />
      </ScrollFadeIn>
      <ScrollFadeIn>
        <Philosophy />
      </ScrollFadeIn>
      <ScrollFadeIn>
        <Infrastructure />
      </ScrollFadeIn>
      <ScrollFadeIn>
        <VisualBreak />
      </ScrollFadeIn>
      <ScrollFadeIn>
        <CTA />
      </ScrollFadeIn>
    </>
  );
};

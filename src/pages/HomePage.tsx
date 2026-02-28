import React from "react";
import { Hero } from "../components/landing/Hero";
import { Philosophy } from "../components/landing/Philosophy";
import { Infrastructure } from "../components/landing/Infrastructure";
import { VisualBreak } from "../components/landing/VisualBreak";
import { CTA } from "../components/landing/CTA";

/**
 * Home page: assembles landing sections (Hero, Philosophy, Infrastructure, VisualBreak, CTA) in order.
 */
export const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <Philosophy />
      <Infrastructure />
      <VisualBreak />
      <CTA />
    </>
  );
};

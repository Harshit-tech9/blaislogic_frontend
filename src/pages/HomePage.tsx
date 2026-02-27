import React from "react";
import { Hero } from "../components/sections/Hero";
import { Philosophy } from "../components/sections/Philosophy";
import { Infrastructure } from "../components/sections/Infrastructure";
import { VisualBreak } from "../components/sections/VisualBreak";
import { CTA } from "../components/sections/CTA";

/**
 * Home page: assembles all landing sections in order.
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

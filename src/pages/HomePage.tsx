import React from "react";
import { Hero } from "../components/landing/Hero";
import { Products } from "../components/landing/Products";
import { Philosophy } from "../components/landing/Philosophy";
import { CTA } from "../components/landing/CTA";
import { ScrollFadeInSection } from "../components/ui/ScrollFadeInSection";

/**
 * Home page: Hero, Products (2nd), Philosophy, CTA.
 */
export const HomePage: React.FC = () => {
  return (
    <ScrollFadeInSection>
      <Hero />
      <Products />
      <Philosophy />
      <CTA />
    </ScrollFadeInSection>
  );
};

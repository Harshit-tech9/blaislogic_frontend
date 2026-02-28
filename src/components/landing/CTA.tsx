import React from "react";
import { Button } from "../ui/Button";
import { Section } from "../layout/Section";
import { Container } from "../layout/Container";

export const CTA: React.FC = () => {
  return (
    <Section
      className="py-32 md:py-48 flex flex-col items-center justify-center text-center bg-background-light dark:bg-background-dark"
      withBorder={false}
    >
      <Container width="medium" className="flex flex-col gap-10 items-center">
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-primary dark:text-white leading-[0.9]">
          Build with clarity.
        </h2>
        <p className="text-xl font-light text-text-secondary dark:text-gray-400 max-w-xl">
          Join the architects of the new intelligence era.
        </p>
        <Button size="lg" className="mt-4 px-12 h-16 text-lg">
          Start Now
        </Button>
      </Container>
    </Section>
  );
};

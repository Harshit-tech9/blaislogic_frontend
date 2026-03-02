import React from "react";
import { Icon } from "../ui/Icon";
import { Section } from "../layout/Section";
import { Container } from "../layout/Container";
import { cn } from "../../lib/utils";
import { SECTION_HEADING_CLASSES, SECTION_BODY_CLASSES } from "../../constants/layout";

export const Philosophy: React.FC = () => {
  return (
    <Section>
      <Container width="narrow" className="text-center flex flex-col gap-6 md:gap-8">
        <Icon
          name="grid_view"
          className="stagger-1 text-4xl font-extralight text-primary/30 dark:text-white/30 mb-4 mx-auto"
          aria-hidden
        />
        <h2 className={cn("stagger-2", SECTION_HEADING_CLASSES)}>
          Intelligence needs structure.
        </h2>
        <p className={cn("stagger-3", SECTION_BODY_CLASSES)}>
          We believe that true intelligence is not just about raw power, but
          about the architecture that sustains it. Blaiselogic provides the
          foundational grid upon which the next generation of AI is built.
          Precision, reliability, and meaningful output are not just goals; they
          are the baseline.
        </p>
      </Container>
    </Section>
  );
};

import React from "react";
import { Icon } from "../ui/Icon";
import { Section } from "../layout/Section";
import { Container } from "../layout/Container";
import { cn } from "../../lib/utils";
import { AnimatedText } from "../ui/AnimatedUnderlineTextOne";
import {
  SECTION_HEADING_CLASSES,
  SECTION_BODY_CLASSES,
} from "../../constants/layout";

export const Philosophy: React.FC = () => {
  return (
    <Section>
      <Container
        width="narrow"
        className="text-center flex flex-col gap-6 md:gap-8"
      >
        <Icon
          name="grid_view"
          className="stagger-1 text-4xl font-extralight text-primary/30 dark:text-white/30 mb-4 mx-auto"
          aria-hidden
        />
        <AnimatedText
          text="Intelligence needs structure."
          className="stagger-2"
          textClassName={cn(SECTION_HEADING_CLASSES)}
        />
        <p className={cn("stagger-3", SECTION_BODY_CLASSES)}>
        Good AI products aren't just powerful, they're reliable, controlled, and built around how people actually work. That's what we focus on at BlaiseLogic.
        </p>
      </Container>
    </Section>
  );
};

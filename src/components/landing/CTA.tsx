import React from "react";
import { Section } from "../layout/Section";
import { Container } from "../layout/Container";
import { DISPLAY_HEADING_CLASSES } from "../../constants/layout";
import { AnimatedCircleWord } from "../ui/AnimatedCircleWord";
import { INFRASTRUCTURE_FEATURES } from "../../config/site";
import { cn } from "../../lib/utils";

const CTA_BUTTON_CLASSES =
  "inline-flex items-center justify-center rounded-full font-semibold tracking-wide transition-all duration-200 h-14 px-8 text-base bg-white text-primary hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-background-dark";

export const CTA: React.FC = () => {
  const [metricAI, aiAdFactory] = INFRASTRUCTURE_FEATURES;

  return (
    <Section
      className="py-20 md:py-28 flex flex-col items-center justify-center"
      withBorder={false}
    >
      <Container width="medium" className="flex flex-col items-center">
        <div
          className={cn(
            "w-full max-w-5xl rounded-3xl px-8 py-12 md:px-14 md:py-14",
            "bg-background-dark border border-white/10",
            "flex flex-col items-center justify-center text-center gap-8",
          )}
        >
          <h2
            className={cn(
              "stagger-1",
              DISPLAY_HEADING_CLASSES,
              "text-white text-balance",
            )}
          >
            <AnimatedCircleWord
              className="text-white"
              circleClassName="text-white/70"
              duration={1.2}
            >
              Ready
            </AnimatedCircleWord>{" "}
            to cut the noise?
          </h2>
          <p className="stagger-2 text-xl font-light text-gray-400 max-w-xl">
            Find the product that fits and get started in minutes.
          </p>
          <div className="stagger-3 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a
              href={metricAI.siteUrl || "#products"}
              target={
                metricAI.siteUrl?.startsWith("http") ? "_blank" : undefined
              }
              rel={
                metricAI.siteUrl?.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              className={cn(CTA_BUTTON_CLASSES)}
            >
              Explore MetricAI
            </a>
            <a
              href={aiAdFactory.siteUrl || "#products"}
              target={
                aiAdFactory.siteUrl?.startsWith("http") ? "_blank" : undefined
              }
              rel={
                aiAdFactory.siteUrl?.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              className={cn(CTA_BUTTON_CLASSES)}
            >
              Explore AIAdFactory
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
};

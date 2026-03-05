import React from "react";
import { Icon } from "../ui/Icon";
import { cn } from "../../lib/utils";
import { Container } from "../layout/Container";
import { EYEBROW_CLASSES } from "../../constants/layout";
import { INFRASTRUCTURE_FEATURES } from "../../config/site";

export const Infrastructure: React.FC = () => {
  return (
    <section
      id="products"
      className="px-6 md:px-12 py-20 md:py-32 border-t border-black/5 dark:border-white/5"
      aria-labelledby="infrastructure-heading"
    >
      <Container>
        <p
          id="infrastructure-heading"
          className={cn("stagger-1", EYEBROW_CLASSES, "mb-16 md:mb-24")}
        >
          Infrastructure Components
        </p>

        <div className="stagger-2 grid grid-cols-1 md:grid-cols-3 gap-0 md:divide-x divide-black/10 dark:divide-white/10">
          {INFRASTRUCTURE_FEATURES.map((feature, index) => {
            const href = feature.siteUrl || "#contact";
            const isMetricAI = feature.title === "MetricAI";
            return (
              <a
                key={feature.title}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex flex-col gap-4 px-6 py-8 md:px-8 md:py-10 border-black/5 dark:border-white/5 group min-w-0 no-underline text-inherit transition-[background-color,box-shadow,color,transform] duration-300 ease-in-out text-center lg:hover:-translate-y-0.5",
                  {
                    "border-t md:border-t-0": index !== 0,
                    "metric-ai-card md:rounded-xl overflow-hidden": isMetricAI,
                  },
                  !isMetricAI && "lg:hover:opacity-95",
                )}
              >
                <div className="flex items-center justify-center mb-2 relative">
                  <h3
                    className={cn(
                      "text-3xl md:text-4xl font-bold tracking-tight transition-colors duration-300 ease-in-out text-primary dark:text-white",
                      !isMetricAI && "lg:group-hover:opacity-70",
                    )}
                  >
                    {isMetricAI ? (
                      <>
                        <span className="transition-colors duration-300 ease-in-out lg:group-hover:text-white">
                          Metric
                        </span>
                        <span className="transition-colors duration-300 ease-in-out lg:group-hover:text-metric-ai">
                          AI
                        </span>
                      </>
                    ) : (
                      feature.title
                    )}
                  </h3>
                  <Icon
                    name="arrow_forward"
                    className={cn(
                      "absolute right-0 top-0 transition-all duration-300 ease-in-out -rotate-45 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 text-primary dark:text-white",
                      isMetricAI && "lg:group-hover:text-white",
                    )}
                    aria-hidden
                  />
                </div>
                <p
                  className={cn(
                    "text-base md:text-lg font-light leading-relaxed transition-colors duration-300 ease-in-out",
                    isMetricAI
                      ? "text-text-secondary dark:text-gray-400 lg:group-hover:text-white"
                      : "text-text-secondary dark:text-gray-400",
                  )}
                >
                  {feature.description}
                </p>
                <span
                  className={cn(
                    "mt-auto pt-6 text-sm font-semibold underline underline-offset-4 transition-all duration-300 ease-in-out opacity-100 lg:opacity-0 lg:group-hover:opacity-100",
                    isMetricAI
                      ? "text-primary dark:text-white lg:group-hover:text-white"
                      : "text-primary dark:text-white",
                  )}
                >
                  {feature.buttonLabel}
                </span>
              </a>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

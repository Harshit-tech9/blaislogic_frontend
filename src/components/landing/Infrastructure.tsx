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
        <p id="infrastructure-heading" className={cn(EYEBROW_CLASSES, "mb-16 md:mb-24")}>
          Infrastructure Components
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:divide-x divide-black/10 dark:divide-white/10">
          {INFRASTRUCTURE_FEATURES.map((feature, index) => {
            const href = feature.siteUrl || "#contact";
            const isExternal = Boolean(feature.siteUrl);
            return (
              <a
                key={feature.title}
                href={href}
                {...(isExternal && {
                  target: "_blank",
                  rel: "noopener noreferrer",
                })}
                className={cn(
                  "flex flex-col gap-4 py-8 md:py-0 border-black/5 dark:border-white/5 group min-w-0 no-underline text-inherit hover:opacity-95 transition-opacity",
                  {
                    "md:pr-12": index === 0,
                    "md:px-6 border-t md:border-t-0": index === 1,
                    "md:pl-12 border-t md:border-t-0": index === 2,
                  },
                )}
              >
                <div
                  className={cn(
                    "flex items-center mb-2 relative",
                    index === 1
                      ? "justify-between md:justify-center lg:justify-between"
                      : "justify-between",
                  )}
                >
                  <h3 className="text-3xl md:text-4xl font-bold tracking-tight group-hover:opacity-70 transition-opacity text-primary dark:text-white">
                    {feature.title}
                  </h3>
                  <Icon
                    name="arrow_forward"
                    className={cn(
                      "transition-opacity -rotate-45 opacity-0 group-hover:opacity-100 text-primary dark:text-white",
                      index === 1 && "md:absolute md:right-0 lg:static",
                    )}
                    aria-hidden
                  />
                </div>
                <p className="text-base md:text-lg text-text-secondary dark:text-gray-400 font-light leading-relaxed">
                  {feature.description}
                </p>
                <span className="mt-auto pt-6 opacity-0 group-hover:opacity-100 transition-opacity text-sm font-semibold underline underline-offset-4 text-primary dark:text-white">
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

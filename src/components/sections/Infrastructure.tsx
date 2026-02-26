import React from "react";
import { Icon } from "../ui/Icon";
import { cn } from "../../lib/utils";

interface Feature {
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    title: "MetricAI",
    description:
      "Track AI usage and performance across providers. Monitor inputs, outputs, latency, and cost in real time with clear, actionable visibility.",
  },
  {
    title: "AIAdFactory",
    description:
      "Generate high-quality ads directly from WhatsApp. Chat with AI, answer simple prompts, and receive ready-to-launch campaign content instantly.",
  },
  {
    title: "Solutions",
    description:
      "Custom AI systems designed around your needs. We build practical, reliable AI setups that solve real-world problems effectively.",
  },
];

export const Infrastructure: React.FC = () => {
  return (
    <section className="px-6 md:px-12 py-20 md:py-32 border-t border-black/5 dark:border-white/5">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-16 md:mb-24">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-text-secondary dark:text-gray-400">
            Infrastructure Components
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:divide-x divide-black/10 dark:divide-white/10">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={cn(
                "flex flex-col gap-4 py-8 md:py-0 border-black/5 dark:border-white/5 group cursor-pointer min-w-0",
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
                  index === 1 ? "justify-center" : "justify-between",
                )}
              >
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight group-hover:opacity-70 transition-opacity">
                  {feature.title}
                </h3>
                <Icon
                  name="arrow_forward"
                  className={cn(
                    "transition-opacity -rotate-45",
                    index === 1
                      ? "absolute right-0 opacity-0 group-hover:opacity-100"
                      : "opacity-0 group-hover:opacity-100",
                  )}
                />
              </div>
              <p className="text-base md:text-lg text-text-secondary dark:text-gray-400 font-light leading-relaxed">
                {feature.description}
              </p>
              <div className="mt-auto pt-6 opacity-0 group-hover:opacity-100 transition-opacity text-sm font-semibold underline underline-offset-4">
                Learn more
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

import React from "react";
import { Icon } from "../ui/Icon";

export const Philosophy: React.FC = () => {
  return (
    <section className="px-6 md:px-12 py-20 md:py-32 border-t border-black/5 dark:border-white/5">
      <div className="max-w-3xl mx-auto text-center flex flex-col gap-6 md:gap-8">
        <Icon
          name="grid_view"
          className="text-4xl font-extralight text-primary/30 dark:text-white/30 mb-4 mx-auto"
        />
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-primary dark:text-white leading-tight">
          Intelligence needs structure.
        </h2>
        <p className="text-lg md:text-xl font-light leading-relaxed text-text-secondary dark:text-gray-300">
          We believe that true intelligence is not just about raw power, but
          about the architecture that sustains it. Blaiselogic provides the
          foundational grid upon which the next generation of AI is built.
          Precision, reliability, and meaningful output are not just goals; they
          are the baseline.
        </p>
      </div>
    </section>
  );
};

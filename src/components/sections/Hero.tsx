import React from "react";
import { Button } from "../ui/Button";

export const Hero: React.FC = () => {
  return (
    <section className="px-6 md:px-12 pb-20 pt-10 md:pt-16 lg:pb-32 flex flex-col items-center justify-center min-h-[70vh] text-center">
      <div className="max-w-5xl mx-auto flex flex-col gap-8 md:gap-10">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.95] text-balance text-primary dark:text-white">
          AI infrastructure for real-world intelligence.
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl font-light text-text-secondary dark:text-gray-400 max-w-3xl mx-auto leading-relaxed text-balance">
          Measure AI performance. Generate real outcomes. Build systems that
          solve real problems.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 md:mt-12 lg:mt-4 w-full">
          <Button size="lg" className="w-full sm:w-auto">
            Get Started
          </Button>
          <Button variant="outline" size="lg" className="w-full sm:w-auto">
            Explore Products
          </Button>
        </div>
      </div>
    </section>
  );
};

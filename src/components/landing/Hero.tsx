import React, { useState, useEffect } from "react";
import { Container } from "../layout/Container";
import { SITE } from "../../config/site";
import { cn } from "../../lib/utils";
import { PRIMARY_CTA_CLASSES } from "../../constants/layout";

const TYPEWRITER_MS_PER_CHAR = 85;
const PAUSE_BETWEEN_LINES_MS = 400;

const NAVBAR_ANIMATION_MS = 900;

const HERO_LINE_1 = "Less AI noise.";
const HERO_LINE_2 = "More AI output.";

export const Hero: React.FC = () => {
  const [startTyping, setStartTyping] = useState(false);
  const [visibleLine1, setVisibleLine1] = useState(0);
  const [visibleLine2, setVisibleLine2] = useState(0);
  const [typingComplete, setTypingComplete] = useState(false);

  useEffect(() => {
    const start = setTimeout(() => setStartTyping(true), NAVBAR_ANIMATION_MS);
    return () => clearTimeout(start);
  }, []);

  useEffect(() => {
    if (!startTyping) return;
    if (visibleLine1 < HERO_LINE_1.length) {
      const t = setTimeout(
        () => setVisibleLine1((n) => n + 1),
        TYPEWRITER_MS_PER_CHAR,
      );
      return () => clearTimeout(t);
    }
    if (visibleLine2 === 0) {
      const pause = setTimeout(
        () => setVisibleLine2(1),
        PAUSE_BETWEEN_LINES_MS,
      );
      return () => clearTimeout(pause);
    }
    if (visibleLine2 >= HERO_LINE_2.length) {
      setTypingComplete(true);
      return;
    }
    const t = setTimeout(
      () => setVisibleLine2((n) => n + 1),
      TYPEWRITER_MS_PER_CHAR,
    );
    return () => clearTimeout(t);
  }, [startTyping, visibleLine1, visibleLine2]);

  return (
    <section
      className="px-6 md:px-12 pb-20 pt-10 md:pt-16 flex flex-col items-center justify-center min-h-[70vh] text-center"
      aria-labelledby="hero-heading"
    >
      <Container width="wide" className="flex flex-col gap-8 md:gap-10">
        <h1
          id="hero-heading"
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.95] text-primary dark:text-white min-h-[2.4em] flex flex-col items-center"
          aria-live="polite"
        >
          <span className="block text-balance">
            {HERO_LINE_1.slice(0, visibleLine1)}
          </span>
          <span className="block text-balance">
            {HERO_LINE_2.slice(0, visibleLine2)}
          </span>
        </h1>
        <div
          className={cn(
            "flex flex-col gap-8 md:gap-10",
            !typingComplete && "opacity-0",
            typingComplete && "hero-content-fade-in",
          )}
        >
          <p className="text-lg md:text-xl lg:text-2xl font-light text-text-secondary dark:text-gray-400 max-w-3xl mx-auto leading-relaxed text-balance">
            {SITE.description}
          </p>

          <div className="flex justify-center mt-8 md:mt-12 lg:mt-4 w-full">
            <a href="#products" className={cn(PRIMARY_CTA_CLASSES)}>
              Explore Products
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
};

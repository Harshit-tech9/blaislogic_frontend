import React, { useState, useEffect } from "react";
import { Container } from "../layout/Container";
import { SITE } from "../../config/site";
import { cn } from "../../lib/utils";

const CTA_CLASSES =
  "inline-flex items-center justify-center rounded-full font-semibold tracking-wide transition-all duration-200 h-14 px-10 text-base w-full sm:w-auto bg-primary text-white dark:bg-white dark:text-primary hover:scale-105 shadow-xl shadow-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

const TYPEWRITER_MS_PER_CHAR = 85;

const NAVBAR_ANIMATION_MS = 900;

export const Hero: React.FC = () => {
  const tagline = SITE.tagline;
  const [startTyping, setStartTyping] = useState(false);
  const [visibleLength, setVisibleLength] = useState(0);
  const [typingComplete, setTypingComplete] = useState(false);

  useEffect(() => {
    const start = setTimeout(() => setStartTyping(true), NAVBAR_ANIMATION_MS);
    return () => clearTimeout(start);
  }, []);

  useEffect(() => {
    if (!startTyping || visibleLength >= tagline.length) {
      if (startTyping && visibleLength >= tagline.length)
        setTypingComplete(true);
      return;
    }
    const t = setTimeout(
      () => setVisibleLength((n) => n + 1),
      TYPEWRITER_MS_PER_CHAR,
    );
    return () => clearTimeout(t);
  }, [startTyping, visibleLength, tagline.length]);

  return (
    <section
      className="px-6 md:px-12 pb-20 pt-10 md:pt-16 lg:pb-32 flex flex-col items-center justify-center min-h-[70vh] text-center"
      aria-labelledby="hero-heading"
    >
      <Container width="wide" className="flex flex-col gap-8 md:gap-10">
        <h1
          id="hero-heading"
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.95] text-balance text-primary dark:text-white min-h-[1.2em]"
          aria-live="polite"
        >
          {tagline.slice(0, visibleLength)}
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
            <a
              href="#products"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(CTA_CLASSES)}
            >
              Explore Products
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
};

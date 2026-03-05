import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./TextReveal.css";

gsap.registerPlugin(ScrollTrigger);

export interface TextRevealProps {
  className?: string;
  /** Render as this heading element (e.g. "h2") so the section stays semantic */
  as?: "h1" | "h2" | "h3";
  children: string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  duration?: number;
  stagger?: number;
  ease?: string;
  yPercent?: number;
  onComplete?: () => void;
}

/**
 * Text reveal animation: words slide up from behind masks on scroll.
 * Used only for the Philosophy section heading. No SplitText (Club) dependency.
 */
export const TextReveal: React.FC<TextRevealProps> = ({
  className = "",
  as: Tag = "h2",
  children,
  start = "top 60%",
  end = "",
  scrub = false,
  duration = 0.8,
  stagger = 0.08,
  ease = "expo.out",
  yPercent = 110,
  onComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);
  const ctxRef = useRef<gsap.Context | null>(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const words =
    typeof children === "string"
      ? children.trim().split(/\s+/).filter(Boolean)
      : [];

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.fonts.ready.then(() => setFontsLoaded(true));
  }, []);

  useEffect(() => {
    if (
      !fontsLoaded ||
      !containerRef.current ||
      !textRef.current ||
      words.length === 0
    )
      return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      (textRef.current as HTMLElement).style.visibility = "visible";
      return;
    }

    let cancelled = false;
    const raf = requestAnimationFrame(() => {
      if (cancelled || !containerRef.current || !textRef.current) return;
      const wordEls =
        containerRef.current.querySelectorAll<HTMLElement>(".split-word");
      const targets = Array.from(wordEls);
      if (targets.length === 0) return;

      gsap.set(targets, {
        yPercent,
        force3D: true,
        willChange: "transform",
      });
      (textRef.current as HTMLElement).style.visibility = "visible";

      const scrubVal: boolean | number =
        scrub === true ? true : typeof scrub === "number" ? scrub : false;

      const ctx = gsap.context(() => {
        gsap.to(targets, {
          yPercent: 0,
          duration,
          stagger,
          ease,
          force3D: true,
          scrollTrigger: {
            trigger: containerRef.current,
            start,
            end: end || undefined,
            scrub: scrubVal,
            once: !scrubVal,
          },
          onComplete: () => {
            gsap.set(targets, { willChange: "auto" });
            onComplete?.();
          },
        });
      }, containerRef);

      ctxRef.current = ctx;
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      if (ctxRef.current) {
        ctxRef.current.revert();
        ctxRef.current = null;
      }
    };
  }, [
    fontsLoaded,
    words.length,
    start,
    end,
    scrub,
    duration,
    stagger,
    ease,
    yPercent,
    onComplete,
  ]);

  return (
    <div ref={containerRef} className="text_reveal_wrap">
      <Tag
        ref={textRef}
        data-anm-scroll-text-reveal
        className={`text_reveal_text ${className}`.trim()}
        style={{ visibility: "hidden" }}
      >
        {words.map((word, i) => (
          <span key={i} className="split-line">
            <span
              ref={(el) => {
                if (el) wordsRef.current[i] = el;
              }}
              className="split-word"
            >
              {word}
            </span>
          </span>
        ))}
      </Tag>
    </div>
  );
};

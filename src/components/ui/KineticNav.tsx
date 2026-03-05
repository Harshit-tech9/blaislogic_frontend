import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { SITE, NAV_LINKS } from "../../config/site";
import "./KineticNav.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase);
}

const SHAPE_COLORS = {
  primary: "rgba(18, 18, 18, 0.12)",
  metric: "rgba(97, 36, 197, 0.15)",
  metricLight: "rgba(97, 36, 197, 0.1)",
};

export function KineticNav() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    try {
      if (!gsap.parseEase("main")) {
        CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");
        gsap.defaults({ ease: "main", duration: 0.7 });
      }
    } catch {
      gsap.defaults({ ease: "power2.out", duration: 0.7 });
    }

    const ctx = gsap.context(() => {
      const menuItems = containerRef.current!.querySelectorAll(
        ".menu-list-item[data-shape]",
      );
      const shapesContainer =
        containerRef.current!.querySelector(".ambient-background-shapes");

      menuItems.forEach((item) => {
        const shapeIndex = item.getAttribute("data-shape");
        const shape = shapesContainer?.querySelector(
          `.bg-shape-${shapeIndex}`,
        ) as HTMLElement | null;

        if (!shape) return;

        const shapeEls = shape.querySelectorAll(".shape-element");

        const onEnter = () => {
          shapesContainer
            ?.querySelectorAll(".bg-shape")
            .forEach((s) => s.classList.remove("active"));
          shape.classList.add("active");
          gsap.fromTo(
            shapeEls,
            { scale: 0.5, opacity: 0, rotation: -10 },
            {
              scale: 1,
              opacity: 1,
              rotation: 0,
              duration: 0.6,
              stagger: 0.08,
              ease: "back.out(1.7)",
              overwrite: "auto",
            },
          );
        };

        const onLeave = () => {
          gsap.to(shapeEls, {
            scale: 0.8,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => shape.classList.remove("active"),
            overwrite: "auto",
          });
        };

        item.addEventListener("mouseenter", onEnter);
        item.addEventListener("mouseleave", onLeave);
        (item as HTMLElement & { _cleanup?: () => void })._cleanup = () => {
          item.removeEventListener("mouseenter", onEnter);
          item.removeEventListener("mouseleave", onLeave);
        };
      });
    }, containerRef);

    return () => {
      ctx.revert();
      if (containerRef.current) {
        const items =
          containerRef.current.querySelectorAll(".menu-list-item[data-shape]");
        items.forEach((item: Element) => {
          const el = item as HTMLElement & { _cleanup?: () => void };
          if (el._cleanup) el._cleanup();
        });
      }
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const navWrap = containerRef.current!.querySelector(".nav-overlay-wrapper");
      const menu = containerRef.current!.querySelector(".menu-content");
      const overlay = containerRef.current!.querySelector(".overlay");
      const bgPanels = containerRef.current!.querySelectorAll(".backdrop-layer");
      const menuLinks = containerRef.current!.querySelectorAll(".nav-link");
      const fadeTargets =
        containerRef.current!.querySelectorAll("[data-menu-fade]");
      const menuButton = containerRef.current!.querySelector(
        ".site-header-wrapper .nav-close-btn",
      );
      const menuButtonIcon = menuButton?.querySelector(".menu-button-icon");

      const tl = gsap.timeline();

      if (isMenuOpen) {
        navWrap?.setAttribute("data-nav", "open");
        tl.set(navWrap, { display: "block" })
          .set(menu, { xPercent: 0 }, "<")
          .fromTo(
            menuButtonIcon || [],
            { rotate: 0 },
            { rotate: 45, duration: 0.25, ease: "power2.out" },
            "<",
          )
          .fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1 }, "<")
          .fromTo(
            bgPanels,
            { xPercent: 101 },
            { xPercent: 0, stagger: 0.12, duration: 0.575 },
            "<",
          )
          .fromTo(
            menuLinks,
            { yPercent: 80, rotate: 0 },
            { yPercent: 0, rotate: 0, stagger: 0.03, duration: 0.4 },
            "<",
          );
        if (fadeTargets.length) {
          tl.fromTo(
            fadeTargets,
            { autoAlpha: 0, yPercent: 30 },
            { autoAlpha: 1, yPercent: 0, stagger: 0.03, duration: 0.35, clearProps: "all" },
            "<",
          );
        }
      } else {
        navWrap?.setAttribute("data-nav", "closed");
        tl.to(menuButtonIcon || [], { rotate: 0, duration: 0.2, ease: "power2.out" })
          .to(overlay, { autoAlpha: 0, duration: 0.25 }, "<")
          .to(menu, { xPercent: 120, duration: 0.4 }, "<")
          .set(navWrap, { display: "none" });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isMenuOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div ref={containerRef}>
      <div className="site-header-wrapper">
        <header className="header" role="banner">
          <div className="knav-container is--full">
            <nav className="nav-row">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${SITE.name} home`}
                className="nav-logo-row"
              >
                <img
                  src={SITE.logoPath}
                  alt={SITE.name}
                  className="logo-hover-color"
                  width={240}
                  height={60}
                />
              </a>
              <div className="nav-row__right">
                <div
                  className="nav-toggle-label"
                  onClick={toggleMenu}
                  onKeyDown={(e) => e.key === "Enter" && toggleMenu()}
                  role="button"
                  tabIndex={0}
                  aria-label="Open menu"
                >
                  <span className="toggle-text">click me</span>
                </div>
                <button
                  type="button"
                  className="nav-close-btn"
                  onClick={toggleMenu}
                  aria-expanded={isMenuOpen}
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                >
                  <div className="menu-button-text">
                    <p className="p-large">{isMenuOpen ? "Close" : "Menu"}</p>
                  </div>
                  <div className="icon-wrap">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="menu-button-icon"
                      aria-hidden
                    >
                      <path
                        d="M7.33333 16L7.33333 -3.2055e-07L8.66667 -3.78832e-07L8.66667 16L7.33333 16Z"
                        fill="currentColor"
                      />
                      <path
                        d="M16 8.66667L-2.62269e-07 8.66667L-3.78832e-07 7.33333L16 7.33333L16 8.66667Z"
                        fill="currentColor"
                      />
                      <path
                        d="M6 7.33333L7.33333 7.33333L7.33333 6C7.33333 6.73637 6.73638 7.33333 6 7.33333Z"
                        fill="currentColor"
                      />
                      <path
                        d="M10 7.33333L8.66667 7.33333L8.66667 6C8.66667 6.73638 9.26362 7.33333 10 7.33333Z"
                        fill="currentColor"
                      />
                      <path
                        d="M6 8.66667L7.33333 8.66667L7.33333 10C7.33333 9.26362 6.73638 8.66667 6 8.66667Z"
                        fill="currentColor"
                      />
                      <path
                        d="M10 8.66667L8.66667 8.66667L8.66667 10C8.66667 9.26362 9.26362 8.66667 10 8.66667Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </button>
              </div>
            </nav>
          </div>
        </header>
      </div>

      <section className="fullscreen-menu-container" aria-hidden={!isMenuOpen}>
        <div data-nav="closed" className="nav-overlay-wrapper">
          <div
            className="overlay"
            onClick={closeMenu}
            onKeyDown={(e) => e.key === "Enter" && closeMenu()}
            role="button"
            tabIndex={-1}
            aria-label="Close menu"
          />
          <nav className="menu-content" aria-label="Main navigation">
            <div className="menu-bg">
              <div className="backdrop-layer first" />
              <div className="backdrop-layer second" />
              <div className="backdrop-layer" />

              <div className="ambient-background-shapes">
                <svg
                  className="bg-shape bg-shape-1"
                  viewBox="0 0 400 400"
                  fill="none"
                  aria-hidden
                >
                  <circle
                    className="shape-element"
                    cx="80"
                    cy="120"
                    r="40"
                    fill={SHAPE_COLORS.metric}
                  />
                  <circle
                    className="shape-element"
                    cx="300"
                    cy="80"
                    r="60"
                    fill={SHAPE_COLORS.metricLight}
                  />
                  <circle
                    className="shape-element"
                    cx="200"
                    cy="300"
                    r="80"
                    fill={SHAPE_COLORS.primary}
                  />
                  <circle
                    className="shape-element"
                    cx="350"
                    cy="280"
                    r="30"
                    fill={SHAPE_COLORS.metric}
                  />
                </svg>

                <svg
                  className="bg-shape bg-shape-2"
                  viewBox="0 0 400 400"
                  fill="none"
                  aria-hidden
                >
                  <path
                    className="shape-element"
                    d="M0 200 Q100 100, 200 200 T 400 200"
                    stroke={SHAPE_COLORS.metric}
                    strokeWidth="60"
                    fill="none"
                  />
                  <path
                    className="shape-element"
                    d="M0 280 Q100 180, 200 280 T 400 280"
                    stroke={SHAPE_COLORS.metricLight}
                    strokeWidth="40"
                    fill="none"
                  />
                </svg>

                <svg
                  className="bg-shape bg-shape-3"
                  viewBox="0 0 400 400"
                  fill="none"
                  aria-hidden
                >
                  <circle
                    className="shape-element"
                    cx="50"
                    cy="50"
                    r="8"
                    fill={SHAPE_COLORS.metric}
                  />
                  <circle
                    className="shape-element"
                    cx="150"
                    cy="50"
                    r="8"
                    fill={SHAPE_COLORS.metricLight}
                  />
                  <circle
                    className="shape-element"
                    cx="250"
                    cy="50"
                    r="8"
                    fill={SHAPE_COLORS.metric}
                  />
                  <circle
                    className="shape-element"
                    cx="350"
                    cy="50"
                    r="8"
                    fill={SHAPE_COLORS.metricLight}
                  />
                  <circle
                    className="shape-element"
                    cx="100"
                    cy="150"
                    r="12"
                    fill={SHAPE_COLORS.metricLight}
                  />
                  <circle
                    className="shape-element"
                    cx="200"
                    cy="150"
                    r="12"
                    fill={SHAPE_COLORS.metric}
                  />
                  <circle
                    className="shape-element"
                    cx="300"
                    cy="150"
                    r="12"
                    fill={SHAPE_COLORS.metricLight}
                  />
                </svg>
              </div>
            </div>

            <div className="menu-content-wrapper">
              <div className="knav-close-row">
                <button
                  type="button"
                  className="nav-close-btn"
                  onClick={closeMenu}
                  aria-label="Close menu"
                >
                  <div className="menu-button-text">
                    <p className="p-large">Close</p>
                  </div>
                  <div className="icon-wrap">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="menu-button-icon"
                      aria-hidden
                    >
                      <path
                        d="M7.33333 16L7.33333 -3.2055e-07L8.66667 -3.78832e-07L8.66667 16L7.33333 16Z"
                        fill="currentColor"
                      />
                      <path
                        d="M16 8.66667L-2.62269e-07 8.66667L-3.78832e-07 7.33333L16 7.33333L16 8.66667Z"
                        fill="currentColor"
                      />
                      <path
                        d="M6 7.33333L7.33333 7.33333L7.33333 6C7.33333 6.73637 6.73638 7.33333 6 7.33333Z"
                        fill="currentColor"
                      />
                      <path
                        d="M10 7.33333L8.66667 7.33333L8.66667 6C8.66667 6.73638 9.26362 7.33333 10 7.33333Z"
                        fill="currentColor"
                      />
                      <path
                        d="M6 8.66667L7.33333 8.66667L7.33333 10C7.33333 9.26362 6.73638 8.66667 6 8.66667Z"
                        fill="currentColor"
                      />
                      <path
                        d="M10 8.66667L8.66667 8.66667L8.66667 10C8.66667 9.26362 9.26362 8.66667 10 8.66667Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </button>
              </div>
              <ul className="menu-list">
                {NAV_LINKS.map((link, index) => (
                  <li
                    key={link.name}
                    className="menu-list-item"
                    data-shape={String((index % 3) + 1)}
                  >
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="nav-link"
                      onClick={closeMenu}
                      {...(index === NAV_LINKS.length - 1
                        ? { "data-menu-fade": "" }
                        : {})}
                    >
                      <p className="nav-link-text">{link.name}</p>
                      <div className="nav-link-hover-bg" aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </section>
    </div>
  );
}

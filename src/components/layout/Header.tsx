import React, { useState, useEffect } from "react";
import { Icon } from "../ui/Icon";
import { SITE, NAV_LINKS } from "../../config/site";
import { cn } from "../../lib/utils";

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-background-light dark:bg-background-dark border-b border-black/5 dark:border-white/5"
      role="banner"
    >
      <div className="relative flex items-center justify-between px-6 py-4 md:px-10 lg:px-12">
        <a
          href="/"
          className="inline-flex items-center hover:opacity-90 transition-opacity"
          aria-label={`${SITE.name} home`}
        >
          <img
            src={SITE.logoPath}
            alt=""
            className="logo-hover-color h-9 w-auto object-contain md:h-10"
            width={240}
            height={60}
            fetchPriority="high"
          />
        </a>

        <nav
          className="hidden lg:flex items-center gap-8"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                "link-underline text-sm font-medium text-primary dark:text-white",
                "hover:opacity-70 transition-opacity"
              )}
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="lg:hidden relative">
          <button
            type="button"
            className="p-2 -m-2 text-primary dark:text-white hover:opacity-70 transition-opacity"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <Icon name={isMenuOpen ? "close" : "menu"} className="text-2xl" aria-hidden />
          </button>

          <div
            id="mobile-nav"
            className={cn(
              "absolute right-0 top-full mt-2 min-w-40 w-max max-w-[calc(100vw-2rem)]",
              "mx-4 rounded-xl border border-black/10 dark:border-white/10",
              "bg-background-light dark:bg-background-dark shadow-lg py-2",
              !isMenuOpen && "hidden"
            )}
            aria-hidden={!isMenuOpen}
          >
            <nav
              className="flex flex-col px-4 py-2 gap-0.5"
              aria-label="Mobile navigation"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "link-underline rounded-lg px-3 py-2.5 text-base font-medium text-primary dark:text-white",
                    "hover:opacity-70 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

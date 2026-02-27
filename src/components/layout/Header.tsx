import React, { useState } from "react";
import { Icon } from "../ui/Icon";
import { SITE, NAV_LINKS } from "../../config/site";

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-background-light dark:bg-background-dark border-b border-transparent transition-all duration-300"
      role="banner"
    >
      <div className="flex items-center justify-between px-6 py-6 md:px-12 md:py-8">
        <a
          href="/"
          className="flex items-center gap-2 text-xl md:text-2xl font-bold tracking-tight text-primary dark:text-white hover:opacity-90 transition-opacity"
          aria-label={`${SITE.name} home`}
        >
          <Icon name="all_inclusive" className="text-3xl" aria-hidden />
          {SITE.name}
        </a>

        <nav
          className="hidden md:flex items-center gap-8 lg:gap-12"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium hover:opacity-60 transition-opacity"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
        >
          <Icon name={isMenuOpen ? "close" : "menu"} aria-hidden />
        </button>
      </div>

      <div
        id="mobile-menu"
        className={isMenuOpen ? "md:hidden" : "hidden"}
        role="dialog"
        aria-label="Mobile navigation"
      >
        <nav
          className="flex flex-col px-6 py-4 gap-4 bg-background-light dark:bg-background-dark border-b border-black/10 dark:border-white/10"
          aria-label="Mobile navigation"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-base font-medium hover:opacity-60 transition-opacity"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

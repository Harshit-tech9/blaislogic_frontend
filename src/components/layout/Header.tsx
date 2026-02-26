import React, { useState } from "react";
import { Icon } from "../ui/Icon";

const navLinks = [
  { name: "Products", href: "#" },
  { name: "Docs", href: "#" },
  { name: "Company", href: "#" },
];

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-sm border-b border-transparent transition-all duration-300">
      <div className="flex items-center justify-between px-6 py-6 md:px-12 md:py-8">
        <div className="flex items-center gap-2">
          <Icon name="all_inclusive" className="text-3xl" />
          <a
            href="#"
            className="text-xl md:text-2xl font-bold tracking-tight text-primary dark:text-white"
          >
            Blaiselogic
          </a>
        </div>

        <nav className="hidden md:flex items-center gap-8 lg:gap-12">
          {navLinks.map((link) => (
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
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <Icon name={isMenuOpen ? "close" : "menu"} />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-background-light dark:bg-background-dark border-b border-black/10 dark:border-white/10">
          <nav className="flex flex-col px-6 py-4 gap-4">
            {navLinks.map((link) => (
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
      )}
    </header>
  );
};

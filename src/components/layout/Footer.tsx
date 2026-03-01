import React from "react";
import { cn } from "../../lib/utils";
import { SITE, FOOTER_SECTIONS, COPYRIGHT_YEAR } from "../../config/site";

const FOOTER_LINK_CLASSES =
  "text-sm text-text-secondary dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors";

const FOOTER_HEADING_CLASSES =
  "text-xs font-bold uppercase tracking-widest text-primary dark:text-white";

export const Footer: React.FC = () => {
  return (
    <footer
      className="px-6 md:px-12 py-12 border-t border-black/10 dark:border-white/10 bg-background-light dark:bg-background-dark"
      role="contentinfo"
    >
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start gap-12 md:gap-0">
        <div className="flex flex-col gap-6 max-w-xs">
          <a href="/" target="_blank" rel="noopener noreferrer" className="inline-block" aria-label={`${SITE.name} home`}>
            <img
              src={SITE.logoPath}
              alt={SITE.name}
              className="h-9 w-auto object-contain md:h-10"
              width={160}
              height={40}
            />
          </a>
          <p className="text-sm text-text-secondary dark:text-gray-500 font-light">
            {SITE.description}
          </p>
        </div>

        <div
          className="flex flex-wrap gap-12 md:gap-24"
          role="navigation"
          aria-label="Footer navigation"
        >
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title} className="flex flex-col gap-4">
              <h4 className={FOOTER_HEADING_CLASSES}>{section.title}</h4>
              <ul className="flex flex-col gap-4 list-none p-0 m-0">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className={cn("link-underline", FOOTER_LINK_CLASSES)}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto mt-20 pt-8 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-secondary dark:text-gray-600">
        <p>
          © {COPYRIGHT_YEAR} {SITE.name} Inc. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a
            href="https://x.com/blaiselogic"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary dark:hover:text-white transition-colors"
          >
            Twitter
          </a>
          <a
            href="https://www.linkedin.com/company/blaiselogic-technology/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary dark:hover:text-white transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

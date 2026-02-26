import React from "react";
import { Icon } from "../ui/Icon";

export const Footer: React.FC = () => {
  return (
    <footer className="px-6 md:px-12 py-12  border-t border-black/10 dark:border-white/10 bg-background-light dark:bg-background-dark">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start gap-12 md:gap-0">
        <div className="flex flex-col gap-6 max-w-xs">
          <div className="flex items-center gap-2">
            <Icon name="all_inclusive" className="text-2xl" />
            <span className="text-lg font-bold tracking-tight">
              Blaiselogic
            </span>
          </div>
          <p className="text-sm text-text-secondary dark:text-gray-500 font-light">
            Defining the architecture of machine intelligence for the next
            century.
          </p>
        </div>

        <div className="flex flex-wrap gap-12 md:gap-24">
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-primary dark:text-white">
              Platform
            </h4>
            <a
              href="#"
              className="text-sm text-text-secondary dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors"
            >
              Metric
            </a>
            <a
              href="#"
              className="text-sm text-text-secondary dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors"
            >
              ADvance
            </a>
            <a
              href="#"
              className="text-sm text-text-secondary dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors"
            >
              Solutions
            </a>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-primary dark:text-white">
              Company
            </h4>
            <a
              href="#"
              className="text-sm text-text-secondary dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors"
            >
              About
            </a>
            <a
              href="#"
              className="text-sm text-text-secondary dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors"
            >
              Careers
            </a>
            <a
              href="#"
              className="text-sm text-text-secondary dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors"
            >
              Contact
            </a>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-primary dark:text-white">
              Legal
            </h4>
            <a
              href="#"
              className="text-sm text-text-secondary dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-sm text-text-secondary dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors"
            >
              Terms
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto mt-20 pt-8 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-secondary dark:text-gray-600">
        <p>© 2024 Blaiselogic Inc. All rights reserved.</p>
        <div className="flex gap-6">
          <a
            href="#"
            className="hover:text-primary dark:hover:text-white transition-colors"
          >
            Twitter
          </a>
          <a
            href="#"
            className="hover:text-primary dark:hover:text-white transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

const SKIP_TO_CONTENT_ID = "main-content";

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col relative w-full overflow-x-hidden pb-[15vh]">
      <a
        href={`#${SKIP_TO_CONTENT_ID}`}
        className="sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:px-4 focus:py-2 focus:w-auto focus:h-auto focus:m-0 focus:overflow-visible focus:[clip:auto] focus:whitespace-normal focus:bg-primary focus:text-white focus:rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2"
      >
        Skip to main content
      </a>
      <div
        className="fixed bottom-0 left-0 right-0 h-[12vh] pointer-events-none z-40 backdrop-blur-md bg-background-light/20 dark:bg-background-dark/20"
        aria-hidden
      />
      <Header />
      <main id={SKIP_TO_CONTENT_ID} className="grow pt-24" role="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

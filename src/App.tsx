import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { scrollToId } from "./lib/scroll";

const SMOOTH_SCROLL_DURATION_MS = 1500;

const App: React.FC = () => {
  useEffect(() => {
    const handleClick = (e: MouseEvent): void => {
      const link = (e.target as Element).closest('a[href^="#"]');
      if (!link) return;
      const href = link.getAttribute("href");
      if (!href || href.length <= 1) return;
      const id = href.slice(1);
      if (!document.getElementById(id)) return;
      e.preventDefault();
      scrollToId(id, SMOOTH_SCROLL_DURATION_MS);
    };
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;

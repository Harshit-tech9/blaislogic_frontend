import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col relative w-full overflow-x-hidden">
      <Header />
      <main className="grow pt-24">{children}</main>
      <Footer />
    </div>
  );
};

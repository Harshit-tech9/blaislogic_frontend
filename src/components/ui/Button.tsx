import React, { forwardRef } from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "md" | "lg" | "icon";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex items-center justify-center rounded-full font-semibold tracking-wide transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          {
            "bg-primary text-white dark:bg-white dark:text-primary hover:scale-105 shadow-xl shadow-primary/10":
              variant === "primary",
            "bg-transparent border border-primary/20 text-primary dark:border-white/20 dark:text-white hover:bg-primary/5 dark:hover:bg-white/5":
              variant === "outline",
            "bg-transparent hover:opacity-60 text-primary dark:text-white":
              variant === "ghost",
            "h-14 px-10 text-base": size === "lg",
            "h-10 px-4 py-2 text-sm": size === "md",
            "p-2": size === "icon",
          },
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button };

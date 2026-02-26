import React from "react";
import { cn } from "../../lib/utils";

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string;
}

export const Icon: React.FC<IconProps> = ({ name, className, ...props }) => {
  return (
    <span
      className={cn(
        "material-symbols-outlined font-light cursor-default",
        className,
      )}
      {...props}
    >
      {name}
    </span>
  );
};

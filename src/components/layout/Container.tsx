import React from "react";
import { cn } from "../../lib/utils";
import { CONTAINER } from "../../constants/layout";

type ContainerWidth = keyof typeof CONTAINER;

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: ContainerWidth;
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({
  width = "full",
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn(CONTAINER[width], className)} {...props}>
      {children}
    </div>
  );
};

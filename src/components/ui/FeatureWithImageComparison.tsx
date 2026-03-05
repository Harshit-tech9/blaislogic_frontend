import { useState } from "react";
import { Badge } from "./Badge";
import { GripVertical } from "lucide-react";
import { cn } from "../../lib/utils";

export interface FeatureWithImageComparisonProps {
  badge?: string;
  title: string;
  description: string;
  imageBefore: string;
  imageAfter: string;
  imageAlt?: string;
  className?: string;
}

function FeatureWithImageComparison({
  badge = "Platform",
  title,
  description,
  imageBefore,
  imageAfter,
  imageAlt = "Feature comparison",
  className,
}: FeatureWithImageComparisonProps) {
  const [inset, setInset] = useState(50);
  const [onMouseDown, setOnMouseDown] = useState(false);

  const onMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!onMouseDown) return;

    const rect = e.currentTarget.getBoundingClientRect();
    let x = 0;

    if ("touches" in e && e.touches.length > 0) {
      x = e.touches[0].clientX - rect.left;
    } else if ("clientX" in e) {
      x = (e as React.MouseEvent).clientX - rect.left;
    }

    const percentage = (x / rect.width) * 100;
    setInset(Math.max(0, Math.min(100, percentage)));
  };

  return (
    <div className={cn("w-full py-10 lg:py-16", className)}>
      <div className="flex flex-col gap-4">
        {badge && (
          <div>
            <Badge variant="secondary">{badge}</Badge>
          </div>
        )}
        <div className="flex gap-2 flex-col">
          <h2 className="text-2xl md:text-4xl tracking-tighter font-semibold text-primary dark:text-white max-w-xl">
            {title}
          </h2>
          <p className="text-base md:text-lg max-w-xl leading-relaxed tracking-tight text-text-secondary dark:text-gray-400">
            {description}
          </p>
        </div>
        <div className="pt-8 w-full">
          <div
            className="relative aspect-video w-full overflow-hidden rounded-2xl select-none border border-black/10 dark:border-white/10"
            onMouseMove={onMouseMove}
            onMouseLeave={() => setOnMouseDown(false)}
            onMouseUp={() => setOnMouseDown(false)}
            onTouchMove={onMouseMove}
            onTouchEnd={() => setOnMouseDown(false)}
          >
            <div
              className="bg-secondary dark:bg-muted h-full w-1 absolute z-20 top-0 -ml-px select-none"
              style={{ left: inset + "%" }}
            >
              <button
                type="button"
                className="bg-secondary dark:bg-muted rounded hover:scale-110 transition-all w-5 h-10 select-none -translate-y-1/2 absolute top-1/2 -ml-2.5 z-30 cursor-ew-resize flex justify-center items-center border border-black/10 dark:border-white/10"
                onTouchStart={(e) => {
                  setOnMouseDown(true);
                  onMouseMove(e);
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  setOnMouseDown(true);
                  onMouseMove(e);
                }}
                onTouchEnd={() => setOnMouseDown(false)}
                onMouseUp={() => setOnMouseDown(false)}
                aria-label="Drag to compare images"
              >
                <GripVertical className="h-4 w-4 select-none text-text-primary dark:text-white" />
              </button>
            </div>
            <img
              src={imageBefore}
              alt={imageAlt + " (before)"}
              width={1920}
              height={1080}
              className="absolute left-0 top-0 z-10 w-full h-full object-cover aspect-video rounded-2xl select-none border-0"
              style={{
                clipPath: "inset(0 " + (100 - inset) + "% 0 0)",
              }}
            />
            <img
              src={imageAfter}
              alt={imageAlt + " (after)"}
              width={1920}
              height={1080}
              className="absolute left-0 top-0 w-full h-full object-cover aspect-video rounded-2xl select-none border-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export { FeatureWithImageComparison };

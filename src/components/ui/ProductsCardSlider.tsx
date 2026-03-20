import { useState } from "react";
import { GripVertical } from "lucide-react";
import { Badge } from "./Badge";
import { cn } from "../../lib/utils";

export interface ProductCardItem {
  title: string;
  description: string;
  buttonLabel: string;
  siteUrl: string;
  isMetricAI?: boolean;
  /** Optional image shown on the right side of this card (gets covered by the slider) */
  image?: string;
}

export interface ProductsCardSliderProps {
  leftProduct: ProductCardItem;
  rightProduct: ProductCardItem;
  className?: string;
}

function ProductCard({
  product,
  isMetricAI: forceMetricAI,
  roundedSide,
  className,
}: {
  product: ProductCardItem;
  isMetricAI?: boolean;
  /** Only round outer edge so both halves meet flush (no divider or corner gaps) */
  roundedSide?: "left" | "right";
  className?: string;
}) {
  const href = product.siteUrl || "#contact";
  const isMetricAI =
    forceMetricAI ?? product.isMetricAI ?? product.title === "MetricAI";

  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className={cn(
        "flex flex-col justify-center gap-4 px-8 py-10 md:px-12 md:py-14 min-h-[280px] md:min-h-[320px] w-full h-full no-underline text-inherit box-border",
        roundedSide === "left" && "rounded-l-2xl",
        roundedSide === "right" && "rounded-r-2xl",
        isMetricAI
          ? "bg-background-dark text-white"
          : "bg-secondary dark:bg-muted text-primary dark:text-white",
        className,
      )}
    >
      <Badge
        variant={isMetricAI ? "default" : "secondary"}
        className={cn(
          "w-fit",
          isMetricAI
            ? "bg-white/10 text-white border-white/20 hover:bg-white/20"
            : "bg-black/10 dark:bg-white/10 text-primary dark:text-white border-black/10 dark:border-white/20 hover:bg-black/15 dark:hover:bg-white/15",
        )}
      >
        Product
      </Badge>
      <h3 className="text-2xl md:text-4xl font-bold tracking-tight">
        {isMetricAI ? (
          <>
            <span>Metric</span>
            <span className="text-metric-ai">AI</span>
          </>
        ) : (
          product.title
        )}
      </h3>
      <p
        className={cn(
          "text-base md:text-lg font-light leading-relaxed max-w-lg",
          isMetricAI
            ? "text-gray-300"
            : "text-text-secondary dark:text-gray-400",
        )}
      >
        {product.description}
      </p>
      <span className="text-sm font-semibold underline underline-offset-4 mt-auto pt-2">
        {product.buttonLabel}
      </span>
    </a>
  );
}

function ProductsCardSlider({
  leftProduct,
  rightProduct,
  className,
}: ProductsCardSliderProps) {
  const [inset, setInset] = useState(50);
  const [dragging, setDragging] = useState(false);

  const onMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!dragging) return;

    const rect = e.currentTarget.getBoundingClientRect();
    let x = 0;

    if ("touches" in e && e.touches.length > 0) {
      x = e.touches[0].clientX - rect.left;
    } else if ("clientX" in e) {
      x = (e as React.MouseEvent).clientX - rect.left;
    }

    const percentage = (x / rect.width) * 100;
    setInset(Math.max(5, Math.min(95, percentage)));
  };

  return (
    <div className={cn("w-full", className)}>
      {/* sm: stacked vertically */}
      <div className="flex flex-col gap-4 md:hidden">
        <ProductCard
          product={leftProduct}
          isMetricAI
          className="rounded-2xl border border-black/10 dark:border-white/10"
        />
        <ProductCard
          product={rightProduct}
          className="rounded-2xl border border-black/10 dark:border-white/10"
        />
      </div>

      {/* md and up: slider */}
      <div
        className="hidden md:block relative w-full min-h-[320px] md:min-h-[380px] overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 select-none"
        onMouseMove={onMouseMove}
        onMouseLeave={() => setDragging(false)}
        onMouseUp={() => setDragging(false)}
        onTouchMove={onMouseMove}
        onTouchEnd={() => setDragging(false)}
      >
        {/* Single seamless background: grey left, black right (no divider between halves) */}
        <div
          className="absolute inset-0 z-0 rounded-2xl dark:hidden"
          style={{
            background:
              "linear-gradient(to right, var(--color-secondary) 50%, var(--color-background-dark) 50%)",
          }}
        />
        <div
          className="absolute inset-0 z-0 rounded-2xl hidden dark:block"
          style={{
            background:
              "linear-gradient(to right, var(--color-muted) 50%, var(--color-background-dark) 50%)",
          }}
        />

        {/* Layer 1 (bottom): Right card. Wrapper extends past center so no div edge on seam. */}
        <div
          className="absolute inset-0 z-1 w-full h-full"
          style={{ clipPath: `inset(0 0 0 ${inset}%)` }}
        >
          <div className="absolute right-0 top-0 bottom-0 w-[51%] min-w-[51%] h-full">
            <ProductCard product={rightProduct} roundedSide="right" />
          </div>
          {/* Decorative image on the left side of the AIAdFactory panel — gets covered as slider moves right */}
          {rightProduct.image && (
            <div className="absolute left-[6%] bottom-0 top-0 flex items-center pointer-events-none select-none">
              <img
                src={rightProduct.image}
                alt={rightProduct.title}
                className="h-[62%] w-auto object-contain drop-shadow-2xl rounded-xl"
                draggable={false}
              />
            </div>
          )}
        </div>

        {/* Layer 2 (top): Left card. Wrapper extends past center so no div edge on seam. */}
        <div
          className="absolute inset-0 z-2 w-full h-full"
          style={{ clipPath: `inset(0 ${100 - inset}% 0 0)` }}
        >
          <div className="absolute left-0 top-0 bottom-0 w-[51%] min-w-[51%] h-full">
            <ProductCard product={leftProduct} isMetricAI roundedSide="left" />
          </div>
          {/* Decorative image on the right side of the MetricAI panel — gets covered as slider moves left */}
          {leftProduct.image && (
            <div className="absolute right-[6%] bottom-0 top-0 flex items-center pointer-events-none select-none">
              <img
                src={leftProduct.image}
                alt={leftProduct.title}
                className="h-[62%] w-auto object-contain drop-shadow-2xl rounded-xl"
                draggable={false}
              />
            </div>
          )}
        </div>

        {/* Cover the clip-path seam so no visible line */}
        <div
          className="absolute top-0 bottom-0 z-3 w-[8px] -translate-x-1/2 pointer-events-none"
          style={{
            left: inset + "%",
            background:
              "linear-gradient(to right, var(--color-background-dark), var(--color-secondary))",
          }}
        />
        <div
          className="absolute top-0 bottom-0 z-3 w-[8px] -translate-x-1/2 pointer-events-none hidden dark:block"
          style={{
            left: inset + "%",
            background:
              "linear-gradient(to right, var(--color-background-dark), var(--color-muted))",
          }}
        />

        {/* Slider handle only (no visible track/divider) */}
        <div
          className="absolute z-4 top-0 h-full w-0"
          style={{ left: inset + "%" }}
        >
          <button
            type="button"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-5 w-10 h-12 rounded-lg bg-primary dark:bg-white text-primary-foreground dark:text-primary flex items-center justify-center cursor-ew-resize shadow-lg hover:scale-105 transition-transform select-none"
            onTouchStart={(e) => {
              setDragging(true);
              onMouseMove(e);
            }}
            onMouseDown={(e) => {
              e.preventDefault();
              setDragging(true);
              onMouseMove(e);
            }}
            onTouchEnd={() => setDragging(false)}
            onMouseUp={() => setDragging(false)}
            aria-label="Drag to compare products"
          >
            <GripVertical className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export { ProductsCardSlider };

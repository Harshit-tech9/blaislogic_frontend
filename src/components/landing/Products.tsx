import React from "react";
import { Container } from "../layout/Container";
import { EYEBROW_CLASSES } from "../../constants/layout";
import { INFRASTRUCTURE_FEATURES } from "../../config/site";
import { ProductsCardSlider } from "../ui/ProductsCardSlider";
import { cn } from "../../lib/utils";

export const Products: React.FC = () => {
  const [metricAI, aiAdFactory] = INFRASTRUCTURE_FEATURES;

  return (
    <section
      id="products"
      className="px-6 md:px-12 py-20 md:py-32 border-t border-black/5 dark:border-white/5"
      aria-labelledby="products-heading"
    >
      <Container>
        <p
          id="products-heading"
          className={cn(EYEBROW_CLASSES, "mb-12 md:mb-16 text-center")}
        >
          Products
        </p>

        <ProductsCardSlider
          leftProduct={{
            title: metricAI.title,
            description: metricAI.description,
            buttonLabel: metricAI.buttonLabel,
            siteUrl: metricAI.siteUrl,
            isMetricAI: true,
          }}
          rightProduct={{
            title: aiAdFactory.title,
            description: aiAdFactory.description,
            buttonLabel: aiAdFactory.buttonLabel,
            siteUrl: aiAdFactory.siteUrl,
          }}
        />
      </Container>
    </section>
  );
};

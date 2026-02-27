/**
 * Single source of truth for site metadata, navigation, and product names.
 * Used for SEO, Header, Footer, and consistency across the app.
 */

export const SITE = {
  name: "Blaiselogic",
  tagline: "AI infrastructure for real-world intelligence.",
  description:
    "Measure AI performance. Generate real outcomes. Build systems that solve real problems. Blaiselogic provides the foundational grid for the next generation of AI.",
  /** Used for meta tags; set in production to canonical origin */
  baseUrl: typeof import.meta.env?.VITE_SITE_URL === "string"
    ? import.meta.env.VITE_SITE_URL
    : "",
  /** Default Open Graph image path (relative to origin) */
  ogImage: "/og-image.png",
} as const;

export const NAV_LINKS = [
  { name: "Products", href: "#products" },
  { name: "Docs", href: "#docs" },
  { name: "Company", href: "#company" },
] as const;

/** Infrastructure section feature cards (single source for product names + descriptions) */
export const INFRASTRUCTURE_FEATURES = [
  {
    title: "MetricAI",
    description:
      "Track AI usage and performance across providers. Monitor inputs, outputs, latency, and cost in real time with clear, actionable visibility.",
  },
  {
    title: "AIAdFactory",
    description:
      "Generate high-quality ads directly from WhatsApp. Chat with AI, answer simple prompts, and receive ready-to-launch campaign content instantly.",
  },
  {
    title: "Solutions",
    description:
      "Custom AI systems designed around your needs. We build practical, reliable AI setups that solve real-world problems effectively.",
  },
] as const;

export const FOOTER_SECTIONS = [
  {
    title: "Platform",
    links: [
      { label: "MetricAI", href: "#metric" },
      { label: "AIAdFactory", href: "#aiadfactory" },
      { label: "Solutions", href: "#solutions" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Careers", href: "#careers" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#privacy" },
      { label: "Terms", href: "#terms" },
    ],
  },
] as const;

export const COPYRIGHT_YEAR = new Date().getFullYear();

/**
 * Single source of truth for site metadata, navigation, and product names.
 * Used for SEO, Header, Footer, and consistency across the app.
 */

export const SITE = {
  name: "BlaiseLogic",
  tagline: "Less AI noise. More AI output.",
  description:
    "We build AI products that remove the hard parts and focus on what matters. MetricAI gives developers full control over their AI API usage. AIAdFactory turns a few answers into production-ready ads.",
  /** Used for meta tags; set in production to canonical origin */
  baseUrl:
    typeof import.meta.env?.VITE_SITE_URL === "string"
      ? import.meta.env.VITE_SITE_URL
      : "",
  /** Default Open Graph image path (relative to origin) */
  ogImage: "/og-image.png",
  /** Logo path (in public folder, served at root) */
  logoPath: "/logo.jpeg",
} as const;

export const NAV_LINKS = [
  { name: "Products", href: "#products" },
  { name: "About", href: "#company" },
  { name: "Blogs", href: "#blogs" },
] as const;

/** Products section: MetricAI (left) and AIAdFactory (right). imageBefore/imageAfter for comparison slider. */
export const INFRASTRUCTURE_FEATURES = [
  {
    title: "MetricAI",
    description:
      "One place to manage every AI API you use. Control costs, secure your keys, reduce latency, and get clear insights into your usage across all providers.",
    siteUrl: "https://metricai.co.in/",
    buttonLabel: "Visit MetricAI",
    imageBefore:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=80",
    imageAfter:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80",
  },
  {
    title: "AIAdFactory",
    description:
      "Answer a few simple questions and get production-ready ads, no designer, no copywriter, no back and forth.",
    siteUrl: "",
    buttonLabel: "Visit AIAdFactory",
    imageBefore:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920&q=80",
    imageAfter:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1920&q=80",
  },
] as const;

export const FOOTER_SECTIONS = [
  {
    title: "Platform",
    links: [
      { label: "MetricAI", href: "https://metricai.co.in/" },
      { label: "AIAdFactory", href: "#products" },
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

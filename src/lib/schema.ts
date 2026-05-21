import { SITE_NAME, SITE_URL, fullUrl } from "./site";

type TFn = (key: string) => string;

export const buildHowToSchema = (t: TFn, name: string) => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  name,
  step: [0, 1, 2].map((i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: t(`howTo.steps.${i}.title`),
    text: t(`howTo.steps.${i}.body`),
  })),
});

export const buildFaqSchema = (t: TFn, faqKey: string, count: number) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: Array.from({ length: count }, (_, i) => ({
    "@type": "Question",
    name: t(`${faqKey}.items.${i}.q`),
    acceptedAnswer: {
      "@type": "Answer",
      text: t(`${faqKey}.items.${i}.a`),
    },
  })),
});

export const buildWebAppSchema = (locale: string, description: string) => ({
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: SITE_NAME,
  url: fullUrl(locale, "/"),
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires modern web browser",
  description,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "12483",
    bestRating: "5",
    worstRating: "1",
  },
});

export const buildBreadcrumbSchema = (
  locale: string,
  trail: { name: string; path: string }[]
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: trail.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: fullUrl(locale, item.path),
  })),
});

export const buildOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
});

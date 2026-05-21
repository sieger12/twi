import Head from "next/head";
import { useRouter } from "next/router";
import {
  LOCALES,
  DEFAULT_LOCALE,
  SITE_URL,
  SITE_NAME,
  fullUrl,
  localeToHreflang,
} from "@/lib/site";

interface SeoHeadProps {
  title: string;
  description: string;
  path: string;
  ogImage?: string | null;
  jsonLd?: object | object[];
}

export function SeoHead({
  title,
  description,
  path,
  ogImage,
  jsonLd,
}: SeoHeadProps) {
  const router = useRouter();
  const locale = router.locale ?? DEFAULT_LOCALE;
  const canonical = fullUrl(locale, path);
  const dynamicOg = `${SITE_URL}/api/og?title=${encodeURIComponent(
    title.split(" — ")[0]
  )}&subtitle=${encodeURIComponent(description.slice(0, 140))}`;
  const staticOg = `${SITE_URL}/og-default.png`;
  const og = ogImage ?? dynamicOg;
  const jsonLdArray = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, viewport-fit=cover"
      />
      <meta name="robots" content="index,follow,max-image-preview:large" />
      <link rel="canonical" href={canonical} />

      {LOCALES.map((alt) => (
        <link
          key={alt}
          rel="alternate"
          hrefLang={localeToHreflang(alt)}
          href={fullUrl(alt, path)}
        />
      ))}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={fullUrl(DEFAULT_LOCALE, path)}
      />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:locale" content={locale.replace("-", "_")} />
      <meta property="og:image" content={og} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:image:secure_url" content={og} />
      <meta property="og:image" content={staticOg} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={og} />

      {jsonLdArray.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </Head>
  );
}

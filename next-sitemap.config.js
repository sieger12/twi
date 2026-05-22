const { i18n } = require("./next-i18next.config");

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  "https://twi-delta.vercel.app"
).replace(/\/$/, "");

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 7000,
  exclude: ["/404", "/500", "/api/*"],
  alternateRefs: i18n.locales.map((locale) => ({
    href:
      locale === i18n.defaultLocale ? SITE_URL : `${SITE_URL}/${locale}`,
    hreflang:
      locale === "zh-CN"
        ? "zh-Hans"
        : locale === "zh-TW"
          ? "zh-Hant"
          : locale,
  })),
  transform: async (config, path) => {
    let priority = 0.7;
    let changefreq = "weekly";

    if (path === "/" || /^\/[a-z]{2,7}(-[A-Z]{2})?$/.test(path)) {
      priority = 1.0;
      changefreq = "daily";
    } else if (
      path.includes("twitter-to-mp3") ||
      path.includes("twitter-to-mp4") ||
      path.includes("twitter-image-downloader") ||
      path.includes("twitter-gif-downloader")
    ) {
      priority = 0.9;
      changefreq = "weekly";
    } else if (
      path.includes("how-to-download-twitter-video") ||
      path.includes("save-twitter-video") ||
      path.includes("alternatives") ||
      path.startsWith("/blog/") ||
      /\/[a-z]{2,7}(-[A-Z]{2})?\/blog\//.test(path)
    ) {
      priority = 0.8;
      changefreq = "weekly";
    } else if (
      path === "/blog" ||
      /^\/[a-z]{2,7}(-[A-Z]{2})?\/blog$/.test(path)
    ) {
      priority = 0.7;
      changefreq = "daily";
    } else if (
      path.includes("/privacy") ||
      path.includes("/terms") ||
      path.includes("/about") ||
      path.includes("/contact")
    ) {
      priority = 0.3;
      changefreq = "monthly";
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
      alternateRefs: i18n.locales.map((locale) => {
        const cleanPath = path.replace(/^\/[a-z]{2,7}(-[A-Z]{2})?/, "");
        const target = cleanPath || "/";
        const href =
          locale === i18n.defaultLocale
            ? `${SITE_URL}${target === "/" ? "" : target}`
            : `${SITE_URL}/${locale}${target === "/" ? "" : target}`;
        return {
          href,
          hreflang:
            locale === "zh-CN"
              ? "zh-Hans"
              : locale === "zh-TW"
                ? "zh-Hant"
                : locale,
        };
      }),
    };
  },
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
  },
};

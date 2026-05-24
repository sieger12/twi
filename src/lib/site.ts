// Single source of truth for the site URL.
// Production custom domain. Override via NEXT_PUBLIC_SITE_URL only for
// staging / preview environments. Do NOT use twitdownloader.com — owned
// by a competitor.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://twitdownloader.app";
export const SITE_NAME = "TwitDownloader";
export const SITE_TAGLINE = "Download Twitter (X) video, GIF, image, MP3";

export const DEFAULT_LOCALE = "en";

export const LOCALES = [
  "en",
  "vi",
  "ar",
  "cs",
  "de",
  "es",
  "fr",
  "hi",
  "id",
  "it",
  "ja",
  "ko",
  "pl",
  "pt",
  "ro",
  "ru",
  "th",
  "tr",
  "uk",
  "zh-CN",
  "zh-TW",
  "ms",
  "hu",
  "nl",
  "el",
  "he",
  "fa",
  "nb",
  "sv",
  "fi",
] as const;

export type Locale = (typeof LOCALES)[number];

export const RTL_LOCALES: Locale[] = ["ar", "he", "fa"];

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  vi: "Tiếng Việt",
  ar: "العربية",
  cs: "Čeština",
  de: "Deutsch",
  es: "Español",
  fr: "Français",
  hi: "हिन्दी",
  id: "Bahasa Indonesia",
  it: "Italiano",
  ja: "日本語",
  ko: "한국어",
  pl: "Polski",
  pt: "Português",
  ro: "Română",
  ru: "Русский",
  th: "ไทย",
  tr: "Türkçe",
  uk: "Українська",
  "zh-CN": "简体中文",
  "zh-TW": "繁體中文",
  ms: "Bahasa Melayu",
  hu: "Magyar",
  nl: "Nederlands",
  el: "Ελληνικά",
  he: "עברית",
  fa: "فارسی",
  nb: "Norsk Bokmål",
  sv: "Svenska",
  fi: "Suomi",
};

export const isRtl = (locale: string): boolean =>
  RTL_LOCALES.includes(locale as Locale);

export const localeToHreflang = (locale: string): string => {
  if (locale === "zh-CN") return "zh-Hans";
  if (locale === "zh-TW") return "zh-Hant";
  return locale;
};

export const PAGE_PATHS = [
  "/",
  "/twitter-to-mp3",
  "/twitter-image-downloader",
  "/twitter-gif-downloader",
] as const;

export type PagePath = (typeof PAGE_PATHS)[number];

export const localePath = (locale: string, path: string): string => {
  const clean = path === "/" ? "" : path;
  if (locale === DEFAULT_LOCALE) return clean || "/";
  return `/${locale}${clean}`;
};

export const fullUrl = (locale: string, path: string): string =>
  `${SITE_URL}${localePath(locale, path)}`;

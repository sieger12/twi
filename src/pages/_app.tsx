import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import { appWithTranslation } from "next-i18next/pages";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { isRtl } from "@/lib/site";
import { Analytics } from "@/components/Analytics";
import { AdSenseScript } from "@/components/AdSenseScript";

const fontDisplay = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const locale = router.locale ?? "en";
  const dir = isRtl(locale) ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale, dir]);

  return (
    <div
      className={`${fontDisplay.variable} ${fontSans.variable} ${fontMono.variable} min-h-screen`}
    >
      <Component {...pageProps} />
      <Analytics />
      <AdSenseScript />
    </div>
  );
}

export default appWithTranslation(App);

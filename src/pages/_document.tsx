import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from "next/document";
import { isRtl } from "@/lib/site";

interface AppDocumentProps extends DocumentInitialProps {
  locale: string;
}

class AppDocument extends Document<AppDocumentProps> {
  static async getInitialProps(ctx: DocumentContext): Promise<AppDocumentProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, locale: ctx.locale ?? "en" };
  }

  render() {
    const { locale } = this.props;
    const dir = isRtl(locale) ? "rtl" : "ltr";
    const gscVerification =
      process.env.NEXT_PUBLIC_GSC_VERIFICATION ??
      "4xIA8nYU8aPUAS69i4FMC9X-ZJv853gZEofg6ktWac8";
    const bingVerification = process.env.NEXT_PUBLIC_BING_VERIFICATION;
    const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
    return (
      <Html lang={locale} dir={dir}>
        <Head>
          {gscVerification && (
            <meta name="google-site-verification" content={gscVerification} />
          )}
          {bingVerification && (
            <meta name="msvalidate.01" content={bingVerification} />
          )}
          {adsenseClient && (
            <meta name="google-adsense-account" content={adsenseClient} />
          )}
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <link rel="icon" type="image/png" sizes="32x32" href="/icon-32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/icon-16.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/manifest.webmanifest" />
          <link rel="preconnect" href="https://cdn.syndication.twimg.com" />
          <link rel="preconnect" href="https://pbs.twimg.com" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://video.twimg.com" crossOrigin="anonymous" />
          <link rel="dns-prefetch" href="https://pbs.twimg.com" />
          <link rel="dns-prefetch" href="https://video.twimg.com" />
          <meta name="theme-color" content="#0a0a0b" />
          <meta name="application-name" content="TwitDownloader" />
          <meta name="apple-mobile-web-app-title" content="TwitDownloader" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        </Head>
        <body className="antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default AppDocument;

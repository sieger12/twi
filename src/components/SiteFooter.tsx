import Link from "next/link";
import { useTranslation } from "next-i18next/pages";
import { SITE_NAME } from "@/lib/site";

export function SiteFooter() {
  const { t } = useTranslation("common");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line/70 bg-canvas">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-3">
        <div>
          <div className="inline-flex items-center gap-2 font-display text-lg font-semibold">
            <span className="grid h-6 w-6 place-items-center rounded-md bg-accent text-accent-ink">
              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor">
                <path d="M3 3h4.6l4.4 6 4.4-6H21l-7 9.4L21 21h-4.6l-4.5-6-4.5 6H3l7-9.4L3 3z" />
              </svg>
            </span>
            {SITE_NAME}
          </div>
          <p className="mt-3 max-w-sm text-sm text-ink-muted">
            {t("footer.tagline")}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 md:col-span-2 md:grid-cols-3">
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-ink-subtle">
              {t("footer.tools")}
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/" className="text-ink-muted hover:text-ink">
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/twitter-to-mp3"
                  className="text-ink-muted hover:text-ink"
                >
                  {t("nav.mp3")}
                </Link>
              </li>
              <li>
                <Link
                  href="/twitter-to-mp4"
                  className="text-ink-muted hover:text-ink"
                >
                  {t("footer.mp4")}
                </Link>
              </li>
              <li>
                <Link
                  href="/twitter-image-downloader"
                  className="text-ink-muted hover:text-ink"
                >
                  {t("nav.image")}
                </Link>
              </li>
              <li>
                <Link
                  href="/twitter-gif-downloader"
                  className="text-ink-muted hover:text-ink"
                >
                  {t("nav.gif")}
                </Link>
              </li>
              <li>
                <Link
                  href="/save-twitter-video"
                  className="text-ink-muted hover:text-ink"
                >
                  {t("footer.save")}
                </Link>
              </li>
              <li>
                <Link
                  href="/how-to-download-twitter-video-iphone"
                  className="text-ink-muted hover:text-ink"
                >
                  {t("footer.iphone")}
                </Link>
              </li>
              <li>
                <Link
                  href="/how-to-download-twitter-video-android"
                  className="text-ink-muted hover:text-ink"
                >
                  {t("footer.android")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-ink-subtle">
              {t("footer.company")}
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-ink-muted hover:text-ink">
                  {t("footer.about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-ink-muted hover:text-ink"
                >
                  {t("footer.contact")}
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-ink-muted hover:text-ink"
                >
                  {t("footer.blog")}
                </Link>
              </li>
              <li>
                <Link
                  href="/alternatives"
                  className="text-ink-muted hover:text-ink"
                >
                  {t("footer.alternatives")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-ink-subtle">
              {t("footer.legal")}
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/terms" className="text-ink-muted hover:text-ink">
                  {t("footer.terms")}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-ink-muted hover:text-ink"
                >
                  {t("footer.privacy")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-line/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-xs text-ink-subtle sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © {year} {SITE_NAME}. {t("footer.rights")}
          </p>
          <p>{t("footer.disclaimer")}</p>
        </div>
      </div>
    </footer>
  );
}

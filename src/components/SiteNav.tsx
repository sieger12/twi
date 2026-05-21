import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useTranslation } from "next-i18next/pages";
import { Menu, X } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { SITE_NAME } from "@/lib/site";

const navItems = [
  { href: "/", key: "nav.home" },
  { href: "/twitter-to-mp3", key: "nav.mp3" },
  { href: "/twitter-to-mp4", key: "nav.mp4" },
  { href: "/twitter-image-downloader", key: "nav.image" },
  { href: "/twitter-gif-downloader", key: "nav.gif" },
];

export function SiteNav() {
  const router = useRouter();
  const { t } = useTranslation("common");
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-canvas/85 backdrop-blur-lg">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8"
        aria-label="Main"
      >
        <Link
          href="/"
          className="group inline-flex items-center gap-2 font-display text-xl font-semibold tracking-tight"
        >
          <span className="grid h-7 w-7 place-items-center rounded-md bg-accent text-accent-ink">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
              <path d="M3 3h4.6l4.4 6 4.4-6H21l-7 9.4L21 21h-4.6l-4.5-6-4.5 6H3l7-9.4L3 3z" />
            </svg>
          </span>
          <span>{SITE_NAME}</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = router.pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-mute text-ink"
                      : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {t(item.key)}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden md:block">
          <LanguageSwitcher />
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid h-9 w-9 place-items-center rounded-md border border-line text-ink-muted md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-line bg-canvas md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4">
            {navItems.map((item) => {
              const active = router.pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-lg px-3 py-2.5 text-sm font-medium ${
                      active
                        ? "bg-mute text-ink"
                        : "text-ink-muted hover:bg-mute hover:text-ink"
                    }`}
                  >
                    {t(item.key)}
                  </Link>
                </li>
              );
            })}
            <li className="pt-2">
              <LanguageSwitcher />
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

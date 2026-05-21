import Link from "next/link";
import { useTranslation } from "next-i18next/pages";
import { Apple, Smartphone, BookmarkCheck, ArrowUpRight } from "lucide-react";
import type { ComponentType } from "react";

interface GuideItem {
  key: "save" | "iphone" | "android";
  href: string;
  Icon: ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
}

const GUIDES: GuideItem[] = [
  {
    key: "save",
    href: "/save-twitter-video",
    Icon: BookmarkCheck,
  },
  {
    key: "iphone",
    href: "/how-to-download-twitter-video-iphone",
    Icon: Apple,
  },
  {
    key: "android",
    href: "/how-to-download-twitter-video-android",
    Icon: Smartphone,
  },
];

export function HowToGuides() {
  const { t } = useTranslation("common");

  return (
    <section
      aria-labelledby="howto-guides-heading"
      className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8"
    >
      <div className="mb-10 flex items-end justify-between gap-6">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
            {t("howToGuides.eyebrow")}
          </p>
          <h2
            id="howto-guides-heading"
            className="mt-3 font-display text-3xl font-medium text-balance sm:text-4xl"
          >
            {t("howToGuides.heading")}
          </h2>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {GUIDES.map(({ key, href, Icon }) => (
          <Link
            key={key}
            href={href}
            className="group relative flex flex-col gap-6 overflow-hidden rounded-2xl border border-line bg-surface/60 p-7 transition-all hover:border-accent hover:bg-surface"
          >
            <div className="flex items-center justify-between">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-mute text-accent transition-colors group-hover:bg-accent group-hover:text-accent-ink">
                <Icon size={22} strokeWidth={1.8} />
              </span>
              <ArrowUpRight
                size={18}
                className="text-ink-subtle transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
              />
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-subtle">
                {t(`howToGuides.items.${key}.tag`)}
              </p>
              <h3 className="mt-1.5 font-display text-lg font-semibold leading-tight">
                {t(`howToGuides.items.${key}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {t(`howToGuides.items.${key}.body`)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

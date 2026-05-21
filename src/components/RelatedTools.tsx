import Link from "next/link";
import { useTranslation } from "next-i18next/pages";
import { ArrowUpRight, Music, Image as ImageIcon, Sparkles, Film } from "lucide-react";
import type { ComponentType } from "react";

type ToolKey = "home" | "mp3" | "image" | "gif";

interface ToolItem {
  key: ToolKey;
  href: string;
  Icon: ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
}

const ALL_TOOLS: ToolItem[] = [
  { key: "home", href: "/", Icon: Film },
  { key: "mp3", href: "/twitter-to-mp3", Icon: Music },
  { key: "image", href: "/twitter-image-downloader", Icon: ImageIcon },
  { key: "gif", href: "/twitter-gif-downloader", Icon: Sparkles },
];

interface RelatedToolsProps {
  exclude?: ToolKey;
}

export function RelatedTools({ exclude }: RelatedToolsProps) {
  const { t } = useTranslation("common");
  const items = ALL_TOOLS.filter((tool) => tool.key !== exclude);

  return (
    <section
      aria-labelledby="related-heading"
      className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8"
    >
      <div className="mb-8">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
          {t("related.eyebrow")}
        </p>
        <h2
          id="related-heading"
          className="mt-3 font-display text-2xl font-medium text-balance sm:text-3xl"
        >
          {t("related.heading")}
        </h2>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ key, href, Icon }) => (
          <Link
            key={key}
            href={href}
            className="group flex items-start gap-4 rounded-2xl border border-line bg-surface/60 p-5 transition-colors hover:border-accent hover:bg-surface"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-mute text-ink-muted transition-colors group-hover:bg-accent group-hover:text-accent-ink">
              <Icon size={16} strokeWidth={1.8} />
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="inline-flex items-center gap-1 font-display text-base font-semibold">
                {t(`related.items.${key}.title`)}
                <ArrowUpRight
                  size={14}
                  className="text-ink-subtle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                {t(`related.items.${key}.body`)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

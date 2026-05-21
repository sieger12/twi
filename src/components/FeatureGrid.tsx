import { useTranslation } from "next-i18next/pages";
import { Video, Music, Image as ImageIcon, Sparkles } from "lucide-react";

const features = [
  { key: "video", Icon: Video },
  { key: "mp3", Icon: Music },
  { key: "image", Icon: ImageIcon },
  { key: "gif", Icon: Sparkles },
];

export function FeatureGrid() {
  const { t } = useTranslation("common");

  return (
    <section
      aria-labelledby="features-heading"
      className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8"
    >
      <div className="mb-12 flex items-end justify-between gap-6">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
            {t("features.eyebrow")}
          </p>
          <h2
            id="features-heading"
            className="mt-3 font-display text-3xl font-medium text-balance sm:text-4xl"
          >
            {t("features.heading")}
          </h2>
        </div>
      </div>

      <div className="grid gap-px overflow-hidden rounded-2xl bg-line sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ key, Icon }) => (
          <article
            key={key}
            className="group flex flex-col gap-5 bg-canvas p-7 transition-colors hover:bg-surface"
          >
            <Icon
              size={26}
              className="text-ink-muted transition-colors group-hover:text-accent"
              strokeWidth={1.6}
            />
            <div>
              <h3 className="font-display text-lg font-semibold">
                {t(`features.items.${key}.title`)}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                {t(`features.items.${key}.body`)}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

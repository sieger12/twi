import { useTranslation } from "next-i18next/pages";
import { Quote } from "lucide-react";

const KEYS = ["a", "b", "c", "d"] as const;

const ACCENT_BG = [
  "bg-[#d4ff3a]/12",
  "bg-[#a3e635]/12",
  "bg-[#facc15]/10",
  "bg-[#7dd3fc]/10",
];

export function Testimonials() {
  const { t } = useTranslation("common");

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8"
    >
      <div className="mb-12 max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
          {t("testimonials.eyebrow")}
        </p>
        <h2
          id="testimonials-heading"
          className="mt-3 font-display text-3xl font-medium text-balance sm:text-4xl"
        >
          {t("testimonials.heading")}
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {KEYS.map((k, i) => (
          <figure
            key={k}
            className="relative overflow-hidden rounded-2xl border border-line bg-surface/60 p-7"
          >
            <div
              aria-hidden
              className={`absolute -right-8 -top-8 grid h-24 w-24 place-items-center rounded-full ${ACCENT_BG[i]}`}
            >
              <Quote className="text-accent/60" size={28} strokeWidth={1.5} />
            </div>
            <blockquote className="relative z-10">
              <p className="font-display text-lg leading-snug text-balance text-ink">
                “{t(`testimonials.items.${k}.quote`)}”
              </p>
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4 text-sm">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-mute font-display font-semibold text-ink-muted">
                {t(`testimonials.items.${k}.initial`)}
              </div>
              <div className="leading-tight">
                <p className="font-medium text-ink">
                  {t(`testimonials.items.${k}.name`)}
                </p>
                <p className="text-xs text-ink-subtle">
                  {t(`testimonials.items.${k}.role`)}
                </p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

import { useState } from "react";
import { useTranslation } from "next-i18next/pages";
import { Plus, Minus } from "lucide-react";

interface AudioFaqProps {
  faqKey: string;
  count: number;
}

export function AudioFaq({ faqKey, count }: AudioFaqProps) {
  const { t } = useTranslation("common");
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const items = Array.from({ length: count }, (_, i) => ({
    q: t(`${faqKey}.items.${i}.q`),
    a: t(`${faqKey}.items.${i}.a`),
  }));

  return (
    <section
      aria-labelledby={`${faqKey}-heading`}
      className="mx-auto w-full max-w-3xl px-5 py-20 sm:px-8"
    >
      <div className="mb-10 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
          {t("faq.eyebrow")}
        </p>
        <h2
          id={`${faqKey}-heading`}
          className="mt-3 font-display text-3xl font-medium text-balance sm:text-4xl"
        >
          {t(`${faqKey}.heading`)}
        </h2>
      </div>

      <ul className="divide-y divide-line border-y border-line">
        {items.map((item, i) => {
          const open = openIdx === i;
          return (
            <li key={i}>
              <button
                type="button"
                onClick={() => setOpenIdx(open ? null : i)}
                aria-expanded={open}
                aria-controls={`faq-panel-${i}`}
                className="flex w-full items-start justify-between gap-6 py-5 text-start transition-colors hover:text-ink"
              >
                <span className="font-display text-base font-medium leading-snug text-balance sm:text-lg">
                  {item.q}
                </span>
                <span
                  className={`mt-1 inline-grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-colors ${
                    open
                      ? "border-accent bg-accent text-accent-ink"
                      : "border-line-strong text-ink-muted"
                  }`}
                  aria-hidden
                >
                  {open ? <Minus size={14} /> : <Plus size={14} />}
                </span>
              </button>
              <div
                id={`faq-panel-${i}`}
                className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ${
                  open ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"
                }`}
              >
                <div className="min-h-0">
                  <p
                    className="text-sm leading-relaxed text-ink-muted [&_strong]:font-semibold [&_strong]:text-ink [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-2"
                    dangerouslySetInnerHTML={{ __html: item.a }}
                  />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

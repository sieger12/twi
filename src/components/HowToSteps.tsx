import { useTranslation } from "next-i18next/pages";
import { Link2, MousePointerClick, Download } from "lucide-react";

interface HowToStepsProps {
  ns?: string;
}

const icons = [Link2, MousePointerClick, Download];

export function HowToSteps({ ns = "common" }: HowToStepsProps) {
  const { t } = useTranslation(ns);
  const steps = [0, 1, 2].map((i) => ({
    title: t(`howTo.steps.${i}.title`),
    body: t(`howTo.steps.${i}.body`),
    Icon: icons[i],
  }));

  return (
    <section
      aria-labelledby="how-to-heading"
      className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8"
    >
      <div className="mb-12 max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
          {t("howTo.eyebrow")}
        </p>
        <h2
          id="how-to-heading"
          className="mt-3 font-display text-3xl font-medium text-balance sm:text-4xl"
        >
          {t("howTo.heading")}
        </h2>
      </div>

      <ol className="grid gap-6 md:grid-cols-3">
        {steps.map((step, i) => {
          const Icon = step.Icon;
          return (
            <li
              key={i}
              className="relative rounded-2xl border border-line bg-surface/60 p-7 transition-colors hover:border-line-strong"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-5xl font-light tabular-nums text-ink-subtle">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Icon size={22} className="text-accent" strokeWidth={1.8} />
              </div>
              <h3 className="mt-6 font-display text-lg font-semibold">
                {step.title}
              </h3>
              <p
                className="mt-2 text-sm leading-relaxed text-ink-muted [&_strong]:font-semibold [&_strong]:text-ink [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-2"
                dangerouslySetInnerHTML={{ __html: step.body }}
              />
            </li>
          );
        })}
      </ol>
    </section>
  );
}


import { useTranslation } from "next-i18next/pages";
import { Calendar, Clock } from "lucide-react";
import { RichText } from "./RichText";

interface Section {
  heading: string;
  body: string;
}

interface BlogPostProps {
  ns: string;
}

export function BlogPost({ ns }: BlogPostProps) {
  const { t } = useTranslation("common");
  const sections = (t(`${ns}.sections`, { returnObjects: true }) ??
    []) as Section[];

  const richProseClass =
    "text-base leading-relaxed text-ink-muted [&_p]:mt-3 [&_p:first-child]:mt-0 [&_strong]:font-semibold [&_strong]:text-ink [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-2 [&_code]:rounded [&_code]:bg-mute [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm";

  return (
    <article className="mx-auto w-full max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
      <header className="mb-10">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
          {t(`${ns}.eyebrow`)}
        </p>
        <h1 className="mt-3 font-display text-4xl font-medium tracking-tight text-balance sm:text-5xl">
          {t(`${ns}.h1`)}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-muted">
          {t(`${ns}.subtitle`)}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-ink-subtle">
          <span className="inline-flex items-center gap-1.5">
            <Calendar size={12} strokeWidth={2} />
            {t(`${ns}.date`)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock size={12} strokeWidth={2} />
            {t(`${ns}.readTime`)}
          </span>
        </div>
      </header>

      <RichText html={t(`${ns}.lead`)} as="p" className={richProseClass} />

      <div className="mt-12 space-y-12">
        {sections.map((s, i) => (
          <section key={i}>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              {s.heading}
            </h2>
            <RichText
              html={s.body}
              as="div"
              className={`mt-4 ${richProseClass}`}
            />
          </section>
        ))}
      </div>
    </article>
  );
}

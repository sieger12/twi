import { useTranslation } from "next-i18next/pages";
import { RichText } from "./RichText";

interface Section {
  heading: string;
  body: string;
}

interface GuideArticleProps {
  ns: string;
}

export function GuideArticle({ ns }: GuideArticleProps) {
  const { t } = useTranslation("common");
  const intro = t(`${ns}.intro`);
  const sections = (t(`${ns}.sections`, { returnObjects: true }) ??
    []) as Section[];

  return (
    <article className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8">
      <RichText
        html={intro}
        as="p"
        className="text-lg leading-relaxed text-ink-muted [&_strong]:font-semibold [&_strong]:text-ink [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-2 [&_code]:rounded [&_code]:bg-mute [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm"
      />
      <div className="mt-12 space-y-10">
        {sections.map((s, i) => (
          <section key={i}>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              {s.heading}
            </h2>
            <RichText
              html={s.body}
              as="p"
              className="mt-3 text-base leading-relaxed text-ink-muted [&_strong]:font-semibold [&_strong]:text-ink [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-2 [&_code]:rounded [&_code]:bg-mute [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm"
            />
          </section>
        ))}
      </div>
    </article>
  );
}

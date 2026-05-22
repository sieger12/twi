import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next/pages";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import { Check, X, ExternalLink } from "lucide-react";
import { SiteShell } from "@/components/SiteShell";
import { SeoHead } from "@/components/SeoHead";
import { RichText } from "@/components/RichText";
import { RelatedTools } from "@/components/RelatedTools";
import { buildBreadcrumbSchema } from "@/lib/schema";

interface Competitor {
  name: string;
  url: string;
  pros: string;
  cons: string;
}

const PATH = "/alternatives";

export default function AlternativesPage() {
  const { t } = useTranslation("common");
  const competitors = (t("alternatives.competitors", {
    returnObjects: true,
  }) ?? []) as Competitor[];

  const schemas = [
    buildBreadcrumbSchema("en", [
      { name: t("nav.home"), path: "/" },
      { name: t("alternatives.eyebrow"), path: PATH },
    ]),
  ];

  return (
    <>
      <SeoHead
        title={t("alternatives.title")}
        description={t("alternatives.description")}
        path={PATH}
        jsonLd={schemas}
      />
      <SiteShell>
        <header className="mx-auto w-full max-w-4xl px-5 pb-6 pt-20 sm:px-8 sm:pt-24">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
            {t("alternatives.eyebrow")}
          </p>
          <h1 className="mt-4 font-display text-4xl font-medium tracking-tight text-balance sm:text-5xl">
            {t("alternatives.h1")}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">
            {t("alternatives.subtitle")}
          </p>
        </header>

        <section className="mx-auto w-full max-w-4xl px-5 pb-8 sm:px-8">
          <RichText
            html={t("alternatives.intro")}
            as="p"
            className="max-w-3xl text-base leading-relaxed text-ink-muted [&_strong]:font-semibold [&_strong]:text-ink [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-2"
          />
        </section>

        <section className="mx-auto w-full max-w-4xl px-5 pb-8 sm:px-8">
          <article className="rounded-2xl border-2 border-accent/60 bg-accent/5 p-7">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
              {t("alternatives.eyebrow")} · Top pick
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold">
              {t("alternatives.ourPick.heading")}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink-muted">
              {t("alternatives.ourPick.body")}
            </p>
          </article>
        </section>

        <section
          aria-labelledby="competitors-heading"
          className="mx-auto w-full max-w-4xl px-5 pb-12 sm:px-8"
        >
          <h2
            id="competitors-heading"
            className="sr-only"
          >
            Competitor comparison
          </h2>
          <ol className="space-y-4">
            {competitors.map((c, i) => (
              <li
                key={c.name}
                className="rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-line-strong"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-xl font-semibold">
                    <span className="me-3 font-mono text-sm tabular-nums text-ink-subtle">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {c.name}
                  </h3>
                  <a
                    href={c.url}
                    target="_blank"
                    rel="nofollow noopener"
                    className="inline-flex shrink-0 items-center gap-1 text-xs text-ink-subtle hover:text-ink"
                    aria-label={`Visit ${c.name}`}
                  >
                    Visit
                    <ExternalLink size={11} strokeWidth={2.2} />
                  </a>
                </div>
                <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="flex gap-2">
                    <Check
                      size={16}
                      className="mt-0.5 shrink-0 text-accent"
                      strokeWidth={2.4}
                    />
                    <div>
                      <dt className="text-xs font-medium uppercase tracking-wider text-ink-subtle">
                        Pros
                      </dt>
                      <dd className="mt-0.5 text-sm leading-relaxed text-ink-muted">
                        {c.pros}
                      </dd>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <X
                      size={16}
                      className="mt-0.5 shrink-0 text-danger"
                      strokeWidth={2.4}
                    />
                    <div>
                      <dt className="text-xs font-medium uppercase tracking-wider text-ink-subtle">
                        Cons
                      </dt>
                      <dd className="mt-0.5 text-sm leading-relaxed text-ink-muted">
                        {c.cons}
                      </dd>
                    </div>
                  </div>
                </dl>
              </li>
            ))}
          </ol>
        </section>

        <section className="mx-auto w-full max-w-4xl px-5 pb-20 sm:px-8">
          <div className="rounded-2xl border border-line bg-surface/60 p-7">
            <h2 className="font-display text-2xl font-semibold">
              {t("alternatives.verdictHeading")}
            </h2>
            <RichText
              html={t("alternatives.verdictBody")}
              as="p"
              className="mt-3 text-base leading-relaxed text-ink-muted [&_strong]:font-semibold [&_strong]:text-ink [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-2"
            />
          </div>
        </section>

        <RelatedTools />
      </SiteShell>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common"])),
  },
});

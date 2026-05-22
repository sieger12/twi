import { GetStaticProps } from "next";
import Link from "next/link";
import { useTranslation } from "next-i18next/pages";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import { SiteShell } from "@/components/SiteShell";
import { SeoHead } from "@/components/SeoHead";
import { RelatedTools } from "@/components/RelatedTools";

const POST_KEYS = ["without-app", "not-working", "best-2026"] as const;
const PATH = "/blog";

export default function BlogIndexPage() {
  const { t } = useTranslation("common");

  return (
    <>
      <SeoHead
        title={t("blog.title")}
        description={t("blog.description")}
        path={PATH}
      />
      <SiteShell>
        <header className="mx-auto w-full max-w-4xl px-5 pb-6 pt-20 sm:px-8 sm:pt-24">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
            {t("blog.eyebrow")}
          </p>
          <h1 className="mt-4 font-display text-4xl font-medium tracking-tight text-balance sm:text-5xl">
            {t("blog.h1")}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">
            {t("blog.subtitle")}
          </p>
        </header>

        <section className="mx-auto w-full max-w-4xl px-5 pb-20 sm:px-8">
          <ul className="grid gap-4 sm:grid-cols-2">
            {POST_KEYS.map((key) => {
              const slug = t(`blog.posts.${key}.slug`);
              return (
                <li key={key}>
                  <Link
                    href={`/blog/${slug}`}
                    className="group block h-full rounded-2xl border border-line bg-surface/60 p-7 transition-all hover:border-accent hover:bg-surface"
                  >
                    <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
                      {t(`blog.posts.${key}.eyebrow`)}
                    </p>
                    <h2 className="mt-3 font-display text-xl font-semibold leading-tight text-balance">
                      {t(`blog.posts.${key}.h1`)}
                    </h2>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-muted">
                      {t(`blog.posts.${key}.subtitle`)}
                    </p>
                    <div className="mt-5 flex items-center justify-between text-xs text-ink-subtle">
                      <div className="flex items-center gap-4">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar size={11} strokeWidth={2} />
                          {t(`blog.posts.${key}.date`)}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Clock size={11} strokeWidth={2} />
                          {t(`blog.posts.${key}.readTime`)}
                        </span>
                      </div>
                      <ArrowUpRight
                        size={14}
                        className="text-ink-subtle transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                      />
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
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

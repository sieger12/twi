import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next/pages";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import { SiteShell } from "@/components/SiteShell";
import { SeoHead } from "@/components/SeoHead";
import { Prose } from "@/components/Prose";

interface Section {
  heading: string;
  body: string;
}

export default function AboutPage() {
  const { t } = useTranslation("common");
  const sections = (t("legal.about.sections", { returnObjects: true }) ??
    []) as Section[];

  return (
    <>
      <SeoHead
        title={t("legal.about.title")}
        description={t("legal.about.description")}
        path="/about"
      />
      <SiteShell>
        <header className="mx-auto w-full max-w-3xl px-5 pb-6 pt-16 sm:px-8 sm:pt-20">
          <h1 className="font-display text-4xl font-medium tracking-tight sm:text-5xl">
            {t("legal.about.h1")}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted">
            {t("legal.about.lead")}
          </p>
        </header>
        <Prose>
          {sections.map((s, i) => (
            <div key={i}>
              <h2>{s.heading}</h2>
              <p>{s.body}</p>
            </div>
          ))}
        </Prose>
      </SiteShell>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common"])),
  },
});

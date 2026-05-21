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

export default function PrivacyPage() {
  const { t } = useTranslation("common");
  const sections = (t("legal.privacy.sections", { returnObjects: true }) ??
    []) as Section[];

  return (
    <>
      <SeoHead
        title={t("legal.privacy.title")}
        description={t("legal.privacy.description")}
        path="/privacy"
      />
      <SiteShell>
        <header className="mx-auto w-full max-w-3xl px-5 pb-6 pt-16 sm:px-8 sm:pt-20">
          <h1 className="font-display text-4xl font-medium tracking-tight sm:text-5xl">
            {t("legal.privacy.h1")}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted">
            {t("legal.privacy.lead")}
          </p>
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.18em] text-ink-subtle">
            {t("legal.privacy.updated")}
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

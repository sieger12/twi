import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next/pages";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import { SiteShell } from "@/components/SiteShell";
import { SeoHead } from "@/components/SeoHead";
import { Hero } from "@/components/Hero";
import { HowToSteps } from "@/components/HowToSteps";
import { FeatureGrid } from "@/components/FeatureGrid";
import { HowToGuides } from "@/components/HowToGuides";
import { Testimonials } from "@/components/Testimonials";
import { AudioFaq } from "@/components/AudioFaq";
import { RelatedTools } from "@/components/RelatedTools";
import {
  buildFaqSchema,
  buildHowToSchema,
  buildWebAppSchema,
  buildOrganizationSchema,
} from "@/lib/schema";

export default function HomePage() {
  const { t } = useTranslation("common");

  const faqItems = (t("home.faq.items", { returnObjects: true }) as
    | Array<{ q: string; a: string }>
    | undefined) ?? [];
  const FAQ_COUNT = faqItems.length;

  const schemas = [
    buildWebAppSchema("en", t("home.description")),
    buildOrganizationSchema(),
    buildFaqSchema(t, "home.faq", FAQ_COUNT),
    buildHowToSchema(t, t("home.h1")),
  ];

  return (
    <>
      <SeoHead
        title={t("home.title")}
        description={t("home.description")}
        path="/"
        jsonLd={schemas}
      />
      <SiteShell>
        <Hero
          eyebrow={t("home.eyebrow")}
          title={t("home.h1")}
          subtitle={t("home.subtitle")}
          format="video"
        />
        <HowToSteps />
        <FeatureGrid />
        <HowToGuides />
        <Testimonials />
        <AudioFaq faqKey="home.faq" count={FAQ_COUNT} />
        <RelatedTools exclude="home" />
      </SiteShell>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common"])),
  },
});

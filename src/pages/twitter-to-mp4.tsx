import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next/pages";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import { SiteShell } from "@/components/SiteShell";
import { SeoHead } from "@/components/SeoHead";
import { Hero } from "@/components/Hero";
import { HowToSteps } from "@/components/HowToSteps";
import { AudioFaq } from "@/components/AudioFaq";
import { Prose } from "@/components/Prose";
import { RichText } from "@/components/RichText";
import { RelatedTools } from "@/components/RelatedTools";
import {
  buildFaqSchema,
  buildHowToSchema,
  buildBreadcrumbSchema,
} from "@/lib/schema";

const FAQ_COUNT = 5;
const PATH = "/twitter-to-mp4";

export default function TwitterToMp4Page() {
  const { t } = useTranslation("common");

  const schemas = [
    buildFaqSchema(t, "mp4.faq", FAQ_COUNT),
    buildHowToSchema(t, t("mp4.h1")),
    buildBreadcrumbSchema("en", [
      { name: t("nav.home"), path: "/" },
      { name: t("mp4.eyebrow"), path: PATH },
    ]),
  ];

  return (
    <>
      <SeoHead
        title={t("mp4.title")}
        description={t("mp4.description")}
        path={PATH}
        jsonLd={schemas}
      />
      <SiteShell>
        <Hero
          eyebrow={t("mp4.eyebrow")}
          title={t("mp4.h1")}
          subtitle={t("mp4.subtitle")}
          format="mp4"
        />
        <Prose>
          <h2>{t("mp4.introHeading")}</h2>
          <RichText html={t("mp4.introBody")} as="p" />
          <RichText html={t("mp4.introBody2")} as="p" />
        </Prose>
        <HowToSteps />
        <AudioFaq faqKey="mp4.faq" count={FAQ_COUNT} />
        <RelatedTools exclude="mp4" />
      </SiteShell>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common"])),
  },
});

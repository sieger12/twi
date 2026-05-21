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

const FAQ_COUNT = 4;
const PATH = "/twitter-to-mp3";

export default function TwitterToMp3Page() {
  const { t } = useTranslation("common");

  const schemas = [
    buildFaqSchema(t, "mp3.faq", FAQ_COUNT),
    buildHowToSchema(t, t("mp3.h1")),
    buildBreadcrumbSchema("en", [
      { name: t("nav.home"), path: "/" },
      { name: t("mp3.eyebrow"), path: PATH },
    ]),
  ];

  return (
    <>
      <SeoHead
        title={t("mp3.title")}
        description={t("mp3.description")}
        path={PATH}
        jsonLd={schemas}
      />
      <SiteShell>
        <Hero
          eyebrow={t("mp3.eyebrow")}
          title={t("mp3.h1")}
          subtitle={t("mp3.subtitle")}
          format="mp3"
        />
        <Prose>
          <h2>{t("mp3.introHeading")}</h2>
          <RichText html={t("mp3.introBody")} as="p" />
          <RichText html={t("mp3.introBody2")} as="p" />
        </Prose>
        <HowToSteps />
        <AudioFaq faqKey="mp3.faq" count={FAQ_COUNT} />
        <RelatedTools exclude="mp3" />
      </SiteShell>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common"])),
  },
});

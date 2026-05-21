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
const PATH = "/twitter-image-downloader";

export default function TwitterImagePage() {
  const { t } = useTranslation("common");

  const schemas = [
    buildFaqSchema(t, "image.faq", FAQ_COUNT),
    buildHowToSchema(t, t("image.h1")),
    buildBreadcrumbSchema("en", [
      { name: t("nav.home"), path: "/" },
      { name: t("image.eyebrow"), path: PATH },
    ]),
  ];

  return (
    <>
      <SeoHead
        title={t("image.title")}
        description={t("image.description")}
        path={PATH}
        jsonLd={schemas}
      />
      <SiteShell>
        <Hero
          eyebrow={t("image.eyebrow")}
          title={t("image.h1")}
          subtitle={t("image.subtitle")}
          format="image"
        />
        <Prose>
          <h2>{t("image.introHeading")}</h2>
          <RichText html={t("image.introBody")} as="p" />
          <RichText html={t("image.introBody2")} as="p" />
        </Prose>
        <HowToSteps />
        <AudioFaq faqKey="image.faq" count={FAQ_COUNT} />
        <RelatedTools exclude="image" />
      </SiteShell>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common"])),
  },
});

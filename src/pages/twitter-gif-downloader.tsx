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
const PATH = "/twitter-gif-downloader";

export default function TwitterGifPage() {
  const { t } = useTranslation("common");

  const schemas = [
    buildFaqSchema(t, "gif.faq", FAQ_COUNT),
    buildHowToSchema(t, t("gif.h1")),
    buildBreadcrumbSchema("en", [
      { name: t("nav.home"), path: "/" },
      { name: t("gif.eyebrow"), path: PATH },
    ]),
  ];

  return (
    <>
      <SeoHead
        title={t("gif.title")}
        description={t("gif.description")}
        path={PATH}
        jsonLd={schemas}
      />
      <SiteShell>
        <Hero
          eyebrow={t("gif.eyebrow")}
          title={t("gif.h1")}
          subtitle={t("gif.subtitle")}
          format="gif"
        />
        <Prose>
          <h2>{t("gif.introHeading")}</h2>
          <RichText html={t("gif.introBody")} as="p" />
          <RichText html={t("gif.introBody2")} as="p" />
        </Prose>
        <HowToSteps />
        <AudioFaq faqKey="gif.faq" count={FAQ_COUNT} />
        <RelatedTools exclude="gif" />
      </SiteShell>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common"])),
  },
});

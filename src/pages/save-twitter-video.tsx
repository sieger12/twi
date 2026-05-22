import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next/pages";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import { SiteShell } from "@/components/SiteShell";
import { SeoHead } from "@/components/SeoHead";
import { Hero } from "@/components/Hero";
import { GuideArticle } from "@/components/GuideArticle";
import { AudioFaq } from "@/components/AudioFaq";
import { RelatedTools } from "@/components/RelatedTools";
import {
  buildFaqSchema,
  buildHowToSchema,
  buildBreadcrumbSchema,
} from "@/lib/schema";

const FAQ_COUNT = 4;
const PATH = "/save-twitter-video";
const NS = "guides.save";

export default function SaveTwitterVideoPage() {
  const { t } = useTranslation("common");

  const schemas = [
    buildFaqSchema(t, `${NS}.faq`, FAQ_COUNT),
    buildHowToSchema(t, t(`${NS}.h1`)),
    buildBreadcrumbSchema("en", [
      { name: t("nav.home"), path: "/" },
      { name: t(`${NS}.eyebrow`), path: PATH },
    ]),
  ];

  return (
    <>
      <SeoHead
        title={t(`${NS}.title`)}
        description={t(`${NS}.description`)}
        path={PATH}
        jsonLd={schemas}
      />
      <SiteShell>
        <Hero
          eyebrow={t(`${NS}.eyebrow`)}
          title={t(`${NS}.h1`)}
          subtitle={t(`${NS}.subtitle`)}
          format="video"
        />
        <GuideArticle ns={NS} />
        <AudioFaq faqKey={`${NS}.faq`} count={FAQ_COUNT} />
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

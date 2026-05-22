import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next/pages";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import { SiteShell } from "@/components/SiteShell";
import { SeoHead } from "@/components/SeoHead";
import { BlogPost } from "@/components/BlogPost";
import { RelatedTools } from "@/components/RelatedTools";
import { buildBreadcrumbSchema } from "@/lib/schema";

const NS = "blog.posts.without-app";
const PATH = "/blog/how-to-download-twitter-video-without-app";

export default function PostWithoutAppPage() {
  const { t } = useTranslation("common");

  const schemas = [
    buildBreadcrumbSchema("en", [
      { name: t("nav.home"), path: "/" },
      { name: t("blog.eyebrow"), path: "/blog" },
      { name: t(`${NS}.eyebrow`), path: PATH },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: t(`${NS}.h1`),
      datePublished: t(`${NS}.date`),
      author: { "@type": "Organization", name: "TwitDownloader" },
      description: t(`${NS}.description`),
    },
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
        <BlogPost ns={NS} />
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

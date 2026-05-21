import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next/pages";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import { Mail } from "lucide-react";
import { SiteShell } from "@/components/SiteShell";
import { SeoHead } from "@/components/SeoHead";

export default function ContactPage() {
  const { t } = useTranslation("common");
  const email = t("legal.contact.email");

  return (
    <>
      <SeoHead
        title={t("legal.contact.title")}
        description={t("legal.contact.description")}
        path="/contact"
      />
      <SiteShell>
        <section className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
          <h1 className="font-display text-4xl font-medium tracking-tight sm:text-5xl">
            {t("legal.contact.h1")}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted">
            {t("legal.contact.lead")}
          </p>

          <div className="mt-10 rounded-2xl border border-line bg-surface p-7">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink-subtle">
              {t("legal.contact.emailLabel")}
            </p>
            <a
              href={`mailto:${email}`}
              className="mt-2 inline-flex items-center gap-2 font-display text-2xl font-semibold text-accent hover:text-accent-hover"
            >
              <Mail size={20} strokeWidth={2} />
              {email}
            </a>
          </div>

          <div className="mt-8">
            <h2 className="font-display text-xl font-semibold">
              {t("legal.contact.copyrightHeading")}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink-muted">
              {t("legal.contact.copyrightBody")}
            </p>
          </div>
        </section>
      </SiteShell>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common"])),
  },
});

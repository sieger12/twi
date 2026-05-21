import { ReactNode } from "react";
import { useTranslation } from "next-i18next/pages";
import { ShieldCheck, Zap, Globe } from "lucide-react";
import { TweetUrlInput } from "./TweetUrlInput";

interface HeroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  format?: "video" | "mp3" | "image" | "gif";
  badge?: ReactNode;
}

export function Hero({
  eyebrow,
  title,
  subtitle,
  format = "video",
  badge,
}: HeroProps) {
  const { t } = useTranslation("common");
  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-[40rem]"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgb(212 255 58 / 0.08) 0%, transparent 70%)",
        }}
      />
      <div className="mx-auto flex max-w-4xl flex-col items-center px-5 pb-12 pt-20 text-center sm:px-8 sm:pt-28">
        {badge ?? (
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3 py-1 font-mono text-xs uppercase tracking-[0.18em] text-ink-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {eyebrow}
          </p>
        )}

        <h1 className="mt-6 max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-[4rem]">
          {title}
        </h1>

        <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-muted text-balance sm:text-lg">
          {subtitle}
        </p>

        <div className="mt-9 w-full">
          <TweetUrlInput format={format} variant="hero" />
        </div>

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-ink-muted sm:text-sm">
          <li className="inline-flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-accent" />
            {t("hero.bullets.safe")}
          </li>
          <li className="inline-flex items-center gap-1.5">
            <Zap size={14} className="text-accent" />
            {t("hero.bullets.fast")}
          </li>
          <li className="inline-flex items-center gap-1.5">
            <Globe size={14} className="text-accent" />
            {t("hero.bullets.free")}
          </li>
        </ul>
      </div>
    </section>
  );
}

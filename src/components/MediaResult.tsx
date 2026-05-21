import Image from "next/image";
import { Download, Film, Image as ImageIcon, Sparkles, User } from "lucide-react";
import { useTranslation } from "next-i18next/pages";
import type { ExtractSuccess, MediaVariant } from "@/lib/extract";

interface MediaResultProps {
  result: ExtractSuccess;
}

function downloadHref(variant: MediaVariant, baseName: string): string {
  const params = new URLSearchParams({
    src: variant.url,
    name: baseName,
  });
  return `/api/download?${params.toString()}`;
}

function variantLabel(v: MediaVariant): string {
  if (v.contentType.startsWith("image/")) return "Original";
  if (v.bitrate) {
    const mbps = (v.bitrate / 1_000_000).toFixed(1);
    return `${v.quality.toUpperCase()} · ${mbps} Mbps`;
  }
  return v.quality.toUpperCase();
}

const typeIcons = {
  video: Film,
  photo: ImageIcon,
  animated_gif: Sparkles,
} as const;

export function MediaResult({ result }: MediaResultProps) {
  const { t } = useTranslation("common");
  const TypeIcon = typeIcons[result.type] ?? Film;
  const isPhotos = result.type === "photo";

  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-line bg-surface animate-slide-up">
      <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3.5">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-mute text-accent">
            <TypeIcon size={15} strokeWidth={2} />
          </span>
          <div className="min-w-0">
            <p className="flex items-center gap-1.5 text-xs font-medium text-ink-muted">
              <User size={11} strokeWidth={2.2} />
              <span className="truncate">@{result.username}</span>
            </p>
            {result.text && (
              <p className="mt-0.5 truncate text-xs text-ink-subtle">
                {result.text}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-4 p-5 sm:grid-cols-[160px_1fr] sm:items-center">
        {result.thumbnail && (
          <div className="relative h-32 overflow-hidden rounded-xl border border-line bg-canvas sm:h-24">
            <Image
              src={result.thumbnail}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, 160px"
              className="object-cover"
              unoptimized
            />
          </div>
        )}

        <div className="flex flex-col gap-2">
          {result.variants.map((v, i) => {
            const baseName = isPhotos
              ? `${result.username}_${result.tweetId}_${i + 1}`
              : `${result.username}_${result.tweetId}`;
            return (
              <a
                key={`${v.url}-${i}`}
                href={downloadHref(v, baseName)}
                className="group inline-flex items-center justify-between gap-3 rounded-xl border border-line bg-canvas px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent hover:bg-mute"
                rel="nofollow noopener"
              >
                <span className="font-display font-semibold">
                  {isPhotos
                    ? `${t("result.image")} ${i + 1}`
                    : variantLabel(v)}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-ink-muted group-hover:text-accent">
                  <Download size={13} strokeWidth={2.2} />
                  {t("result.download")}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

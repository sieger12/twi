import { useState, FormEvent, ClipboardEvent } from "react";
import { useTranslation } from "next-i18next/pages";
import { Clipboard, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { MediaResult } from "./MediaResult";
import type { ExtractResult, ExtractSuccess } from "@/lib/extract";

type Format = "video" | "mp3" | "mp4" | "image" | "gif";

interface TweetUrlInputProps {
  format?: Format;
  variant?: "hero" | "compact";
}

const TWEET_URL_RE =
  /^https?:\/\/(www\.|mobile\.)?(twitter|x)\.com\/[^/]+\/status\/\d+/i;

export function TweetUrlInput({
  format = "video",
  variant = "hero",
}: TweetUrlInputProps) {
  const { t } = useTranslation("common");
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [pasted, setPasted] = useState(false);
  const [result, setResult] = useState<ExtractSuccess | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    const url = value.trim();
    if (!url) {
      setError(t("input.errorEmpty"));
      return;
    }
    if (!TWEET_URL_RE.test(url)) {
      setError(t("input.errorInvalid"));
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/extract", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data: ExtractResult = await res.json();
      if (!data.ok) {
        const map: Record<string, string> = {
          invalid_url: t("input.errorInvalid"),
          tweet_not_found: t("input.errorNotFound"),
          no_media: t("input.errorNoMedia"),
          rate_limited: t("input.errorRateLimited"),
          syndication_error: t("input.errorEngine"),
        };
        setError(map[data.error] ?? t("input.errorEngine"));
        return;
      }
      setResult(data);
    } catch {
      setError(t("input.errorEngine"));
    } finally {
      setLoading(false);
    }
  };

  const onPasteClick = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setValue(text);
        setPasted(true);
        setTimeout(() => setPasted(false), 1500);
      }
    } catch {
      // clipboard blocked
    }
  };

  const onPasteEvent = (e: ClipboardEvent<HTMLInputElement>) => {
    setError(null);
    if (!e.clipboardData) return;
    setPasted(true);
    setTimeout(() => setPasted(false), 1200);
  };

  const isHero = variant === "hero";

  return (
    <div className={`w-full ${isHero ? "max-w-2xl" : "max-w-xl"} mx-auto`}>
      <form onSubmit={onSubmit} noValidate>
        <div
          className={`group relative flex items-stretch overflow-hidden rounded-2xl border bg-surface transition-all ${
            error
              ? "border-danger/60"
              : "border-line focus-within:border-accent/70 focus-within:shadow-[0_0_0_4px_rgb(212_255_58_/_0.12)]"
          }`}
        >
          <input
            type="url"
            inputMode="url"
            autoComplete="off"
            spellCheck={false}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (error) setError(null);
            }}
            onPaste={onPasteEvent}
            placeholder={t("input.placeholder")}
            aria-label={t("input.placeholder")}
            className={`min-w-0 flex-1 bg-transparent px-5 py-4 text-base text-ink outline-none placeholder:text-ink-subtle ${
              isHero ? "sm:text-lg" : ""
            }`}
          />

          <button
            type="button"
            onClick={onPasteClick}
            className="hidden items-center gap-1.5 border-s border-line px-4 text-sm font-medium text-ink-muted transition-colors hover:bg-mute hover:text-ink sm:inline-flex"
            aria-label={t("input.paste")}
          >
            <Clipboard size={14} strokeWidth={2} />
            <span>{pasted ? t("input.pasted") : t("input.paste")}</span>
          </button>

          <button
            type="submit"
            disabled={loading}
            className="group/btn inline-flex items-center gap-2 bg-accent px-5 font-display text-sm font-semibold text-accent-ink transition-colors hover:bg-accent-hover disabled:opacity-70 sm:px-7 sm:text-base"
          >
            {loading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <>
                <span>{t(`input.action.${format}`)}</span>
                <ArrowRight
                  size={18}
                  strokeWidth={2.5}
                  className="transition-transform group-hover/btn:translate-x-0.5"
                />
              </>
            )}
          </button>
        </div>

        {error && (
          <p
            role="alert"
            className="mt-3 inline-flex items-start gap-1.5 text-sm text-danger"
          >
            <AlertCircle size={14} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </p>
        )}

        {!error && !result && isHero && (
          <p className="mt-3 text-xs text-ink-subtle">{t("input.example")}</p>
        )}
      </form>

      {result && <MediaResult result={result} />}
    </div>
  );
}

import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Globe, Check } from "lucide-react";
import { LOCALES, LOCALE_LABELS, DEFAULT_LOCALE } from "@/lib/site";

export function LanguageSwitcher() {
  const router = useRouter();
  const current = router.locale ?? DEFAULT_LOCALE;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-sm text-ink-muted transition-colors hover:border-line-strong hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Change language"
      >
        <Globe size={14} strokeWidth={2} />
        <span className="font-medium">
          {LOCALE_LABELS[current as keyof typeof LOCALE_LABELS] ?? current}
        </span>
      </button>

      {open && (
        <div className="absolute end-0 z-50 mt-2 max-h-96 w-56 overflow-y-auto rounded-xl border border-line bg-surface p-1 shadow-2xl animate-fade-in">
          <ul role="listbox">
            {LOCALES.map((l) => {
              const { pathname, query, asPath } = router;
              return (
                <li key={l}>
                  <Link
                    href={{ pathname, query }}
                    as={asPath}
                    locale={l}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-mute ${
                      l === current ? "text-accent" : "text-ink"
                    }`}
                  >
                    <span>{LOCALE_LABELS[l]}</span>
                    {l === current && <Check size={14} strokeWidth={2.5} />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

import { useEffect, useRef } from "react";

const CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

interface AdSlotProps {
  slot: string;
  format?: "auto" | "fluid" | "rectangle" | "horizontal";
  layout?: string;
  className?: string;
  minHeight?: number;
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export function AdSlot({
  slot,
  format = "auto",
  layout,
  className,
  minHeight = 90,
}: AdSlotProps) {
  const ref = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (!CLIENT_ID) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // adsbygoogle not ready yet
    }
  }, []);

  if (!CLIENT_ID) {
    return (
      <div
        className={`mx-auto w-full max-w-3xl rounded-2xl border border-dashed border-line bg-mute/40 px-5 py-6 text-center text-xs text-ink-subtle ${className ?? ""}`}
        style={{ minHeight }}
        aria-hidden
      >
        <p className="font-mono uppercase tracking-[0.18em]">Ad placeholder</p>
        <p className="mt-1 opacity-60">Set NEXT_PUBLIC_ADSENSE_CLIENT_ID to enable</p>
      </div>
    );
  }

  return (
    <div className={`mx-auto w-full max-w-3xl ${className ?? ""}`}>
      <ins
        ref={ref}
        className="adsbygoogle"
        style={{ display: "block", minHeight }}
        data-ad-client={CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-ad-layout={layout}
        data-full-width-responsive="true"
      />
    </div>
  );
}

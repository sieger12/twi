import { ReactNode } from "react";

export function Prose({ children }: { children: ReactNode }) {
  return (
    <section className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8">
      <div className="space-y-5 text-base leading-relaxed text-ink-muted [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-medium [&_h2]:text-ink [&_h2]:mt-10 [&_h2]:mb-3 [&_h3]:font-display [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-ink [&_h3]:mt-6 [&_h3]:mb-2 [&_strong]:text-ink [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4 [&_ul]:list-disc [&_ul]:ps-5 [&_ul]:space-y-2 [&_p]:max-w-prose">
        {children}
      </div>
    </section>
  );
}

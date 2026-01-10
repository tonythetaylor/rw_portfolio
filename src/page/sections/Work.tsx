import { Container } from "../components/Container";
import { getTheme } from "../../theme";
import { useSiteConfig } from "../../site/SiteConfigContext";

export function Work() {
  const config = useSiteConfig();
  const { work } = config;
  const t = getTheme(config);

  return (
    <section id="work" className="py-14 sm:py-18 scroll-mt-16">
      <Container>
        <div className="text-xs tracking-[0.35em] uppercase text-black/60">
          Work
        </div>

        <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-black">
          {work.heading}
        </h2>

        <div className="mt-8 grid gap-4">
          {work.items.map((w, idx) => (
            <article
              key={`${w.title}-${w.org ?? ""}-${w.dates ?? ""}-${idx}`}
              className={[
                "rounded-2xl border p-6 sm:p-7",
                t.cardBg,
                t.cardBorder,
                "shadow-[0_4px_20px_rgba(0,0,0,0.06)]",
                "hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]",
                "transition-all duration-200 ease-out hover:-translate-y-[1px]",
                "focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-white",
                t.ring,
              ].join(" ")}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-lg sm:text-xl font-semibold tracking-tight text-black">
                    {w.title}
                  </div>

                  {[w.org, w.dates].filter(Boolean).length ? (
                    <div className={`mt-1 text-sm ${t.mutedText}`}>
                      {[w.org, w.dates].filter(Boolean).join(" • ")}
                    </div>
                  ) : null}
                </div>

                {/* Subtle org chip */}
                {w.org ? (
                  <div
                    className={[
                      "inline-flex shrink-0 items-center rounded-full",
                      "border border-black/10 bg-black/[0.02]",
                      "px-3 py-1 text-[11px] tracking-[0.22em] uppercase text-black/60",
                    ].join(" ")}
                  >
                    {w.org}
                  </div>
                ) : null}
              </div>

              <ul className="mt-5 space-y-2.5 text-sm text-black/75 leading-relaxed">
                {w.bullets.map((b, i) => (
                  <li key={`${w.title}-${i}`} className="flex gap-3">
                    <span
                      className={[
                        "mt-2 h-1.5 w-1.5 rounded-full shrink-0",
                        t.accentDot,
                      ].join(" ")}
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
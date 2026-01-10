import { Container } from "../components/Container";
import { getTheme } from "../../theme";
import { useSiteConfig } from "../../site/SiteConfigContext";

export function Testimonials() {
  const config = useSiteConfig();
  const { testimonials } = config;
  const theme = getTheme(config);

  return (
    <section id="testimonials" className="py-14 sm:py-18 scroll-mt-16">
      <Container>
        <div className="text-xs tracking-[0.35em] uppercase text-black/60">
          Testimonials
        </div>

        <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-black">
          {testimonials.heading}
        </h2>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.items.map((t, idx) => (
            <article
              key={`${t.name}-${idx}`}
              className={[
                "rounded-2xl border p-6 sm:p-7",
                theme.cardBg,
                theme.cardBorder,
                "shadow-[0_4px_20px_rgba(0,0,0,0.06)]",
                "hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]",
                "transition-all duration-200 ease-out hover:-translate-y-[1px]",
                "focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-white",
                theme.ring,
              ].join(" ")}
            >
              {/* Accent bar */}
              <div className={`h-1 w-10 rounded-full ${theme.accentBar}`} />

              <p className="mt-4 text-sm text-black/85 leading-relaxed">
                “{t.quote}”
              </p>

              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold text-black">
                    {t.name}
                  </div>
                  {t.role ? (
                    <div className={`mt-1 text-xs ${theme.mutedText}`}>
                      {t.role}
                    </div>
                  ) : null}
                </div>

                {/* subtle quote mark */}
                <div className="text-3xl leading-none text-black/10 select-none">
                  “”
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

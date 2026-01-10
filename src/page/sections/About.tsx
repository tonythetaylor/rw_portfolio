import { Container } from "../components/Container";
import { getTheme } from "../../theme";
import { useSiteConfig } from "../../site/SiteConfigContext";

export function About() {
  const config = useSiteConfig();
  const { about } = config;
  const theme = getTheme(config);

  return (
    <section id="about" className="py-14 sm:py-18">
      <Container>
        <div className="max-w-3xl">
          <div className="text-xs tracking-[0.35em] uppercase text-black/60">
            About
          </div>

          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-black">
            {about.heading}
          </h2>

          <div className="mt-6 space-y-4 text-sm sm:text-base text-black/75 leading-relaxed">
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        {about.highlights?.length ? (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            {about.highlights.map((h, idx) => (
              <article
                key={`${h.title}-${idx}`}
                className={[
                  "group rounded-2xl border p-5",
                  theme.cardBg,
                  theme.cardBorder,
                  // lighter “premium” shadow (less floaty than before)
                  "shadow-[0_1px_0_rgba(0,0,0,0.04),0_10px_30px_rgba(0,0,0,0.04)]",
                  "hover:shadow-[0_1px_0_rgba(0,0,0,0.06),0_16px_40px_rgba(0,0,0,0.06)]",
                  "transition-all duration-200 ease-out",
                  "hover:-translate-y-[1px]",
                  "focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-white",
                  theme.ring,
                ].join(" ")}
              >
                <div className={`h-1 w-10 rounded-full ${theme.accentBar} opacity-80`} />

                <div className="mt-3 text-sm font-semibold text-black">
                  {h.title}
                </div>

                <div className={["mt-2 text-sm leading-relaxed", theme.mutedText].join(" ")}>
                  {h.body}
                </div>
              </article>
            ))}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
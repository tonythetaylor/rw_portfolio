import { Container } from "../components/Container";
import { getTheme } from "../../theme";
import { useSiteConfig } from "../../site/SiteConfigContext";
import { withBase } from "../../lib/asset";

export function Projects() {
  const config = useSiteConfig();
  const { projects } = config;
  const t = getTheme(config);

  return (
    <section id="projects" className="py-14 sm:py-18 bg-white">
      <Container>
        <div className="text-xs tracking-[0.35em] uppercase text-black/60">
          Projects
        </div>

        <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-black">
          {projects.heading}
        </h2>

        {projects.intro ? (
          <p className={`mt-4 text-sm max-w-2xl ${t.mutedText}`}>
            {projects.intro}
          </p>
        ) : null}

        <div className="mt-8 grid gap-6">
          {projects.items.map((p, idx) => (
            <article
              key={`${p.title}-${idx}`}
              className={[
                "rounded-3xl overflow-hidden border",
                t.cardBg,
                t.cardBorder,
                "shadow-[0_4px_20px_rgba(0,0,0,0.06)]",
                "hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]",
                "transition-all duration-200 ease-out",
                "focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-white",
                t.ring,
              ].join(" ")}
            >
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr]">
                {/* Text column */}
                <div className="p-6 sm:p-7">
                  <div className={`h-1 w-10 rounded-full ${t.accentBar}`} />

                  <div className="mt-4 text-lg sm:text-xl font-semibold tracking-tight text-black">
                    {p.title}
                  </div>

                  <p className={`mt-2 text-sm leading-relaxed ${t.mutedText}`}>
                    {p.description}
                  </p>

                  {p.tags?.length ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.tags.map((tag) => (
                        <span
                          key={tag}
                          className={[
                            "text-xs rounded-full px-3 py-1 border",
                            t.cardBg,
                            t.cardBorder,
                            t.mutedText,
                          ].join(" ")}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  {p.link ? (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      className={[
                        "inline-flex mt-5 text-xs tracking-wide underline underline-offset-4",
                        "transition hover:text-black",
                        t.mutedText,
                      ].join(" ")}
                    >
                      View project
                    </a>
                  ) : null}
                </div>

                {/* Image grid */}
                <div className="bg-neutral-100/70 p-4">
                  <div className="grid grid-cols-2 gap-3">
                    {p.images.slice(0, 4).map((src, i) => (
                      <div
                        key={`${p.title}-img-${i}`}
                        className="aspect-square rounded-2xl overflow-hidden bg-neutral-200"
                      >
                        <img
                          src={withBase(src)}
                          alt=""
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>

                  {p.images.length > 4 ? (
                    <div className="mt-2 text-xs text-black/60">
                      +{p.images.length - 4} more
                    </div>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
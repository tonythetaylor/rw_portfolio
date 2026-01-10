import { Container } from "../components/Container";
import { getTheme } from "../../theme";
import { useSiteConfig } from "../../site/SiteConfigContext";

export function Hero() {
  const config = useSiteConfig();
  const { hero } = config;
  const t = getTheme(config);

  // Use accentBar for hero primary button background so theme is consistent.
  // Example: "bg-emerald-600"
  const primaryBg = t.accentBar;
  const primaryHover = t.primaryBtnHover; // already theme-specific hover class

  return (
    <section id="hero" className="relative overflow-hidden scroll-mt-16">
      {/* Background image layer (muted) */}
      {hero.backgroundImage && (
        <div
          className="absolute inset-0 scale-105"
          style={{
            backgroundImage: `url(${hero.backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.75) saturate(0.7)",
          }}
        />
      )}

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/25 to-black/55" />

      {/* Content */}
      <div className="relative min-h-[70dvh] flex items-center">
        <Container className="py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left column */}
            <div className="text-white">
              <div className="flex items-center gap-4">
                {hero.profileImage ? (
                  <img
                    src={hero.profileImage}
                    alt="Profile"
                    className="h-20 w-20 rounded-full object-cover border border-white/40 shadow-[0_0_0_6px_rgba(255,255,255,0.15)]"
                  />
                ) : null}

                <div>
                  <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight">
                    {hero.name}
                  </h1>

                  <div className={`mt-2 text-xs sm:text-sm tracking-[0.35em] uppercase ${t.kickerText}`}>
                    {hero.tagline}
                  </div>
                </div>
              </div>

              <p className="mt-6 max-w-xl text-sm sm:text-base text-white/85 leading-relaxed">
                {hero.bio}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {hero.ctas.map((c, idx) => {
                  const isPrimary = idx === 0;

                  const base = [
                    "rounded-full px-5 py-3 text-xs tracking-[0.28em] uppercase transition",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40",
                    t.ring,
                  ].join(" ");

                  // Primary: theme accent (driven by accentBar)
                  const primary = [
                    primaryBg,
                    "text-white shadow-sm",
                    primaryHover,
                  ].join(" ");

                  // Secondary: glass button
                  const secondary = [
                    "bg-white/12 text-white border border-white/25 backdrop-blur-sm",
                    "hover:bg-white/18 hover:border-white/35",
                    "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.10)]",
                  ].join(" ");

                  return (
                    <a
                      key={`${c.href}-${idx}`}
                      href={c.href}
                      className={`${base} ${isPrimary ? primary : secondary}`}
                    >
                      {c.label}
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Right column (overview card) */}
            <div className="hidden lg:block">
              <div className="rounded-3xl bg-white/80 backdrop-blur border border-white/30 p-6">
                <div className="text-xs tracking-[0.35em] uppercase text-black/60">
                  Overview
                </div>
                <div className="mt-3 text-sm text-black/75 leading-7">
                  {config.meta.description}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
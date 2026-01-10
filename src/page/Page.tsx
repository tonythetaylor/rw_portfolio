import type { SiteConfig, SiteSectionId } from "../site.config";
import { useSiteConfig } from "../site/SiteConfigContext";
import { Navbar } from "./components/Navbar";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Work } from "./sections/Work";
import { Projects } from "./sections/Projects";
import { Testimonials } from "./sections/Testimonials";
import { Connect } from "./sections/Connect";
import { Footer } from "./sections/Footer";

const sectionMap = {
  hero: Hero,
  about: About,
  work: Work,
  projects: Projects,
  testimonials: Testimonials,
  connect: Connect,
} as const;

type SectionId = Exclude<SiteSectionId, "hero">;

function getSectionBg(config: SiteConfig, id: SectionId, index: number) {
  const policy = config.theme.sections;

  // Default if not configured
  const fallbackBase = "bg-white";
  if (!policy) return fallbackBase;

  // Overrides win always
  const override = policy.overrides?.[id];
  if (override) return override;

  const base = policy.base ?? fallbackBase;

  if (policy.mode === "solid") return base;

  if (policy.mode === "alternate") {
    const alt = policy.alt ?? base; // if alt missing, use base
    return index % 2 === 0 ? base : alt;
  }

  // custom mode: base is default, overrides handled above
  return base;
}

export function Page() {
  const config = useSiteConfig();

  const enabledSections = config.nav.sections
    .filter((s) => s.enabled && s.id !== "hero")
    .map((s) => s.id as SectionId);

  return (
    <div className="min-h-dvh bg-white text-neutral-950">
      {config.nav.enabled ? <Navbar /> : null}

      <main>
        {/* Hero stays first */}
        <Hero />

        {/* Render the rest with Page-controlled backgrounds */}
        {enabledSections.map((id, i) => {
          const Section = sectionMap[id];
          const bg = getSectionBg(config, id, i);

          return (
            <section key={id} id={id} className={bg}>
              <Section />
            </section>
          );
        })}
      </main>

      <Footer />
    </div>
  );
}
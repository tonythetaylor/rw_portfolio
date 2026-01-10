import React from "react";
import { Container } from "./Container";
import { getTheme } from "../../theme";
import { useSiteConfig } from "../../site/SiteConfigContext";

export function Navbar() {
  const config = useSiteConfig();
  const theme = getTheme(config);
  const [open, setOpen] = React.useState(false);

  const sections = config.nav.sections.filter((s) => s.enabled && s.id !== "hero");

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/70 backdrop-blur">
      <Container>
        <div className="h-14 flex items-center justify-between gap-4">
          <a
            href="#hero"
            className="text-sm font-semibold text-black truncate"
            onClick={() => setOpen(false)}
          >
            {config.meta.title}
          </a>

          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center gap-6 text-sm text-black/70">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={[
                  "relative py-2 hover:text-black transition",
                  "after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:rounded-full after:transition-all",
                  theme.accentBar.replace("bg-", "after:bg-"),
                  "hover:after:w-full",
                ].join(" ")}
              >
                {s.label}
              </a>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            type="button"
            className={[
              "sm:hidden inline-flex items-center justify-center rounded-full border px-3 py-2",
              theme.cardBorder,
              "bg-white/70",
              "text-xs tracking-[0.22em] uppercase text-black/70",
              "hover:bg-white transition",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
              theme.ring,
            ].join(" ")}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>

        {/* Mobile nav panel */}
        {open ? (
          <div id="mobile-nav" className="sm:hidden pb-4">
            <div className="rounded-2xl border border-black/10 bg-white shadow-sm overflow-hidden">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 text-sm text-black/75 hover:bg-black/[0.03] hover:text-black transition"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </Container>
    </header>
  );
}
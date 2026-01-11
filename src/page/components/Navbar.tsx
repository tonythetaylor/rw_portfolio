import React from "react";
import { Container } from "./Container";
import { getTheme } from "../../theme";
import { useSiteConfig } from "../../site/SiteConfigContext";
import { Logo } from "./Logo";

export function Navbar() {
  const config = useSiteConfig();
  const theme = getTheme(config);
  const [open, setOpen] = React.useState(false);

  const sections = config.nav.sections.filter(
    (s) => s.enabled && s.id !== "hero"
  );

  // Lock body scroll when drawer is open (mobile only behavior still fine)
  React.useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-black/10 bg-white/70 backdrop-blur">
        <Container>
          <div className="h-14 flex items-center justify-between gap-4">
            {/* Brand */}
            <a
              href="#hero"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 min-w-0"
            >
              <Logo size={28} />
              <span className="text-sm font-semibold text-black truncate">
                {config.meta.title}
              </span>
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
                "sm:hidden inline-flex items-center justify-center rounded-full px-4 py-2",
                "text-xs tracking-[0.22em] uppercase font-medium",
                "transition active:scale-[0.97]",
                theme.accentBar,
                "text-white shadow-sm hover:opacity-90",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                theme.ring,
              ].join(" ")}
              aria-expanded={open}
              aria-controls="mobile-drawer"
              onClick={() => setOpen(true)}
            >
              Menu
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile Drawer */}
      <div
        className={[
          "sm:hidden fixed inset-0 z-[60]",
          open ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
        aria-hidden={!open}
      >
        {/* Backdrop */}
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className={[
            "absolute inset-0",
            "transition-opacity duration-200",
            open ? "opacity-100" : "opacity-0",
            "bg-black/30 backdrop-blur-[2px]",
          ].join(" ")}
        />

        {/* Panel */}
        <aside
          id="mobile-drawer"
          className={[
            "absolute right-0 top-0 h-full w-[86%] max-w-sm",
            "bg-white shadow-2xl border-l border-black/10",
            "transition-transform duration-200 ease-out",
            open ? "translate-x-0" : "translate-x-full",
            "pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]",
          ].join(" ")}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
        >
          {/* Drawer header */}
          <div className="px-5 pt-4 pb-3 border-b border-black/10 flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <Logo size={26} />
              <div className="min-w-0">
                <div className="text-sm font-semibold text-black truncate">
                  {config.meta.title}
                </div>
                <div className="text-xs text-black/60 truncate">
                  Navigation
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className={[
                "rounded-full px-3 py-2",
                "text-[11px] tracking-[0.22em] uppercase font-medium",
                theme.accentBar,
                "text-white shadow-sm hover:opacity-90 transition",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                theme.ring,
              ].join(" ")}
            >
              Close
            </button>
          </div>

          {/* Links */}
          <nav className="px-2 py-3">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setOpen(false)}
                className={[
                  "flex items-center justify-between",
                  "px-4 py-3 rounded-2xl",
                  "text-sm text-black/80 hover:text-black",
                  "hover:bg-black/[0.03] transition",
                ].join(" ")}
              >
                <span>{s.label}</span>
                <span className="text-black/30">›</span>
              </a>
            ))}
          </nav>

          {/* Optional bottom hint (very iOS) */}
          <div className="mt-auto px-5 py-4">
            <div className="text-xs text-black/50">
              Tap a section to jump. Swipe-like feel, no dropdown clutter.
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
import React from "react";
import { Container } from "../components/Container";
import { getTheme } from "../../theme";
import { useSiteConfig } from "../../site/SiteConfigContext";

function ExternalLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={[
        "inline-flex items-center gap-2 text-sm font-medium",
        "text-black/80 hover:text-black transition",
        className,
      ].join(" ")}
    >
      {children}
      <span aria-hidden className="text-black/40">
        ↗
      </span>
    </a>
  );
}

function Row({
  label,
  children,
  mutedText,
}: {
  label: string;
  children: React.ReactNode;
  mutedText: string;
}) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-4 sm:p-5">
      <div className={["text-[11px] tracking-[0.28em] uppercase", mutedText].join(" ")}>
        {label}
      </div>
      <div className="mt-2 text-sm sm:text-base text-black/80">{children}</div>
    </div>
  );
}

export function Connect() {
  const config = useSiteConfig();
  const { connect } = config;
  const theme = getTheme(config);

  return (
    <section id="connect" className="py-14 sm:py-18 bg-white">
      <Container>
        {/* Header */}
        <div className="max-w-2xl">
          <div className="text-xs tracking-[0.35em] uppercase text-black/60">
            Connect
          </div>

          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-black">
            {connect.heading}
          </h2>

          {connect.blurb ? (
            <p
              className={[
                "mt-4 text-sm sm:text-base leading-relaxed",
                theme.mutedText,
              ].join(" ")}
            >
              {connect.blurb}
            </p>
          ) : null}
        </div>

        {/* Card */}
        <div className="mt-10 w-full">
          <div
            className={[
              "w-full rounded-3xl border p-6 sm:p-8",
              theme.cardBg,
              theme.cardBorder,
              "shadow-[0_4px_20px_rgba(0,0,0,0.06)]",
              "hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]",
              "transition-all duration-200 ease-out",
              "focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-white",
              theme.ring,
            ].join(" ")}
          >
            {/* Accent bar */}
            <div className={`h-1 w-12 rounded-full ${theme.accentBar}`} />

            {/* Grid */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <Row label="Email" mutedText={theme.mutedText}>
                <a
                  href={`mailto:${connect.email}`}
                  className="font-medium text-black/85 hover:text-black transition break-all"
                >
                  {connect.email}
                </a>
                <div className={["mt-2 text-xs", theme.mutedText].join(" ")}>
                  Best for partnerships + programming inquiries.
                </div>
              </Row>

              {connect.phone ? (
                <Row label="Phone" mutedText={theme.mutedText}>
                  <a
                    href={`tel:${connect.phone}`}
                    className="font-medium text-black/85 hover:text-black transition"
                  >
                    {connect.phone}
                  </a>
                  <div className={["mt-2 text-xs", theme.mutedText].join(" ")}>
                    Quick questions and time-sensitive requests.
                  </div>
                </Row>
              ) : null}

              {connect.linkedin ? (
                <Row label="LinkedIn" mutedText={theme.mutedText}>
                  <ExternalLink
                    href={connect.linkedin}
                    className="hover:underline underline-offset-4"
                  >
                    View profile
                  </ExternalLink>
                  <div className={["mt-2 text-xs", theme.mutedText].join(" ")}>
                    Background, experience, and updates.
                  </div>
                </Row>
              ) : null}

              {connect.location ? (
                <Row label="Location" mutedText={theme.mutedText}>
                  <div className="font-medium text-black/80">
                    {connect.location}
                  </div>
                  <div className={["mt-2 text-xs", theme.mutedText].join(" ")}>
                    Available for local + regional collaborations.
                  </div>
                </Row>
              ) : null}
            </div>

            {/* single muted helper line */}
            <div className={["mt-6 text-xs", theme.mutedText].join(" ")}>
              Prefer email. I respond as soon as I can.
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
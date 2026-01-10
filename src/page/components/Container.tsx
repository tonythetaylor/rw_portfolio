import React from "react";
import { useSiteConfig } from "../../site/SiteConfigContext";

export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const config = useSiteConfig();
  const layout = config.theme.layout ?? "centered";

  const maxWidth = layout === "wide" ? "max-w-7xl" : "max-w-6xl";

  return (
    <div className={["mx-auto w-full px-4 sm:px-6 lg:px-8", maxWidth, className].join(" ")}>
      {children}
    </div>
  );
}
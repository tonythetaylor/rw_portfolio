import React from "react";
import type { SiteConfig } from "../site.config";

const SiteConfigContext = React.createContext<SiteConfig | null>(null);

export function SiteConfigProvider({
  config,
  children,
}: {
  config: SiteConfig;
  children: React.ReactNode;
}) {
  return (
    <SiteConfigContext.Provider value={config}>
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig(): SiteConfig {
  const ctx = React.useContext(SiteConfigContext);
  if (!ctx) {
    throw new Error("useSiteConfig must be used within <SiteConfigProvider />");
  }
  return ctx;
}
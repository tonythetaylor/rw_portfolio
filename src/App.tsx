import { useEffect } from "react";
import { siteConfig } from "./site.config";
import { Page } from "./page/Page";
import { SiteConfigProvider } from "./site/SiteConfigContext";

export default function App() {
  useEffect(() => {
    document.title = siteConfig.meta.title;

    const meta = document.querySelector("meta[name='description']");
    if (meta) {
      meta.setAttribute("content", siteConfig.meta.description);
    }
  }, []);

  return (
    <SiteConfigProvider config={siteConfig}>
      <Page />
    </SiteConfigProvider>
  );
}

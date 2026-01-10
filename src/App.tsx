import { siteConfig } from "./site.config";
import { Page } from "./page/Page";
import { SiteConfigProvider } from "./site/SiteConfigContext";

export default function App() {
  return (
    <SiteConfigProvider config={siteConfig}>
      <Page />
    </SiteConfigProvider>
  );
}
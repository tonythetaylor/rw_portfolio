import { Container } from "../components/Container";
import { getTheme } from "../../theme";
import { useSiteConfig } from "../../site/SiteConfigContext";

export function Footer() {
  const config = useSiteConfig();
  const theme = getTheme(config);

  const year = new Date().getFullYear();
  const text = config.footer.text.replace("{year}", String(year));

  return (
    <footer className="bg-white">
      {/* subtle divider */}
      <div className="h-px w-full bg-black/10" />

      <Container>
        <div className="py-3 sm:py-4">
          <div className={["text-[11px] leading-relaxed", theme.mutedText].join(" ")}>
            {text}
          </div>
        </div>
      </Container>
    </footer>
  );
}
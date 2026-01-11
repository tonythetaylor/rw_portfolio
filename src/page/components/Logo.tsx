import { getTheme } from "../../theme";
import { useSiteConfig } from "../../site/SiteConfigContext";

export function Logo({ size = 32 }: { size?: number }) {
  const config = useSiteConfig();
  const theme = getTheme(config);

  // Turn "bg-emerald-600" into "fill-emerald-600"
  const fillClass = theme.accentBar.replace(/^bg-/, "fill-");

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className="shrink-0"
      aria-label={`${config.meta.title} logo`}
      role="img"
    >
      {/* Background */}
      <rect width="100" height="100" rx="18" className={fillClass} />

      {/* Initials */}
      <text
        x="50"
        y="62"
        textAnchor="middle"
        className="fill-white font-bold"
        style={{
          fontSize: 44,
          letterSpacing: "2px",
          fontFamily:
            "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        {getInitials(config.meta.title)}
      </text>
    </svg>
  );
}

function getInitials(title: string) {
  return title
    .replace("|", "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}
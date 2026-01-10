import type { SiteConfig, SiteSectionId } from "./site.config";

export type Accent = SiteConfig["theme"]["accent"];

export type ThemeTokens = {
  primaryBtn: string;
  primaryBtnHover: string;
  outlineBtn: string;
  outlineBtnHover: string;
  kickerText: string;
  ring: string;

  accentBar: string;
  accentDot: string;

  cardBg: string;
  cardBorder: string;
  mutedText: string;

  softBg: string;
};

export const themeTokens: Record<Accent, ThemeTokens> = {
  emerald: {
    primaryBtn: "bg-emerald-600 text-white",
    primaryBtnHover: "hover:bg-emerald-700",
    outlineBtn: "border border-emerald-600/30 text-white",
    outlineBtnHover: "hover:bg-emerald-500/15",
    kickerText: "text-emerald-200/80",
    ring: "focus-visible:ring-emerald-400/50",
    accentBar: "bg-emerald-600",
    accentDot: "bg-emerald-600/70",
    cardBg: "bg-white",
    cardBorder: "border-black/10",
    mutedText: "text-black/65",
    softBg: "bg-emerald-50",
  },
  stone: {
    primaryBtn: "bg-stone-900 text-white",
    primaryBtnHover: "hover:bg-stone-800",
    outlineBtn: "border border-white/35 text-white",
    outlineBtnHover: "hover:bg-white/10",
    kickerText: "text-white/70",
    ring: "focus-visible:ring-white/35",
    accentBar: "bg-stone-800",
    accentDot: "bg-stone-400/60",
    cardBg: "bg-white",
    cardBorder: "border-black/10",
    mutedText: "text-black/65",
    softBg: "bg-stone-50",
  },
  sky: {
    primaryBtn: "bg-sky-600 text-white",
    primaryBtnHover: "hover:bg-sky-700",
    outlineBtn: "border border-sky-200/50 text-white",
    outlineBtnHover: "hover:bg-sky-500/15",
    kickerText: "text-sky-200/80",
    ring: "focus-visible:ring-sky-300/60",
    accentBar: "bg-sky-600",
    accentDot: "bg-sky-500/70",
    cardBg: "bg-white",
    cardBorder: "border-black/10",
    mutedText: "text-black/65",
    softBg: "bg-sky-50",
  },
  rose: {
    primaryBtn: "bg-rose-600 text-white",
    primaryBtnHover: "hover:bg-rose-700",
    outlineBtn: "border border-rose-200/50 text-white",
    outlineBtnHover: "hover:bg-rose-500/15",
    kickerText: "text-rose-100/80",
    ring: "focus-visible:ring-rose-300/60",
    accentBar: "bg-rose-600",
    accentDot: "bg-rose-500/70",
    cardBg: "bg-white",
    cardBorder: "border-black/10",
    mutedText: "text-black/65",
    softBg: "bg-rose-50",
  },
  amber: {
    primaryBtn: "bg-amber-500 text-black",
    primaryBtnHover: "hover:bg-amber-400",
    outlineBtn: "border border-amber-200/55 text-white",
    outlineBtnHover: "hover:bg-amber-500/10",
    kickerText: "text-amber-100/80",
    ring: "focus-visible:ring-amber-200/60",
    accentBar: "bg-amber-500",
    accentDot: "bg-amber-500/70",
    cardBg: "bg-white",
    cardBorder: "border-black/10",
    mutedText: "text-black/65",
    softBg: "bg-amber-50",
  },
  violet: {
    primaryBtn: "bg-violet-600 text-white",
    primaryBtnHover: "hover:bg-violet-700",
    outlineBtn: "border border-violet-200/50 text-white",
    outlineBtnHover: "hover:bg-violet-500/15",
    kickerText: "text-violet-200/80",
    ring: "focus-visible:ring-violet-300/60",
    accentBar: "bg-violet-600",
    accentDot: "bg-violet-500/70",
    cardBg: "bg-white",
    cardBorder: "border-black/10",
    mutedText: "text-black/65",
    softBg: "bg-violet-50",
  },
};

export function getTheme(config: SiteConfig): ThemeTokens {
  return themeTokens[config.theme.accent];
}

/**
 * Resolve the background class for a given section based on config.theme.sections.
 * - solid: always `base` (unless overridden)
 * - alternate: even uses `base`, odd uses `alt` (or base if alt missing)
 * - custom: uses `base` plus per-section overrides
 *
 * `sectionIndex` should be the index within your rendered sections order
 * (usually the index from config.nav.sections.filter(enabled).map((s,i)=>...))
 */
export function getSectionBgClass(
  config: SiteConfig,
  sectionId: SiteSectionId,
  sectionIndex: number
): string {
  const sections = config.theme.sections;

  // default if not configured
  if (!sections) return "bg-white";

  // overrides always win
  const override = sections.overrides?.[sectionId];
  if (override) return override;

  const base = sections.base || "bg-white";

  if (sections.mode === "solid") return base;
  if (sections.mode === "custom") return base;

  // alternate
  const alt = sections.alt || base;
  return sectionIndex % 2 === 0 ? base : alt;
}
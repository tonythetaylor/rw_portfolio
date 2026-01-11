export function withBase(path: string) {
  // supports:
  // - external URLs: https://...
  // - already-based paths: /rw_portfolio/...
  // - normal public paths: /images/...
  if (!path) return path;

  if (/^https?:\/\//i.test(path)) return path;

  const base = import.meta.env.BASE_URL; // e.g. "/" locally, "/rw_portfolio/" on GH Pages
  const cleanBase = base.endsWith("/") ? base : `${base}/`;

  // If they pass "/images/x.jpg" -> "images/x.jpg"
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  return `${cleanBase}${cleanPath}`;
}
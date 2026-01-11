export function enableIosAppMode() {
  const ua = navigator.userAgent || "";
  const isIOS =
    /iPad|iPhone|iPod/.test(ua) ||
    // iPadOS reports as Mac sometimes
    (navigator.platform === "MacIntel" && (navigator as any).maxTouchPoints > 1);

  const isSmallScreen = window.matchMedia("(max-width: 820px)").matches;

  if (isIOS && isSmallScreen) {
    document.documentElement.classList.add("ios-app");
  } else {
    document.documentElement.classList.remove("ios-app");
  }
}
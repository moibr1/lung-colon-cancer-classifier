// Categorical palette validated against the dark chart surface: OKLCH
// lightness band 0.48-0.67, CVD (protan/deutan) delta-E >= 12 on all pairs,
// contrast >= 3:1 vs surface except magenta (2.75, "relief" band) — magenta
// is always paired with a direct text label wherever it appears, never used
// as color-only identity.
export const CHART_COLORS = {
  cyan: "#0891b2",
  blue: "#3b82f6",
  magenta: "#a21caf",
  green: "#059669",
  amber: "#b45309",
} as const;

export const CLASS_COLOR_ORDER = [
  CHART_COLORS.cyan,
  CHART_COLORS.blue,
  CHART_COLORS.magenta,
  CHART_COLORS.green,
  CHART_COLORS.amber,
];

export const METRIC_COLOR_ORDER = [
  CHART_COLORS.cyan,
  CHART_COLORS.blue,
  CHART_COLORS.magenta,
  CHART_COLORS.green,
];

export const CHART_SURFACE = "#0d1420";
export const CHART_GRID = "rgba(139, 162, 189, 0.14)";
export const CHART_TEXT = "#8ba2bd";

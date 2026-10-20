import { useEffect, useRef, type RefObject } from "react";

export const reducedMotion =
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
export const smooth = (a: number, b: number, v: number) => {
  const t = clamp01((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};

/**
 * How far the reader has travelled through `track`, kept in a ref so the 3D
 * scene can read it every frame without re-rendering React.
 * "section": 0 when the top meets mid-viewport, 1 when the bottom does (for a
 * tall section with a sticky model). "element": 0 when its top is 60% down the
 * viewport, 1 once it is a fifth of a screen above it (for a model that simply
 * scrolls past, so it opens while fully in view).
 */
export function useScrollProgress(track: RefObject<HTMLElement>, mode: () => "section" | "element" = () => "section") {
  const progress = useRef(0);
  useEffect(() => {
    const update = () => {
      const el = track.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      progress.current =
        mode() === "section"
          ? clamp01((vh * 0.5 - r.top) / Math.max(1, r.height - vh * 0.5))
          : clamp01((vh * 0.6 - r.top) / (vh * 0.8));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [track, mode]);
  return progress;
}

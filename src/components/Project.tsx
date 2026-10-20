import { lazy, Suspense, useEffect, useMemo, useRef, useState, type ComponentType, type RefObject } from "react";
import { Stage } from "../three/Stage";
import { smooth, useScrollProgress } from "../three/motion";
import type { SceneProps } from "../three/Exploded";
import type { Project as P } from "../content";

const scenes = {
  shop: lazy(() => import("../three/scenes/Shop").then((m) => ({ default: m.ShopScene }))),
  aisle: lazy(() => import("../three/scenes/Market").then((m) => ({ default: m.MarketScene }))),
  bench: lazy(() => import("../three/scenes/Bench").then((m) => ({ default: m.BenchScene }))),
  server: lazy(() => import("../three/scenes/Rack").then((m) => ({ default: m.RackScene }))),
} satisfies Record<P["id"], ComponentType<SceneProps>>;

const stacked = () => window.matchMedia("(max-width: 900px)").matches;

export function Project({ project, index }: { project: P; index: number }) {
  const article = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  // Side by side, the model is sticky and the whole article drives it; stacked, it scrolls past on its own.
  const track = useMemo(
    () => ({ get current() { return stacked() ? stage.current : article.current; } }) as RefObject<HTMLElement>,
    [],
  );
  const mode = useMemo(() => (): "section" | "element" => (stacked() ? "element" : "section"), []);
  const progress = useScrollProgress(track, mode);
  const forced = useRef<number | null>(null);
  const [open, setOpen] = useState(false);
  const Scene = scenes[project.id];

  // The button mirrors what scroll is doing until it is pressed; leaving the
  // project hands control back to scroll.
  useEffect(() => {
    const sync = () => {
      if (forced.current === null) setOpen(smooth(0.12, 0.62, progress.current) > 0.5);
    };
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) {
        forced.current = null;
        sync();
      }
    });
    if (article.current) io.observe(article.current);
    window.addEventListener("scroll", sync, { passive: true });
    sync();
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", sync);
    };
  }, [progress]);

  const toggle = () => {
    forced.current = open ? 0 : 1;
    setOpen(!open);
  };

  return (
    <article ref={article} className="project" id={`work-${project.id}`} aria-labelledby={`t-${project.id}`}>
      <div className="project-model" ref={stage}>
        <Stage label={project.sceneLabel}>
          <Suspense fallback={null}>
            <Scene progress={progress} forced={forced} />
          </Suspense>
        </Stage>
        <div className="project-controls">
          <p className="project-hint" aria-hidden="true">
            <span className="hint-wide">Scroll to take it apart · drag to turn</span>
            <span className="hint-narrow">Drag to turn · tap a label</span>
          </p>
          <button type="button" className="toggle" aria-pressed={open} onClick={toggle}>
            {open ? "Reassemble" : "Take apart"}
          </button>
        </div>
      </div>

      <div className="project-text">
        <p className="eyebrow">
          <span className="num">0{index + 1}</span> {project.place} · {project.meta}
        </p>
        <h3 id={`t-${project.id}`}>{project.title}</h3>
        <p className="lede">{project.sub}</p>

        <dl className="case">
          <dt>The brief</dt>
          <dd>
            <p>{project.brief}</p>
          </dd>
          <dt>The work</dt>
          <dd>
            {project.work.map((w) => (
              <p key={w.slice(0, 24)}>{w}</p>
            ))}
          </dd>
          <dt>The outcome</dt>
          <dd>
            <p>{project.outcome}</p>
          </dd>
        </dl>

        <div className="stats">
          {project.stats.map((s) => (
            <div key={s.n} className="stat">
              <span className="stat-n">{s.n}</span>
              <span className="stat-c">{s.c}</span>
            </div>
          ))}
        </div>

        {project.compare && (
          <table className="compare">
            <thead>
              <tr>
                <th scope="col">
                  <span className="sr-only">Aspect</span>
                </th>
                <th scope="col">Before</th>
                <th scope="col">After</th>
              </tr>
            </thead>
            <tbody>
              {project.compare.rows.map(([k, a, b]) => (
                <tr key={k}>
                  <th scope="row">{k}</th>
                  <td>{a}</td>
                  <td>{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {project.note && (
          <aside className="note">
            <span className="note-label">{project.note.label}</span>
            {project.note.text}
          </aside>
        )}

        <p className="stack">
          <span className="stack-label">Built with</span>
          {project.stack}
        </p>
      </div>
    </article>
  );
}

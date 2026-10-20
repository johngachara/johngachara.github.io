import { lazy, Suspense, useMemo, useRef, type ComponentType, type MutableRefObject, type RefObject } from "react";
import { Stage } from "../three/Stage";
import { useScrollProgress } from "../three/motion";
import type { Project as P } from "../content";

const scenes = {
  shop: lazy(() => import("../three/scenes/Shop").then((m) => ({ default: m.ShopScene }))),
  aisle: lazy(() => import("../three/scenes/Market").then((m) => ({ default: m.MarketScene }))),
  bench: lazy(() => import("../three/scenes/Bench").then((m) => ({ default: m.BenchScene }))),
  server: lazy(() => import("../three/scenes/Rack").then((m) => ({ default: m.RackScene }))),
} satisfies Record<P["id"], ComponentType<{ progress: MutableRefObject<number> }>>;

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
  const Scene = scenes[project.id];

  return (
    <article ref={article} className="project" id={`work-${project.id}`} aria-labelledby={`t-${project.id}`}>
      <div className="project-model" ref={stage}>
        <Stage label={project.sceneLabel}>
          <Suspense fallback={null}>
            <Scene progress={progress} />
          </Suspense>
        </Stage>
        <p className="project-hint" aria-hidden="true">
          Scroll to take it apart
        </p>
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

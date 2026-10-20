import { useEffect, useState } from "react";
import { projects } from "../content";

/**
 * Phones and tablets: a thumb-height bar listing the four projects while the
 * reader is among them, marking the one under the middle of the screen.
 */
export function ProjectDock() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const seen = new Map<string, boolean>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => seen.set(e.target.id, e.isIntersecting));
        const hit = projects.find((p) => seen.get(`work-${p.id}`));
        setActive(hit ? hit.id : null);
      },
      // a line across the middle of the screen
      { rootMargin: "-50% 0px -50% 0px" },
    );
    projects.forEach((p) => {
      const el = document.getElementById(`work-${p.id}`);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <nav className={`dock${active ? " is-shown" : ""}`} aria-label="Projects" aria-hidden={!active}>
      <ol>
        {projects.map((p, i) => (
          <li key={p.id}>
            <a
              href={`#work-${p.id}`}
              aria-current={active === p.id ? "true" : undefined}
              tabIndex={active ? 0 : -1}
            >
              <span className="num">0{i + 1}</span>
              <span className="dock-name">{p.place.replace("The ", "")}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

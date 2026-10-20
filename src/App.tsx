import { lazy, Suspense } from "react";
import { Stage } from "./three/Stage";
import { Project } from "./components/Project";
import { ProjectDock } from "./components/ProjectDock";
import { alsoBuilt, instruments, projects, record } from "./content";

const Town = lazy(() => import("./three/Town").then((m) => ({ default: m.Town })));

export default function App() {
  return (
    <>
      <a className="skip" href="#work">
        Skip to the work
      </a>
      <header className="top">
        <a href="#top" className="mark">
          J. Gachara
        </a>
        <nav aria-label="Sections">
          <a href="#work">Work</a>
          <a href="#also">Also built</a>
          <a href="#record">Record</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-text">
            <p className="eyebrow">John Gachara · Software engineer · Nairobi</p>
            <h1 id="hero-title">
              Software for the till, the shelf, the bench <em>and</em> the server.
            </h1>
            <p className="hero-sub">
              I design, build and keep running systems that people rely on every working day. Four of them are on the table.
              Pick one, or scroll, and each comes apart to show what it's made of.
            </p>
            <p className="hero-facts">
              <span>Generative AI</span>
              <span>Full stack</span>
              <span>Security</span>
            </p>
          </div>
          <div className="hero-model">
            <Stage label="Four small architectural models on a table: a phone shop, a supermarket aisle, a repair bench and a server room. Each links to its project below.">
              <Suspense fallback={null}>
                <Town />
              </Suspense>
            </Stage>
          </div>
          <ol className="hero-legend">
            {projects.map((p, i) => (
              <li key={p.id}>
                <a href={`#work-${p.id}`}>
                  <span className="num">0{i + 1}</span> {p.place.replace("The ", "")}
                </a>
              </li>
            ))}
          </ol>
        </section>

        <section id="work" className="work" aria-labelledby="work-title">
          <header className="section-head">
            <h2 id="work-title">Work</h2>
            <p>Four systems in production, each shown where it runs and then taken apart. Figures come from production.</p>
          </header>
          {projects.map((p, i) => (
            <Project key={p.id} project={p} index={i} />
          ))}
        </section>

        <section id="also" className="also" aria-labelledby="also-title">
          <header className="section-head">
            <h2 id="also-title">Also built</h2>
            <p>Smaller pieces, internal tools and research.</p>
          </header>
          <ul className="also-grid">
            {alsoBuilt.map((a) => (
              <li key={a.title}>
                <h3>{a.title}</h3>
                <span className="meta">{a.meta}</span>
                <p>{a.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="record" className="record" aria-labelledby="record-title">
          <header className="section-head">
            <h2 id="record-title">Record</h2>
          </header>
          <div className="record-grid">
            <ol className="roll">
              {record.map((r) => (
                <li key={r.where}>
                  <span className="when">{r.when}</span>
                  <div>
                    <h3>{r.where}</h3>
                    <p className="role">{r.role}</p>
                    {r.text && <p>{r.text}</p>}
                  </div>
                </li>
              ))}
            </ol>
            <div>
              <dl className="tools">
                {instruments.map((t) => (
                  <div key={t.label}>
                    <dt>{t.label}</dt>
                    <dd>{t.text}</dd>
                  </div>
                ))}
              </dl>
              <p className="creed">
                Tools change. The habits that matter do not: read the existing system before replacing it, verify against
                real data, and leave the client able to run what I build.
              </p>
            </div>
          </div>
        </section>

        <section id="contact" className="contact" aria-labelledby="contact-title">
          <h2 id="contact-title">
            Have something that needs to <em>keep running?</em>
          </h2>
          <div className="contact-links">
            <a href="mailto:johngachara29@gmail.com">johngachara29@gmail.com</a>
            <a href="https://github.com/johngachara" target="_blank" rel="noopener noreferrer">
              github.com/johngachara
            </a>
          </div>
        </section>
      </main>

      <ProjectDock />

      <footer className="foot">
        <span>© {new Date().getFullYear()} John Gachara · Nairobi</span>
        <span>Models drawn in code with three.js. Set in Instrument Serif and IBM Plex.</span>
      </footer>
    </>
  );
}

# johngachara.github.io

Portfolio of John Gachara. Each project is a small architectural model of the
place it runs (a shop, a supermarket aisle, a repair bench, a server room),
built in code with three.js, that comes apart into its software layers as you scroll.

```sh
pnpm install
pnpm dev      # http://localhost:8080
pnpm build    # typecheck + production build into dist/
```

Pushing to `main` deploys to GitHub Pages via `.github/workflows/deploy.yml`.

- `src/content.ts`: all copy. Clients are never named.
- `src/three/scenes/`: one file per model; `Exploded.tsx` does the take-apart.

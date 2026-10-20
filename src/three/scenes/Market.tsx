import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { Block, Cyl, Figure } from "../kit";
import { rand, tones, type V3 } from "../materials";
import { Exploded, type SceneProps } from "../Exploded";
import { reducedMotion } from "../motion";

const SHELVES = [0.12, 0.5, 0.88, 1.26];

/**
 * A run of shelving whose electronic labels refresh in a wave, the way a
 * price change rolls down a real aisle: black, then lit, then settled.
 */
function Gondola({ p, ry = 0, length, seed, phase }: { p: V3; ry?: number; length: number; seed: number; phase: number }) {
  const { products, tags } = useMemo(() => {
    const r = rand(seed);
    const products: { x: number; y: number; w: number; h: number; can: boolean }[] = [];
    const tags: { x: number; y: number; u: number }[] = [];
    SHELVES.forEach((y) => {
      let x = -length / 2 + 0.06;
      while (x < length / 2 - 0.2) {
        const w = 0.12 + r() * 0.14;
        const facings = 1 + Math.floor(r() * 3);
        const can = r() < 0.3;
        const h = can ? 0.16 + r() * 0.06 : 0.14 + r() * 0.16;
        tags.push({ x: x + (w * facings) / 2, y, u: (x + length / 2) / length });
        for (let f = 0; f < facings && x + w < length / 2 - 0.04; f++) {
          products.push({ x: x + w / 2, y: y + 0.03, w: w * 0.9, h, can });
          x += w;
        }
        x += 0.05;
      }
    });
    return { products, tags };
  }, [length, seed]);

  const tagRefs = useRef<(THREE.Mesh | null)[]>([]);
  useFrame(({ clock }) => {
    const cycle = reducedMotion ? -1 : ((clock.elapsedTime * 0.22 + phase) % 1) * 1.6 - 0.2;
    tags.forEach((t, i) => {
      const m = tagRefs.current[i];
      if (!m) return;
      const d = cycle - t.u - t.y * 0.05;
      m.material = d > 0 && d < 0.05 ? tones.dark : d >= 0.05 && d < 0.14 ? tones.signal : tones.paper;
    });
  });

  return (
    <group position={p} rotation={[0, ry, 0]}>
      <Block p={[0, 0, -0.2]} s={[length, 1.5, 0.05]} />
      <Block p={[0, 0, 0]} s={[length, 0.1, 0.45]} m="shade" />
      {SHELVES.map((y) => (
        <Block key={y} p={[0, y, 0]} s={[length, 0.03, 0.45]} />
      ))}
      {products.map((pr, i) =>
        pr.can ? (
          <Cyl key={i} p={[pr.x, pr.y, 0.02]} s={[pr.w * 0.85, pr.h, pr.w * 0.85]} edges={false} />
        ) : (
          <Block key={i} p={[pr.x, pr.y, 0.0]} s={[pr.w, pr.h, 0.28]} edges={pr.h > 0.22} />
        ),
      )}
      {tags.map((t, i) => (
        <mesh
          key={i}
          ref={(m) => (tagRefs.current[i] = m)}
          position={[t.x, t.y - 0.015, 0.232]}
          scale={[0.09, 0.055, 0.012]}
          material={tones.paper}
        >
          <boxGeometry />
        </mesh>
      ))}
    </group>
  );
}

/** The shelf-audit camera and the patch of shelf it is checking. */
function AuditCamera() {
  const head: V3 = [1.45, 1.28, 0.55];
  const z = -0.92;
  const corners: V3[] = [
    [0.35, 0.5, z],
    [1.45, 0.5, z],
    [1.45, 1.22, z],
    [0.35, 1.22, z],
  ];
  return (
    <group>
      <Cyl p={[1.45, 0, 0.55]} s={[0.32, 0.04, 0.32]} />
      <Cyl p={[1.45, 0.04, 0.55]} s={[0.035, 1.18, 0.035]} edges={false} />
      <Block p={[1.45, 1.22, 0.55]} s={[0.16, 0.11, 0.2]} m="dark" />
      {corners.map((c, i) => (
        <Line key={i} points={[head, c]} color="#ff5a1f" lineWidth={1} transparent opacity={0.55} />
      ))}
      <Line points={[...corners, corners[0]]} color="#ff5a1f" lineWidth={1.5} />
    </group>
  );
}

export function MarketPlace() {
  return (
    <group>
      <Gondola p={[0.25, 0, -1.15]} length={3.2} seed={11} phase={0} />
      <Gondola p={[-1.72, 0, 0.3]} ry={Math.PI / 2} length={2.2} seed={23} phase={0.45} />
      <AuditCamera />
      <Figure p={[0.2, 0, 0.55]} ry={Math.PI * 0.9} h={1} />
      <group position={[0.55, 0, 0.85]}>
        <Block p={[0, 0.32, 0]} s={[0.34, 0.24, 0.5]} />
        {[-0.14, 0.14].map((x) => (
          <Cyl key={x} p={[x, 0, 0.18]} s={[0.025, 0.32, 0.025]} edges={false} />
        ))}
        <Cyl p={[0, 0.5, 0.27]} s={[0.025, 0.36, 0.025]} r={[0, 0, Math.PI / 2]} edges={false} />
      </group>
    </group>
  );
}

export function MarketScene({ progress, forced }: SceneProps) {
  return (
    <Exploded
      progress={progress}
      forced={forced}
      size={[4, 3]}
      shaft={[1.45, 0.55]}
      placeHeight={1.5}
      place={<MarketPlace />}
      placeLabel={{ name: "The aisle", detail: "Electronic shelf labels · planogram checks" }}
      layers={[
        {
          name: "Designer",
          detail: "Embeddable React app · AI proposes three designs",
          content: (
            <>
              {[-1.1, 0, 1.1].map((x) => (
                <Block key={x} p={[x, 0, 0.45]} s={[0.8, 0.5, 0.04]} />
              ))}
              <Block p={[0, 0.5, 0.45]} s={[0.8, 0.04, 0.04]} m="signal" />
            </>
          ),
        },
        {
          name: "Renderer",
          detail: "Rules engine · FastAPI · Kafka · SVG on any server",
          content: (
            <>
              <Block p={[-0.8, 0, 0.35]} s={[1, 0.3, 0.8]} />
              <Block p={[0.7, 0, 0.35]} s={[1, 0.3, 0.8]} />
              {[0.4, 0.7, 1].map((x) => (
                <Block key={x} p={[x, 0.3, 0.35]} s={[0.2, 0.12, 0.03]} />
              ))}
            </>
          ),
        },
        {
          name: "Tenants",
          detail: "PostgreSQL · many retailers, kept apart",
          content: (
            <>
              <Block p={[0, 0, -1.45]} s={[4, 0.2, 0.06]} />
              <Block p={[0, 0, 1.45]} s={[4, 0.2, 0.06]} />
              {[-1.97, -0.66, 0.66, 1.97].map((x) => (
                <Block key={x} p={[x, 0, 0]} s={[0.06, 0.2, 2.84]} />
              ))}
            </>
          ),
        },
      ]}
    />
  );
}

import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Block, Cyl, Figure } from "../kit";
import { rand, tones } from "../materials";
import { Exploded, type SceneProps } from "../Exploded";
import { reducedMotion } from "../motion";

/** A receipt that keeps printing. */
function Receipt() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const k = reducedMotion ? 0.6 : (clock.elapsedTime * 0.35) % 1;
    const len = 0.02 + k * 0.32;
    ref.current.scale.y = len;
    ref.current.position.y = 0.99 + len / 2;
  });
  return (
    <mesh ref={ref} position={[0.85, 1, 0.5]} scale={[0.11, 0.1, 0.006]} material={tones.signal} castShadow>
      <boxGeometry />
    </mesh>
  );
}

export function ShopPlace() {
  const r = rand(7);
  const boards = [0.32, 0.74, 1.16];
  return (
    <group>
      {/* cut-away walls */}
      <Block p={[0, 0, -1.46]} s={[4, 1.7, 0.08]} />
      <Block p={[-1.96, 0, 0]} s={[0.08, 1.7, 3]} />

      {/* wall of handsets */}
      <Block p={[0.45, 0.48, -1.39]} s={[2.3, 0.86, 0.05]} m="shade" />
      {Array.from({ length: 3 }, (_, row) =>
        Array.from({ length: 9 }, (_, col) => (
          <Block
            key={`${row}-${col}`}
            p={[-0.5 + col * 0.24, 0.56 + row * 0.27, -1.35]}
            s={[0.13, 0.21, 0.025]}
            m="dark"
            edges={false}
          />
        )),
      )}
      <Block p={[0.45, 1.42, -1.4]} s={[1.5, 0.2, 0.04]} />

      {/* accessories shelving */}
      <Block p={[-1.74, 0, -0.25]} s={[0.36, 1.45, 0.04]} />
      {boards.map((y) => (
        <group key={y}>
          <Block p={[-1.74, y, -0.25]} s={[0.36, 0.035, 1.9]} />
          {Array.from({ length: 6 }, (_, i) => {
            const h = 0.12 + r() * 0.16;
            return <Block key={i} p={[-1.76, y + 0.035, -1.05 + i * 0.32]} s={[0.24, h, 0.2 + r() * 0.06]} />;
          })}
        </group>
      ))}

      {/* counter with glass case and till */}
      <Block p={[0.3, 0, 0.35]} s={[2.4, 0.85, 0.55]} />
      <Block p={[-0.1, 0.85, 0.35]} s={[1.6, 0.22, 0.55]} m="glass" />
      {Array.from({ length: 6 }, (_, i) => (
        <Block key={i} p={[-0.75 + i * 0.26, 0.85, 0.35]} s={[0.11, 0.02, 0.2]} m="dark" edges={false} />
      ))}
      <Block p={[1.15, 0.85, 0.3]} s={[0.07, 0.22, 0.07]} />
      <Block p={[1.15, 1.04, 0.3]} s={[0.5, 0.32, 0.035]} m="dark" />
      <Block p={[0.85, 0.85, 0.42]} s={[0.2, 0.14, 0.2]} />
      <Receipt />
      <Block p={[1.38, 0.85, 0.5]} s={[0.1, 0.035, 0.16]} m="dark" />

      <Figure p={[0.9, 0, -0.3]} h={1.05} />
      <Figure p={[0.1, 0, 1.15]} ry={Math.PI} h={1} />
      <Cyl p={[1.55, 0, -0.45]} s={[0.26, 0.55, 0.26]} />
    </group>
  );
}

export function ShopScene({ progress, forced }: SceneProps) {
  return (
    <Exploded
      progress={progress}
      forced={forced}
      size={[4, 3]}
      shaft={[0.85, 0.42]}
      placeHeight={1.7}
      place={<ShopPlace />}
      placeLabel={{ name: "The counter", detail: "Point of sale · search, stock, repairs, refunds" }}
      layers={[
        {
          name: "API",
          detail: "Django REST · Celery · morning AI report",
          content: (
            <>
              {[-1.2, -0.4, 0.4].map((x) => (
                <Block key={x} p={[x, 0, 0.3]} s={[0.55, 0.28, 0.7]} />
              ))}
              <Block p={[1.2, 0, 0.3]} s={[0.55, 0.28, 0.7]} />
              <Block p={[1.32, 0.28, 0.5]} s={[0.18, 0.025, 0.18]} m="signal" />
            </>
          ),
        },
        {
          name: "Data",
          detail: "PostgreSQL · Redis · Meilisearch",
          content: (
            <>
              {[-1, 0, 1].map((x) => (
                <Cyl key={x} p={[x, 0, 0.3]} s={[0.6, 0.32, 0.6]} />
              ))}
            </>
          ),
        },
        {
          name: "Perimeter",
          detail: "Firewall · CrowdSec · Cloudflare · passkeys",
          content: (
            <>
              <Block p={[0, 0, -1.45]} s={[4, 0.18, 0.06]} />
              <Block p={[0, 0, 1.45]} s={[4, 0.18, 0.06]} />
              <Block p={[-1.97, 0, 0]} s={[0.06, 0.18, 2.84]} />
              <Block p={[1.97, 0, 0]} s={[0.06, 0.18, 2.84]} />
            </>
          ),
        },
      ]}
    />
  );
}

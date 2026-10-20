import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Ball, Block, Cyl, Figure } from "../kit";
import { tones } from "../materials";
import { Exploded, type SceneProps } from "../Exploded";
import { reducedMotion } from "../motion";

const TOP = 0.78;

/** A finished report settling onto the pile, over and over. */
function ReportSheet() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const k = reducedMotion ? 1 : Math.min(1, ((clock.elapsedTime * 0.3) % 1) * 1.6);
    ref.current.position.y = TOP + 0.07 + (1 - k) * 0.35;
    ref.current.rotation.y = (1 - k) * 0.5;
  });
  return (
    <mesh ref={ref} position={[1.05, TOP + 0.07, -0.42]} scale={[0.3, 0.008, 0.4]} material={tones.signal} castShadow>
      <boxGeometry />
    </mesh>
  );
}

/** A desktop tower with its side panel off, facing the viewer. */
function OpenTower({ x, z }: { x: number; z: number }) {
  const y = TOP;
  return (
    <group position={[x, y, z]}>
      <Block p={[-0.17, 0, 0]} s={[0.02, 0.7, 0.6]} />
      <Block p={[0, 0, 0]} s={[0.36, 0.02, 0.6]} />
      <Block p={[0, 0.68, 0]} s={[0.36, 0.02, 0.6]} />
      <Block p={[0, 0, 0.29]} s={[0.36, 0.7, 0.02]} />
      <Block p={[0, 0, -0.29]} s={[0.36, 0.7, 0.02]} />
      <Block p={[-0.15, 0.08, 0]} s={[0.02, 0.55, 0.48]} m="shade" edges={false} />
      <Cyl p={[-0.1, 0.42, 0.08]} s={[0.16, 0.05, 0.16]} r={[0, 0, Math.PI / 2]} />
      {[-0.06, -0.02, 0.02].map((dz) => (
        <Block key={dz} p={[-0.12, 0.3, -0.12 + dz]} s={[0.06, 0.14, 0.012]} m="dark" edges={false} />
      ))}
    </group>
  );
}

export function BenchPlace() {
  return (
    <group>
      <Block p={[0, 0, -1.46]} s={[4, 1.6, 0.08]} />
      <Block p={[-1.96, 0, 0]} s={[0.08, 1.6, 3]} />

      {/* the bench */}
      <Block p={[0.2, TOP - 0.06, -0.55]} s={[2.8, 0.06, 0.9]} />
      {[
        [-1.1, -0.9],
        [1.5, -0.9],
        [-1.1, -0.2],
        [1.5, -0.2],
      ].map(([x, z]) => (
        <Block key={`${x}${z}`} p={[x, 0, z]} s={[0.06, TOP - 0.06, 0.06]} />
      ))}

      <OpenTower x={-0.65} z={-0.62} />

      {/* laptop showing the report being drafted */}
      <Block p={[0.3, TOP, -0.42]} s={[0.62, 0.025, 0.42]} />
      <Block p={[0.3, TOP + 0.025, -0.63]} s={[0.62, 0.4, 0.02]} />
      {[0.33, 0.27, 0.21, 0.15].map((dy, i) => (
        <Block
          key={dy}
          p={[0.3 - (i % 2) * 0.06, TOP + 0.025 + dy, -0.619]}
          s={[i === 1 ? 0.3 : 0.42, 0.025, 0.004]}
          m={i === 1 ? "signal" : "dark"}
          edges={false}
        />
      ))}

      {/* filed reports */}
      <Block p={[1.05, TOP, -0.42]} s={[0.3, 0.07, 0.4]} />
      <ReportSheet />

      {/* machines waiting their turn */}
      <Block p={[-1.72, 0, 0.55]} s={[0.4, 1.2, 1.5]} m="shade" />
      {[0.08, 0.5].map((y) =>
        [0.05, 0.55, 1.05].map((z) => (
          <group key={`${y}${z}`}>
            <Block p={[-1.62, y, z]} s={[0.24, 0.36, 0.38]} />
            <Block p={[-1.49, y + 0.24, z + 0.1]} s={[0.01, 0.08, 0.12]} />
          </group>
        )),
      )}

      <Figure p={[0.25, 0, 0.2]} ry={Math.PI} h={1.05} />
      <Cyl p={[1.1, 0, 0.1]} s={[0.3, 0.5, 0.3]} />
    </group>
  );
}

export function BenchScene({ progress, forced }: SceneProps) {
  return (
    <Exploded
      progress={progress}
      forced={forced}
      size={[4, 3]}
      shaft={[1.05, -0.42]}
      placeHeight={1.6}
      place={<BenchPlace />}
      placeLabel={{ name: "The bench", detail: "Service reports for a bank's IT technicians" }}
      layers={[
        {
          name: "Guided report",
          detail: "Machine → findings → AI draft → review",
          content: (
            <>
              {[-1.35, -0.45, 0.45, 1.35].map((x, i) => (
                <Block key={x} p={[x, 0, 0.4]} s={[0.7, i === 2 ? 0.3 : 0.18, 0.7]} />
              ))}
              <Block p={[0.6, 0.3, 0.55]} s={[0.2, 0.025, 0.2]} m="signal" />
            </>
          ),
        },
        {
          name: "Research",
          detail: "Fast open models · live web search",
          content: (
            <>
              <Block p={[-0.6, 0, 0.35]} s={[1.1, 0.3, 0.8]} />
              <Ball p={[0.9, 0.3, 0.35]} s={[0.55, 0.55, 0.55]} />
              <Cyl p={[0.9, 0, 0.35]} s={[0.08, 0.06, 0.08]} />
            </>
          ),
        },
        {
          name: "Records",
          detail: "Postgres with row-level security · five roles",
          content: (
            <>
              {[-1.2, -0.4, 0.4, 1.2].map((x) => (
                <Block key={x} p={[x, 0, 0.3]} s={[0.6, 0.34, 0.9]} />
              ))}
            </>
          ),
        },
      ]}
    />
  );
}

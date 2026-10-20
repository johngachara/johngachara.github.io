import * as THREE from "three";
import { useRef, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { Ball, Block, Cyl, Figure } from "../kit";
import { tones } from "../materials";
import { Exploded } from "../Exploded";
import { reducedMotion } from "../motion";

const GATE_X = 1.0;
const COUNT = 14;

/** Requests walk towards the servers; every few, one is stopped at the gate and dropped. */
function Requests() {
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  useFrame(({ clock }) => {
    const t = reducedMotion ? 0 : clock.elapsedTime;
    refs.current.forEach((m, i) => {
      if (!m) return;
      const hostile = i % 4 === 1;
      const k = (t * 0.12 + i / COUNT) % 1;
      const z = 0.05 + ((i * 37) % 5) * 0.08;
      let x = THREE.MathUtils.lerp(2.0, -0.35, k);
      let y = 0.45;
      if (hostile && x < GATE_X + 0.08) {
        // stopped at the gate, then it falls away
        const over = (GATE_X + 0.08 - x) / 2.4;
        x = GATE_X + 0.08 + over * 0.4;
        y = 0.45 - over * 3;
        m.scale.setScalar(Math.max(0, 0.09 * (1 - over * 4)));
      } else {
        m.scale.setScalar(0.08);
      }
      m.material = hostile ? tones.signal : tones.paper;
      m.position.set(x, Math.max(0.05, y), z);
    });
  });
  return (
    <>
      {Array.from({ length: COUNT }, (_, i) => (
        <mesh key={i} ref={(m) => (refs.current[i] = m)} material={tones.paper} castShadow>
          <sphereGeometry args={[0.5, 12, 10]} />
        </mesh>
      ))}
    </>
  );
}

function ServerRack({ x }: { x: number }) {
  const leds = useRef<(THREE.Mesh | null)[]>([]);
  useFrame(({ clock }) => {
    const t = Math.floor(clock.elapsedTime * 3);
    leds.current.forEach((m, i) => {
      if (m) m.material = !reducedMotion && (t + i * 7) % 11 === 0 ? tones.signal : tones.dark;
    });
  });
  return (
    <group position={[x, 0, -0.95]}>
      <Block p={[0, 0, 0]} s={[0.78, 1.85, 0.8]} m="shade" />
      {Array.from({ length: 10 }, (_, i) => (
        <group key={i}>
          <Block p={[0, 0.12 + i * 0.165, 0.41]} s={[0.7, 0.13, 0.02]} />
          <mesh
            ref={(m) => (leds.current[i] = m)}
            position={[0.27, 0.185 + i * 0.165, 0.425]}
            scale={[0.04, 0.025, 0.01]}
            material={tones.dark}
          >
            <boxGeometry />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export function RackPlace() {
  return (
    <group>
      <Block p={[0, 0, -1.46]} s={[4, 2.1, 0.08]} />
      <Block p={[-1.96, 0, 0]} s={[0.08, 2.1, 3]} />

      <ServerRack x={-1.1} />
      <ServerRack x={-0.25} />
      <Block p={[-0.68, 1.95, -0.95]} s={[1.9, 0.05, 0.36]} />

      {/* the gate requests must pass */}
      <Block p={[GATE_X, 0, -0.45]} s={[0.08, 1.05, 0.08]} />
      <Block p={[GATE_X, 0, 0.75]} s={[0.08, 1.05, 0.08]} />
      <Block p={[GATE_X, 1.05, 0.15]} s={[0.12, 0.08, 1.32]} />
      <Block p={[GATE_X, 0, 0.15]} s={[0.02, 1.05, 1.12]} m="glass" />
      <Requests />

      {/* someone keeping an eye on it */}
      <Block p={[-1.15, 0, 0.75]} s={[1, 0.66, 0.5]} />
      <Block p={[-1.15, 0.66, 0.65]} s={[0.42, 0.28, 0.02]} m="dark" />
      <Figure p={[-1.15, 0, 1.25]} ry={Math.PI} h={0.95} />
    </group>
  );
}

export function RackScene({ progress }: { progress: MutableRefObject<number> }) {
  return (
    <Exploded
      progress={progress}
      size={[4, 3]}
      shaft={[GATE_X, 0.15]}
      placeHeight={2.1}
      place={<RackPlace />}
      placeLabel={{ name: "The server", detail: "Every web request read before it is served" }}
      layers={[
        {
          name: "Pattern check",
          detail: "Known signatures settle the obvious",
          content: (
            <>
              {Array.from({ length: 11 }, (_, i) => (
                <Block key={i} p={[-1.5 + i * 0.3, 0, 0.45]} s={[0.05, 0.26, 0.6]} />
              ))}
            </>
          ),
        },
        {
          name: "Local model",
          detail: "Reads every request · fine-tuned to 93.3% on CPU",
          content: (
            <>
              <Block p={[0, 0, 0.35]} s={[1, 0.12, 1]} />
              {Array.from({ length: 6 }, (_, i) => (
                <Block key={i} p={[-0.38 + i * 0.15, 0.12, 0.35]} s={[0.04, 0.2, 0.9]} />
              ))}
            </>
          ),
        },
        {
          name: "Cloud model",
          detail: "Only the unsure cases · global threat intelligence",
          content: (
            <>
              <Block p={[-0.6, 0, 0.35]} s={[1.2, 0.34, 0.9]} />
              <Ball p={[1, 0.3, 0.35]} s={[0.55, 0.55, 0.55]} />
              <Cyl p={[1, 0, 0.35]} s={[0.08, 0.06, 0.08]} />
            </>
          ),
        },
        {
          name: "Response",
          detail: "Firewall block for an hour · every decision logged",
          content: (
            <>
              <Block p={[-1.2, 0, 0.4]} s={[0.08, 0.36, 0.08]} />
              <Block p={[-0.2, 0.26, 0.4]} s={[2, 0.06, 0.06]} />
              <Block p={[0.86, 0.23, 0.4]} s={[0.12, 0.12, 0.12]} m="signal" />
              {[0.9, 1.2, 1.5].map((x) => (
                <Block key={x} p={[x, 0, 0.3]} s={[0.24, 0.3, 0.6]} />
              ))}
            </>
          ),
        },
      ]}
    />
  );
}

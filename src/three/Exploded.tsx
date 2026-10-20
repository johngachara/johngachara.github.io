import * as THREE from "three";
import { useMemo, useRef, type MutableRefObject, type ReactNode } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html, Line } from "@react-three/drei";
import { Block } from "./kit";
import { INK, tones } from "./materials";
import { reducedMotion, smooth } from "./motion";

export type Layer = {
  name: string;
  detail: string;
  /** small solids drawn on the slab's top face, origin at its centre */
  content?: ReactNode;
};

type Props = {
  /** the place itself, built on a base whose top face is y = 0 */
  place: ReactNode;
  placeLabel: { name: string; detail: string };
  placeHeight: number;
  layers: Layer[];
  /** slab footprint */
  size: [number, number];
  /** x/z of the shaft data travels down when exploded */
  shaft: [number, number];
  progress: MutableRefObject<number>;
};

const SLAB = 0.14;
const GAP = 1.25;

/**
 * A place standing on its own plinth. Scroll and the plinth splits into the
 * layers of software underneath it, each labelled like a drawing.
 */
export function Exploded({ place, placeLabel, placeHeight, layers, size, shaft, progress }: Props) {
  const [W, D] = size;
  const root = useRef<THREE.Group>(null);
  const slabs = useRef<(THREE.Group | null)[]>([]);
  const contents = useRef<(THREE.Group | null)[]>([]);
  const labels = useRef<(HTMLDivElement | null)[]>([]);
  const packets = useRef<(THREE.Mesh | null)[]>([]);
  const shaftLine = useRef<THREE.Group>(null);
  const eased = useRef(0);
  const { camera, size: view } = useThree();
  const lookAt = useMemo(() => new THREE.Vector3(), []);

  const n = layers.length;
  const restY = (i: number) => -(i + 1) * SLAB;
  const openY = (i: number) => -(i + 1) * GAP;

  useFrame((state, dt) => {
    const target = smooth(0.12, 0.62, progress.current);
    eased.current = reducedMotion ? target : THREE.MathUtils.damp(eased.current, target, 5, dt);
    const e = eased.current;

    slabs.current.forEach((g, i) => {
      if (!g) return;
      g.position.y = THREE.MathUtils.lerp(restY(i), openY(i), e);
    });
    contents.current.forEach((g) => g && g.scale.set(1, Math.max(0.001, smooth(0.35, 1, e)), 1));
    labels.current.forEach((el, i) => {
      if (!el) return;
      const o = i === 0 ? 1 : smooth(0.45 + i * 0.08, 0.8 + i * 0.05, e);
      el.style.opacity = String(o);
    });

    // keep the whole stack centred in frame as it grows downwards
    const bottom = THREE.MathUtils.lerp(restY(n - 1), openY(n - 1), e) - SLAB;
    const mid = (placeHeight + bottom) / 2;
    if (root.current) root.current.position.y = -mid;

    const span = placeHeight - bottom;
    const aspect = view.width / Math.max(1, view.height);
    // portrait screens show label names only, so they need less room beside the model
    const fit = Math.max(span * 1.45, (Math.max(W, D) * (aspect < 0.9 ? 1.8 : 2.35)) / Math.min(aspect, 1.4));
    const dist = fit / (2 * Math.tan(THREE.MathUtils.degToRad(28 / 2)));
    const px = reducedMotion ? 0 : state.pointer.x * 0.06;
    const py = reducedMotion ? 0 : state.pointer.y * 0.04;
    const az = Math.PI / 4 + px;
    const el = 0.4 + py;
    camera.position.set(
      Math.sin(az) * Math.cos(el) * dist,
      Math.sin(el) * dist,
      Math.cos(az) * Math.cos(el) * dist,
    );
    lookAt.set(aspect < 0.9 ? W * 0.33 : W * 0.36, 0, 0);
    camera.lookAt(lookAt);

    // data falls through the open layers
    const visible = smooth(0.55, 0.9, e);
    if (shaftLine.current) shaftLine.current.visible = visible > 0.01;
    const t = state.clock.elapsedTime;
    packets.current.forEach((m, i) => {
      if (!m) return;
      const k = reducedMotion ? i / packets.current.length : (t * 0.28 + i / packets.current.length) % 1;
      m.position.y = THREE.MathUtils.lerp(0.05, bottom + SLAB, k);
      m.scale.setScalar(visible * 0.09);
    });
  });


  return (
    <group ref={root}>
      <group>
        <Block p={[0, -SLAB, 0]} s={[W, SLAB, D]} m="paper" />
        {place}
        <Callout p={[W / 2, -SLAB / 2, -D / 2]} name={placeLabel.name} detail={placeLabel.detail} setRef={(el) => (labels.current[0] = el)} />
      </group>

      {layers.map((layer, i) => (
        <group key={layer.name} ref={(g) => (slabs.current[i] = g)} position={[0, restY(i), 0]}>
          <Block p={[0, -SLAB, 0]} s={[W, SLAB, D]} m={i === n - 1 ? "shade" : "paper"} />
          <group ref={(g) => (contents.current[i] = g)}>{layer.content}</group>
          <Callout
            p={[W / 2, -SLAB / 2, -D / 2]}
            name={layer.name}
            detail={layer.detail}
            setRef={(el) => (labels.current[i + 1] = el)}
          />
        </group>
      ))}

      <group ref={shaftLine} visible={false}>
        <Line
          points={[
            [shaft[0], 0, shaft[1]],
            [shaft[0], openY(n - 1), shaft[1]],
          ]}
          color={INK}
          lineWidth={1}
          dashed
          dashSize={0.06}
          gapSize={0.06}
          transparent
          opacity={0.5}
        />
        {Array.from({ length: 4 }, (_, i) => (
          <mesh
            key={i}
            ref={(m) => (packets.current[i] = m)}
            position={[shaft[0], 0, shaft[1]]}
            material={tones.signal}
          >
            <boxGeometry args={[1, 1, 1]} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/** A drawing label pinned to a slab's right-hand corner; the leader is drawn in CSS. */
function Callout({
  p,
  name,
  detail,
  setRef,
}: {
  p: [number, number, number];
  name: string;
  detail: string;
  setRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <Html position={p} zIndexRange={[5, 0]} style={{ pointerEvents: "none" }}>
      <div ref={setRef} className="callout" style={{ opacity: 0 }}>
        <span className="callout-name">{name}</span>
        <span className="callout-detail">{detail}</span>
      </div>
    </Html>
  );
}

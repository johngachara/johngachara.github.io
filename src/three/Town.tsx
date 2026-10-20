import * as THREE from "three";
import { useMemo, useRef, useState, type ReactNode } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { Block } from "./kit";
import { ShopPlace } from "./scenes/Shop";
import { MarketPlace } from "./scenes/Market";
import { BenchPlace } from "./scenes/Bench";
import { RackPlace } from "./scenes/Rack";
import { reducedMotion } from "./motion";
import { projects } from "../content";

const SCALE = 0.42;
const places: Record<string, ReactNode> = {
  shop: <ShopPlace />,
  aisle: <MarketPlace />,
  bench: <BenchPlace />,
  server: <RackPlace />,
};
const HX = (4 * SCALE + 0.12) / 2;
const HZ = (3 * SCALE + 0.12) / 2;
// a diamond on screen: labels point outwards so none sits over a neighbour
const spots: { at: [number, number]; side: "left" | "right"; lift: number }[] = [
  { at: [-1.25, 1.05], side: "left", lift: 0.07 },
  { at: [1.25, 1.05], side: "right", lift: 0.07 },
  { at: [-1.25, -1.05], side: "left", lift: 0.8 },
  { at: [1.25, -1.05], side: "right", lift: 0.07 },
];

function Lot({
  id,
  index,
  title,
  at,
  side,
  lift,
}: {
  id: string;
  index: number;
  title: string;
  at: [number, number];
  side: "left" | "right";
  lift: number;
}) {
  const group = useRef<THREE.Group>(null);
  const [hover, setHover] = useState(false);
  useFrame((_, dt) => {
    if (!group.current) return;
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, hover ? 0.12 : 0, 8, dt);
  });
  const go = () => document.getElementById(`work-${id}`)?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });

  return (
    <group position={[at[0], 0, at[1]]}>
      <group
        ref={group}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHover(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHover(false);
          document.body.style.cursor = "";
        }}
        onClick={go}
      >
        <Block p={[0, 0, 0]} s={[HX * 2, 0.14, HZ * 2]} />
        <group position={[0, 0.14, 0]} scale={SCALE}>
          {places[id]}
        </group>
      </group>
      <Html position={side === "right" ? [HX, lift, -HZ] : [-HX, lift, HZ]} zIndexRange={[5, 0]}>
        <a
          href={`#work-${id}`}
          className={`lot-label ${side}${hover ? " is-hover" : ""}`}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <span className="lot-index">0{index + 1}</span>
          <span className="lot-title">{title}</span>
        </a>
      </Html>
    </group>
  );
}

export function Town() {
  const { camera, size } = useThree();
  const lookAt = useMemo(() => new THREE.Vector3(0, 0.3, 0), []);

  useFrame((state) => {
    const aspect = size.width / Math.max(1, size.height);
    // on phones the labels shrink to numbers, so the models can take more of the width
    const fit = Math.max(4.6, (size.width < 640 ? 7.8 : 8) / Math.min(aspect, 1.6));
    const dist = fit / (2 * Math.tan(THREE.MathUtils.degToRad(28 / 2)));
    const az = Math.PI / 4 + (reducedMotion ? 0 : state.pointer.x * 0.08);
    const el = 0.62 + (reducedMotion ? 0 : state.pointer.y * 0.04);
    camera.position.set(Math.sin(az) * Math.cos(el) * dist, Math.sin(el) * dist, Math.cos(az) * Math.cos(el) * dist);
    camera.lookAt(lookAt);
  }, -1); // before drei's Html, so labels track this frame's camera, not the last one

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <shadowMaterial opacity={0.12} />
      </mesh>
      {projects.map((p, i) => (
        <Lot key={p.id} id={p.id} index={i} title={p.place} {...spots[i]} />
      ))}
    </group>
  );
}

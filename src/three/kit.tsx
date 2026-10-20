import * as THREE from "three";
import { Edges } from "@react-three/drei";
import type { ReactNode } from "react";
import { INK, tones, type Tone, type V3 } from "./materials";

const box = new THREE.BoxGeometry(1, 1, 1);
const cyl = new THREE.CylinderGeometry(0.5, 0.5, 1, 24);
const sphere = new THREE.SphereGeometry(0.5, 16, 12);

type SolidProps = {
  /** bottom-centre of the solid */
  p?: V3;
  s?: V3;
  r?: V3;
  m?: Tone;
  edges?: boolean;
  children?: ReactNode;
};

export function Block({ p = [0, 0, 0], s = [1, 1, 1], r, m = "paper", edges = true }: SolidProps) {
  return (
    <mesh
      geometry={box}
      material={tones[m]}
      position={[p[0], p[1] + s[1] / 2, p[2]]}
      rotation={r}
      scale={s}
      castShadow={m !== "glass"}
      receiveShadow
    >
      {edges && <Edges color={INK} threshold={20} transparent opacity={m === "glass" ? 0.5 : 0.85} />}
    </mesh>
  );
}

export function Cyl({ p = [0, 0, 0], s = [1, 1, 1], r, m = "paper", edges = true }: SolidProps) {
  return (
    <mesh
      geometry={cyl}
      material={tones[m]}
      position={[p[0], p[1] + s[1] / 2, p[2]]}
      rotation={r}
      scale={s}
      castShadow
      receiveShadow
    >
      {edges && <Edges color={INK} threshold={30} transparent opacity={0.85} />}
    </mesh>
  );
}

export function Ball({ p = [0, 0, 0], s = [1, 1, 1], m = "paper" }: SolidProps) {
  return <mesh geometry={sphere} material={tones[m]} position={p} scale={s} castShadow />;
}

/** An architect's scale figure: no face, just presence. */
export function Figure({ p = [0, 0, 0], ry = 0, h = 0.9 }: { p?: V3; ry?: number; h?: number }) {
  const body = h * 0.78;
  return (
    <group position={p} rotation={[0, ry, 0]}>
      <Cyl p={[0, 0, 0]} s={[h * 0.22, body, h * 0.16]} />
      <Ball p={[0, body + h * 0.11, 0]} s={[h * 0.18, h * 0.2, h * 0.18]} />
    </group>
  );
}

import * as THREE from "three";

export type V3 = [number, number, number];

/* The model is white card with ink edges; signal orange marks only what moves. */
export const INK = "#26241f";
export const tones = {
  paper: new THREE.MeshStandardMaterial({ color: "#f6f4ef", roughness: 1 }),
  shade: new THREE.MeshStandardMaterial({ color: "#e6e1d7", roughness: 1 }),
  dark: new THREE.MeshStandardMaterial({ color: "#3a3833", roughness: 0.9 }),
  signal: new THREE.MeshStandardMaterial({ color: "#ff5a1f", roughness: 0.8 }),
  glass: new THREE.MeshStandardMaterial({
    color: "#ffffff",
    roughness: 0.2,
    transparent: true,
    opacity: 0.18,
    depthWrite: false,
  }),
};
export type Tone = keyof typeof tones;

/** Deterministic pseudo-random so every visit draws the same model. */
export function rand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

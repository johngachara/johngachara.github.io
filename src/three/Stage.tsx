import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState, type ReactNode } from "react";

/** Mounts its canvas only while near the viewport, so at most one or two WebGL contexts run at once. */
export function Stage({ children, label }: { children: ReactNode; label: string }) {
  const host = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setNear(e.isIntersecting), { rootMargin: "60% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={host} className="stage" role="img" aria-label={label}>
      {near && (
        <Canvas
          shadows
          dpr={[1, 1.75]}
          gl={{ antialias: true, alpha: true }}
          style={{ overflow: "visible" }}
          camera={{ fov: 28, near: 0.1, far: 100, position: [9, 7, 9] }}
        >
          <hemisphereLight args={["#ffffff", "#d9d2c4", 1.35]} />
          <directionalLight
            position={[-5, 9, 6]}
            intensity={1.6}
            castShadow
            shadow-mapSize={[1024, 1024]}
            shadow-bias={-0.0004}
            shadow-normalBias={0.02}
            shadow-camera-left={-6}
            shadow-camera-right={6}
            shadow-camera-top={6}
            shadow-camera-bottom={-6}
            shadow-camera-far={30}
          />
          {children}
        </Canvas>
      )}
    </div>
  );
}

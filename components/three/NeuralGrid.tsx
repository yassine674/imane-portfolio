"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface NeuralGridProps {
  mouseRef: React.RefObject<[number, number]>;
}

const COLS = 28;
const ROWS = 18;
const COUNT = COLS * ROWS;
const SPREAD_X = 14;
const SPREAD_Y = 9;

export function NeuralGrid({ mouseRef }: NeuralGridProps) {
  const geomRef = useRef<THREE.BufferGeometry>(null);

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const col = new Float32Array(COUNT * 3);
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        const idx = (i * COLS + j) * 3;
        pos[idx] = (j / (COLS - 1)) * SPREAD_X * 2 - SPREAD_X;
        pos[idx + 1] = (i / (ROWS - 1)) * SPREAD_Y * 2 - SPREAD_Y;
        pos[idx + 2] = 0;
        col[idx] = 0.06;
        col[idx + 1] = 0.06;
        col[idx + 2] = 0.1;
      }
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame(({ clock }) => {
    const geo = geomRef.current;
    if (!geo) return;

    const posAttr = geo.getAttribute("position") as THREE.BufferAttribute;
    const colAttr = geo.getAttribute("color") as THREE.BufferAttribute;
    if (!posAttr || !colAttr) return;

    const t = clock.getElapsedTime();
    const mx = (mouseRef.current?.[0] ?? 0) * SPREAD_X;
    const my = (mouseRef.current?.[1] ?? 0) * SPREAD_Y;

    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        const idx = i * COLS + j;
        const x = (j / (COLS - 1)) * SPREAD_X * 2 - SPREAD_X;
        const y = (i / (ROWS - 1)) * SPREAD_Y * 2 - SPREAD_Y;
        const dx = x - mx;
        const dy = y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const wave =
          Math.sin(dist * 0.8 - t * 2) * 0.4 +
          Math.sin(dist * 0.3 - t * 1.2) * 0.2;
        const mouseInfluence = Math.max(0, 1 - dist / 6) * 1.2;
        const z = wave * (0.4 + mouseInfluence);

        posAttr.setZ(idx, z);

        const intensity = (z + 0.8) / 1.6;
        if (intensity > 0.75) {
          colAttr.setXYZ(idx, 0, 1, 0.82);
        } else if (intensity > 0.55) {
          colAttr.setXYZ(idx, 0.48, 0.38, 1);
        } else {
          colAttr.setXYZ(idx, 0.06, 0.06, 0.1);
        }
      }
    }

    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;
  });

  return (
    <points>
      <bufferGeometry ref={geomRef}>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* Neural network: 5 layers, nodes pulsing as activations pass through */
const LAYER_SIZES = [5, 8, 10, 8, 5];
const LAYER_X     = [-3.6, -1.8, 0, 1.8, 3.6];
const SPREAD_Y    = 2.6;
const JITTER_Z    = 0.35;

/* Accent warm: ~#D4702A   Violet: ~#7B61FF */
const WARM_R = 0.83, WARM_G = 0.44, WARM_B = 0.16;
const VIOL_R = 0.48, VIOL_G = 0.38, VIOL_B = 1.0;

export function Geometry() {
  const groupRef    = useRef<THREE.Group>(null);
  const nodesGeoRef = useRef<THREE.BufferGeometry>(null);

  /* ── Build geometry once ── */
  const { positions, colors, linePositions, totalNodes, layerOffsets } = useMemo(() => {
    const pos: number[]  = [];
    const col: number[]  = [];
    const offsets: number[] = [];
    const byLayer: [number, number, number][][] = [];

    LAYER_SIZES.forEach((count, li) => {
      offsets.push(pos.length / 3);
      const layerNodes: [number, number, number][] = [];
      for (let i = 0; i < count; i++) {
        const x = LAYER_X[li];
        const y = count > 1 ? (i / (count - 1) - 0.5) * SPREAD_Y * 2 : 0;
        const z = (Math.random() - 0.5) * JITTER_Z;
        layerNodes.push([x, y, z]);
        pos.push(x, y, z);
        col.push(WARM_R * 0.5, WARM_G * 0.5, WARM_B * 0.5);
      }
      byLayer.push(layerNodes);
    });

    /* Full connections between adjacent layers */
    const lines: number[] = [];
    for (let li = 0; li < byLayer.length - 1; li++) {
      for (const a of byLayer[li]) {
        for (const b of byLayer[li + 1]) {
          lines.push(...a, ...b);
        }
      }
    }

    return {
      positions:    new Float32Array(pos),
      colors:       new Float32Array(col),
      linePositions: new Float32Array(lines),
      totalNodes:   pos.length / 3,
      layerOffsets: offsets,
    };
  }, []);

  useFrame(({ clock }) => {
    const t   = clock.getElapsedTime();

    /* Gentle sway */
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.07) * 0.28;
      groupRef.current.rotation.x = Math.sin(t * 0.05) * 0.09;
    }

    /* Pulse node colors — activation wave travels left→right */
    if (nodesGeoRef.current) {
      const colAttr = nodesGeoRef.current.getAttribute("color") as THREE.BufferAttribute;
      if (!colAttr) return;

      LAYER_SIZES.forEach((count, li) => {
        const base  = layerOffsets[li];
        const phase = t * 1.6 - li * 0.55;

        for (let i = 0; i < count; i++) {
          const activation = Math.sin(phase + i * 0.9) * 0.5 + 0.5;
          const bright     = 0.25 + activation * 0.75;

          if (activation > 0.72) {
            /* "Fired" neuron → violet flash */
            colAttr.setXYZ(base + i, VIOL_R * bright, VIOL_G * bright, VIOL_B * bright);
          } else {
            colAttr.setXYZ(base + i, WARM_R * bright, WARM_G * bright, WARM_B * bright);
          }
        }
      });

      colAttr.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>

      {/* ── Nodes ── */}
      <points>
        <bufferGeometry ref={nodesGeoRef}>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color"    args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.14}
          vertexColors
          transparent
          opacity={1}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>

      {/* ── Connection lines ── */}
      {linePositions.length > 0 && (
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
          </bufferGeometry>
          <lineBasicMaterial
            color="#3d1a08"
            transparent
            opacity={0.22}
            blending={THREE.AdditiveBlending}
          />
        </lineSegments>
      )}

      {/* ── Outer shell — very faint ── */}
      <mesh rotation={[0.15, 0.3, 0.05]}>
        <icosahedronGeometry args={[4.2, 1]} />
        <meshBasicMaterial color="#D4702A" wireframe transparent opacity={0.03} />
      </mesh>

      {/* ── Secondary inner ring ── */}
      <mesh rotation={[-0.1, 0.5, 0.2]}>
        <icosahedronGeometry args={[2.2, 0]} />
        <meshBasicMaterial color="#7B61FF" wireframe transparent opacity={0.04} />
      </mesh>

    </group>
  );
}

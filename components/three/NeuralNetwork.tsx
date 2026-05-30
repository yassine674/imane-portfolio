"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import * as THREE from "three"

function generateNeuralParticles(count: number) {
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)

  const teal = new THREE.Color("#5EEAD4")
  const violet = new THREE.Color("#A78BFA")
  const emerald = new THREE.Color("#4ADE80")

  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    const r = Math.random() * 6
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)

    positions[i3] = r * Math.sin(phi) * Math.cos(theta)
    positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    positions[i3 + 2] = r * Math.cos(phi)

    const rand = Math.random()
    const color = rand < 0.5 ? teal : rand < 0.75 ? violet : emerald
    colors[i3] = color.r
    colors[i3 + 1] = color.g
    colors[i3 + 2] = color.b
  }

  return { positions, colors }
}

interface NeuralParticlesProps {
  count?: number
  mouse: React.RefObject<[number, number]>
}

export function NeuralParticles({ count = 2000, mouse }: NeuralParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null)

  const { positions, colors } = useMemo(() => generateNeuralParticles(count), [count])

  useFrame((state, delta) => {
    if (!pointsRef.current) return

    const time = state.clock.elapsedTime
    pointsRef.current.rotation.y += delta * 0.04
    pointsRef.current.rotation.x = Math.sin(time * 0.1) * 0.15

    const [mx, my] = mouse.current ?? [0, 0]
    pointsRef.current.rotation.y += mx * 0.002
    pointsRef.current.rotation.x += my * 0.001
  })

  return (
    <Points ref={pointsRef} positions={positions} colors={colors} stride={3}>
      <PointMaterial
        transparent
        vertexColors
        size={0.025}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.8}
      />
    </Points>
  )
}

interface ConnectionsProps {
  positions: Float32Array
  maxConnections?: number
}

export function NeuralConnections({ positions, maxConnections = 60 }: ConnectionsProps) {
  const lineRef = useRef<THREE.LineSegments>(null)

  const { linePositions, lineColors } = useMemo(() => {
    const pts: number[] = []
    const clrs: number[] = []
    const teal = new THREE.Color("#5EEAD4")
    const violet = new THREE.Color("#A78BFA")

    let connections = 0
    const nodeCount = positions.length / 3

    for (let i = 0; i < nodeCount && connections < maxConnections; i++) {
      for (let j = i + 1; j < nodeCount && connections < maxConnections; j++) {
        const ax = positions[i * 3], ay = positions[i * 3 + 1], az = positions[i * 3 + 2]
        const bx = positions[j * 3], by = positions[j * 3 + 1], bz = positions[j * 3 + 2]
        const dist = Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2 + (az - bz) ** 2)

        if (dist < 1.8) {
          pts.push(ax, ay, az, bx, by, bz)
          const c = Math.random() > 0.5 ? teal : violet
          clrs.push(c.r, c.g, c.b, c.r, c.g, c.b)
          connections++
        }
      }
    }

    return {
      linePositions: new Float32Array(pts),
      lineColors: new Float32Array(clrs),
    }
  }, [positions, maxConnections])

  useFrame((_, delta) => {
    if (lineRef.current) {
      lineRef.current.rotation.y += delta * 0.04
    }
  })

  if (linePositions.length === 0) return null

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[linePositions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[lineColors, 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial
        vertexColors
        transparent
        opacity={0.15}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </lineSegments>
  )
}

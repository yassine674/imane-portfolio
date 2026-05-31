"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface NeuralGridProps {
  mouse: React.RefObject<[number, number]>
}

export function NeuralGrid({ mouse }: NeuralGridProps) {
  const pointsRef = useRef<THREE.Points>(null)
  const timeRef = useRef(0)

  const { positions, colors, count } = useMemo(() => {
    const cols = 28
    const rows = 18
    const count = cols * rows
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    const mint  = new THREE.Color("#7FCFE0")
    const violet = new THREE.Color("#8484C8")
    const dim   = new THREE.Color("#1a1a2e")

    let idx = 0
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = (c / (cols - 1) - 0.5) * 20
        const y = (r / (rows - 1) - 0.5) * 12
        const z = 0
        positions[idx * 3]     = x
        positions[idx * 3 + 1] = y
        positions[idx * 3 + 2] = z

        const t = Math.random()
        const col = t < 0.04 ? mint : t < 0.09 ? violet : dim
        colors[idx * 3]     = col.r
        colors[idx * 3 + 1] = col.g
        colors[idx * 3 + 2] = col.b
        idx++
      }
    }

    return { positions, colors, count, cols, rows }
  }, [])

  /* Cached colors — allocated once, never inside the frame loop */
  const cachedColors = useMemo(() => ({
    mint:   new THREE.Color("#7FCFE0"),
    violet: new THREE.Color("#8484C8"),
    dim:    new THREE.Color("#111128"),
  }), [])

  useFrame((_, delta) => {
    if (!pointsRef.current) return
    timeRef.current += delta

    const geom = pointsRef.current.geometry
    const pos  = geom.attributes.position as THREE.BufferAttribute
    const clr  = geom.attributes.color    as THREE.BufferAttribute

    const [mx, my] = mouse.current ?? [0, 0]
    const t = timeRef.current

    const { mint, violet, dim } = cachedColors

    const cols = 28
    const rows = 18

    for (let i = 0; i < count; i++) {
      const bx = (i % cols) / (cols - 1) - 0.5
      const by = Math.floor(i / cols) / (rows - 1) - 0.5

      // wave ripple
      const dist = Math.sqrt((bx - mx * 0.5) ** 2 + (by + my * 0.3) ** 2)
      const wave = Math.sin(dist * 12 - t * 2.5) * 0.3
      pos.setZ(i, wave)

      // Color based on wave height
      const intensity = (wave + 0.3) / 0.6
      if (intensity > 0.72) {
        clr.setXYZ(i, mint.r, mint.g, mint.b)
      } else if (intensity > 0.55) {
        clr.setXYZ(i, violet.r, violet.g, violet.b)
      } else {
        clr.setXYZ(i, dim.r, dim.g, dim.b)
      }
    }

    pos.needsUpdate = true
    clr.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors, 3]}    />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

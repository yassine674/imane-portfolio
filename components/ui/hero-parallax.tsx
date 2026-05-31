"use client"

import React from "react"
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export interface ParallaxProduct {
  title: string
  link: string
  thumbnail: string
  tags?: string[]
}

export function HeroParallax({ products }: { products: ParallaxProduct[] }) {
  const firstRow  = products.slice(0, 5)
  const secondRow = products.slice(5, 10)
  const thirdRow  = products.slice(10, 15)

  const ref = React.useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const spring = { stiffness: 300, damping: 30, bounce: 100 }

  const translateX        = useSpring(useTransform(scrollYProgress, [0, 1], [0,  1000]), spring)
  const translateXReverse = useSpring(useTransform(scrollYProgress, [0, 1], [0, -1000]), spring)
  const rotateX   = useSpring(useTransform(scrollYProgress, [0, 0.2], [15, 0]),    spring)
  const opacity   = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),   spring)
  const rotateZ   = useSpring(useTransform(scrollYProgress, [0, 0.2], [20, 0]),    spring)
  const translateY = useSpring(useTransform(scrollYProgress, [0, 0.2], [-700, 500]), spring)

  return (
    <div
      ref={ref}
      className="h-[300vh] py-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <motion.div style={{ rotateX, rotateZ, translateY, opacity }}>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((p) => (
            <ProductCard product={p} translate={translateX} key={p.title} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-20 space-x-20">
          {secondRow.map((p) => (
            <ProductCard product={p} translate={translateXReverse} key={p.title} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((p) => (
            <ProductCard product={p} translate={translateX} key={p.title} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

function ProductCard({
  product,
  translate,
}: {
  product: ParallaxProduct
  translate: MotionValue<number>
}) {
  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -20 }}
      className="group/product h-96 w-[30rem] relative flex-shrink-0"
    >
      <Link href={product.link} className="block group-hover/product:shadow-2xl">
        <Image
          src={product.thumbnail}
          height={600}
          width={600}
          className="object-cover object-left-top absolute h-full w-full inset-0 rounded-xl"
          alt={product.title}
          unoptimized
        />
      </Link>
      {/* Dark overlay on hover */}
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-[#07070F] pointer-events-none rounded-xl transition-opacity duration-300" />
      {/* Title on hover */}
      <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover/product:opacity-100 transition-opacity duration-300">
        <h3 className="font-display font-semibold text-lg text-[#EDE8DC] mb-1">{product.title}</h3>
        {product.tags && (
          <div className="flex flex-wrap gap-1.5">
            {product.tags.slice(0, 3).map((t) => (
              <span key={t} className="text-[10px] font-mono text-[#7FCFE0] bg-[rgba(127,207,224,0.12)] px-2 py-0.5 rounded">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
      {/* Border glow on hover */}
      <div className="absolute inset-0 rounded-xl border border-[rgba(127,207,224,0.0)] group-hover/product:border-[rgba(127,207,224,0.22)] transition-colors duration-300 pointer-events-none" />
    </motion.div>
  )
}

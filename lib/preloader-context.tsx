"use client"

import { createContext, useContext, useState } from "react"

interface PreloaderCtx {
  preloaderDone: boolean
  markDone: () => void
}

const PreloaderContext = createContext<PreloaderCtx>({
  preloaderDone: false,
  markDone: () => {},
})

export function PreloaderProvider({ children }: { children: React.ReactNode }) {
  const [preloaderDone, setPreloaderDone] = useState(false)
  return (
    <PreloaderContext.Provider value={{ preloaderDone, markDone: () => setPreloaderDone(true) }}>
      {children}
    </PreloaderContext.Provider>
  )
}

export const usePreloader = () => useContext(PreloaderContext)

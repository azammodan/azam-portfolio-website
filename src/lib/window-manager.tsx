'use client'

import React, { createContext, useCallback, useContext, useRef, useState } from 'react'
import type { WindowId, WindowState } from '@/types'

const DEFAULT_SIZES: Record<WindowId, { width: number; height: number }> = {
  about:    { width: 320, height: 380 },
  works:    { width: 420, height: 480 },
  blog:     { width: 380, height: 420 },
  contact:  { width: 300, height: 240 },
  terminal: { width: 480, height: 280 },
  settings: { width: 340, height: 300 },
  search:   { width: 480, height: 360 },
}

const DEFAULT_POSITIONS: Record<WindowId, { x: number; y: number }> = {
  about:    { x: 80,  y: 60  },
  works:    { x: 200, y: 80  },
  blog:     { x: 160, y: 100 },
  contact:  { x: 300, y: 120 },
  terminal: { x: 120, y: 180 },
  settings: { x: 250, y: 140 },
  search:   { x: 140, y: 80  },
}

interface WMContext {
  windows: Record<WindowId, WindowState>
  openWindow: (id: WindowId) => void
  closeWindow: (id: WindowId) => void
  minimizeWindow: (id: WindowId) => void
  focusWindow: (id: WindowId) => void
  setPosition: (id: WindowId, pos: { x: number; y: number }) => void
  topZ: number
}

const WMCtx = createContext<WMContext | null>(null)

function makeInitial(): Record<WindowId, WindowState> {
  const ids: WindowId[] = ['about', 'works', 'blog', 'contact', 'terminal', 'settings', 'search']
  return Object.fromEntries(
    ids.map((id, i) => [id, {
      id,
      isOpen: id === 'about', // about starts open
      isMinimized: false,
      zIndex: id === 'about' ? 10 : 1,
      position: DEFAULT_POSITIONS[id],
      size: DEFAULT_SIZES[id],
    }])
  ) as Record<WindowId, WindowState>
}

export function WindowManagerProvider({ children }: { children: React.ReactNode }) {
  const [windows, setWindows] = useState<Record<WindowId, WindowState>>(makeInitial)
  const zRef = useRef(10)

  const nextZ = () => { zRef.current += 1; return zRef.current }

  const openWindow = useCallback((id: WindowId) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isOpen: true, isMinimized: false, zIndex: nextZ() }
    }))
  }, [])

  const closeWindow = useCallback((id: WindowId) => {
    setWindows(prev => ({ ...prev, [id]: { ...prev[id], isOpen: false } }))
  }, [])

  const minimizeWindow = useCallback((id: WindowId) => {
    setWindows(prev => ({ ...prev, [id]: { ...prev[id], isMinimized: true } }))
  }, [])

  const focusWindow = useCallback((id: WindowId) => {
    setWindows(prev => ({ ...prev, [id]: { ...prev[id], zIndex: nextZ() } }))
  }, [])

  const setPosition = useCallback((id: WindowId, pos: { x: number; y: number }) => {
    setWindows(prev => ({ ...prev, [id]: { ...prev[id], position: pos } }))
  }, [])

  return (
    <WMCtx.Provider value={{ windows, openWindow, closeWindow, minimizeWindow, focusWindow, setPosition, topZ: zRef.current }}>
      {children}
    </WMCtx.Provider>
  )
}

export function useWindowManager() {
  const ctx = useContext(WMCtx)
  if (!ctx) throw new Error('useWindowManager must be inside WindowManagerProvider')
  return ctx
}

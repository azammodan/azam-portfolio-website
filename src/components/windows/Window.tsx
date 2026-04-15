'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useWindowManager } from '@/lib/window-manager'
import type { WindowId } from '@/types'

interface Props {
  id: WindowId
  title: string
  children: React.ReactNode
  className?: string
  minWidth?: number
  minHeight?: number
}

export default function Window({ id, title, children, className = '', minWidth = 500, minHeight = 400 }: Props) {
  const { windows, closeWindow, minimizeWindow, focusWindow, setPosition } = useWindowManager()
  const win = windows[id]

  const ref = useRef<HTMLDivElement>(null)
  const dragState = useRef<{ active: boolean; ox: number; oy: number }>({ active: false, ox: 0, oy: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const onTitleBarMouseDown = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    if (target.closest('.win-dot')) return
    e.preventDefault()
    focusWindow(id)

    const el = ref.current!
    const rect = el.getBoundingClientRect()
    dragState.current = { active: true, ox: e.clientX - rect.left, oy: e.clientY - rect.top }

    const onMove = (ev: MouseEvent) => {
      if (!dragState.current.active) return
      const parent = el.parentElement!
      const pr = parent.getBoundingClientRect()
      let nx = ev.clientX - pr.left - dragState.current.ox
      let ny = ev.clientY - pr.top  - dragState.current.oy
      nx = Math.max(0, Math.min(nx, pr.width  - el.offsetWidth))
      ny = Math.max(0, Math.min(ny, pr.height - el.offsetHeight))
      el.style.left = nx + 'px'
      el.style.top  = ny + 'px'
    }
    const onUp = () => {
      if (!dragState.current.active) return
      dragState.current.active = false
      const el2 = ref.current
      if (el2) {
        setPosition(id, { x: parseInt(el2.style.left), y: parseInt(el2.style.top) })
      }
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [id, focusWindow, setPosition])

  if (!mounted || !win.isOpen || win.isMinimized) return null

  return (
    <div
      ref={ref}
      className={`absolute flex flex-col overflow-hidden rounded-window border border-[var(--desktop-border)] bg-[var(--desktop-surface)] animate-window-open ${className}`}
      style={{
        left: win.position.x,
        top: win.position.y,
        width: win.size.width,
        height: win.size.height,
        minWidth,
        minHeight,
        zIndex: win.zIndex,
        boxShadow: 'var(--win-shadow)',
      }}
      onMouseDown={() => focusWindow(id)}
    >
      {/* Title bar */}
      <div
        className="flex h-9 flex-shrink-0 cursor-move select-none items-center justify-between border-b border-[var(--desktop-border)] bg-[var(--win-header)] px-3 rounded-t-window"
        onMouseDown={onTitleBarMouseDown}
      >
        {/* Title */}
        <span className="win-title text-xs font-medium text-[var(--desktop-muted)] pointer-events-none">
          {title}
        </span>

        {/* Windows-style controls */}
        <div className="flex items-center gap-1 ml-auto">
          <button
            className="win-dot flex items-center justify-center w-10 h-7 transition-colors focus-visible:outline-none"
            onClick={() => minimizeWindow(id)}
            title="Minimize"
            aria-label="Minimize window"
            style={{
              backgroundColor: 'var(--win-header)',
              color: 'white',
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--win-header-light)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--win-header)'}
          >
            <span className="w-3 h-0.5 bg-white"></span>
          </button>
          <button
            className="win-dot flex items-center justify-center w-10 h-7 transition-colors focus-visible:outline-none"
            title="Maximize"
            aria-label="Maximize window"
            style={{
              backgroundColor: 'var(--win-header)',
              color: 'white',
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--win-header-light)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--win-header)'}
          >
            <span className="w-3 h-3 border border-white"></span>
          </button>
          <button
            className="win-dot flex items-center justify-center w-10 h-7 transition-colors focus-visible:outline-none"
            onClick={() => closeWindow(id)}
            title="Close"
            aria-label="Close window"
            style={{
              backgroundColor: 'var(--win-header)',
              color: 'white',
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--win-header-light)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--win-header)'}
          >
            <span className="text-white font-semibold text-sm leading-none">✕</span>
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="win-body flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  )
}

'use client'

import { useRef, useState } from 'react'
import { useWindowManager } from '@/lib/window-manager'
import { DOCK_APPS } from '@/lib/data'
import { useTheme } from '@/lib/theme'

const MAX_SCALE = 1.55
const SPREAD = 90 // px — distance over which magnification fades

export default function Dock() {
  const { windows, openWindow } = useWindowManager()
  const { toggle } = useTheme()
  const dockRef = useRef<HTMLDivElement>(null)
  const [mouseX, setMouseX] = useState<number | null>(null)

  const onMouseMove = (e: React.MouseEvent) => setMouseX(e.clientX)
  const onMouseLeave = () => setMouseX(null)

  const getScale = (el: HTMLElement | null): number => {
    if (!el || mouseX === null) return 1
    const rect = el.getBoundingClientRect()
    const center = rect.left + rect.width / 2
    const dist = Math.abs(mouseX - center)
    if (dist > SPREAD) return 1
    // cosine falloff for a smooth magnification curve
    return 1 + (MAX_SCALE - 1) * Math.cos((dist / SPREAD) * (Math.PI / 2))
  }

  return (
    <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-40">
      <div
        ref={dockRef}
        className="flex items-end gap-1 rounded-2xl border border-[var(--desktop-border)] px-2.5 py-2"
        style={{ background: 'var(--desktop-glass)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        {DOCK_APPS.map(app => (
          <DockItem
            key={app.id}
            label={app.label}
            icon={app.icon}
            isOpen={windows[app.id]?.isOpen && !windows[app.id]?.isMinimized}
            getScale={getScale}
            onClick={() => openWindow(app.id)}
          />
        ))}

        {/* Separator */}
        <div className="mx-1.5 h-8 w-px self-center bg-[var(--desktop-border)]" />

        {/* Dark mode toggle as dock item */}
        <DockItem
          label="Dark mode"
          icon="🌙"
          isOpen={false}
          getScale={getScale}
          onClick={toggle}
        />
      </div>
    </div>
  )
}

function DockItem({
  label, icon, isOpen, getScale, onClick
}: {
  label: string; icon: string; isOpen: boolean; getScale: (el: HTMLElement | null) => number; onClick: () => void
}) {
  const ref = useRef<HTMLButtonElement>(null)
  const [hovered, setHovered] = useState(false)
  const scale = getScale(ref.current)

  return (
    <div className="relative flex flex-col items-center" style={{ width: 42 }}>
      {/* Tooltip */}
      {hovered && (
        <div
          className="absolute bottom-full mb-2 whitespace-nowrap rounded-md border border-[var(--desktop-border)] bg-[var(--desktop-surface)] px-2 py-1 text-[11px] text-white pointer-events-none"
          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
        >
          {label}
        </div>
      )}

      <button
        ref={ref}
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="dock-item flex h-10 w-10 items-center justify-center rounded-xl text-xl transition-none focus-visible:outline-none"
        style={{
          transform: `scale(${scale.toFixed(3)})`,
          transformOrigin: 'bottom center',
          background: 'var(--desktop-bar)',
          border: '1px solid var(--desktop-border)',
        }}
        aria-label={label}
      >
        {icon}
      </button>

      {/* Open indicator dot */}
      <div
        className={`mt-0.5 h-1 w-1 rounded-full transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        style={{ background: 'var(--desktop-muted)' }}
      />
    </div>
  )
}

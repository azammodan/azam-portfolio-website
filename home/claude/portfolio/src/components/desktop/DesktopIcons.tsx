'use client'

import { useWindowManager } from '@/lib/window-manager'
import { DESKTOP_ICONS } from '@/lib/data'
import type { WindowId } from '@/types'

export default function DesktopIcons() {
  const { openWindow } = useWindowManager()

  return (
    <>
      {DESKTOP_ICONS.map(icon => (
        <div
          key={icon.id}
          className="absolute flex flex-col items-center gap-1.5 cursor-pointer group select-none"
          style={{ left: icon.position.x, top: icon.position.y, width: 72 }}
          onDoubleClick={() => icon.windowId && openWindow(icon.windowId as WindowId)}
        >
          {icon.type === 'folder' ? (
            <FolderIcon color={icon.color ?? '#c0d0e8'} />
          ) : icon.type === 'app' ? (
            <AppIcon />
          ) : (
            <FileIcon />
          )}
          <span
            className="text-center text-[11px] leading-snug text-[var(--desktop-text)] px-1 rounded"
            style={{ textShadow: '0 1px 3px rgba(0,0,0,0.15)' }}
          >
            {icon.label}
          </span>
        </div>
      ))}

      {/* Photo folder stack (special) */}
      <PhotoStack />
    </>
  )
}

function FolderIcon({ color }: { color: string }) {
  const light = color
  const dark = color.replace(/[0-9a-f]{2}/gi, (m) => {
    const v = parseInt(m, 16)
    return Math.max(0, v - 30).toString(16).padStart(2, '0')
  })
  return (
    <div className="relative w-11 h-9 group-hover:scale-105 transition-transform">
      {/* Tab */}
      <div className="absolute top-0 left-0 h-2 w-4 rounded-tl-sm rounded-tr-md" style={{ background: dark }} />
      {/* Body */}
      <div
        className="absolute top-1.5 left-0 right-0 bottom-0 rounded-sm rounded-tl-none rounded-tr-md"
        style={{ background: light, border: `1.5px solid ${dark}` }}
      />
    </div>
  )
}

function FileIcon() {
  return (
    <div className="relative w-9 h-11 group-hover:scale-105 transition-transform">
      <div
        className="absolute inset-0 rounded-sm border border-[var(--desktop-border)] bg-[var(--desktop-surface)]"
        style={{ clipPath: 'polygon(0 0, 70% 0, 100% 30%, 100% 100%, 0 100%)' }}
      />
      {/* Folded corner */}
      <div
        className="absolute top-0 right-0 w-3 h-3 border-l border-b border-[var(--desktop-border)]"
        style={{ background: 'var(--desktop-bar)', borderRadius: '0 0 0 3px' }}
      />
      {/* Lines */}
      <div className="absolute left-2 right-2 space-y-1" style={{ top: '40%' }}>
        {[0,1,2].map(i => (
          <div key={i} className="h-px rounded" style={{ background: 'var(--desktop-border2)' }} />
        ))}
      </div>
    </div>
  )
}

function AppIcon() {
  return (
    <div
      className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-mono font-medium group-hover:scale-105 transition-transform"
      style={{ background: '#1a1a1a', color: '#7ec8a0', border: '1px solid #333' }}
    >
      _
    </div>
  )
}

// Photo folder stack — 3 overlapping photo cards that fan on hover
function PhotoStack() {
  const COLORS = ['#f5e6d3', '#d3e6f5', '#d3f5e6']

  return (
    <div
      className="absolute photo-stack cursor-pointer select-none"
      style={{ left: 20, top: 470, width: 72 }}
    >
      <div className="relative h-12 w-12 mx-auto">
        {COLORS.map((c, i) => (
          <div
            key={i}
            className="photo-stack-item absolute inset-0 rounded-lg border border-white/60 shadow-sm"
            style={{
              background: c,
              zIndex: COLORS.length - i,
              transform: `rotate(${(i - 1) * 5}deg)`,
            }}
          />
        ))}
      </div>
      <span
        className="mt-1.5 block text-center text-[11px] text-[var(--desktop-text)]"
        style={{ textShadow: '0 1px 3px rgba(0,0,0,0.15)' }}
      >
        Photos
      </span>
    </div>
  )
}

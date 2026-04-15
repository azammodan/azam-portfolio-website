'use client'

import { useEffect, useState } from 'react'
import { useTheme } from '@/lib/theme'
import { useWindowManager } from '@/lib/window-manager'

export default function Menubar() {
  const { toggle, isDark } = useTheme()
  const { openWindow } = useWindowManager()
  const [time, setTime] = useState('')
  const [menuOpen, setMenuOpen] = useState<string | null>(null)

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false }))
    }
    tick()
    const id = setInterval(tick, 10_000)
    return () => clearInterval(id)
  }, [])

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return
    const handler = () => setMenuOpen(null)
    window.addEventListener('click', handler)
    return () => window.removeEventListener('click', handler)
  }, [menuOpen])

  const FILE_ITEMS = [
    { label: 'New Window',    action: () => {} },
    { label: 'Open Works',    action: () => openWindow('works') },
    { label: 'Open Blog',     action: () => openWindow('blog') },
    { label: 'Open Terminal', action: () => openWindow('terminal') },
    { label: '---' },
    { label: 'Close Window',  action: () => {} },
  ]

  const VIEW_ITEMS = [
    { label: 'Toggle Dark Mode', action: toggle },
    { label: '---' },
    { label: 'Open Search',  action: () => openWindow('search') },
    { label: 'Open Settings',action: () => openWindow('settings') },
  ]

  return (
    <div
      className="relative z-50 flex h-7 items-center gap-0 border-b px-3"
      style={{ background: 'var(--desktop-bar)', borderColor: 'var(--desktop-bar-b)' }}
    >
      {/* Logo */}
      <button
        className="mr-3 text-[13px] font-semibold text-[var(--desktop-text)] tracking-tight hover:opacity-70 transition-opacity"
        onClick={() => openWindow('about')}
        style={{ letterSpacing: '-0.02em' }}
      >
        Azam Modan
      </button>

      {/* File menu */}
      <div className="relative">
        <button
          className="flex h-7 items-center px-2 text-xs text-[var(--desktop-muted)] rounded hover:bg-[var(--desktop-hover)] transition-colors"
          onClick={e => { e.stopPropagation(); setMenuOpen(menuOpen === 'file' ? null : 'file') }}
        >
          File
        </button>
        {menuOpen === 'file' && (
          <DropMenu items={FILE_ITEMS} onClose={() => setMenuOpen(null)} />
        )}
      </div>

      {/* View menu */}
      <div className="relative">
        <button
          className="flex h-7 items-center px-2 text-xs text-[var(--desktop-muted)] rounded hover:bg-[var(--desktop-hover)] transition-colors"
          onClick={e => { e.stopPropagation(); setMenuOpen(menuOpen === 'view' ? null : 'view') }}
        >
          View
        </button>
        {menuOpen === 'view' && (
          <DropMenu items={VIEW_ITEMS} onClose={() => setMenuOpen(null)} />
        )}
      </div>

      {/* Right side */}
      <div className="ml-auto flex items-center gap-3">
        {/* Dark toggle */}
        <button
          onClick={toggle}
          className={`relative h-3.5 w-6 rounded-full transition-colors ${isDark ? 'bg-[#444]' : 'bg-[var(--desktop-border2)]'}`}
          aria-label="Toggle dark mode"
        >
          <span className={`absolute top-0.5 h-2.5 w-2.5 rounded-full bg-white shadow-sm transition-transform ${isDark ? 'translate-x-2.5' : 'translate-x-0.5'}`} />
        </button>

        {/* Clock */}
        <span className="text-[11px] text-[var(--desktop-muted)] tabular-nums whitespace-nowrap">
          {time}
        </span>
      </div>
    </div>
  )
}

function DropMenu({ items, onClose }: { items: { label: string; action?: () => void }[], onClose: () => void }) {
  return (
    <div
      className="absolute left-0 top-full mt-0.5 min-w-[170px] rounded-lg border border-[var(--desktop-border)] bg-[var(--desktop-surface)] py-1 shadow-lg z-50"
      style={{ boxShadow: 'var(--win-shadow)' }}
      onClick={e => e.stopPropagation()}
    >
      {items.map((item, i) =>
        item.label === '---' ? (
          <div key={i} className="my-1 border-t border-[var(--desktop-border)]" />
        ) : (
          <button
            key={item.label}
            className="flex w-full items-center px-3 py-1.5 text-xs text-[var(--desktop-text)] hover:bg-[var(--desktop-hover)] transition-colors"
            onClick={() => { item.action?.(); onClose() }}
          >
            {item.label}
          </button>
        )
      )}
    </div>
  )
}

'use client'

import Window from './Window'
import { useTheme } from '@/lib/theme'

const WALLPAPERS = [
  { id: 'warm',  label: 'Warm sand',  color: '#f0ede8' },
  { id: 'slate', label: 'Cool slate', color: '#e8edf0' },
  { id: 'rose',  label: 'Rose dust',  color: '#f0e8ea' },
  { id: 'sage',  label: 'Sage',       color: '#e8ede8' },
]

export default function SettingsWindow() {
  const { isDark, toggle } = useTheme()

  return (
    <Window id="settings" title="Settings">
      <div className="p-5 space-y-5">

        <section>
          <p className="text-[10px] uppercase tracking-widest text-[var(--desktop-subtle)] mb-3">Appearance</p>
          <div className="flex items-center justify-between rounded-lg border border-[var(--desktop-border)] bg-[var(--desktop-bar)] px-4 py-3">
            <div>
              <p className="text-sm font-medium text-[var(--desktop-text)]">Dark mode</p>
              <p className="text-xs text-[var(--desktop-muted)]">Toggle dark / light theme</p>
            </div>
            <button
              onClick={toggle}
              className={`relative h-6 w-11 rounded-full transition-colors ${isDark ? 'bg-[#3a3a3a]' : 'bg-[var(--desktop-border2)]'}`}
              aria-label="Toggle dark mode"
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${isDark ? 'translate-x-5' : 'translate-x-0.5'}`}
              />
            </button>
          </div>
        </section>

        <section>
          <p className="text-[10px] uppercase tracking-widest text-[var(--desktop-subtle)] mb-3">Wallpaper</p>
          <div className="grid grid-cols-4 gap-2">
            {WALLPAPERS.map(w => (
              <div
                key={w.id}
                className="group flex flex-col items-center gap-1.5 cursor-pointer"
              >
                <div
                  className="h-12 w-full rounded-lg border-2 border-transparent group-hover:border-[var(--desktop-border2)] transition-colors"
                  style={{ background: w.color }}
                />
                <span className="text-[10px] text-[var(--desktop-subtle)]">{w.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <p className="text-[10px] uppercase tracking-widest text-[var(--desktop-subtle)] mb-3">Keyboard shortcuts</p>
          <div className="space-y-1.5 text-xs text-[var(--desktop-muted)]">
            {[
              ['⌘ K',       'Open search'],
              ['⌘ D',       'Toggle dark mode'],
              ['⌘ W',       'Close focused window'],
              ['⌘ .',       'Open terminal'],
              ['Esc',        'Close search / spotlight'],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between">
                <span>{v}</span>
                <kbd className="rounded border border-[var(--desktop-border)] bg-[var(--desktop-bar)] px-1.5 py-0.5 text-[10px] font-mono">{k}</kbd>
              </div>
            ))}
          </div>
        </section>

      </div>
    </Window>
  )
}

'use client'

import Window from './Window'
import { useTheme } from '@/lib/theme'

const WALLPAPERS = [
  { id: 'warm',  label: 'Warm purple', color: '#1e1433' },
  { id: 'slate', label: 'Slate',      color: '#2a2a2a' },
  { id: 'rose',  label: 'Rose dust',   color: '#3a2a2f' },
  { id: 'sage',  label: 'Sage',        color: '#2a3a2a' },
  { id: 'navy',  label: 'Navy',        color: '#1a2a3a' },
]

const COLOR_SCHEMES = [
  { id: 'purple', label: 'Purple', color: '#7c3aed' },
  { id: 'brown', label: 'Brown/Gold', color: '#8b7355' },
  { id: 'ocean', label: 'Ocean', color: '#2c5aa0' },
  { id: 'forest', label: 'Forest', color: '#2d5016' },
  { id: 'sunset', label: 'Sunset', color: '#c84c1a' },
]

export default function SettingsWindow() {
  const { isDark, toggle, colorScheme, setColorScheme, wallpaper, setWallpaper } = useTheme()

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
          <p className="text-[10px] uppercase tracking-widest text-[var(--desktop-subtle)] mb-3">Window Color Scheme</p>
          <div className="grid grid-cols-5 gap-2">
            {COLOR_SCHEMES.map(scheme => (
              <button
                key={scheme.id}
                onClick={() => setColorScheme(scheme.id as any)}
                className={`flex flex-col items-center gap-1.5 cursor-pointer rounded-lg p-2 transition-all ${
                  colorScheme === scheme.id
                    ? 'border-2 border-[var(--desktop-border2)] bg-[var(--desktop-bar)]'
                    : 'border-2 border-transparent hover:border-[var(--desktop-border)]'
                }`}
              >
                <div
                  className="h-8 w-full rounded border border-[var(--desktop-border)]"
                  style={{ background: scheme.color }}
                />
                <span className="text-[10px] text-[var(--desktop-muted)] text-center">{scheme.label}</span>
              </button>
            ))}
          </div>
        </section>

        <section>
          <p className="text-[10px] uppercase tracking-widest text-[var(--desktop-subtle)] mb-3">Background</p>
          <div className="grid grid-cols-5 gap-2">
            {WALLPAPERS.map(w => (
              <button
                key={w.id}
                onClick={() => setWallpaper(w.color)}
                className={`flex flex-col items-center gap-1.5 cursor-pointer rounded-lg p-2 transition-all ${
                  wallpaper === w.color
                    ? 'border-2 border-[var(--desktop-border2)] bg-[var(--desktop-bar)]'
                    : 'border-2 border-transparent hover:border-[var(--desktop-border)]'
                }`}
              >
                <div
                  className="h-8 w-full rounded border border-[var(--desktop-border)]"
                  style={{ background: w.color }}
                />
                <span className="text-[10px] text-[var(--desktop-muted)] text-center">{w.label}</span>
              </button>
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

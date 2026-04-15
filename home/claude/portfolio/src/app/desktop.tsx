'use client'

import Menubar from '@/components/desktop/Menubar'
import DesktopIcons from '@/components/desktop/DesktopIcons'
import Dock from '@/components/dock/Dock'
import AboutWindow from '@/components/windows/AboutWindow'
import WorksWindow from '@/components/windows/WorksWindow'
import BlogWindow from '@/components/windows/BlogWindow'
import ContactWindow from '@/components/windows/ContactWindow'
import TerminalWindow from '@/components/windows/TerminalWindow'
import SettingsWindow from '@/components/windows/SettingsWindow'
import SearchWindow from '@/components/windows/SearchWindow'
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts'

export default function Desktop() {
  useKeyboardShortcuts()

  return (
    <div className="flex h-screen flex-col overflow-hidden" style={{ background: 'var(--desktop-bg)' }}>
      {/* ── Menubar ── */}
      <Menubar />

      {/* ── Desktop area ── */}
      <div className="relative flex-1 overflow-hidden">
        {/* Wallpaper hint text — like Wes's mascot area */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          aria-hidden
        >
          <span
            className="text-[120px] select-none opacity-[0.04] dark:opacity-[0.06]"
            style={{ userSelect: 'none' }}
          >
            {'{ }'}
          </span>
        </div>

        {/* Desktop icons */}
        <DesktopIcons />

        {/* Double-click hint */}
        <p
          className="pointer-events-none absolute bottom-20 right-6 text-[11px] text-[var(--desktop-subtle)] opacity-60 select-none"
          aria-hidden
        >
          double-click icons to open · drag windows to move
        </p>

        {/* ── Windows ── */}
        <AboutWindow />
        <WorksWindow />
        <BlogWindow />
        <ContactWindow />
        <TerminalWindow />
        <SettingsWindow />
        <SearchWindow />
      </div>

      {/* ── Dock ── */}
      <Dock />
    </div>
  )
}

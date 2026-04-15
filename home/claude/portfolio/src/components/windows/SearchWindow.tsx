'use client'

import { useEffect, useRef, useState } from 'react'
import Window from './Window'
import { PROJECTS, POSTS, PERSON } from '@/lib/data'
import { useWindowManager } from '@/lib/window-manager'
import type { WindowId } from '@/types'

interface Result {
  id: string
  label: string
  sub: string
  windowId?: WindowId
  emoji: string
}

const ALL_RESULTS: Result[] = [
  { id: 'about',    label: 'About',       sub: 'Who I am & my stack',    windowId: 'about',    emoji: '👤' },
  { id: 'works',    label: 'Works',       sub: 'Selected projects',       windowId: 'works',    emoji: '💼' },
  { id: 'blog',     label: 'Blog',        sub: 'Technical writing',       windowId: 'blog',     emoji: '📝' },
  { id: 'contact',  label: 'Contact',     sub: 'Get in touch',            windowId: 'contact',  emoji: '✉️' },
  { id: 'terminal', label: 'Terminal',    sub: 'Command line interface',  windowId: 'terminal', emoji: '🖥' },
  { id: 'settings', label: 'Settings',   sub: 'Appearance & shortcuts',  windowId: 'settings', emoji: '⚙️' },
  ...PROJECTS.map(p => ({
    id: p.id, label: p.name, sub: p.tech.join(' · '), windowId: 'works' as WindowId, emoji: p.emoji
  })),
  ...POSTS.map(p => ({
    id: p.slug, label: p.title, sub: `${p.date} · ${p.readTime}`, windowId: 'blog' as WindowId, emoji: '📄'
  })),
]

export default function SearchWindow() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const { openWindow, closeWindow } = useWindowManager()
  const inputRef = useRef<HTMLInputElement>(null)

  const results = query.trim()
    ? ALL_RESULTS.filter(r =>
        r.label.toLowerCase().includes(query.toLowerCase()) ||
        r.sub.toLowerCase().includes(query.toLowerCase())
      )
    : ALL_RESULTS.slice(0, 6)

  useEffect(() => { setSelected(0) }, [query])
  useEffect(() => { inputRef.current?.focus() }, [])

  const open = (r: Result) => {
    if (r.windowId) openWindow(r.windowId)
    closeWindow('search')
  }

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(s => Math.min(s + 1, results.length - 1)) }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)) }
    if (e.key === 'Enter' && results[selected]) open(results[selected])
    if (e.key === 'Escape') closeWindow('search')
  }

  return (
    <Window id="search" title="Search">
      <div className="flex flex-col h-full" onKeyDown={onKey}>
        {/* Search input */}
        <div className="flex items-center gap-2 border-b border-[var(--desktop-border)] px-4 py-3">
          <span className="text-[var(--desktop-muted)] text-sm">🔍</span>
          <input
            ref={inputRef}
            className="flex-1 bg-transparent text-sm text-[var(--desktop-text)] placeholder-[var(--desktop-subtle)] outline-none"
            placeholder="Search anything…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoComplete="off"
            spellCheck={false}
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-xs text-[var(--desktop-subtle)] hover:text-[var(--desktop-muted)]">✕</button>
          )}
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-2">
          {results.length === 0 ? (
            <div className="py-8 text-center text-sm text-[var(--desktop-subtle)]">No results for "{query}"</div>
          ) : (
            results.map((r, i) => (
              <div
                key={r.id}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 cursor-pointer transition-colors ${i === selected ? 'bg-[var(--desktop-hover)] border border-[var(--desktop-border)]' : 'hover:bg-[var(--desktop-hover)]'}`}
                onClick={() => open(r)}
                onMouseEnter={() => setSelected(i)}
              >
                <span className="text-base w-6 text-center flex-shrink-0">{r.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-[var(--desktop-text)] truncate">{r.label}</div>
                  <div className="text-[10px] text-[var(--desktop-subtle)] truncate">{r.sub}</div>
                </div>
                {i === selected && <span className="text-[10px] text-[var(--desktop-subtle)] flex-shrink-0">↵</span>}
              </div>
            ))
          )}
        </div>

        {/* Footer hint */}
        <div className="border-t border-[var(--desktop-border)] px-4 py-2 flex gap-4 text-[10px] text-[var(--desktop-subtle)]">
          <span>↑↓ navigate</span>
          <span>↵ open</span>
          <span>esc close</span>
        </div>
      </div>
    </Window>
  )
}

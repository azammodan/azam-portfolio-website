'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Window from './Window'
import { TERMINAL_COMMANDS } from '@/lib/data'

interface Line {
  type: 'input' | 'output' | 'error'
  text: string
}

const INITIAL: Line[] = [
  { type: 'output', text: '╔════════════════════════════════╗' },
  { type: 'output', text: '║  yourname.sh — portfolio v1.0  ║' },
  { type: 'output', text: '╚════════════════════════════════╝' },
  { type: 'output', text: '' },
  { type: 'output', text: 'Type `help` to see available commands.' },
  { type: 'output', text: '' },
]

export default function TerminalWindow() {
  const [lines, setLines] = useState<Line[]>(INITIAL)
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [histIdx, setHistIdx] = useState(-1)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines])

  const run = useCallback((raw: string) => {
    const trimmed = raw.trim()
    if (!trimmed) return

    setHistory(h => [trimmed, ...h])
    setHistIdx(-1)

    const [cmd, ...args] = trimmed.toLowerCase().split(/\s+/)
    const add = (text: string, type: Line['type'] = 'output') =>
      setLines(l => [...l, { type, text }])

    add(`~ ${trimmed}`, 'input')

    // Check full command first (e.g. "ls -a"), then base cmd
    const handler = TERMINAL_COMMANDS[trimmed] ?? TERMINAL_COMMANDS[cmd]

    if (handler === '__clear__' || trimmed === 'clear') {
      setLines(INITIAL)
      return
    }
    if (handler === undefined) {
      add(`command not found: ${cmd}`, 'error')
      return
    }
    if (typeof handler === 'function') {
      const result = handler(args)
      result.split('\n').forEach(l => add(l))
    } else {
      handler.split('\n').forEach(l => add(l))
    }
    add('')
  }, [])

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      run(input)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const next = Math.min(histIdx + 1, history.length - 1)
      setHistIdx(next)
      setInput(history[next] ?? '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = Math.max(histIdx - 1, -1)
      setHistIdx(next)
      setInput(next === -1 ? '' : history[next])
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault()
      setLines(INITIAL)
    }
  }

  return (
    <Window id="terminal" title="Terminal">
      <div
        className="flex h-full flex-col bg-[#161514] p-3 font-mono text-xs text-[#d0ccc8] cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((l, i) => (
          <div
            key={i}
            className={
              l.type === 'input' ? 'text-[#7ec8a0]' :
              l.type === 'error' ? 'text-[#f87171]' :
              'text-[#8a8278]'
            }
            style={{ lineHeight: '1.6', whiteSpace: 'pre-wrap', fontFamily: "'JetBrains Mono', monospace" }}
          >
            {l.text || '\u00A0'}
          </div>
        ))}

        <div className="flex items-center gap-1 mt-1">
          <span className="text-[#7ec8a0] flex-shrink-0" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            ~&nbsp;
          </span>
          <input
            ref={inputRef}
            className="terminal-input flex-1"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            autoFocus
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            placeholder=""
            aria-label="Terminal input"
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </Window>
  )
}

'use client'

import { useEffect } from 'react'
import { useWindowManager } from '@/lib/window-manager'
import { useTheme } from '@/lib/theme'

export function useKeyboardShortcuts() {
  const { openWindow } = useWindowManager()
  const { toggle } = useTheme()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey

      // ⌘K — search / spotlight
      if (mod && e.key === 'k') {
        e.preventDefault()
        openWindow('search')
      }

      // ⌘D — toggle dark mode
      if (mod && e.key === 'd') {
        e.preventDefault()
        toggle()
      }

      // ⌘. — terminal
      if (mod && e.key === '.') {
        e.preventDefault()
        openWindow('terminal')
      }

      // ⌘, — settings
      if (mod && e.key === ',') {
        e.preventDefault()
        openWindow('settings')
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [openWindow, toggle])
}

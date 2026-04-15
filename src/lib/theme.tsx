'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'
type ColorScheme = 'purple' | 'brown' | 'ocean' | 'forest' | 'sunset'

interface ThemeCtx {
  theme: Theme
  toggle: () => void
  isDark: boolean
  colorScheme: ColorScheme
  setColorScheme: (scheme: ColorScheme) => void
  wallpaper: string
  setWallpaper: (wallpaper: string) => void
}

const Ctx = createContext<ThemeCtx | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  const [colorScheme, setColorSchemeState] = useState<ColorScheme>('purple')
  const [wallpaper, setWallpaperState] = useState<string>('#1e1433')

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as Theme | null
    const storedScheme = localStorage.getItem('colorScheme') as ColorScheme | null
    const storedWallpaper = localStorage.getItem('wallpaper') as string | null

    const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const initial = storedTheme ?? preferred
    
    setTheme(initial)
    document.documentElement.classList.toggle('dark', initial === 'dark')
    
    if (storedScheme) {
      setColorSchemeState(storedScheme)
      document.documentElement.setAttribute('data-color-scheme', storedScheme)
    }
    
    if (storedWallpaper) {
      setWallpaperState(storedWallpaper)
      document.documentElement.style.setProperty('--desktop-bg', storedWallpaper)
    }
  }, [])

  const toggle = () => {
    setTheme(prev => {
      const next = prev === 'light' ? 'dark' : 'light'
      document.documentElement.classList.toggle('dark', next === 'dark')
      localStorage.setItem('theme', next)
      return next
    })
  }

  const setColorScheme = (scheme: ColorScheme) => {
    setColorSchemeState(scheme)
    document.documentElement.setAttribute('data-color-scheme', scheme)
    localStorage.setItem('colorScheme', scheme)
  }

  const setWallpaper = (color: string) => {
    setWallpaperState(color)
    document.documentElement.style.setProperty('--desktop-bg', color)
    localStorage.setItem('wallpaper', color)
  }

  return (
    <Ctx.Provider value={{ theme, toggle, isDark: theme === 'dark', colorScheme, setColorScheme, wallpaper, setWallpaper }}>
      {children}
    </Ctx.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useTheme must be inside ThemeProvider')
  return ctx
}

export type WindowId = 'about' | 'works' | 'terminal' | 'contact' | 'blog' | 'settings' | 'search'

export interface WindowState {
  id: WindowId
  isOpen: boolean
  isMinimized: boolean
  zIndex: number
  position: { x: number; y: number }
  size: { width: number; height: number }
}

export interface Project {
  id: string
  name: string
  description: string
  tech: string[]
  year: number
  color: string
  emoji: string
  link?: string
}

export interface DockApp {
  id: WindowId
  label: string
  icon: string
}

export interface DesktopIcon {
  id: string
  label: string
  type: 'folder' | 'file' | 'app'
  windowId?: WindowId
  color?: string
  position: { x: number; y: number }
}

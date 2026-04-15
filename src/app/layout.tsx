import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/lib/theme'
import { WindowManagerProvider } from '@/lib/window-manager'

export const metadata: Metadata = {
  title: 'Your Name | Portfolio',
  description: 'Full stack developer portfolio',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <WindowManagerProvider>
            {children}
          </WindowManagerProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

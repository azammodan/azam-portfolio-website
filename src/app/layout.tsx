import type { Metadata } from 'next'
import './globals.css'
export const metadata: Metadata = {
  title: 'Azam Modan | Beneath the Surface',
  description: 'Cybersecurity, digital forensics, IT, and game development. Explore the work of Azam Modan, a USC Intelligence and Cyber Operations student.',
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>
}

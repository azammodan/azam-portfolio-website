import type { Project, DockApp, DesktopIcon } from '@/types'

// ─── PERSONAL INFO ───────────────────────────────────────────────
export const PERSON = {
  name: 'Azam Modan',
  role: 'Cybersecurity & IT Professional',
  location: 'Los Angeles, CA',
  bio: 'USC student studying Intelligence and Cyber Operations. Passionate about digital forensics, penetration testing, and IT infrastructure. Currently IT Worker at USC Ostrow supporting 500+ dental students and faculty. Active in CTF competitions and cybersecurity leadership.',
  email: 'azammodan101@gmail.com',
  phone: '415-463-9565',
  github: 'github.com/azammodan',
  linkedin: 'linkedin.com/in/azammodan',
  twitter: '@azammodan',
  resume: '/resume.pdf',
  skills: ['Python', 'C#/C++', 'JavaScript', 'Kali Linux', 'Penetration Testing', 'Digital Forensics', 'Wireshark', 'Metasploit', 'EnCase', 'Active Directory', 'Windows Administration', 'OSINT', 'Networking'],
}

// ─── PROJECTS ────────────────────────────────────────────────────
export const PROJECTS: Project[] = [
  {
    id: 'neuromancer',
    name: 'Neuromancer',
    description: 'Open Alpha USC game development project. Immersive cyberpunk experience built with collaborative game design.',
    tech: ['Game Development', 'Unreal Engine'],
    year: 2025,
    color: '#dbeafe',
    emoji: '🎮',
  },
  {
    id: 'openYourBrowser',
    name: 'Open Your Browser',
    description: 'Open Alpha USC game project. Interactive browser-based gaming experience.',
    tech: ['Web Development', 'Game Design'],
    year: 2025,
    color: '#fce7f3',
    emoji: '🌐',
  },
  {
    id: 'smoothTalkingPickpocket',
    name: 'Smooth Talking Pickpocket',
    description: 'Open Alpha USC game project. Engaging stealth-based gameplay with strategic pickpocketing mechanics.',
    tech: ['Game Development', 'Gameplay Design'],
    year: 2025,
    color: '#dcfce7',
    emoji: '🎯',
  },
  {
    id: 'forensicCaseReport',
    name: 'Forensic Case Report',
    description: 'Full forensic analysis of Windows system using EnCase, Autopsy, and FTK Imager. Conducted artifact triage, timeline reconstruction, and produced 30+ page professional report with evidence validation.',
    tech: ['EnCase', 'Autopsy', 'FTK Imager', 'Digital Forensics'],
    year: 2025,
    color: '#fef9c3',
    emoji: '🔍',
  },
  {
    id: 'penetrationTesting',
    name: 'C&M Penetration Testing Report',
    description: 'Internal penetration testing on vulnerable Windows systems using Nmap and Metasploit. Exploited critical vulnerabilities including EternalBlue and MS08-067, gained SYSTEM-level access, produced 10+ page professional report.',
    tech: ['Metasploit', 'Nmap', 'Kali Linux', 'Penetration Testing'],
    year: 2025,
    color: '#ede9fe',
    emoji: '⚔️',
  },
]

// ─── BLOG POSTS ──────────────────────────────────────────────────
export const POSTS = [
  { slug: 'gsap-scroll-secrets', title: 'GSAP scroll secrets I wish I knew earlier', date: 'Mar 2025', readTime: '6 min' },
  { slug: 'next15-ppr', title: 'Partial pre-rendering in Next.js 15 — a real-world test', date: 'Jan 2025', readTime: '8 min' },
  { slug: 'webgl-from-zero', title: 'WebGL from zero: writing your first vertex shader', date: 'Nov 2024', readTime: '12 min' },
  { slug: 'ts-patterns', title: 'Five TypeScript patterns that changed how I write code', date: 'Sep 2024', readTime: '7 min' },
]

// ─── DOCK ────────────────────────────────────────────────────────
export const DOCK_APPS: DockApp[] = [
  { id: 'about',    label: 'About',    icon: '👤' },
  { id: 'works',    label: 'Works',    icon: '💼' },
  { id: 'blog',     label: 'Blog',     icon: '📝' },
  { id: 'contact',  label: 'Contact',  icon: '✉️' },
  { id: 'terminal', label: 'Terminal', icon: '🖥' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
  { id: 'search',   label: 'Search',   icon: '🔍' },
]

// ─── DESKTOP ICONS ───────────────────────────────────────────────
export const DESKTOP_ICONS: DesktopIcon[] = [
  { id: 'about-file',  label: 'about.txt',     type: 'file',   windowId: 'about',   color: '#90b8e8', position: { x: 20, y: 20  } },
  { id: 'works-folder',label: 'Works',          type: 'folder', windowId: 'works',   color: '#a0c890', position: { x: 20, y: 110 } },
  { id: 'blog-folder', label: 'Blog',           type: 'folder', windowId: 'blog',    color: '#c8a0d0', position: { x: 20, y: 200 } },
  { id: 'photos',      label: 'Photos',         type: 'folder', windowId: undefined, color: '#e8b090', position: { x: 20, y: 290 } },
  { id: 'terminal-app',label: 'Terminal',       type: 'app',    windowId: 'terminal',color: '#1a1a1a', position: { x: 20, y: 380 } },
]

// ─── TERMINAL COMMANDS ───────────────────────────────────────────
export const TERMINAL_COMMANDS: Record<string, string | ((args: string[]) => string)> = {
  help:    '📖 commands: whoami · ls · open <app> · skills · contact · theme · clear · date',
  whoami:  `${PERSON.name} — ${PERSON.role}, ${PERSON.location}`,
  date:    () => new Date().toUTCString(),
  ls:      'about.txt    works/    blog/    contact.txt    resume.pdf    .secrets',
  'ls -a': 'about.txt    works/    blog/    contact.txt    resume.pdf    .secrets    .env.local',
  '.secrets': '🔒 nice try.',
  skills:  PERSON.skills.join(' · '),
  contact: `email: ${PERSON.email}\ngithub: ${PERSON.github}\nlinkedin: ${PERSON.linkedin}`,
  open: (args) => {
    const targets: Record<string, string> = {
      about: 'Opening About…', works: 'Opening Works…', blog: 'Opening Blog…',
      contact: 'Opening Contact…', settings: 'Opening Settings…',
    }
    return targets[args[0]] ?? `open: no such app — "${args[0]}"`
  },
  theme: 'Use the toggle in the menubar or ⌘D to switch themes.',
  clear: '__clear__',
  pwd:   '/Users/yourname/portfolio',
  echo:  (args) => args.join(' '),
  sudo:  () => '❌ nice try. you are not in the sudoers file.',
}

import type { Project, DockApp, DesktopIcon } from '@/types'

// ─── PERSONAL INFO ───────────────────────────────────────────────
export const PERSON = {
  name: 'Your Name',
  role: 'Full Stack Developer',
  location: 'Los Angeles, CA',
  bio: 'I build fast, interactive web experiences with a focus on creative UI, clean code, and real performance. Currently open to new opportunities.',
  email: 'hello@yourname.com',
  github: 'github.com/yourname',
  linkedin: 'linkedin.com/in/yourname',
  twitter: '@yourhandle',
  resume: '/resume.pdf',
  skills: ['React', 'Next.js', 'TypeScript', 'Node.js', 'GSAP', 'Three.js', 'PostgreSQL', 'Tailwind', 'Cloudflare', 'Vercel'],
}

// ─── PROJECTS ────────────────────────────────────────────────────
export const PROJECTS: Project[] = [
  {
    id: 'datavault',
    name: 'Datavault',
    description: 'Real-time dashboard for monitoring distributed systems. Custom D3 visualisations, live websocket feeds, and role-based access.',
    tech: ['React', 'D3', 'Node.js', 'PostgreSQL', 'WebSockets'],
    year: 2024,
    color: '#dbeafe',
    emoji: '🗄',
  },
  {
    id: 'arclight',
    name: 'ArcLight',
    description: 'Physically-based renderer built from scratch in Three.js with custom GLSL shaders and real-time IBL.',
    tech: ['Three.js', 'GLSL', 'WebGL', 'React'],
    year: 2024,
    color: '#fce7f3',
    emoji: '💡',
  },
  {
    id: 'synthwave',
    name: 'Synthwave',
    description: 'Generative music app that composes lofi beats using the Web Audio API and a small ML model trained on MIDI data.',
    tech: ['Web Audio API', 'React', 'TensorFlow.js'],
    year: 2023,
    color: '#dcfce7',
    emoji: '🎵',
  },
  {
    id: 'codemap',
    name: 'Codemap',
    description: 'Visual codebase explorer that renders interactive dependency graphs. Supports mono-repos and cross-package linking.',
    tech: ['TypeScript', 'D3', 'Electron', 'Node.js'],
    year: 2023,
    color: '#fef9c3',
    emoji: '🗺',
  },
  {
    id: 'neontype',
    name: 'NeonType',
    description: 'AI-powered font pairing tool. Paste any text, get curated typeface combinations with live previews and CSS export.',
    tech: ['Next.js', 'OpenAI API', 'Vercel'],
    year: 2022,
    color: '#ede9fe',
    emoji: '✏️',
  },
  {
    id: 'formforge',
    name: 'FormForge',
    description: 'Headless, zero-dependency component library for accessible forms. 40+ components, full ARIA support, Radix primitives.',
    tech: ['TypeScript', 'Radix UI', 'Rollup'],
    year: 2022,
    color: '#ffedd5',
    emoji: '⚙️',
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

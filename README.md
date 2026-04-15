# OS Portfolio

A macOS-style desktop portfolio inspired by [Wes Dieleman](https://wesdieleman.com).
Built with **Next.js 14 · React 18 · TypeScript · Tailwind CSS**.

---

## Quick start

```bash
# 1. Install
npm install

# 2. Dev server
npm run dev

# 3. Open
open http://localhost:3000
```

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout + providers
│   ├── page.tsx            # Entry point (loads desktop)
│   ├── desktop.tsx         # Main desktop composition
│   └── globals.css         # CSS variables + global styles
│
├── components/
│   ├── desktop/
│   │   ├── Menubar.tsx     # Top bar (File/View menus, clock, dark toggle)
│   │   └── DesktopIcons.tsx# Folder/file icons + photo stack
│   ├── dock/
│   │   └── Dock.tsx        # Bottom dock with magnification
│   └── windows/
│       ├── Window.tsx      # Reusable draggable window shell ← core
│       ├── AboutWindow.tsx
│       ├── WorksWindow.tsx
│       ├── BlogWindow.tsx
│       ├── ContactWindow.tsx
│       ├── TerminalWindow.tsx
│       ├── SettingsWindow.tsx
│       ├── SearchWindow.tsx
│       └── BlogWindow.tsx
│
├── hooks/
│   └── useKeyboardShortcuts.ts
│
├── lib/
│   ├── window-manager.tsx  # Window state management
│   ├── theme.tsx           # Dark/light theme provider
│   └── data.ts             # Static data (projects, etc.)
│
└── types/
    └── index.ts           # TypeScript definitions
```

---

## Features

- **Desktop Environment**: Full macOS-style desktop with windows, dock, and menubar
- **Window Management**: Draggable, resizable windows with z-index stacking
- **Dark/Light Mode**: System-aware theme switching
- **Keyboard Shortcuts**: Cmd+Tab window switching, Cmd+W to close
- **Responsive Design**: Adapts to different screen sizes
- **Performance**: Optimized with Next.js 14 and React 18 features

---

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Custom SVG icons
- **Fonts**: SF Pro Display (macOS system font)

---

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

---

## Deployment

Deploy to Vercel, Netlify, or any static hosting service:

```bash
npm run build
```

The build output is in the `out/` directory.

---

## License

MIT
│   └── useKeyboardShortcuts.ts   # ⌘K search · ⌘D dark · ⌘. terminal
│
├── lib/
│   ├── data.ts             # ★ ALL your content lives here
│   ├── window-manager.tsx  # Window state (open/close/drag/z-index)
│   └── theme.tsx           # Dark/light mode context
│
└── types/
    └── index.ts            # Shared TypeScript types
```

---

## Customise your content

**Everything you need to change is in one file: `src/lib/data.ts`**

```ts
export const PERSON = {
  name: 'Your Name',
  role: 'Full Stack Developer',
  location: 'Los Angeles, CA',
  bio: 'Your bio here...',
  email: 'hello@yourname.com',
  // ...
}

export const PROJECTS: Project[] = [
  {
    name: 'My Project',
    description: '...',
    tech: ['React', 'Node'],
    year: 2024,
    color: '#dbeafe',   // thumbnail background
    emoji: '🚀',
  },
  // ...
]
```

---

## Theming

All colours live in `src/app/globals.css` as CSS variables:

```css
:root {
  --desktop-bg:      #f0ede8;   /* Desktop wallpaper colour */
  --desktop-surface: #ffffff;   /* Window background */
  --desktop-border:  #d8d3cc;   /* Borders */
  --desktop-text:    #1a1a1a;   /* Primary text */
  --desktop-muted:   #6b6560;   /* Secondary text */
  /* ... */
}

:root.dark {
  --desktop-bg:      #161514;
  /* ... */
}
```

---

## Keyboard shortcuts

| Shortcut | Action |
|----------|--------|
| `⌘ K`   | Open search / spotlight |
| `⌘ D`   | Toggle dark mode |
| `⌘ .`   | Open terminal |
| `⌘ ,`   | Open settings |

---

## Adding a new window

1. Create `src/components/windows/MyWindow.tsx`:

```tsx
import Window from './Window'

export default function MyWindow() {
  return (
    <Window id="mywindow" title="My Window">
      <div className="p-6">Your content here</div>
    </Window>
  )
}
```

2. Add `'mywindow'` to the `WindowId` union in `src/types/index.ts`

3. Add default size + position in `src/lib/window-manager.tsx`

4. Add to `DOCK_APPS` in `src/lib/data.ts`

5. Import and render in `src/app/desktop.tsx`

---

## Deploying to Vercel

```bash
npx vercel --prod
```

No config needed — Next.js on Vercel just works.

---

## Next steps to reach Wes-level polish

- [ ] Add GSAP for window open/close animations (scale from dock icon)
- [ ] Add `framer-motion` `AnimatePresence` for smoother window transitions  
- [ ] Build per-project detail windows (click a work → opens its own window)
- [ ] Add a real blog with MDX (`next-mdx-remote`)
- [ ] Implement wallpaper switcher in Settings (already has the UI)
- [ ] Add a custom SVG mascot/illustration to the desktop bg
- [ ] Mobile fallback — detect small screens, show a simplified layout
- [ ] Add `og:image` and meta tags for social sharing

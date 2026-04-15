import Window from './Window'
import { PERSON } from '@/lib/data'

const links = [
  { icon: '✉', label: 'Email',    value: PERSON.email    },
  { icon: '⌥', label: 'GitHub',   value: PERSON.github   },
  { icon: '◈', label: 'LinkedIn', value: PERSON.linkedin  },
  { icon: '↗', label: 'Resume',   value: 'yourname.com/resume' },
]

export default function ContactWindow() {
  return (
    <Window id="contact" title="Contact">
      <div className="p-6 space-y-1">
        <p className="text-[10px] uppercase tracking-widest text-[var(--desktop-subtle)] mb-4">
          Get in touch
        </p>
        {links.map(l => (
          <div
            key={l.label}
            className="group flex items-center gap-3 rounded-lg px-3 py-2.5 cursor-pointer transition-colors hover:bg-[var(--desktop-hover)]"
          >
            <span className="text-base w-5 flex-shrink-0 text-center">{l.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] text-[var(--desktop-subtle)] mb-0.5">{l.label}</div>
              <div className="text-xs text-[var(--desktop-text)] truncate">{l.value}</div>
            </div>
            <span className="text-[var(--desktop-subtle)] text-xs opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
          </div>
        ))}
      </div>
    </Window>
  )
}

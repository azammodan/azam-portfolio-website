import Window from './Window'
import { PERSON } from '@/lib/data'

export default function AboutWindow() {
  return (
    <Window id="about" title="about.txt">
      <div className="p-6">
        <h1 className="text-xl font-semibold tracking-tight text-[var(--desktop-text)]" style={{ letterSpacing: '-0.03em' }}>
          {PERSON.name}
        </h1>
        <p className="mt-1 text-xs tracking-wide text-[var(--desktop-muted)]" style={{ letterSpacing: '0.04em' }}>
          {PERSON.role} · {PERSON.location}
        </p>

        <p className="mt-4 text-sm leading-relaxed text-[var(--desktop-muted)]">
          {PERSON.bio}
        </p>

        <div className="mt-5">
          <p className="mb-2 text-[10px] font-medium uppercase tracking-widest text-[var(--desktop-subtle)]">Stack</p>
          <div className="flex flex-wrap gap-1.5">
            {PERSON.skills.map(skill => (
              <span
                key={skill}
                className="rounded px-2 py-0.5 text-xs text-[var(--desktop-muted)] border border-[var(--desktop-border)] bg-[var(--desktop-bar)]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-5 border-t border-[var(--desktop-border)] pt-4 text-xs text-[var(--desktop-muted)] leading-7">
          <div>✉ &nbsp;{PERSON.email}</div>
          <div>⌥ &nbsp;{PERSON.github}</div>
          <div>◈ &nbsp;{PERSON.linkedin}</div>
        </div>
      </div>
    </Window>
  )
}

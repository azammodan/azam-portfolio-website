import Window from './Window'
import { PROJECTS } from '@/lib/data'

export default function WorksWindow() {
  return (
    <Window id="works" title="Works">
      <div className="p-3 space-y-2">
        {PROJECTS.map((p, i) => (
          <div
            key={p.id}
            className="group flex items-start gap-3 rounded-lg border border-[var(--desktop-border)] p-3 cursor-pointer transition-colors hover:bg-[var(--desktop-hover)] hover:border-[var(--desktop-border2)]"
          >
            {/* Thumbnail */}
            <div
              className="flex h-10 w-12 flex-shrink-0 items-center justify-center rounded-md text-xl"
              style={{ background: p.color }}
            >
              {p.emoji}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-medium text-[var(--desktop-text)]">{p.name}</span>
                <span className="text-[10px] text-[var(--desktop-subtle)]">{p.year}</span>
              </div>
              <p className="mt-0.5 text-xs leading-relaxed text-[var(--desktop-muted)] line-clamp-2">
                {p.description}
              </p>
              <div className="mt-1.5 flex flex-wrap gap-1">
                {p.tech.slice(0, 3).map(t => (
                  <span key={t} className="text-[10px] text-[var(--desktop-subtle)] bg-[var(--desktop-bar)] border border-[var(--desktop-border)] px-1.5 py-0.5 rounded">
                    {t}
                  </span>
                ))}
                {p.tech.length > 3 && (
                  <span className="text-[10px] text-[var(--desktop-subtle)]">+{p.tech.length - 3}</span>
                )}
              </div>
            </div>

            {/* Arrow */}
            <span className="text-[var(--desktop-subtle)] text-xs opacity-0 group-hover:opacity-100 transition-opacity mt-1 flex-shrink-0">
              ↗
            </span>
          </div>
        ))}
      </div>
    </Window>
  )
}

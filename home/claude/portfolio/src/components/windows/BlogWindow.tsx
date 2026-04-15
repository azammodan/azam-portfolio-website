import Window from './Window'
import { POSTS } from '@/lib/data'

export default function BlogWindow() {
  return (
    <Window id="blog" title="Blog">
      <div className="p-3 space-y-1.5">
        {POSTS.map(post => (
          <div
            key={post.slug}
            className="group flex items-start justify-between gap-3 rounded-lg border border-[var(--desktop-border)] px-4 py-3 cursor-pointer transition-colors hover:bg-[var(--desktop-hover)] hover:border-[var(--desktop-border2)]"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[var(--desktop-text)] leading-snug group-hover:text-[var(--desktop-text)]">
                {post.title}
              </p>
              <p className="mt-0.5 text-[10px] text-[var(--desktop-subtle)]">
                {post.date} · {post.readTime} read
              </p>
            </div>
            <span className="text-[var(--desktop-subtle)] text-xs opacity-0 group-hover:opacity-100 transition-opacity mt-0.5 flex-shrink-0">↗</span>
          </div>
        ))}
      </div>
    </Window>
  )
}

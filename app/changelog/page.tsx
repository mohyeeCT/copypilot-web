'use client'
import { useState } from 'react'
import { changelog } from './data'
import type { ChangeType } from './data'

const typeStyles: Record<ChangeType, { label: string; color: string; bg: string; border: string }> = {
  feature:     { label: 'Feature',     color: '#00c9a7', bg: 'rgba(0,201,167,0.08)',   border: 'rgba(0,201,167,0.2)' },
  fix:         { label: 'Fix',         color: '#f97316', bg: 'rgba(249,115,22,0.08)',  border: 'rgba(249,115,22,0.2)' },
  improvement: { label: 'Improvement', color: '#818cf8', bg: 'rgba(129,140,248,0.08)', border: 'rgba(129,140,248,0.2)' },
}

const toolStyles: Record<string, { color: string; bg: string; border: string }> = {
  FAQ:      { color: '#00c9a7', bg: 'rgba(0,201,167,0.06)',   border: 'rgba(0,201,167,0.18)' },
  Platform: { color: '#818cf8', bg: 'rgba(129,140,248,0.06)', border: 'rgba(129,140,248,0.18)' },
}

const ALL_TOOLS = ['All', 'FAQ', 'Platform']
const ALL_TYPES: (ChangeType | 'All')[] = ['All', 'feature', 'fix', 'improvement']

export default function ChangelogPage() {
  const [toolFilter, setToolFilter] = useState<string>('All')
  const [typeFilter, setTypeFilter] = useState<ChangeType | 'All'>('All')
  const [expanded, setExpanded] = useState<Set<string>>(new Set())

  const filtered = changelog.filter(e =>
    (toolFilter === 'All' || e.tool === toolFilter) &&
    (typeFilter === 'All' || e.type === typeFilter)
  )

  function toggle(version: string) {
    setExpanded(prev => {
      const next = new Set(prev)
      next.has(version) ? next.delete(version) : next.add(version)
      return next
    })
  }

  function expandAll() { setExpanded(new Set(filtered.map(e => e.version))) }
  function collapseAll() { setExpanded(new Set()) }

  return (
    <main style={{
      minHeight: '100vh',
      background: '#0a0a0f',
      color: '#e8e8f0',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .filter-btn { background: transparent; border: 1px solid #1e1e2a; border-radius: 6px; padding: 5px 12px; font-size: 12px; cursor: pointer; transition: all 0.15s; color: #6b6b80; font-family: inherit; }
        .filter-btn:hover { border-color: #6b6b80; color: #e8e8f0; }
        .filter-btn.active { color: #e8e8f0; border-color: #e8e8f0; background: rgba(255,255,255,0.05); }
        .entry-row { border: 1px solid #1e1e2a; border-radius: 10px; overflow: hidden; margin-bottom: 8px; transition: border-color 0.15s; }
        .entry-row:hover { border-color: #2e2e3a; }
        .entry-header { display: flex; align-items: center; gap: 12px; padding: 14px 18px; cursor: pointer; user-select: none; }
        .entry-body { padding: 0 18px 16px; border-top: 1px solid #1e1e2a; padding-top: 14px; }
        .chevron { transition: transform 0.2s; color: #6b6b80; font-size: 12px; }
        .chevron.open { transform: rotate(180deg); }
        .nav-link { font-size: 13px; color: #6b6b80; text-decoration: none; transition: color 0.15s; }
        .nav-link:hover { color: #e8e8f0; }
      `}</style>

      {/* Nav */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, borderBottom: '1px solid #1e1e2a', background: 'rgba(10,10,15,0.9)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="https://copypilot.app" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: 'inherit' }}>
            <img src="/favicon-32x32.png" alt="CopyPilot" style={{ width: 20, height: 20 }} />
            <span style={{ fontWeight: 700, fontSize: 14, letterSpacing: '-0.02em' }}>CopyPilot</span>
          </a>
          <div style={{ display: 'flex', gap: 20 }}>
            <a href="https://copypilot.app" className="nav-link">Home</a>
            <a href="https://faq.copypilot.app" className="nav-link">FAQ tool</a>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px 80px' }}>

        {/* Header */}
        <div style={{ marginBottom: 36 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.04em', marginBottom: 8 }}>Changelog</h1>
          <p style={{ fontSize: 14, color: '#6b6b80' }}>All changes shipped across CopyPilot tools.</p>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
          {/* Tool filter */}
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <span style={{ fontSize: 11, color: '#6b6b80', textTransform: 'uppercase', letterSpacing: '0.06em', marginRight: 2 }}>App</span>
            {ALL_TOOLS.map(t => (
              <button
                key={t}
                className={`filter-btn ${toolFilter === t ? 'active' : ''}`}
                onClick={() => setToolFilter(t)}
                style={toolFilter === t && t !== 'All' ? { borderColor: toolStyles[t]?.color, color: toolStyles[t]?.color, background: toolStyles[t]?.bg } : {}}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Type filter */}
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <span style={{ fontSize: 11, color: '#6b6b80', textTransform: 'uppercase', letterSpacing: '0.06em', marginRight: 2 }}>Type</span>
            {ALL_TYPES.map(t => (
              <button
                key={t}
                className={`filter-btn ${typeFilter === t ? 'active' : ''}`}
                onClick={() => setTypeFilter(t as ChangeType | 'All')}
                style={typeFilter === t && t !== 'All' ? { borderColor: typeStyles[t as ChangeType]?.color, color: typeStyles[t as ChangeType]?.color, background: typeStyles[t as ChangeType]?.bg } : {}}
              >
                {t === 'All' ? 'All' : typeStyles[t as ChangeType].label}
              </button>
            ))}
          </div>

          {/* Expand/collapse all */}
          <div style={{ display: 'flex', gap: 6, marginLeft: 'auto' }}>
            <button className="filter-btn" onClick={expandAll}>Expand all</button>
            <button className="filter-btn" onClick={collapseAll}>Collapse all</button>
          </div>
        </div>

        {/* Count */}
        <p style={{ fontSize: 12, color: '#6b6b80', marginBottom: 16 }}>
          {filtered.length} {filtered.length === 1 ? 'entry' : 'entries'}
          {(toolFilter !== 'All' || typeFilter !== 'All') && (
            <button
              onClick={() => { setToolFilter('All'); setTypeFilter('All') }}
              style={{ marginLeft: 10, fontSize: 11, color: '#6b6b80', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', fontFamily: 'inherit' }}
            >
              Clear filters
            </button>
          )}
        </p>

        {/* Entries */}
        {filtered.length === 0 && (
          <p style={{ color: '#6b6b80', fontSize: 14, textAlign: 'center', padding: '40px 0' }}>No entries match the selected filters.</p>
        )}

        {filtered.map(entry => {
          const ts = typeStyles[entry.type]
          const tool = toolStyles[entry.tool]
          const isOpen = expanded.has(entry.version)
          return (
            <div key={entry.version} className="entry-row">
              <div className="entry-header" onClick={() => toggle(entry.version)}>
                {/* Version */}
                <span style={{ fontFamily: 'monospace', fontSize: 13, fontWeight: 700, color: '#00c9a7', minWidth: 52 }}>
                  {entry.version}
                </span>

                {/* Title */}
                <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: '-0.01em', flex: 1 }}>
                  {entry.title}
                </span>

                {/* Badges */}
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: tool.color, background: tool.bg, border: `1px solid ${tool.border}`, borderRadius: 4, padding: '2px 7px', whiteSpace: 'nowrap' }}>
                    {entry.tool}
                  </span>
                  <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: ts.color, background: ts.bg, border: `1px solid ${ts.border}`, borderRadius: 4, padding: '2px 7px', whiteSpace: 'nowrap' }}>
                    {ts.label}
                  </span>
                  <span style={{ fontSize: 11, color: '#6b6b80', whiteSpace: 'nowrap' }}>{entry.date}</span>
                  <span className={`chevron ${isOpen ? 'open' : ''}`}>▾</span>
                </div>
              </div>

              {isOpen && (
                <div className="entry-body">
                  <p style={{ fontSize: 13, color: '#9090a8', lineHeight: 1.65 }}>{entry.description}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #1e1e2a', padding: '20px 24px', textAlign: 'center' }}>
        <p style={{ fontSize: 12, color: '#6b6b80' }}>CopyPilot - AI-powered SEO copy production</p>
      </footer>
    </main>
  )
}

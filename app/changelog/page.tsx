import { changelog } from './data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Changelog — CopyPilot',
  description: 'All changes, fixes, and new features shipped across CopyPilot tools.',
}

const typeStyles: Record<string, { label: string; color: string; bg: string }> = {
  feature:     { label: 'Feature',     color: '#00c9a7', bg: 'rgba(0,201,167,0.08)' },
  fix:         { label: 'Fix',         color: '#f97316', bg: 'rgba(249,115,22,0.08)' },
  improvement: { label: 'Improvement', color: '#818cf8', bg: 'rgba(129,140,248,0.08)' },
}

const toolStyles: Record<string, { color: string; bg: string }> = {
  FAQ:      { color: '#00c9a7', bg: 'rgba(0,201,167,0.06)' },
  Platform: { color: '#818cf8', bg: 'rgba(129,140,248,0.06)' },
}

export default function ChangelogPage() {
  return (
    <main style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      color: 'var(--text)',
      fontFamily: 'var(--font)',
    }}>
      {/* Header */}
      <div style={{
        borderBottom: '1px solid var(--border)',
        padding: '24px 0',
      }}>
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <img src="/favicon-32x32.png" alt="CopyPilot" style={{ width: 24, height: 24 }} />
              <span style={{ fontWeight: 700, fontSize: 15, letterSpacing: '-0.02em' }}>CopyPilot</span>
            </div>
            <a
              href="https://faq.copypilot.app"
              style={{
                fontSize: 13,
                color: 'var(--muted)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              Open FAQ tool →
            </a>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '56px 24px 40px' }}>
        <h1 style={{
          fontSize: 32,
          fontWeight: 800,
          letterSpacing: '-0.04em',
          marginBottom: 10,
        }}>
          Changelog
        </h1>
        <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.6 }}>
          Every fix, improvement, and new feature shipped across CopyPilot tools.
        </p>

        {/* Tool legend */}
        <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
          {Object.entries(toolStyles).map(([tool, s]) => (
            <span key={tool} style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: s.color,
              background: s.bg,
              border: `1px solid ${s.color}22`,
              borderRadius: 4,
              padding: '3px 8px',
            }}>{tool}</span>
          ))}
          {Object.entries(typeStyles).map(([type, s]) => (
            <span key={type} style={{
              fontSize: 11,
              fontWeight: 500,
              color: s.color,
              background: s.bg,
              border: `1px solid ${s.color}22`,
              borderRadius: 4,
              padding: '3px 8px',
            }}>{s.label}</span>
          ))}
        </div>
      </div>

      {/* Entries */}
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px 80px' }}>
        {changelog.map((entry, i) => {
          const ts = typeStyles[entry.type]
          const tool = toolStyles[entry.tool]
          return (
            <div
              key={entry.version}
              style={{
                display: 'grid',
                gridTemplateColumns: '100px 1fr',
                gap: '0 32px',
                paddingBottom: 32,
                marginBottom: i < changelog.length - 1 ? 0 : 0,
                position: 'relative',
              }}
            >
              {/* Left: version + date */}
              <div style={{ paddingTop: 2 }}>
                <div style={{
                  fontFamily: 'monospace',
                  fontSize: 13,
                  fontWeight: 700,
                  color: 'var(--accent)',
                  marginBottom: 4,
                }}>
                  {entry.version}
                </div>
                <div style={{ fontSize: 11, color: 'var(--muted)' }}>{entry.date}</div>
              </div>

              {/* Right: content */}
              <div style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 10,
                padding: '16px 20px',
              }}>
                {/* Tags */}
                <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
                  <span style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: tool.color,
                    background: tool.bg,
                    border: `1px solid ${tool.color}22`,
                    borderRadius: 3,
                    padding: '2px 6px',
                  }}>{entry.tool}</span>
                  <span style={{
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: ts.color,
                    background: ts.bg,
                    border: `1px solid ${ts.color}22`,
                    borderRadius: 3,
                    padding: '2px 6px',
                  }}>{ts.label}</span>
                </div>

                <h2 style={{
                  fontSize: 15,
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  marginBottom: 8,
                }}>
                  {entry.title}
                </h2>
                <p style={{
                  fontSize: 13,
                  color: 'var(--muted)',
                  lineHeight: 1.65,
                }}>
                  {entry.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div style={{
        borderTop: '1px solid var(--border)',
        padding: '20px 24px',
        textAlign: 'center',
      }}>
        <p style={{ fontSize: 12, color: 'var(--muted)' }}>
          CopyPilot — AI-powered SEO copy production
        </p>
      </div>
    </main>
  )
}

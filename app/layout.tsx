import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CopyPilot',
  description: 'AI-powered SEO copy production tools',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <script dangerouslySetInnerHTML={{ __html: `(function(){var t=localStorage.getItem('cp-theme')||'light';document.documentElement.setAttribute('data-theme',t);})();` }} />
      <body>{children}</body>
    </html>
  )
}

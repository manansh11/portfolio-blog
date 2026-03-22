'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from './theme-provider'

export function Header() {
  const pathname = usePathname()
  const { theme, toggle } = useTheme()

  const isHome = pathname === '/'
  const isActive = (path: string) => {
    if (path === '/blog') return pathname === '/blog' || pathname.startsWith('/blog/')
    if (path === '/about') return pathname === '/about'
    return false
  }

  return (
    <header className="site-header" data-home={isHome || undefined}>
      {/* Site name */}
      <Link href="/" style={{ textDecoration: 'none' }}>
        <span className="site-name">
          Manansh Shukla
        </span>
      </Link>

      {/* Nav + toggle */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Link
          href="/blog"
          className="nav-link"
          style={{
            color: isActive('/blog') ? 'var(--mg-accent)' : 'var(--mg-muted)',
          }}
        >
          Writing
        </Link>
        <Link
          href="/about"
          className="nav-link"
          style={{
            color: isActive('/about') ? 'var(--mg-accent)' : 'var(--mg-muted)',
          }}
        >
          About
        </Link>

        {/* Divider */}
        <div
          style={{
            width: '1px',
            height: '14px',
            backgroundColor: 'var(--mg-border)',
          }}
        />

        {/* Theme toggle — pill switch */}
        <button
          onClick={toggle}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          className="theme-toggle"
          style={{
            justifyContent: theme === 'dark' ? 'flex-start' : 'flex-end',
            backgroundColor: theme === 'dark'
              ? 'rgba(143, 174, 139, 0.12)'
              : '#D4DDD0',
          }}
        >
          <span
            className="theme-toggle-dot"
            style={{
              backgroundColor: theme === 'dark' ? '#8FAE8B' : '#1A2E1C',
            }}
          />
        </button>
      </nav>

      <style jsx>{`
        .site-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--mg-border);
          margin-bottom: 0;
        }
        .site-header[data-home] {
          align-items: flex-end;
        }
        .site-name {
          font-family: "Instrument Serif", system-ui, serif;
          font-weight: 400;
          color: var(--mg-heading);
          font-size: 17px;
          line-height: 22px;
          letter-spacing: -0.01em;
        }
        .site-header[data-home] .site-name {
          font-size: 17px;
        }
        .nav-link {
          font-family: "DM Sans", system-ui, sans-serif;
          font-weight: 500;
          font-size: 14px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .theme-toggle {
          display: flex;
          align-items: center;
          width: 36px;
          height: 20px;
          border-radius: 12px;
          padding: 2px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }
        .theme-toggle-dot {
          width: 16px;
          height: 16px;
          border-radius: 8px;
          display: block;
          transition: all 0.3s ease;
        }

        /* Tablet */
        @media (min-width: 640px) {
          .site-header {
            padding-bottom: 20px;
          }
          .site-name {
            font-size: 33px;
            line-height: 1;
            letter-spacing: -0.02em;
          }
          .site-header[data-home] .site-name {
            font-size: clamp(40px, 7vw, 58px);
          }
          .nav-link {
            font-size: 15px;
          }
          .theme-toggle {
            width: 44px;
            height: 24px;
            border-radius: 14px;
            padding: 3px;
          }
          .theme-toggle-dot {
            width: 18px;
            height: 18px;
            border-radius: 9px;
          }
        }

        /* Desktop */
        @media (min-width: 1024px) {
          .site-header {
            padding-bottom: 28px;
            margin-bottom: 0;
          }
          .site-header:not([data-home]) {
            margin-bottom: 40px;
          }
          .site-name {
            font-size: 33px;
          }
          .site-header[data-home] .site-name {
            font-size: clamp(48px, 7vw, 96px);
          }
          .nav-link {
            font-size: 17px;
          }
        }
      `}</style>
    </header>
  )
}

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { name: 'Index', href: '/' },
  { name: 'About', href: '/about' },
]

function Nav({ pathname }: { pathname: string }) {
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/' || pathname.startsWith('/blog')
    return pathname === href
  }

  return (
    <nav className="site-nav">
      {navLinks.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className="nav-link"
          data-active={isActive(link.href) || undefined}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  )
}

export function Header() {
  const pathname = usePathname()
  const isHome = pathname === '/'

  if (isHome) {
    return (
      <header className="masthead-home">
        <h1 className="site-name text-light-gradient">Manansh Shukla</h1>
        <Nav pathname={pathname} />
      </header>
    )
  }

  return (
    <header className="masthead-compact">
      <Link href="/" style={{ textDecoration: 'none' }}>
        <span className="site-name text-light-gradient">Manansh Shukla</span>
      </Link>
      <Nav pathname={pathname} />
    </header>
  )
}

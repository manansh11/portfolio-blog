'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Header() {
  const pathname = usePathname()
  const isHome = pathname === '/'

  if (isHome) {
    return (
      <header className="masthead-home">
        <h1 className="site-name text-light-gradient">Manansh Shukla</h1>
      </header>
    )
  }

  return (
    <header className="masthead-compact">
      <Link href="/" style={{ textDecoration: 'none' }}>
        <span className="site-name text-light-gradient">Manansh Shukla</span>
      </Link>
    </header>
  )
}

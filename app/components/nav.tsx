'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = {
  '/': {
    name: 'home',
  },
  '/blog': {
    name: 'blog',
  },
  '/llm': {
    name: 'LLM.txt',
  },
}

export function Navbar() {
  
  const pathname = usePathname()
  
  // Check if the current path is or starts with a nav item path
  const isActive = (path) => {
    if (path === '/') {
      return pathname === '/'
    }
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  return (
    <aside className="-ml-[8px] mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div className="flex flex-row space-x-0 pr-10">
            {Object.entries(navItems).map(([path, { name }]) => {
              const active = isActive(path)
              return (
                <Link
                  key={path}
                  href={path}
                  className="transition-all flex align-middle relative py-1 px-2 m-1"
                  style={{ 
                    color: active ? 'var(--jordy-blue)' : 'var(--lavender)',
                    fontWeight: active ? 'bold' : 'normal' 
                  }}
                >
                  {name}
                </Link>
              )
            })}
          </div>
        </nav>
      </div>
    </aside>
  )
}

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/manansh11' },
  { name: 'Twitter', href: 'https://twitter.com/manansh_shukla' },
  { name: 'Substack', href: 'https://manansh.substack.com' },
  { name: 'OpenUX', href: 'https://www.openux.xyz' },
]

const nowLine =
  'building agentic ux research tools, learning to relax all day'

export function Footer() {
  return (
    <footer className="site-footer">
      <p className="now-line">
        <span className="now-key text-accent-gradient">now</span> — {nowLine}
      </p>

      <div className="footer-social">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            {link.name}
          </a>
        ))}
      </div>

      <p className="footer-copy">
        © {new Date().getFullYear()} · made with wonder
      </p>
    </footer>
  )
}

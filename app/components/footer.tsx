const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/manansh11' },
  { name: 'Twitter', href: 'https://twitter.com/manansh_shukla' },
  { name: 'Substack', href: 'https://manansh.substack.com' },
  { name: 'OpenUX', href: 'https://www.openux.xyz' },
]

export function Footer() {
  return (
    <footer className="site-footer">
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

      <p className="footer-copy">© {new Date().getFullYear()} Manansh Shukla</p>
    </footer>
  )
}

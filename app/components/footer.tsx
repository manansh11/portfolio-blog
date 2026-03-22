const socialLinks = [
  { name: 'X', href: 'https://twitter.com/manansh_shukla' },
  { name: 'Substack', href: 'https://manansh.substack.com' },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/mananshshukla' },
]

export function Footer() {
  return (
    <footer className="site-footer">
      <span className="footer-copy">
        © {new Date().getFullYear()} Manansh Shukla
      </span>

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
    </footer>
  )
}

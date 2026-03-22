export const metadata = {
  title: 'About',
  description: 'I am interested in aliveness.',
}

const nowItems = [
  'Building OpenUX',
  'UX Research at MetaMask',
  'UX Research at Ondo Finance',
  'Living in Calgary',
]

const elsewhereLinks = [
  { name: 'GitHub', href: 'https://github.com/manansh11' },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/mananshshukla' },
  { name: 'Twitter', href: 'https://twitter.com/manansh_shukla' },
]

export default function AboutPage() {
  return (
    <section className="about-layout">
      <div className="about-bio">
        <h1 className="about-heading">
          I am interested in <em>aliveness.</em>
        </h1>
        <p className="about-body">
          I co-founded{' '}
          <a
            href="https://www.openux.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="about-link"
          >
            OpenUX
          </a>
          , where I currently conduct UX research with leading crypto companies
          and protocols.
        </p>
      </div>

      <div className="about-sidebar">
        <div className="sidebar-section">
          <span className="sidebar-label">Now</span>
          {nowItems.map((item) => (
            <p key={item} className="sidebar-item">{item}</p>
          ))}
        </div>

        <div className="sidebar-section">
          <span className="sidebar-label">Elsewhere</span>
          {elsewhereLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="sidebar-item sidebar-link"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

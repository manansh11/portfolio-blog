export const metadata = {
  title: 'About',
  description: 'I am interested in aliveness.',
}

const elsewhereLinks = [
  { name: 'Twitter', href: 'https://twitter.com/manansh_shukla' },
]

export default function AboutPage() {
  return (
    <section className="about-layout">
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

      <div className="about-sections">
        <div>
          <span className="about-label text-accent-gradient">Elsewhere</span>
          {elsewhereLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="about-item"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

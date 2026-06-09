import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="post-header">
      <p className="post-number text-accent-gradient">404</p>
      <h1 className="post-title text-light-gradient">Nothing here</h1>
      <div className="post-meta" style={{ textTransform: 'none', letterSpacing: 0 }}>
        <Link href="/" className="post-footer-link">
          ← Back to the index
        </Link>
      </div>
    </section>
  )
}

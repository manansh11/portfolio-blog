import Link from 'next/link'
import { getBlogPosts } from 'app/blog/utils'

export default function Page() {
  const allPosts = getBlogPosts().sort((a, b) => {
    const dateA = a.metadata.publishedAt ? new Date(a.metadata.publishedAt) : new Date(0)
    const dateB = b.metadata.publishedAt ? new Date(b.metadata.publishedAt) : new Date(0)
    return dateB.getTime() - dateA.getTime()
  })

  const featured = allPosts[0]
  const secondary = allPosts[1]
  const moreWriting = allPosts.slice(2, 9)

  return (
    <div>
      {/* Featured Section */}
      <section className="featured-section">
        {featured && (
          <Link href={`/blog/${featured.slug}`} className="featured-main">
            <span className="label-accent">New</span>
            <h2 className="featured-title">{featured.metadata.title}</h2>
            <p className="featured-excerpt">
              {featured.metadata.summary || featured.content.slice(0, 140).trim() + '…'}
            </p>
          </Link>
        )}
        {secondary && (
          <Link href={`/blog/${secondary.slug}`} className="featured-secondary">
            <span className="label-muted">Previous</span>
            <h3 className="secondary-title">{secondary.metadata.title}</h3>
            <p className="secondary-excerpt">
              {secondary.metadata.summary || secondary.content.slice(0, 100).trim() + '…'}
            </p>
          </Link>
        )}
      </section>

      {/* More Writing */}
      <section className="more-section">
        <span className="label-muted more-label">More</span>

        {moreWriting.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="list-row">
            <span className="list-row-title">{post.metadata.title}</span>
            <span className="list-row-excerpt">
              {post.metadata.summary || post.content.slice(0, 80).trim() + '…'}
            </span>
          </Link>
        ))}

        <Link href="/blog" className="all-pieces-link">
          All {allPosts.length} pieces →
        </Link>
      </section>
    </div>
  )
}

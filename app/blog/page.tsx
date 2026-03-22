import Link from 'next/link'
import { formatDate, getBlogPosts } from 'app/blog/utils'

export const metadata = {
  title: 'Writing',
  description: 'All writing by Manansh Shukla.',
}

export default function BlogPage() {
  const allPosts = getBlogPosts().sort((a, b) => {
    const dateA = a.metadata.publishedAt ? new Date(a.metadata.publishedAt) : new Date(0)
    const dateB = b.metadata.publishedAt ? new Date(b.metadata.publishedAt) : new Date(0)
    return dateB.getTime() - dateA.getTime()
  })

  return (
    <section>
      <h1 className="index-title">All Writing</h1>
      <div>
        {allPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="list-row"
          >
            <span className="list-row-title">{post.metadata.title}</span>
            <span className="list-row-excerpt">
              {post.metadata.summary || post.content.slice(0, 80).trim() + '…'}
            </span>
            <span className="list-row-date">
              {formatDate(post.metadata.publishedAt || '')}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}

import Link from 'next/link'
import { getNumberedPosts } from 'app/blog/utils'

export default function Page() {
  const posts = getNumberedPosts()

  return (
    <section className="index-section">
      <div className="index-header">
        <span>INDEX</span>
        <span>{posts.length} PIECES</span>
      </div>

      {posts.map((post) => (
        <Link key={post.slug} href={`/blog/${post.slug}`} className="index-row">
          <span className="index-row-num">{post.number}</span>
          <span className="index-row-title">{post.metadata.title}</span>
          <span className="index-row-date">{post.metadata.publishedAt}</span>
        </Link>
      ))}
    </section>
  )
}

import { CustomMDX } from 'app/components/mdx'
import { formatDate, getReadingTime, getBlogPosts } from 'app/blog/utils'
import { baseUrl } from 'app/sitemap'
import { SpeedReader } from 'app/components/speed-reader'
import { ReadingProgress } from 'app/components/reading-progress'
import Link from 'next/link'

export async function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getBlogPosts().find((p) => p.slug === params.slug)
  if (!post) return {}

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata

  const ogImage = image || `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default function Blog({ params }: { params: { slug: string } }) {
  const post = getBlogPosts().find((p) => p.slug === params.slug)

  if (!post) {
    return (
      <section>
        <h1 className="post-title">Post not found</h1>
      </section>
    )
  }

  return (
    <section className="blog-post-container">
      <ReadingProgress />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt || '',
            dateModified: post.metadata.publishedAt || '',
            description: post.metadata.summary || '',
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: { '@type': 'Person', name: 'Manansh Shukla' },
          }),
        }}
      />

      <div className="post-back-link">
        <Link href="/blog" className="back-link">
          ← Back to all writing
        </Link>
      </div>

      <div className="post-header">
        <h1 className="title post-title">{post.metadata.title}</h1>
        <p className="post-date">
          {formatDate(post.metadata.publishedAt || '')}
          <span className="post-reading-time"> · {getReadingTime(post.content)}</span>
        </p>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <SpeedReader content={post.content} />
      </div>

      <article className="prose post-body">
        <CustomMDX source={post.content} />
      </article>

      <div className="post-back-link post-back-bottom">
        <Link href="/blog" className="back-link">
          ← Back to all writing
        </Link>
      </div>
    </section>
  )
}

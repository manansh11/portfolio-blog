import { CustomMDX } from 'app/components/mdx'
import { getReadingTime, getBlogPosts, getNumberedPosts } from 'app/blog/utils'
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

function formatMetaDate(date?: string) {
  if (!date) return ''
  const d = new Date(date.includes('T') ? date : `${date}T00:00:00`)
  return d
    .toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
    .toUpperCase()
}

export default function Blog({ params }: { params: { slug: string } }) {
  const posts = getNumberedPosts()
  const postIndex = posts.findIndex((p) => p.slug === params.slug)
  const post = posts[postIndex]

  if (!post) {
    return (
      <section>
        <h1 className="post-title text-light-gradient">Post not found</h1>
      </section>
    )
  }

  // posts are newest-first; "next" continues down the index (older)
  const nextPost = posts[postIndex + 1]

  return (
    <section>
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

      <div className="post-header">
        <p className="post-number text-accent-gradient">No. {post.number}</p>
        <h1 className="title post-title text-light-gradient">
          {post.metadata.title}
        </h1>
        <div className="post-meta">
          <span>{formatMetaDate(post.metadata.publishedAt)}</span>
          <span>·</span>
          <span>{getReadingTime(post.content)}</span>
        </div>
        <div className="post-tools">
          <SpeedReader content={post.content} />
        </div>
      </div>

      <article className="prose post-body">
        <CustomMDX source={post.content} />
      </article>

      <div className="post-footer">
        <Link href="/" className="post-footer-link">
          ← Index
        </Link>
        {nextPost && (
          <Link href={`/blog/${nextPost.slug}`} className="post-footer-link">
            Next · {nextPost.metadata.title} →
          </Link>
        )}
      </div>
    </section>
  )
}

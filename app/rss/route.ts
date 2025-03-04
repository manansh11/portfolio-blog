import { baseUrl } from 'app/sitemap'
import { getBlogPosts } from 'app/blog/utils'

export async function GET() {
  let allBlogs = await getBlogPosts()

  const itemsXml = allBlogs
    .sort((a, b) => {
      const dateA = a.metadata.publishedAt ? new Date(a.metadata.publishedAt) : new Date(0)
      const dateB = b.metadata.publishedAt ? new Date(b.metadata.publishedAt) : new Date(0)
      if (dateA > dateB) {
        return -1
      }
      return 1
    })
    .map(
      (post) =>
        `<item>
          <title>${post.metadata.title}</title>
          <link>${baseUrl}/blog/${post.slug}</link>
          <description>${post.metadata.summary || ''}</description>
          <pubDate>${
            new Date(post.metadata.publishedAt ?? 0).toUTCString()
          }</pubDate>
        </item>`
    )
    .join('\n')

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
        <title>Manansh Shukla</title>
        <link>${baseUrl}</link>
        <description>Manansh Shukla's portfolio and blog</description>
        ${itemsXml}
    </channel>
  </rss>`

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'text/xml',
    },
  })
}
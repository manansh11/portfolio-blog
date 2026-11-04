import { getNumberedPosts } from '../lib/posts'

export async function GET({ site }) {
  const posts = await getNumberedPosts()

  const itemsXml = posts
    .map(
      (post) =>
        `<item>
          <title>${post.data.title}</title>
          <link>${site}blog/${post.id}</link>
          <description>${post.data.description || ''}</description>
          <pubDate>${new Date(post.data.date ?? 0).toUTCString()}</pubDate>
        </item>`
    )
    .join('\n')

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
        <title>Manansh Shukla</title>
        <link>${site}</link>
        <description>Manansh Shukla's portfolio and blog</description>
        ${itemsXml}
    </channel>
  </rss>`

  return new Response(rssFeed, { headers: { 'Content-Type': 'text/xml' } })
}

import { getNumberedPosts } from '../lib/posts'

export async function GET({ site }) {
  const posts = await getNumberedPosts()
  const today = new Date().toISOString().split('T')[0]

  const urls = [
    { loc: `${site}`.replace(/\/$/, ''), lastmod: today },
    ...posts.map((post) => ({ loc: `${site}blog/${post.id}`, lastmod: post.data.date })),
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `<url>\n<loc>${u.loc}</loc>\n<lastmod>${u.lastmod}</lastmod>\n</url>`).join('\n')}
</urlset>`

  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } })
}

export function GET({ site }) {
  return new Response(`User-Agent: *\n\nSitemap: ${site}sitemap.xml\n`)
}

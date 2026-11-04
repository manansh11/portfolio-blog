import { getCollection, type CollectionEntry } from 'astro:content'

export type NumberedPost = CollectionEntry<'posts'> & { number: number }

// Posts sorted newest-first, each carrying a stable number
// (chronological rank: oldest post = 1), so numbers never shift
// as new posts are added. Ties on date break by slug.
export async function getNumberedPosts(): Promise<NumberedPost[]> {
  const posts = await getCollection('posts')
  const byDateAsc = posts.sort((a, b) => {
    const diff = toTime(a.data.date) - toTime(b.data.date)
    return diff !== 0 ? diff : a.id.localeCompare(b.id)
  })
  return byDateAsc.map((post, i) => ({ ...post, number: i + 1 })).reverse()
}

function toTime(date?: string) {
  return date ? new Date(date).getTime() : 0
}

export function getReadingTime(content: string): string {
  // Strip markdown syntax
  let plain = content
    .replace(/```[\s\S]*?```/g, '') // code blocks
    .replace(/`[^`]*`/g, '') // inline code
    .replace(/!\[.*?\]\(.*?\)/g, '') // images
    .replace(/\[([^\]]*)\]\(.*?\)/g, '$1') // links → text
    .replace(/#{1,6}\s+/g, '') // headings
    .replace(/[*_~>|+-]/g, '') // emphasis, blockquotes, lists
    .replace(/<[^>]+>/g, '') // HTML tags
    .replace(/\n+/g, ' ') // collapse newlines
    .trim()

  let words = plain.split(/\s+/).filter(Boolean).length
  let minutes = Math.max(1, Math.ceil(words / 238))
  return `${minutes} min read`
}

export function formatMetaDate(date?: string) {
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

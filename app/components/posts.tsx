import Link from 'next/link'
import { formatDate, getBlogPosts } from 'app/blog/utils'
import { BlogPostsPagination } from './posts-pagination'

export function BlogPosts() {
  // Get blog posts on the server
  let allBlogs = getBlogPosts()
  
  // Sort posts by date, newest first
  const sortedBlogs = allBlogs.sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1
    }
    return 1
  })

  // Process the blog data for display
  const blogData = sortedBlogs.map(post => ({
    slug: post.slug,
    title: post.metadata.title,
    date: formatDate(post.metadata.publishedAt, false)
  }))

  return <BlogPostsPagination posts={blogData} postsPerPage={5} />
}

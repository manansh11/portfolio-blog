'use client'

import Link from 'next/link'
import { useState } from 'react'

type BlogPost = {
  slug: string
  title: string
  date: string
}

type BlogPostsPaginationProps = {
  posts: BlogPost[]
  postsPerPage: number
}

export function BlogPostsPagination({ posts, postsPerPage }: BlogPostsPaginationProps) {
  const [showAll, setShowAll] = useState(false)
  
  // Show only the first few posts initially
  const displayedPosts = showAll ? posts : posts.slice(0, postsPerPage)

  return (
    <div>
      <div className="mb-4">
        {displayedPosts.map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1 mb-4"
            href={`/blog/${post.slug}`}
          >
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-4">
              <p className="w-[80px] tabular-nums" style={{ color: 'var(--lavender)' }}>
                {post.date}
              </p>
              <p className="tracking-tight font-medium" style={{ color: 'var(--jordy-blue)' }}>
                {post.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
      
      {posts.length > postsPerPage && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-sm font-medium mt-2 py-2 px-4"
          style={{ 
            backgroundColor: 'var(--yinmn-blue)',
            color: 'var(--white)',
            borderRadius: '0.25rem'
          }}
        >
          {showAll ? 'Show Less' : `Show All (${posts.length} posts)`}
        </button>
      )}
    </div>
  )
}
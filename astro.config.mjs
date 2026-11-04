import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import { unified } from '@astrojs/markdown-remark'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeExternalLinks from 'rehype-external-links'

export default defineConfig({
  site: 'https://manansh.xyz',
  // /blog/avoidance.html, served at /blog/avoidance via cleanUrls in vercel.json
  build: { format: 'file' },
  trailingSlash: 'never',
  integrations: [mdx()],
  markdown: {
    processor: unified({
      // keep quotes as written, matching the old site
      smartypants: false,
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: 'prepend',
            properties: { className: ['anchor'] },
            content: [],
          },
        ],
        [
          rehypeExternalLinks,
          { target: '_blank', rel: ['noopener', 'noreferrer'] },
        ],
      ],
    }),
  },
})

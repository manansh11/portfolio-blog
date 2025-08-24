# Blog Post Images

This folder contains images for blog posts.

## How to use images in your MDX posts:

### Basic markdown image:
```mdx
![Image description](/images/posts/your-image-name.png)
```

### With Next.js Image component (better performance):
```mdx
import Image from 'next/image'

<Image 
  src="/images/posts/your-image-name.png" 
  alt="Image description"
  width={600} 
  height={400} 
/>
```

## Naming convention:
- Use descriptive names: `coherent-relaxing-diagram.png` 
- Keep names lowercase with hyphens
- Use appropriate formats: 
  - `.png` for diagrams/screenshots
  - `.jpg` for photos
  - `.gif` for animations

## Tips:
- Optimize images before adding (use tinypng.com or similar)
- Keep images under 500KB when possible
- Consider 2x resolution for retina displays
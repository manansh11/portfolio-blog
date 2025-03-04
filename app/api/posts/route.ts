import { getBlogPosts } from 'app/blog/utils';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const posts = getBlogPosts();
    // Return full posts including content
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error in posts API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}
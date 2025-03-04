import { NextResponse } from 'next/server';

// Instead of reading from the file system, we'll hardcode the current homepage content
// This avoids issues with file system access during build time
export async function GET() {
  try {
    const homepageData = {
      name: "Manansh Shukla",
      paragraphs: [
        "I'm a systems thinker, builder, and researcher.",
        "I co-founded OpenUX, where I currently conduct UX research with leading crypto companies and protocols.",
        "I write InnerNet, a newsletter mixing the internet with inner work.",
        "My work blends inner exploration with technology, designing systems that foster deep self-awareness, alignment, and flow."
      ]
    };
    
    return NextResponse.json(homepageData);
  } catch (error) {
    console.error('Error in homepage API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch homepage content' },
      { status: 500 }
    );
  }
}

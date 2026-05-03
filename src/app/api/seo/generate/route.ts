import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const { city } = await req.json();

    if (!city) {
      return NextResponse.json({ error: 'City is required' }, { status: 400 });
    }

    // This endpoint would be called by the SEO Factory or a background job
    // to generate content for a new city on the fly.
    
    // For now, we return a success message and would ideally trigger
    // the LLM generation logic here.
    
    console.log(`Generating SEO content for new city: ${city}`);

    return NextResponse.json({
      message: `SEO content generation triggered for ${city}`,
      status: 'pending'
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to trigger SEO generation' }, { status: 500 });
  }
}

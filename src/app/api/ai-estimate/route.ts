import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { bikeType, problem } = body;

    // Simulate AI estimation logic
    // In production, this would call an LLM with a specific prompt
    const baseMinutes = 30;
    const complexityMap: Record<string, number> = {
      'Kette': 15,
      'Bremse': 20,
      'Reifen': 10,
      'Schaltung': 25,
      'Licht': 10
    };

    let additionalMinutes = 15;
    for (const key in complexityMap) {
      if (problem.toLowerCase().includes(key.toLowerCase())) {
        additionalMinutes = complexityMap[key];
        break;
      }
    }

    const estimatedMinutes = baseMinutes + additionalMinutes;
    const estimatedPrice = (estimatedMinutes * 1.5).toFixed(2);

    return NextResponse.json({
      estimatedMinutes,
      estimatedPrice,
      currency: 'EUR'
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to estimate repair time' }, { status: 500 });
  }
}

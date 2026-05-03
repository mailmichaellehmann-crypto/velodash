import { NextResponse } from 'next/server';
import { sendOutreachEmail } from '@/lib/outreach';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { to, shopName, city, estimatedRevenue } = body;

    if (!to || !shopName || !city || !estimatedRevenue) {
      return NextResponse.json({ error: 'Fehlende Pflichtfelder' }, { status: 400 });
    }

    const result = await sendOutreachEmail({ to, shopName, city, estimatedRevenue });
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Outreach error:', error);
    return NextResponse.json({ error: 'Fehler beim Senden der Outreach-E-Mail' }, { status: 500 });
  }
}

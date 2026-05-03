import { NextResponse } from 'next/server';
import { searchBikeShops } from '@/lib/google-places';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');

  if (!city) {
    return NextResponse.json({ error: 'Stadt ist erforderlich' }, { status: 400 });
  }

  try {
    const shops = await searchBikeShops(city);
    return NextResponse.json(shops);
  } catch (error: any) {
    console.error('Discovery error:', error);
    return NextResponse.json({ error: 'Fehler bei der Shop-Suche' }, { status: 500 });
  }
}

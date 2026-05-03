import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');
  const date = searchParams.get('date');

  if (!city) {
    return NextResponse.json({ error: 'Stadt ist erforderlich' }, { status: 400 });
  }

  let query = supabase
    .from('slots')
    .select(`
      *,
      shops!inner(*)
    `)
    .eq('is_available', true)
    .eq('shops.city', city);

  if (date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    query = query
      .gte('starts_at', startOfDay.toISOString())
      .lte('starts_at', endOfDay.toISOString());
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: 'Datenbankfehler' }, { status: 500 });
  }

  return NextResponse.json(data);
}

import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { email, zipCode, city } = await req.json();
    const supabase = getSupabaseAdmin();

    // Check if user already on waitlist for this zip code
    const { data: existing } = await supabase
      .from('waitlist')
      .select('id')
      .eq('email', email)
      .eq('zip_code', zipCode)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ message: 'Bereits auf der Warteliste' }, { status: 400 });
    }

    const { error: insertError } = await supabase
      .from('waitlist')
      .insert({ email, zip_code: zipCode, city: city || 'Unbekannt' });

    if (insertError) throw insertError;

    // Count unique signups for this zip code
    const { count, error: countError } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true })
      .eq('zip_code', zipCode);

    if (countError) throw countError;

    const currentCount = count || 0;

    if (currentCount >= 10) {
      // Trigger notification (Log for now)
      console.log(`[NOTIFICATION] Schwellenwert erreicht: ${currentCount} Personen warten in PLZ ${zipCode}`);
      // Future: Trigger N8N or Resend here
    }

    return NextResponse.json({ success: true, count: currentCount });
  } catch (error: any) {
    console.error('Waitlist error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const zipCode = searchParams.get('zipCode');

  if (!zipCode) {
    return NextResponse.json({ error: 'zipCode is required' }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const { count, error } = await supabase
    .from('waitlist')
    .select('*', { count: 'exact', head: true })
    .eq('zip_code', zipCode);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ count: count || 0 });
}

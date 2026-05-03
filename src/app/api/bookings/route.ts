import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      shop_id, 
      user_id, 
      bike_type_id, 
      repair_type_id, 
      scheduled_at,
      final_price 
    } = body;

    // Validate input
    if (!shop_id || !bike_type_id || !repair_type_id || !scheduled_at) {
      return NextResponse.json({ error: 'Fehlende Pflichtfelder' }, { status: 400 });
    }

    // Calculate commission (25%)
    const commission_amount = final_price ? final_price * 0.25 : 0;

    const { data, error } = await supabase
      .from('bookings')
      .insert({
        shop_id,
        user_id,
        bike_type_id,
        repair_type_id,
        scheduled_at,
        final_price,
        commission_amount,
        status: 'ausstehend'
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: 'Datenbankfehler' }, { status: 500 });
    }

    // Mark slot as unavailable (simplified logic)
    // In a real app, this should be a transaction or use a trigger/RPC
    await supabase
      .from('slots')
      .update({ is_available: false })
      .eq('shop_id', shop_id)
      .eq('starts_at', scheduled_at);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Ungültige Anfrage' }, { status: 400 });
  }
}

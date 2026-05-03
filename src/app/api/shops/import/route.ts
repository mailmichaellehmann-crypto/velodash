import { NextResponse } from 'next/server';
import { getPlaceDetails } from '@/lib/google-places';
import { getSupabaseAdmin } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { placeId } = await request.json();

    if (!placeId) {
      return NextResponse.json({ error: 'placeId ist erforderlich' }, { status: 400 });
    }

    const details = await getPlaceDetails(placeId);
    const supabase = getSupabaseAdmin();

    // Generate a slug from name
    const slug = details.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    // Extract city from formatted_address (German format: Müllerstraße 12, 13353 Berlin, Deutschland)
    const addressParts = details.address.split(',');
    const cityPart = addressParts[addressParts.length - 2]?.trim() || '';
    // Handle cases like "13353 Berlin"
    const cityMatch = cityPart.match(/[0-9]{5}\s+(.+)/);
    const city = cityMatch ? cityMatch[1] : (cityPart || 'Unbekannt');

    const { data, error } = await supabase
      .from('shops')
      .upsert({
        google_place_id: details.place_id,
        name: details.name,
        slug: slug,
        address: details.address,
        phone: details.phone_number,
        rating: details.rating,
        user_ratings_total: details.user_ratings_total,
        photo_reference: details.photo_reference,
        is_active: false,
        city: city,
        outreach_status: 'ausstehend',
      }, { onConflict: 'google_place_id' })
      .select()
      .single();

    if (error) {
      console.error('Import error:', error);
      return NextResponse.json({ error: 'Fehler beim Importieren des Shops' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Import error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

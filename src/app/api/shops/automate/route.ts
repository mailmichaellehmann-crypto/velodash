import { NextResponse } from 'next/server';
import { searchBikeShops, getPlaceDetails } from '@/lib/google-places';
import { sendOutreachEmail } from '@/lib/outreach';
import { getSupabaseAdmin } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { city } = await request.json();

    if (!city) {
      return NextResponse.json({ error: 'Stadt ist erforderlich' }, { status: 400 });
    }

    // 1. Discover
    const candidates = await searchBikeShops(city);
    const supabase = getSupabaseAdmin();
    const results = [];

    for (const candidate of candidates) {
      // 2. Score & Filter (Rating > 4.0 and more than 5 ratings)
      if (candidate.rating && candidate.rating < 4.0) continue;
      if (candidate.user_ratings_total && candidate.user_ratings_total < 5) continue;
      
      // Get full details
      const details = await getPlaceDetails(candidate.place_id);
      
      // Placeholder email logic (In real scenario, we'd use a web scraper or lead gen API)
      const email = `kontakt@${details.name.toLowerCase().replace(/[^a-z0-9]+/g, '')}.de`;

      const slug = details.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

      // 3. Import to DB
      const { data: shop, error: importError } = await supabase
        .from('shops')
        .upsert({
          google_place_id: details.place_id,
          name: details.name,
          slug: slug,
          address: details.address,
          phone: details.phone_number,
          email: email,
          rating: details.rating,
          user_ratings_total: details.user_ratings_total,
          photo_reference: details.photo_reference,
          is_active: false,
          city: city,
          outreach_status: 'ausstehend',
        }, { onConflict: 'google_place_id' })
        .select()
        .single();

      if (importError) {
        console.error(`Import failed for ${details.name}:`, importError);
        continue;
      }

      // 4. Send Outreach
      try {
        await sendOutreachEmail({
          to: email,
          shopName: shop.name,
          city: city,
          estimatedRevenue: 1200 + Math.floor(Math.random() * 800), // Simulated monthly revenue
        });

        // 5. Track Status
        await supabase
          .from('shops')
          .update({ outreach_status: 'kontaktiert' })
          .eq('id', shop.id);
          
        results.push({ name: shop.name, status: 'kontaktiert' });
      } catch (outreachError) {
        console.error(`Outreach failed for ${shop.name}:`, outreachError);
        results.push({ name: shop.name, status: 'outreach_fehlgeschlagen' });
      }
    }

    return NextResponse.json({ 
      success: true, 
      processed_count: results.length, 
      results 
    });
  } catch (error: any) {
    console.error('Automation error:', error);
    return NextResponse.json({ error: 'Automatisierung fehlgeschlagen' }, { status: 500 });
  }
}

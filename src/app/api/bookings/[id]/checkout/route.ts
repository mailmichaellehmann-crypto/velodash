import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { createCheckoutSession } from '@/lib/stripe';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: bookingId } = await params;
  const { return_url, cancel_url } = await request.json();

  const { data: booking, error: bookingError } = await supabase
    .from('bookings')
    .select(`
      *,
      shops(stripe_account_id)
    `)
    .eq('id', bookingId)
    .single();

  if (bookingError || !booking) {
    return NextResponse.json({ error: 'Buchung nicht gefunden' }, { status: 404 });
  }

  const shop = booking.shops as any;
  if (!shop?.stripe_account_id) {
    return NextResponse.json({ error: 'Shop hat kein Stripe-Konto' }, { status: 400 });
  }

  try {
    const session = await createCheckoutSession({
      amount: Math.round(booking.final_price * 100), // convert to cents
      currency: 'eur',
      shopStripeAccountId: shop.stripe_account_id,
      bookingId: booking.id,
      successUrl: return_url,
      cancelUrl: cancel_url,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    return NextResponse.json({ error: 'Fehler beim Erstellen der Checkout-Sitzung' }, { status: 500 });
  }
}

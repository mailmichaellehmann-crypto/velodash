import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getSupabaseAdmin } from '@/lib/supabase';
import Stripe from 'stripe';

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret!);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      const bookingId = session.payment_intent_data?.metadata?.bookingId || session.metadata?.bookingId;

      if (bookingId) {
        // Update booking status to confirmed
        await supabase
          .from('bookings')
          .update({ 
            status: 'confirmed',
            stripe_payment_intent_id: session.payment_intent as string 
          })
          .eq('id', bookingId);
      }
      break;

    case 'account.updated':
      const account = event.data.object as Stripe.Account;
      if (account.details_submitted) {
        // Update shop to active or mark as onboarded
        await supabase
          .from('shops')
          .update({ is_active: true })
          .eq('stripe_account_id', account.id);
      }
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

// Stripe requires the raw body for signature verification
export const config = {
  api: {
    bodyParser: false,
  },
};

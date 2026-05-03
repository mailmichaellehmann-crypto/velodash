import { NextResponse } from 'next/server';
import { createConnectAccount, createAccountLink } from '@/lib/stripe';
import { getSupabaseAdmin } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { shop_id, email, return_url } = await request.json();

    if (!shop_id || !email) {
      return NextResponse.json({ error: 'shop_id oder E-Mail fehlt' }, { status: 400 });
    }

    const account = await createConnectAccount(email);
    
    const supabase = getSupabaseAdmin();
    await supabase
      .from('shops')
      .update({ stripe_account_id: account.id })
      .eq('id', shop_id);

    const accountLink = await createAccountLink(
      account.id,
      return_url,
      `${process.env.NEXT_PUBLIC_BASE_URL}/onboarding/refresh?shop_id=${shop_id}`
    );

    return NextResponse.json({ url: accountLink.url });
  } catch (error: any) {
    return NextResponse.json({ error: 'Fehler beim Onboarding' }, { status: 500 });
  }
}

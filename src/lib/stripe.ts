import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || 'sk_placeholder';

export const stripe = new Stripe(stripeSecretKey);

/**
 * Creates a Stripe Checkout Session with Destination Charges.
 * This automatically splits the payment between the platform (commission) and the shop.
 */
export const createCheckoutSession = async ({
  amount,
  currency = 'eur',
  shopStripeAccountId,
  bookingId,
  successUrl,
  cancelUrl,
}: {
  amount: number;
  currency?: string;
  shopStripeAccountId: string;
  bookingId: string;
  successUrl: string;
  cancelUrl: string;
}) => {
  const commissionAmount = Math.round(amount * 0.25); // 25% commission

  return await stripe.checkout.sessions.create({
    payment_method_types: ['card', 'sepa_debit', 'paypal'],
    line_items: [
      {
        price_data: {
          currency,
          product_data: {
            name: 'Fahrrad Reparatur Express',
          },
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    payment_intent_data: {
      application_fee_amount: commissionAmount,
      transfer_data: {
        destination: shopStripeAccountId,
      },
      metadata: {
        bookingId,
      },
    },
    success_url: successUrl,
    cancel_url: cancelUrl,
  });
};

/**
 * Onboards a shop by creating a Stripe Connect Express account.
 */
export const createConnectAccount = async (email: string) => {
  return await stripe.accounts.create({
    type: 'express',
    email,
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true },
    },
  });
};

/**
 * Generates an account link for the shop owner to complete onboarding.
 */
export const createAccountLink = async (accountId: string, returnUrl: string, refreshUrl: string) => {
  return await stripe.accountLinks.create({
    account: accountId,
    refresh_url: refreshUrl,
    return_url: returnUrl,
    type: 'account_onboarding',
  });
};

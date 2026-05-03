# VeloDash — Operations & Deployment Guide (Bulletproof Version)

Welcome to the VeloDash operations manual. This guide is designed for engineers and ops teams to deploy the platform from scratch with zero prior knowledge.

## 1. Prerequisites & API Keys

Before starting, ensure you have accounts with:
- **Supabase** (Database & Auth)
- **Stripe** (Payments & Connect)
- **Google Cloud Console** (Maps/Places)
- **Resend** (Email)
- **Vercel** (Hosting)

### Environment Variables (`.env.local`)

Copy `.env.local.example` and fill in the following:

| Variable | Source | Description |
|----------|--------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Project Settings | Project API URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Project Settings | Public API key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Project Settings | **Private** admin key for the bot |
| `STRIPE_SECRET_KEY` | Stripe Dashboard (API Keys) | `sk_test_...` or `sk_live_...` |
| `STRIPE_WEBHOOK_SECRET` | Stripe CLI or Dashboard | For verifying webhook events |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe Dashboard | `pk_test_...` |
| `GOOGLE_PLACES_API_KEY` | Google Cloud Console | Enable "Places API (New)" |
| `RESEND_API_KEY` | Resend Dashboard | API key for outreach emails |
| `NEXT_PUBLIC_BASE_URL` | Vercel / Custom Domain | e.g. `https://velodash.de` |

## 2. Deployment Order (Critical)

Follow this exact sequence to avoid integration failures:

### Step 1: Database Initialization
1. Create a new Supabase project.
2. Go to the **SQL Editor**.
3. Execute the content of `supabase/migrations/001_initial_schema.sql`.
4. Execute the content of `supabase/migrations/002_google_places_outreach.sql`.
5. **Real-time Setup**: Go to *Database -> Replication -> supabase_realtime*. Ensure the `slots` table is toggled to **Enabled**.

### Step 2: Stripe Connect Setup
1. In your Stripe Dashboard, go to **Connect**.
2. Complete the platform onboarding.
3. Set your platform's branding (logo, colors).
4. Go to **Developers -> Webhooks**.
5. Add an endpoint: `https://your-domain.com/api/stripe/webhook`.
6. Select events: `checkout.session.completed`, `account.updated`.

### Step 3: Vercel Hosting
1. Push the repository to GitHub.
2. Connect the repo to Vercel.
3. Add all variables from Section 1 to *Project Settings -> Environment Variables*.
4. **Build Settings**: Next.js (default).
5. Deploy.

### Step 4: GitHub Actions (CI/CD)
Add these secrets to your GitHub Repo (*Settings -> Secrets and variables -> Actions*):
- `VERCEL_TOKEN`: Get from Vercel User Settings (Tokens).
- `VERCEL_ORG_ID`: Found in Vercel Team Settings.
- `VERCEL_PROJECT_ID`: Found in Vercel Project Settings.

## 3. Post-Deployment Operations

### Triggering Shop Acquisition
The platform starts empty. To seed it with shops:
1. Call the automation endpoint (e.g., via Postman or cURL):
   ```bash
   curl -X POST https://your-domain.com/api/shops/automate \
     -H "Content-Type: application/json" \
     -d '{"city": "Berlin"}'
   ```
2. Monitor the `shops` table in Supabase for status changes to `kontaktiert`.

### Handling the Waitlist
When a German ZIP code (PLZ) reaches 10 signups, the `waitlist` table will flag it.
- **Action**: Check the `waitlist` table periodically. Filter by `signup_count >= 10`.
- **Acquisition**: Run the `automate` endpoint for the specific city associated with that PLZ.

## 4. Troubleshooting

- **Checkouts failing?** Verify `STRIPE_WEBHOOK_SECRET` matches exactly and your Vercel URL is correctly set in Stripe.
- **No shops found?** Ensure "Places API (New)" is enabled in Google Cloud Console, not just the legacy "Places API".
- **Email not sending?** Ensure your domain is verified in the Resend dashboard.

---
*VeloDash — German Engineered Reliability.*

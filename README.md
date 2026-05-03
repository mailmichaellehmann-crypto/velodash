# VeloDash — Operations & Deployment Guide

Welcome to the VeloDash operations manual. This guide contains everything you need to set up, deploy, and maintain the VeloDash platform.

## 1. Environment Configuration

Copy `.env.local.example` to `.env.local` and fill in the following keys:

### Supabase (Database & Auth)
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Public anon key for client-side access.
- `SUPABASE_SERVICE_ROLE_KEY`: Service role key for administrative tasks (e.g., Merchant Acquisition Bot).

### Stripe (Payments)
- `STRIPE_SECRET_KEY`: Secret key for server-side API calls.
- `STRIPE_WEBHOOK_SECRET`: Secret for verifying Stripe webhooks.
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Publishable key for the frontend.

### Integration Partners
- `GOOGLE_PLACES_API_KEY`: Required for the Shop Discovery Bot.
- `RESEND_API_KEY`: API key for automated merchant outreach emails.
- `NEXT_PUBLIC_BASE_URL`: The base URL of the deployed application (e.g., `https://velodash.de`).

## 2. Deployment Order (Step-by-Step)

To ensure a smooth launch, follow this exact sequence:

1.  **Supabase Infrastructure**:
    *   Create a Supabase project.
    *   Apply migrations in `supabase/migrations/` (001 then 002).
    *   Enable Real-time for `slots` table.
2.  **Stripe Configuration**:
    *   Set up a Stripe Connect platform in your Stripe Dashboard.
    *   Configure the Webhook endpoint to point to `your-domain.com/api/stripe/webhook`.
3.  **Vercel Deployment**:
    *   Push code to GitHub.
    *   Connect to Vercel and add all environment variables from Section 1.
    *   Deploy.
4.  **Merchant Discovery**:
    *   Once deployed, trigger the first batch of shop acquisitions via `/api/shops/automate`.

## 3. Database Setup

VeloDash uses Supabase. To initialize the database:

1. Create a new project in the [Supabase Dashboard](https://supabase.com).
2. Run the migrations located in `supabase/migrations/` in order:
    - `001_initial_schema.sql`: Sets up tables, enums, RLS, and seed data.
    - `002_google_places_outreach.sql`: Adds columns for shop discovery tracking.
3. Enable **Real-time** for the `slots` table in the Supabase Replication settings.

## 3. Merchant Acquisition Bot

The bot is designed to find and contact high-potential bike shops.

- **Discovery**: Call `GET /api/shops/discover?city=Berlin` to find shops.
- **Automated Outreach**: Call `POST /api/shops/automate` with `{"city": "Berlin"}`. This will:
    1. Find shops in Berlin via Google Places.
    2. Filter for ratings > 4.0.
    3. Import them into the `shops` table.
    4. Send a personalized outreach email via Resend.
    5. Update status to `kontaktiert`.

## 4. Shop Onboarding & Payouts

1. Shops land on `/shops/claim`.
2. They enter their details and are redirected to **Stripe Connect Express** for verification.
3. Once verified, they can toggle "Emergency Slot Available" on their `/dashboard`.
4. **Commission**: VeloDash takes a **25% commission** on every booking. This is handled automatically via Stripe Destination Charges.

## 5. Viral Waitlist

If a user enters a PLZ where no shops are active:
1. They are prompted to join the waitlist.
2. Signups are stored in the `waitlist` table.
3. Once a PLZ reaches **10 signups**, a notification is triggered for the ops team to acquire a shop in that area.

## 6. Deployment (Vercel)

VeloDash is optimized for Vercel and Edge Functions.

### CI/CD with GitHub Actions
The project includes a `.github/workflows/deploy.yml` that handles automatic deployments. Ensure the following secrets are set in your GitHub repository:
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

### Production Deployment
1. Connect your repository to Vercel.
2. Configure all environment variables in the Vercel Dashboard.
3. Ensure the `edge` runtime is used for performance-critical routes (already configured in `src/app/api`).

## 7. Performance & SEO

- **Localized Pages**: Static city pages are generated for core markets (Berlin, München, etc.).
- **Edge Functions**: AI estimation and SEO generation run on the Edge for sub-100ms response times.
- **German Language**: All customer-facing copy must remain in German to maintain brand consistency in the DACH region.

---
*VeloDash — German Engineered Reliability.*

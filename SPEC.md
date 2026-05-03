# VeloDash — Technical Specification (Final)

## 1. Concept & Vision

**VeloDash** is an autonomous marketplace for premium bike repair express slots in Germany. Users enter their bike type + problem, get an AI-estimated repair time, and book available slots within 5km — no waiting, premium service. Mechanics toggle "Emergency Slot Available" with one click. Shop owners get automatic payouts via Stripe Connect minus our 25% commission.

**Brand Voice**: Fast, professional, German-engineered reliability with modern tech convenience. The UI follows the **"Vicky UI"** design language — bold typography, slate/blue accents, and ultra-smooth Framer Motion transitions.

## 2. Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router) + Tailwind CSS + Framer Motion |
| Backend | Supabase (PostgreSQL + Real-time) |
| Payments | Stripe Connect (Destination charges, 25% commission) |
| Email | Resend (Merchant Outreach) |
| Maps | Google Places API (Shop Discovery) |
| Deployment | Vercel Edge Functions |

## 3. Database Schema (Supabase/PostgreSQL)

### Multi-Tenant Design

```
shops
  ├── id (uuid, pk)
  ├── name (text)
  ├── slug (text, unique)
  ├── address (text)
  ├── city (text)
  ├── zip_code (text)
  ├── lat (numeric)
  ├── lng (numeric)
  ├── phone (text)
  ├── email (text)
  ├── google_place_id (text, unique) -- Integration ID
  ├── rating (numeric) -- Google Rating
  ├── user_ratings_total (int)
  ├── photo_reference (text)
  ├── outreach_status (enum: ausstehend | kontaktiert | angemeldet)
  ├── stripe_account_id (text)
  ├── is_active (boolean)
  └── created_at (timestamptz)

users
  ├── id (uuid, pk)
  ├── email (text, unique)
  ├── name (text)
  ├── phone (text)
  ├── role (enum: kunde | ladenbesitzer | admin)
  └── created_at (timestamptz)

bike_types
  ├── id (uuid, pk)
  ├── name (text) -- "Rennrad", "Mountainbike", etc.
  └── base_price_multiplier (numeric)

repair_types
  ├── id (uuid, pk)
  ├── name (text)
  ├── estimated_minutes (int)
  └── base_price (numeric)

bookings
  ├── id (uuid, pk)
  ├── shop_id (uuid, fk)
  ├── user_id (uuid, fk)
  ├── bike_type_id (uuid, fk)
  ├── repair_type_id (uuid, fk)
  ├── status (enum: ausstehend | bestätigt | in_bearbeitung | abgeschlossen | storniert)
  ├── scheduled_at (timestamptz)
  ├── estimated_duration_minutes (int)
  ├── final_price (numeric)
  ├── commission_amount (numeric) -- 25%
  ├── stripe_payment_intent_id (text)
  └── created_at (timestamptz)

slots
  ├── id (uuid, pk)
  ├── shop_id (uuid, fk)
  ├── starts_at (timestamptz)
  ├── ends_at (timestamptz)
  ├── is_available (boolean)
  ├── is_express (boolean)
  └── created_at (timestamptz)

waitlist
  ├── id (uuid, pk)
  ├── zip_code (text)
  ├── city (text)
  ├── email (text)
  ├── signup_count (int)
  └── created_at (timestamptz)

city_pages
  ├── id (uuid, pk)
  ├── city (text, unique)
  ├── seo_title (text)
  ├── seo_description (text)
  ├── hero_headline (text)
  ├── hero_subtext (text)
  ├── benefits (text[])
  ├── faq (jsonb)
  └── generated_at (timestamptz)
```

## 4. Core User Flows (Implemented)

### Flow 1: Premium Booking Experience
- **Dynamic City Landing Pages**: Optimized for SEO in 50+ German cities.
- **AI Estimation**: Instant repair time and price calculation via Vercel Edge Functions.
- **Real-time Slot Picking**: Visual selector for express vs. standard slots.
- **Stripe Checkout**: Automated 25% split between platform and merchant.

### Flow 2: Mechanic Operations (Dashboard)
- **One-Click Emergency Toggle**: Mechanics can immediately open slots to high-intent users.
- **Stripe Connect Onboarding**: Fast-track setup for new merchants.
- **Earnings Tracking**: Real-time visibility into revenue and payouts.

### Flow 3: The "Growth Loop"
- **Viral Waitlist**: Captures user intent in new areas.
- **10-Person Threshold**: Triggers a notification once a PLZ hits 10 signups.
- **Merchant Bot**: Automated discovery and outreach to shops in high-demand PLZs.

## 5. API Endpoints

### Public / SEO
- `GET /api/repair-types` — Core repair data.
- `GET /api/waitlist?zip_code=...` — Get current waitlist count.
- `POST /api/waitlist` — Join the waitlist.

### Merchant Acquisition (Bot)
- `GET /api/shops/discover` — Find shops via Google Places.
- `POST /api/shops/import` — Import shop to DB.
- `POST /api/shops/automate` — Complete discover-import-outreach loop.

### Booking & Payments
- `POST /api/bookings/[id]/checkout` — Create Stripe session.
- `POST /api/stripe/webhook` — Process payment success.

## 6. Project Architecture (File Structure)

```
velodash/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── ai-estimate/      # Edge
│   │   │   ├── waitlist/         # Viral loop
│   │   │   ├── shops/automate/   # Merchant Bot
│   │   │   └── stripe/webhook/   # Payments
│   │   ├── reparatur/[city]/     # SEO Pages
│   │   ├── dashboard/            # Merchant UI
│   │   └── shops/claim/          # Onboarding
│   ├── components/
│   │   ├── BookingFlow.tsx
│   │   ├── SlotPicker.tsx
│   │   └── WaitlistForm.tsx      # PLZ tracking
│   └── lib/
│       ├── supabase.ts
│       ├── stripe.ts             # Connect integration
│       ├── google-places.ts      # Discovery
│       └── outreach.ts           # Resend integration
├── supabase/
│   └── migrations/
│       ├── 001_initial_schema.sql
│       └── 002_google_places_outreach.sql
└── vercel.json
```

## 7. Acceptance Criteria (Completion Status)

- [x] Database schema created in Supabase (Initial + Outreach migrations)
- [x] 5 localized SEO pages working (Berlin, München, Hamburg, Köln, Frankfurt)
- [x] Booking flow functional with AI estimation and Slot Picker
- [x] Shop dashboard with one-click emergency slot toggle
- [x] Stripe Connect integration with 25% destination charge logic
- [x] Viral waitlist implemented with PLZ count badge
- [x] Merchant Acquisition Bot with Google Places + Resend outreach
- [x] Vercel Edge Functions for ultra-fast load times
- [x] CI/CD pipeline configured for automated deployment

---
*VeloDash Status: Version 1.0 Production Ready.*

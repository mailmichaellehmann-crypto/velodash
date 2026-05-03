# VeloDash — Technical Specification

## 1. Concept & Vision

**VeloDash** is an autonomous marketplace for premium bike repair express slots in Germany. Users enter their bike type + problem, get an AI-estimated repair time, and book available slots within 5km — no waiting, premium service. Mechanics toggle "Emergency Slot Available" with one click. Shop owners get automatic payouts via Stripe Connect minus our 25% commission.

**Brand Voice**: Fast, professional, German-engineered reliability with modern tech convenience.

## 2. Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router) + Tailwind CSS + Framer Motion |
| Backend | Supabase (PostgreSQL + Real-time) |
| Payments | Stripe Connect (Destination charges, 25% commission) |
| Email | Resend + N8N automation |
| Maps | Google Places API |
| Deployment | Vercel Edge Functions |

## 3. Database Schema (Supabase/PostgreSQL)

### Multi-Tenant Design

```
shops
  ├── id (uuid, pk)
  ├── name (text)
  ├── slug (text, unique) -- URL-friendly identifier
  ├── address (text)
  ├── city (text) -- German city name
  ├── zip_code (text)
  ├── lat (numeric)
  ├── lng (numeric)
  ├── phone (text)
  ├── email (text)
  ├── stripe_account_id (text) -- Stripe Connect account
  ├── is_active (boolean)
  ├── created_at (timestamptz)

users
  ├── id (uuid, pk)
  ├── email (text, unique)
  ├── name (text)
  ├── phone (text)
  ├── role (enum: customer | shop_owner | admin)
  ├── created_at (timestamptz)

shop_users (junction)
  ├── shop_id (uuid, fk -> shops)
  ├── user_id (uuid, fk -> users)
  └── role (enum: owner | mechanic)

bike_types
  ├── id (uuid, pk)
  ├── name (text) -- e.g., "Rennrad", "Mountainbike", "E-Bike"
  ├── base_price_multiplier (numeric)

repair_types
  ├── id (uuid, pk)
  ├── name (text) -- e.g., "Kette wechseln", "Bremsen einstellen"
  ├── estimated_minutes (int)
  ├── base_price (numeric)

bookings
  ├── id (uuid, pk)
  ├── shop_id (uuid, fk -> shops)
  ├── user_id (uuid, fk -> users)
  ├── bike_type_id (uuid, fk -> bike_types)
  ├── repair_type_id (uuid, fk -> repair_types)
  ├── status (enum: pending | confirmed | in_progress | completed | cancelled)
  ├── scheduled_at (timestamptz)
  ├── estimated_duration_minutes (int)
  ├── final_price (numeric)
  ├── commission_amount (numeric) -- 25% of final_price
  ├── stripe_payment_intent_id (text)
  ├── created_at (timestamptz)

slots (real-time availability)
  ├── id (uuid, pk)
  ├── shop_id (uuid, fk -> shops)
  ├── starts_at (timestamptz)
  ├── ends_at (timestamptz)
  ├── is_available (boolean)
  ├── is_express (boolean) -- emergency slot flag
  ├── created_at (timestamptz)

waitlist
  ├── id (uuid, pk)
  ├── zip_code (text)
  ├── city (text)
  ├── email (text)
  ├── signup_count (int) -- votes for this area
  ├── created_at (timestamptz)

city_pages (SEO content cache)
  ├── id (uuid, pk)
  ├── city (text, unique)
  ├── seo_title (text)
  ├── seo_description (text)
  ├── hero_headline (text)
  ├── hero_subtext (text)
  ├── benefits (text[])
  ├── faq (jsonb)
  ├── generated_at (timestamptz)
```

### Row-Level Security (RLS)

- Users see only their own bookings
- Shop owners see only their shop's slots and bookings
- Public read access to city_pages for SEO

## 4. Core User Flows

### Flow 1: Customer books a repair slot
1. User lands on `/reparatur/[city]` page (e.g., `/reparatur/berlin`)
2. Selects bike type (Rennrad / MTB / E-Bike / Trekkingrad)
3. Describes problem (dropdown + free text)
4. AI estimates repair time + price (shown immediately)
5. System shows available Express Slots within 5km (real-time via Supabase Realtime)
6. User selects slot -> Stripe checkout with destination charge
7. Confirmation + SMS/email reminder

### Flow 2: Shop owner manages slots
1. Shop owner logs in to `/dashboard`
2. Toggles "Emergency Slot Available" with single click
3. Views upcoming bookings
4. Receives automatic payouts (Stripe Connect)

### Flow 3: Waitlist / Viral loop
1. User enters zip code -> no available shops
2. Shown "Vote for your city" form
3. When 10 people sign up for same zip code, notify owner
4. Owner acquires shop in that area

## 5. API Endpoints

### Public
- `GET /api/cities` — list supported cities
- `GET /api/repair-types` — list repair types with base prices
- `GET /api/slots?city={city}&date={date}` — available slots in city

### Authenticated (Customer)
- `POST /api/bookings` — create booking
- `GET /api/bookings` — user's bookings

### Shop Owner
- `GET /api/shop/slots` — shop's slots
- `POST /api/shop/slots` — create slot
- `PATCH /api/shop/slots/:id/toggle` — toggle emergency/express
- `GET /api/shop/bookings` — shop's bookings

### Admin
- `POST /api/admin/shops` — onboard new shop
- `POST /api/shops/claim` — shop claims their listing

## 6. SEO Factory — Localized Landing Pages

Generate `/reparatur/[city]` pages for 50+ German cities using LLM-generated, SEO-optimized content for "Fahrrad Reparatur Express [Stadt]".

**Structure:**
- `src/app/reparatur/[city]/page.tsx` — dynamic route
- `src/lib/seo-content/[city].json` — cached SEO content

**Cities (first 5):**
1. Berlin
2. München
3. Hamburg
4. Köln
5. Frankfurt

**SEO Template Variables:**
- `{city}` → German city name
- `{city_genitive}` → genitive form ("Berliner", "Münchner")
- `{popular_repairs}` → city-specific popular repair types

## 7. Stripe Connect Flow

1. Shop onboard via Stripe Connect Express
2. Customer pays → Stripe deducts 25% commission → remainder to shop's Connect account
3. Payouts automatic on weekly schedule

## 8. Vercel Edge Functions

- `/api/ai-estimate` — AI repair time estimation (Edge)
- `/api/seo/generate` — Generate SEO content for new city (Edge)

## 9. File Structure

```
velodash/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx (home/landing)
│   │   ├── reparatur/
│   │   │   └── [city]/
│   │   │       └── page.tsx
│   │   ├── dashboard/
│   │   │   └── page.tsx (shop owner)
│   │   └── api/
│   │       ├── slots/
│   │       ├── bookings/
│   │       └── stripe/
│   ├── components/
│   │   ├── BookingFlow.tsx
│   │   ├── SlotPicker.tsx
│   │   ├── CityHero.tsx
│   │   └── WaitlistForm.tsx
│   └── lib/
│       ├── supabase.ts
│       ├── stripe.ts
│       ├── google-places.ts
│       └── seo-content.ts
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql
├── scripts/
│   └── seo-factory.ts
└── package.json
```

## 10. Acceptance Criteria

- [ ] Database schema created in Supabase
- [ ] 5 localized SEO pages working (`/reparatur/berlin`, etc.)
- [ ] Booking flow functional end-to-end
- [ ] Shop dashboard with emergency slot toggle
- [ ] Stripe Connect integration with 25% commission
- [ ] Waitlist viral loop implemented
- [ ] Vercel Edge Functions for AI estimation

# VeloDash — Technical Specification (Final V1.0)

## 1. Concept & Vision

**VeloDash** is an autonomous marketplace for premium bike repair express slots in Germany. Users enter their bike type + problem, get an AI-estimated repair time, and book available slots within 5km — no waiting, premium service. 

**Brand Voice**: Fast, professional, German-engineered reliability. 
**Design Language (Vicky UI)**: 
- **Palette**: Carbon Black (`#1A1A1A`), Slate (`#4A5568`), Safety Orange (`#FF5F1F`).
- **Typography**: Bold, high-contrast headings with mono-spaced utility details.
- **Motion**: Ultra-smooth transitions via `framer-motion` for all step-based flows.

## 2. Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 14 App Router, Tailwind CSS, Framer Motion, Lucide Icons |
| **Backend** | Supabase (PostgreSQL), Edge Functions (Vercel) |
| **Payments** | Stripe Connect (Destination charges, 25% commission) |
| **Automation** | Resend (Merchant Outreach), Google Places API (Discovery) |

## 3. Implemented Features

### 3.1. User Experience
- **Dynamic City Routing**: `/reparatur/[city]` pages for Berlin, München, Hamburg, Köln, and Frankfurt.
- **AI Repair Estimator**: Real-time estimation of time and cost based on bike type + problem.
- **Premium Slot Picker**: Visual toggle for "Express" slots (highlighted in Safety Orange).
- **Stripe Checkout**: Seamless payment integration with automatic shop payouts.

### 3.2. Merchant Acquisition & Operations
- **Merchant Bot**: Automated script that searches Google Places for high-rated bike shops and triggers email outreach.
- **Revenue Simulator**: Landing page for shops showing simulated "lost revenue" to drive onboarding.
- **Shop Dashboard**: Mobile-optimized mechanic view with "Emergency Toggle" for real-time slot management.
- **Onboarding Flow**: 3-step verification process integrated with Stripe Connect Express.

### 3.3. Growth Engine
- **Viral Waitlist Loop**: ZIP-code based capture for areas without active coverage.
- **10-Person Threshold**: Notification system for the operations team when demand in a PLZ peaks.

## 4. API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/repair-types` | Fetch core repair services and base prices |
| `GET` | `/api/waitlist` | Retrieve signup counts for a specific PLZ |
| `POST` | `/api/waitlist` | Join the waitlist for a specific area |
| `GET` | `/api/shops/discover` | Discover shops via Google Places API |
| `POST` | `/api/shops/automate` | Run full discover-score-outreach loop |
| `POST` | `/api/stripe/webhook` | Process payment and Connect account updates |

## 5. File Structure (Source of Truth)

```
velodash/
├── src/
│   ├── app/
│   │   ├── api/                  # All backend logic
│   │   ├── dashboard/            # Merchant interface
│   │   ├── reparatur/[city]/     # SEO City Landing Pages
│   │   └── shops/claim/          # Shop onboarding
│   ├── components/
│   │   ├── BookingFlow.tsx       # AI Estimator + Multi-step form
│   │   ├── SlotPicker.tsx        # Real-time availability UI
│   │   ├── CityHero.tsx          # Asymmetrical premium hero
│   │   └── WaitlistForm.tsx      # Viral demand tracker
│   └── lib/
│       ├── stripe.ts             # Destination charge logic
│       ├── google-places.ts      # Mapping integration
│       └── outreach.ts           # Resend email templates
├── supabase/
│   └── migrations/               # Database schema (001, 002)
└── vercel.json                   # Edge Function config
```

## 6. Acceptance Criteria (Final Status)

V1.0 is officially "Production Ready" with all core requirements fulfilled:

- [x] **Task 1-5**: Base infrastructure, project initialization, and shared UI setup.
- [x] **Task 6-10**: City landing pages (Berlin, München, etc.) and dynamic routing.
- [x] **Task 11-13**: Booking flow logic, AI estimation, and Slot Picker implementation.
- [x] **Task 14-15**: Shop Dashboard, emergency toggle, and Stripe Connect integration.
- [x] **Task 16-17**: Merchant Acquisition Bot, Google Places, and Resend outreach.
- [x] **Task 18-21**: Waitlist loop, PLZ demand tracking, and full documentation.

---
*VeloDash — Version 1.0. Build Complete.*

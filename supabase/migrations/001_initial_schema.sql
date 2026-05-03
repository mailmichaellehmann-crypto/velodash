-- Initial Schema for VeloDash

-- Enums
CREATE TYPE user_role AS ENUM ('kunde', 'ladenbesitzer', 'admin');
CREATE TYPE booking_status AS ENUM ('ausstehend', 'bestätigt', 'in_bearbeitung', 'abgeschlossen', 'storniert');
CREATE TYPE shop_user_role AS ENUM ('eigentümer', 'mechaniker');

-- Tables
CREATE TABLE shops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  address TEXT,
  city TEXT NOT NULL,
  zip_code TEXT,
  lat NUMERIC,
  lng NUMERIC,
  phone TEXT,
  email TEXT,
  stripe_account_id TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  phone TEXT,
  role user_role DEFAULT 'customer',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE shop_users (
  shop_id UUID REFERENCES shops(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role shop_user_role DEFAULT 'mechanic',
  PRIMARY KEY (shop_id, user_id)
);

CREATE TABLE bike_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  base_price_multiplier NUMERIC DEFAULT 1.0
);

CREATE TABLE repair_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  estimated_minutes INTEGER NOT NULL,
  base_price NUMERIC NOT NULL
);

CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shop_id UUID REFERENCES shops(id),
  user_id UUID REFERENCES users(id),
  bike_type_id UUID REFERENCES bike_types(id),
  repair_type_id UUID REFERENCES repair_types(id),
  status booking_status DEFAULT 'pending',
  scheduled_at TIMESTAMPTZ NOT NULL,
  estimated_duration_minutes INTEGER,
  final_price NUMERIC,
  commission_amount NUMERIC,
  stripe_payment_intent_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shop_id UUID REFERENCES shops(id) ON DELETE CASCADE,
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ NOT NULL,
  is_available BOOLEAN DEFAULT TRUE,
  is_express BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  zip_code TEXT,
  city TEXT,
  email TEXT NOT NULL,
  signup_count INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE city_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city TEXT UNIQUE NOT NULL,
  seo_title TEXT,
  seo_description TEXT,
  hero_headline TEXT,
  hero_subtext TEXT,
  benefits TEXT[],
  faq JSONB,
  generated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Real-time settings (Supabase specific)
ALTER PUBLICATION supabase_realtime ADD TABLE slots;

-- RLS (Row Level Security)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE shops ENABLE ROW LEVEL SECURITY;
ALTER TABLE city_pages ENABLE ROW LEVEL SECURITY;

-- Policies (Simplified for now, will be refined by Lead/Backend)
CREATE POLICY "Users can see their own data" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can see their own bookings" ON bookings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Public can see active shops" ON shops FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public can see city pages" ON city_pages FOR SELECT USING (TRUE);
CREATE POLICY "Public can see available slots" ON slots FOR SELECT USING (is_available = TRUE);

-- Seed Data
INSERT INTO bike_types (name, base_price_multiplier) VALUES
('Rennrad', 1.2),
('Mountainbike', 1.1),
('E-Bike', 1.5),
('Trekkingrad', 1.0),
('Lastenrad', 1.8);

INSERT INTO repair_types (name, estimated_minutes, base_price) VALUES
('Kette wechseln', 20, 25.00),
('Bremsen einstellen', 15, 15.00),
('Schaltung justieren', 25, 30.00),
('Reifen/Schlauch wechseln', 15, 20.00),
('Große Inspektion', 90, 80.00),
('E-Bike Systemdiagnose', 45, 50.00);

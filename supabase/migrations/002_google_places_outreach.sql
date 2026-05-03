-- Add Google Places integration and outreach tracking to shops

CREATE TYPE outreach_status AS ENUM ('ausstehend', 'kontaktiert', 'beansprucht');

ALTER TABLE shops ADD COLUMN google_place_id TEXT UNIQUE;
ALTER TABLE shops ADD COLUMN rating NUMERIC;
ALTER TABLE shops ADD COLUMN user_ratings_total INTEGER;
ALTER TABLE shops ADD COLUMN photo_reference TEXT;
ALTER TABLE shops ADD COLUMN outreach_status outreach_status DEFAULT 'ausstehend';

-- Update RLS for outreach tracking (admins/mechanics only for some fields)
-- For now, keep it simple as requested

export interface ShopCandidate {
  place_id: string;
  name: string;
  address: string;
  rating?: number;
  user_ratings_total?: number;
  phone_number?: string;
  website?: string;
  photo_reference?: string;
  reviews?: any[];
}

export const searchBikeShops = async (city: string, radius: number = 5000): Promise<ShopCandidate[]> => {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    throw new Error('GOOGLE_PLACES_API_KEY is not set');
  }

  const query = `Fahrradwerkstatt in ${city}`;
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${apiKey}&language=de`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.status !== 'OK') {
    throw new Error(`Google Places API error: ${data.status} ${data.error_message || ''}`);
  }

  return data.results.map((result: any) => ({
    place_id: result.place_id,
    name: result.name,
    address: result.formatted_address,
    rating: result.rating,
    user_ratings_total: result.user_ratings_total,
    photo_reference: result.photos?.[0]?.photo_reference,
  }));
};

export const getPlaceDetails = async (placeId: string): Promise<ShopCandidate> => {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    throw new Error('GOOGLE_PLACES_API_KEY is not set');
  }

  const fields = 'name,formatted_address,formatted_phone_number,rating,user_ratings_total,website,reviews,place_id,photos';
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${apiKey}&language=de`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.status !== 'OK') {
    throw new Error(`Google Places API error: ${data.status} ${data.error_message || ''}`);
  }

  const result = data.result;
  return {
    place_id: result.place_id,
    name: result.name,
    address: result.formatted_address,
    phone_number: result.formatted_phone_number,
    rating: result.rating,
    user_ratings_total: result.user_ratings_total,
    website: result.website,
    reviews: result.reviews,
    photo_reference: result.photos?.[0]?.photo_reference,
  };
};

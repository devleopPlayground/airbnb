export type RoomType = {
  id: number;
  images: string[];
  title: string;
  address: string;
  price: number;
  category: string;
  lat: string;
  lng: string;
};

export type FaqType = {
  id: number;
  title: string;
  description: string;
};

export type LocationType = {
  lat?: number;
  lng?: number;
  level?: number;
};

export type DetailFilterType = 'location' | 'checkIn' | 'checkOut' | 'guest';

export type FilterValueType = {
  location: string;
  checkIn: string;
  checkOut: string;
  guest: number;
  category: string;
};

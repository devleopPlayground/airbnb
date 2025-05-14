export type RoomType = {
  id: number;
  images: string[];
  title: string;
  address: string;
  price: number;
  category: string;
  lat: string;
  lng: string;
  user?: UserType;
  userId?: number;
  description?: string;
  bedroomDescription?: string;
  freeCancel: boolean;
  selfCheckIn: boolean;
  officeSpace: boolean;
  hasMountainView: boolean;
  hasShampoo: boolean;
  hasFreeLaundry: boolean;
  hasAirCondition: boolean;
  hasFreeWifi: boolean;
  hasBarbecue: boolean;
  hasFreeParking: boolean;
};

type AccountType = {
  id: string;
  provider: string;
};

export type UserType = {
  id: number;
  email: string;
  name?: string;
  image?: string;
  desc: string;
  rooms?: RoomType[];
  accounts?: AccountType[];
  phone?: string;
  address?: string;
};

export type FormEditProfileType = {
  name?: string;
  phone?: string;
  address?: string;
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

export type ParamsProps = {
  params: { id: string };
};

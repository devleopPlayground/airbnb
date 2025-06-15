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
  likes?: LikeType[];
  comments?: CommentType[];
};

type AccountType = {
  id: string;
  provider: string;
};

export type LikeType = {
  id: number;
  roomId: number;
  userId: string;
  createdAt: string;
  room: RoomType;
};

export type CommentResponseApiType = {
  comments?: CommentType[];
  totalCount?: number;
};

export type CommentType = {
  id: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
  roomId: number;
  body: string;
  user: UserType;
  room: RoomType;
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
  comments?: CommentType[];
  bookings?: BookingType[];
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

export type BookingType = {
  id: number;
  userId: number;
  roomId: string;
  checkIn: string;
  checkOut: string;
  guestCount: number;
  totalAmount: number;
  totalDays: number;
  status: 'SUCCESS' | 'CANCEL';
  room: RoomType;
  user: UserType;
  createdAt: string;
  updatedAt: string;
};

export enum PaymentStatus {
  READY = 'READY',
  IN_PROGRESS = 'IN_PROGRESS',
  WAITING_FOR_DEPOSIT = 'WAITING_FOR_DEPOSIT',
  DONE = 'DONE',
  CANCELED = 'CANCELED',
  PARTIAL_CANCELED = 'PARTIAL_CANCELED',
  ABORTED = 'ABORTED',
  EXPIRED = 'EXPIRED',
}

export type PaymentType = {
  id: string;
  paymentKey: string;
  bookingId: string;
  amount: number;
  status: PaymentStatus;
  orderId: string;
  orderName: string;
  approvedAt: string;
  mId?: string;
  receiptUrl?: string;
  cardNumber?: string;
  method?: string;
};

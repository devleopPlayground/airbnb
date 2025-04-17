import { atom } from 'jotai';

export type DetailFilterType = 'location' | 'checkIn' | 'checkOut' | 'guest';
export type FilterValueType = {
  location: string;
  checkIn: string;
  checkOut: string;
  guest: number;
};

const detailFilterAtom = atom<DetailFilterType | null>(null);

const filterValueAtom = atom<FilterValueType>({
  location: '',
  checkIn: '',
  checkOut: '',
  guest: 0,
});

export { detailFilterAtom, filterValueAtom };

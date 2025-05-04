import type { DetailFilterType, FilterValueType } from '@/interface';
import { atom } from 'jotai';

const detailFilterAtom = atom<DetailFilterType | null>(null);

const filterValueAtom = atom<FilterValueType>({
  location: '',
  checkIn: '',
  checkOut: '',
  guest: 0,
  category: '',
});

export { detailFilterAtom, filterValueAtom };

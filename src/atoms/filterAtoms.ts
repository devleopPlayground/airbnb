import { atom } from 'jotai';

import type { DetailFilterType, FilterValueType } from '@/interface';

const detailFilterAtom = atom<DetailFilterType | null>(null);

const filterValueAtom = atom<FilterValueType>({
  location: '',
  checkIn: '',
  checkOut: '',
  guest: 1,
  category: '',
});

export { detailFilterAtom, filterValueAtom };

import 'dayjs/locale/ko';

import dayjs from 'dayjs';
import { atom } from 'jotai';

import { filterValueAtom } from './filterAtoms';

const calculatorFilterState = atom((get) => {
  const filter = get(filterValueAtom);
  const checkInDate = filter.checkIn ? dayjs(filter.checkIn) : dayjs();
  const checkOutDate = filter.checkOut ? dayjs(filter.checkOut) : dayjs();
  const guestCount = filter.guest;
  const dayCount = checkOutDate.diff(checkInDate, 'days');

  return {
    filter,
    checkInDate,
    checkOutDate,
    guestCount,
    dayCount,
  };
});

export { calculatorFilterState };

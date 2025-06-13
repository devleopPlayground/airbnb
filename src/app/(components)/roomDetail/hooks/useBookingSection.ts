import 'dayjs/locale/ko';

import dayjs from 'dayjs';
import { useAtom, useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import { type ChangeEvent, useEffect } from 'react';

import { filterValueAtom } from '@/atoms/filterAtoms';
import { calculatorFilterState } from '@/atoms/selector';
import type { DetailFilterType, RoomType } from '@/interface';

const useBookingSection = (data: RoomType) => {
  const router = useRouter();
  const [filterValue, setFilterValue] = useAtom(filterValueAtom);

  const onChangeDateSection = <T extends HTMLInputElement | HTMLSelectElement>(
    e: ChangeEvent<T>,
    keyword: DetailFilterType,
  ) => {
    setFilterValue((prevState) => ({
      ...prevState,
      [keyword]: e.target instanceof HTMLInputElement ? e.target.value : Number(e.target.value),
    }));
  };

  useEffect(() => {
    if (!filterValue.checkIn) {
      setFilterValue((prevState) => ({ ...prevState, checkIn: dayjs().format('YYYY-MM-DD') }));
    }
  }, [filterValue.checkIn, setFilterValue]);

  const calculatedFilter = useAtomValue(calculatorFilterState);

  const totalAmount = data?.price * calculatedFilter.dayCount;
  const checkedFormValidate = totalAmount > 0 && calculatedFilter.guestCount > 0;

  const handleSubmit = () => {
    router.push(
      `/rooms/${data.id}/bookings?checkIn=${filterValue.checkIn}&checkOut=${filterValue.checkOut}&guestCount=${calculatedFilter.guestCount}&totalAmount=${totalAmount}&totalDays=${calculatedFilter.dayCount}`,
    );
  };

  return {
    filterValue,
    calculatedFilter,
    totalAmount,
    checkedFormValidate,
    onChangeDateSection,
    handleSubmit,
  };
};

export default useBookingSection;

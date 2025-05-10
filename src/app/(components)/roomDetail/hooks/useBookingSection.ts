import { useAtom } from 'jotai';
import type { ChangeEvent } from 'react';

import { filterValueAtom } from '@/atoms/filterAtoms';
import type { DetailFilterType } from '@/interface';

const useBookingSection = () => {
  const [filterValue, setFilterValue] = useAtom(filterValueAtom);

  const onChangeDateSection = <T extends HTMLInputElement | HTMLSelectElement>(
    e: ChangeEvent<T>,
    keyword: DetailFilterType,
  ) => {
    console.log(e.target instanceof HTMLInputElement);
    setFilterValue((prevState) => ({
      ...prevState,
      [keyword]: e.target instanceof HTMLInputElement ? e.target.value : Number(e.target.value),
    }));
  };

  return {
    filterValue,
    onChangeDateSection,
  };
};

export default useBookingSection;

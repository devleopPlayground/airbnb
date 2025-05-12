import dayjs from 'dayjs';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';

import { filterValueAtom } from '@/atoms/filterAtoms';

type DateFilterType = 'checkIn' | 'checkOut';

const useCalendar = () => {
  const [filterValue, setFilterValue] = useAtom(filterValueAtom);
  const [isMount, setIsMount] = useState(false);

  const onChangeDateFilter = <T extends DateFilterType>(date: Date, type: T) => {
    const newDate = dayjs(date).format('YYYY-MM-DD');

    setFilterValue((prevState) => ({ ...prevState, [type]: newDate }));
  };

  useEffect(() => {
    setIsMount(true);
  }, []);

  return { filterValue, onChangeDateFilter, isMount };
};

export default useCalendar;

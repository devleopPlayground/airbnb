import dayjs from 'dayjs';
import { useAtom } from 'jotai';

import { filterValueAtom } from '@/atoms/filterAtoms';

type DateFilterType = 'checkIn' | 'checkOut';

const useCalendar = () => {
  const [filterValue, setFilterValue] = useAtom(filterValueAtom);

  const onChangeDateFilter = <T extends DateFilterType>(date: Date, type: T) => {
    const newDate = dayjs(date).format('YYYY-MM-DD');

    setFilterValue((prevState) => ({ ...prevState, [type]: newDate }));
  };

  return { filterValue, onChangeDateFilter };
};

export default useCalendar;

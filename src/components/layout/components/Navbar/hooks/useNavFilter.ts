import { detailFilterAtom, filterValueAtom } from '@/atoms/filterAtoms';
import { useAtom } from 'jotai';

const useNavFilter = () => {
  const [filterValue, setFilterValue] = useAtom(filterValueAtom);
  const [detailFilter, setDetailFilter] = useAtom(detailFilterAtom);

  const onClickLocationFilter = (location: string) => {
    setFilterValue((prevState) => ({ ...prevState, location }));
    setDetailFilter('checkIn');
  };

  const onChangeCheckInFilter = (checkIn: string) => {
    setFilterValue((prevState) => ({ ...prevState, checkIn }));
    setDetailFilter('checkOut');
  };

  const onChangeCheckOutFilter = (checkOut: string) => {
    setFilterValue((prevState) => ({ ...prevState, checkOut }));
    setDetailFilter('guest');
  };

  const onClickGuestFilter = (guest: number) => {
    setFilterValue((prevState) => ({ ...prevState, guest }));
  };

  return {
    filterValue,
    detailFilter,
    onClickLocationFilter,
    onChangeCheckInFilter,
    onChangeCheckOutFilter,
    onClickGuestFilter,
  };
};

export default useNavFilter;

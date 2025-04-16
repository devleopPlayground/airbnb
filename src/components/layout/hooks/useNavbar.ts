import { useRouter } from 'next/navigation';
import { useState } from 'react';

export type DetailFilterType = 'location' | 'checkIn' | 'checkOut' | 'guest';
type FilterValueType = {
  location: string;
  checkIn: string;
  checkOut: string;
  guest: number;
};

const useNavbar = () => {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [detailFilter, setDetailFilter] = useState<DetailFilterType | null>(null);
  const [filterValue, setFilterValue] = useState<FilterValueType>({
    location: '',
    checkIn: '',
    checkOut: '',
    guest: 0,
  });

  const router = useRouter();

  const onClickShowMenu = () => {
    setIsShowMenu((prevState) => !prevState);
  };

  const onClickHrefUrl = (url: string) => {
    router.push(url);
  };

  const onClickShowFilter = () => {
    setIsShowFilter((prevState) => !prevState);
  };

  const onClickSearchButton = () => {
    setDetailFilter(null);
    setIsShowFilter(false);
  };

  const onClickDetailFilter = (keyword: DetailFilterType) => {
    setDetailFilter((prevState) => (prevState != keyword ? keyword : null));
    console.log(detailFilter);
  };

  return {
    isShowMenu,
    isShowFilter,
    detailFilter,
    filterValue,
    onClickShowFilter,
    onClickSearchButton,
    onClickDetailFilter,
    onClickShowMenu,
    onClickHrefUrl,
  };
};

export default useNavbar;

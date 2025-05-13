import { useAtomValue, useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import { detailFilterAtom, filterValueAtom } from '@/atoms/filterAtoms';
import type { DetailFilterType } from '@/interface';

const useNavbar = () => {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [isShowFilter, setIsShowFilter] = useState(false);
  const { status, data: session } = useSession();

  const detailFilter = useAtomValue(detailFilterAtom);
  const filterValue = useAtomValue(filterValueAtom);

  const setDetailFilter = useSetAtom(detailFilterAtom);

  const router = useRouter();

  const onClickShowMenu = () => {
    setIsShowMenu((prevState) => !prevState);
  };

  const onClickHrefUrl = (url: string) => {
    router.push(url);
    setIsShowMenu(false);
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
  };

  return {
    status,
    session,
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

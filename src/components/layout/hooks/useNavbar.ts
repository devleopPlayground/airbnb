import { useRouter } from 'next/navigation';
import { useState } from 'react';

const useNavbar = () => {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const router = useRouter();

  const onClickShowMenu = () => {
    setIsShowMenu((prevState) => !prevState);
  };

  const onClickHrefUrl = (url: string) => {
    router.push(url);
  };

  return { isShowMenu, onClickShowMenu, onClickHrefUrl };
};

export default useNavbar;

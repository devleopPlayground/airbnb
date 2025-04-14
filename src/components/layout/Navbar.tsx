'use client';

import { MdModeOfTravel } from 'react-icons/md';
import { RxDividerVertical } from 'react-icons/rx';
import { AiOutlineSearch, AiOutlineMenu, AiOutlineUser } from 'react-icons/ai';
import useNavbar from './hooks/useNavbar';
import { navMenus } from './constants/navMenus';

const Navbar = () => {
  const { isShowMenu, onClickShowMenu, onClickHrefUrl } = useNavbar();

  return (
    <div className="h-20 border-b-gray-200 w-full shadow-sm p-4 sm:px-10 flex justify-between items-center fixed top-0 bg-white">
      <div className="grow basis-0 hidden my-auto font-semibold text-lg sm:text-xl text-rose-500 cursor-pointer sm:flex sm:gap-2">
        <MdModeOfTravel className="text-4xl" />
        <span className="my-auto">NextBnb</span>
      </div>

      <div className="w-full sm:w-[280px] border border-gray-200 rounded-full hover:shadow-lg cursor-pointer flex justify-between pl-4 pr-2 py-2">
        <div className="flex justify-center gap-1">
          <div className="my-auto font-semibold text-sm">어디든지</div>
          <RxDividerVertical className="text-gray-200 my-auto text-2xl" />
          <div className="my-auto font-semibold text-sm">얼마든</div>
          <RxDividerVertical className="text-gray-200 my-auto text-2xl" />
          <div className="my-auto font-semibold text-sm">게스트</div>
        </div>

        <button type="button" className="bg-rose-500 text-white rounded-full size-8 my-auto">
          <AiOutlineSearch className="text-xl font-semibold mx-auto" />
        </button>
      </div>
      <div className="grow basis-0 hidden sm:flex gap-4 justify-end align-middle my-auto relative">
        <button className="font-semibold text-sm my-auto px-4 py-3 rounded-full hover:bg-gray-50">
          당신의 공간을 등록해주세요
        </button>
        <button
          type="button"
          className="flex gap-3 rounded-full border-gray-200 shadow-sm px-4 py-3 my-auto hover:shadow-lg"
          onClick={onClickShowMenu}
        >
          <AiOutlineMenu />
          <AiOutlineUser />
        </button>
        {isShowMenu && (
          <div className="border-gray-200 shadow-lg py-2 flex flex-col absolute top-12 bg-white w-60 rounded-lg">
            {navMenus.map((menu) => (
              <button
                key={menu.id}
                className="h-10 hover:bg-gray-50 text-sm text-gray-700 pl-3 text-left cursor-pointer"
                onClick={() => onClickHrefUrl(menu.href)}
              >
                {menu.title}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

// 19 줄 sm:w-[280px]로 인해 640px 이하면 넓이가 넓어짐

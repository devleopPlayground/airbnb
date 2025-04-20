'use client';

import React from 'react';
import { MdModeOfTravel } from 'react-icons/md';
import { RxDividerVertical } from 'react-icons/rx';
import { AiOutlineSearch, AiOutlineMenu, AiOutlineUser } from 'react-icons/ai';
import useNavbar from './hooks/useNavbar';
import { navMenus } from './constants/navMenus';
import clsx from 'clsx';
import { navFilterList } from './constants/navFilterList';
import { SearchFilter } from './components/Navbar/Filter';

const Navbar = () => {
  const {
    isShowMenu,
    isShowFilter,
    detailFilter,
    filterValue,
    onClickShowFilter,
    onClickShowMenu,
    onClickSearchButton,
    onClickDetailFilter,
    onClickHrefUrl,
  } = useNavbar();

  return (
    <nav
      className={clsx(
        `h-20 z-10 border-b-gray-200 w-full shadow-sm p-4 sm:px-10 flex justify-between items-center align-middle fixed top-0 bg-white`,
        isShowFilter && 'h-44 items-start',
      )}
    >
      <div className="grow basis-0 hidden font-semibold text-lg sm:text-xl text-rose-500 cursor-pointer sm:flex sm:gap-2">
        <MdModeOfTravel className="text-4xl" />
        <span className="my-auto">NextBnb</span>
      </div>

      {isShowFilter ? (
        <div className="sm:w-[340px] w-full relative">
          <div className="flex justify-center gap-7 h-14 text-center items-center">
            <button type="button" className="font-semibold underline underline-offset-8 cursor-pointer">
              숙소
            </button>
            <button type="button" className="text-gray-700 cursor-pointer">
              체험
            </button>
            <button type="button" className="text-gray-700 cursor-pointer">
              온라인 체험
            </button>
            <button
              type="button"
              className="font-semibold underline underline-offset-8 text-gray-500 hover:text-black cursor-pointer"
              onClick={onClickShowFilter}
            >
              필터 닫기
            </button>
          </div>
          <div className="w-[90%] sm:max-w-3xl p-2 sm:p-0 flex flex-col border border-gray-200 rounded-lg py-4 sm:flex-row sm:py-2 sm:rounded-full shadow-sm bg-white hover:shadow-lg cursor-pointer justify-between fixed top-20 inset-x-0 mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-4 w-full relative sm:pl-2">
              {navFilterList.map((navFilter) => (
                <button
                  key={navFilter.filterType}
                  type="button"
                  className={clsx(
                    `font-semibold text-xs rounded-full hover:bg-gray-100 px-6 py-3 text-left cursor-pointer`,
                    detailFilter == navFilter.filterType && 'shadow bg-white',
                  )}
                  onClick={() => onClickDetailFilter(navFilter.filterType)}
                >
                  {navFilter.filterText}
                  <div className="text-gray-500 text-xs">
                    {navFilter.filterType == 'guest'
                      ? filterValue.guest + ' 명'
                      : filterValue?.[navFilter.filterType] || navFilter.placeholder}
                  </div>
                </button>
              ))}
            </div>
            <SearchFilter />
            <button
              type="button"
              className="bg-rose-600 text-white rounded-full h-10 mx-3 sm:w-24 my-auto flex mt-4 sm:mt-auto justify-center gap-1 px-3 py-2 hover:shadow hover:bg-rose-700 cursor-pointer"
              onClick={onClickSearchButton}
            >
              <AiOutlineSearch className="font-semibold my-auto text-xl" />
              <span className="my-auto">검색</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full sm:w-[280px] border border-gray-200 rounded-full hover:shadow-lg cursor-pointer flex justify-between pl-4 pr-2 py-2">
          <div
            role="presentation"
            className="flex justify-center gap-1 cursor-pointer"
            onClick={onClickShowFilter}
          >
            <div className="my-auto font-semibold text-sm cursor-pointer">어디든지</div>
            <RxDividerVertical className="text-gray-200 my-auto text-2xl" />
            <div className="my-auto font-semibold text-sm cursor-pointer">얼마든</div>
            <RxDividerVertical className="text-gray-200 my-auto text-2xl" />
            <div className="my-auto font-semibold text-sm cursor-pointer">게스트</div>
          </div>

          <button type="button" className="bg-rose-500 text-white rounded-full size-8 my-auto">
            <AiOutlineSearch className="text-xl font-semibold mx-auto" />
          </button>
        </div>
      )}

      <div className="grow basis-0 hidden md:flex gap-4 justify-end align-middle relative">
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
    </nav>
  );
};

export default Navbar;

// 94 줄 sm:w-[280px]로 인해 640px 이하면 넓이가 넓어짐

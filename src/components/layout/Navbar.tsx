'use client';

import React from 'react';
import { MdModeOfTravel } from 'react-icons/md';
import { RxDividerVertical } from 'react-icons/rx';
import {
  AiOutlineSearch,
  AiOutlineMenu,
  AiOutlineUser,
  AiOutlinePlusCircle,
  AiOutlineMinusCircle,
} from 'react-icons/ai';
import useNavbar, { type FilterValueType } from './hooks/useNavbar';
import { navMenus } from './constants/navMenus';
import clsx from 'clsx';
import { navFilterList } from './constants/navFilterList';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

const Navbar = () => {
  const {
    isShowMenu,
    isShowFilter,
    detailFilter,
    filterValue,
    onClickShowFilter,
    onClickShowMenu,
    onClickSearchButton,
    onClickLocationFilter,
    onClickDetailFilter,
    onChangeCheckOutFilter,
    onChangeCheckInFilter,
    onClickGuestFilter,
    onClickHrefUrl,
  } = useNavbar();

  return (
    <nav
      className={clsx(
        `border-b-gray-200 w-full shadow-sm p-4 sm:px-10 flex justify-between items-center align-middle fixed top-0 bg-white`,
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
          <div className="w-[90%] sm:max-w-3xl flex flex-col border border-gray-200 rounded-lg py-4 sm:flex-row sm:py-2 sm:rounded-full shadow-sm bg-white hover:shadow-lg cursor-pointer justify-between fixed top-20 inset-x-0 mx-auto">
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
                      ? filterValue?.[navFilter.filterType] + ' 명'
                      : filterValue?.[navFilter.filterType] || navFilter.placeholder}
                  </div>
                </button>
              ))}
            </div>
            {detailFilter == 'location' && (
              <Navbar.LocationFilter
                filterValue={filterValue}
                onClickLocationFilter={onClickLocationFilter}
              />
            )}
            {detailFilter == 'checkIn' && (
              <Navbar.CheckInFilter filterValue={filterValue} onChangeCheckInFilter={onChangeCheckInFilter} />
            )}
            {detailFilter == 'checkOut' && (
              <Navbar.CheckOutFilter
                filterValue={filterValue}
                onChangeCheckOutFilter={onChangeCheckOutFilter}
              />
            )}
            {detailFilter == 'guest' && (
              <Navbar.GuestFilter filterValue={filterValue} onClickGuestFilter={onClickGuestFilter} />
            )}
            <button
              type="button"
              className="bg-rose-600 text-white rounded-full h-10 mx-3 sm:w-24 my-auto flex justify-center gap-1 px-3 py-2 hover:shadow hover:bg-rose-700 cursor-pointer"
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

      <div className="grow basis-0 hidden sm:flex gap-4 justify-end align-middle relative">
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

// 119 줄 sm:w-[280px]로 인해 640px 이하면 넓이가 넓어짐

type LocationFilterProps = {
  filterValue: FilterValueType;
  onClickLocationFilter: (location: string) => void;
};

Navbar.LocationFilter = ({ filterValue, onClickLocationFilter }: LocationFilterProps) => {
  return (
    <div className="absolute top-80 sm:top-[80px] w-full border border-gray-200 px-8 py-10 flex flex-col bg-white sm:max-w-3xl rounded-xl left-0">
      <div className="text-sm font-semibold">지역으로 검색하기</div>
      <div className="flex flex-wrap gap-4 mt-4">
        {['서울', '부산', '대구', '인천', '광주', '대전', '울산'].map((region) => (
          <button
            key={region}
            type="button"
            onClick={() => onClickLocationFilter(region)}
            className={clsx(
              `border rounded-lg px-5 py-2.5 hover:bg-gray-200 focus:bg-rose-500`,
              filterValue.location == region && 'bg-rose-600 text-white',
            )}
          >
            {region}
          </button>
        ))}
      </div>
    </div>
  );
};

type CheckInFilterProps = {
  filterValue: FilterValueType;
  onChangeCheckInFilter: (checkIn: string) => void;
};

Navbar.CheckInFilter = ({ filterValue, onChangeCheckInFilter }: CheckInFilterProps) => {
  return (
    <div className="absolute top-80 sm:top-[80px] w-full border border-gray-200 px-8 py-10 flex flex-col bg-white sm:max-w-3xl rounded-xl left-0">
      <div className="text-sm font-semibold">체크인 날짜 설정하기</div>
      <input
        type="date"
        className="mt-4 p-3 border border-gray-200 px-y px-2.5 rounded-lg"
        defaultValue={filterValue.checkIn}
        min={dayjs().format('YYYY-MM-DD')}
        onChange={(e) => onChangeCheckInFilter(e.target.value)}
      />
    </div>
  );
};

type CheckOutFilterProps = {
  filterValue: FilterValueType;
  onChangeCheckOutFilter: (checkOut: string) => void;
};

Navbar.CheckOutFilter = ({ filterValue, onChangeCheckOutFilter }: CheckOutFilterProps) => {
  return (
    <div className="absolute top-80 sm:top-[80px] w-full border border-gray-200 px-8 py-10 flex flex-col bg-white sm:max-w-3xl rounded-xl left-0">
      <div className="text-sm font-semibold">체크아웃 날짜 설정하기</div>
      <input
        type="date"
        className="mt-4 p-3 border border-gray-200 px-y px-2.5 rounded-lg"
        defaultValue={filterValue.checkOut}
        min={dayjs(filterValue.checkIn).add(1, 'day').format('YYYY-MM-DD')}
        onChange={(e) => onChangeCheckOutFilter(e.target.value)}
      />
    </div>
  );
};

type GuestFilterProps = {
  filterValue: FilterValueType;
  onClickGuestFilter: (guest: number) => void;
};

Navbar.GuestFilter = ({ filterValue, onClickGuestFilter }: GuestFilterProps) => {
  return (
    <div className="absolute top-80 sm:top-[80px] w-full border border-gray-200 px-8 py-10 flex flex-col bg-white sm:max-w-3xl rounded-xl left-0">
      <div className="text-sm font-semibold">게스트 수 추가하기</div>
      <div className="mt-4 border border-gray-200 px-4 py-2 rounded-lg flex justify-between items-center">
        <div>
          <div className="font-semibold text-sm">게스트 수 추가하기</div>
          <div className="text-gray-500 text-xs">숙박 인원을 입력해주세요</div>
        </div>
        <div className="flex gap-4 items-center justify-center">
          <button
            type="button"
            className="rounded-full w-8 h-8 disabled:border-gray-200 hover:border-black"
            onClick={() => onClickGuestFilter(filterValue.guest - 1)}
            disabled={filterValue.guest <= 0}
          >
            <AiOutlineMinusCircle
              className={clsx('m-auto w-5 h-5 cursor-pointer', filterValue.guest <= 0 && 'text-gray-200')}
            />
          </button>
          <div className="w-3 text-center">{filterValue.guest}</div>
          <button
            type="button"
            className="rounded-full w-8 h-8 disabled:border-gray-200 hover:border-black"
            onClick={() => onClickGuestFilter(filterValue.guest + 1)}
            disabled={filterValue.guest >= 20}
          >
            <AiOutlinePlusCircle
              className={clsx('m-auto w-5 h-5 cursor-pointer', filterValue.guest >= 20 && 'text-gray-200')}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

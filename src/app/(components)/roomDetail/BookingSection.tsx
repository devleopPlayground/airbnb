'use client';

import 'dayjs/locale/ko';

import dayjs from 'dayjs';

import type { RoomType } from '@/interface';

import useBookingSection from './hooks/useBookingSection';

type BookingSectionProps = {
  data?: RoomType;
};

const BookingSection = ({ data }: BookingSectionProps) => {
  const { filterValue, onChangeDateSection } = useBookingSection();

  console.log('filterValue', filterValue);

  return (
    <div className="w-full">
      <div className="mt-8 shadow-lg rounded-lg border border-gray-300 px-6 py-8 md:sticky md:top-25">
        <div className="text-gray-600 flex justify-between items-center">
          <div>
            <span className="font-semibold text-lg md:text-xl text-black mr-1.5">
              {data?.price.toLocaleString()}
            </span>
            /박
          </div>
          <div className="text-xs">후기 15개</div>
        </div>
        <form className="mt-2">
          <div className="mt-2">
            <label className="text-xs font-semibold" htmlFor="checkIn">
              체크인
            </label>
            <input
              id="checkIn"
              type="date"
              className="w-full px-4 py-3 border border-gray-400 rounded-md text-xs mt-1"
              onChange={(e) => onChangeDateSection(e, 'checkIn')}
              defaultValue={filterValue.checkIn || dayjs().format('YYYY-MM-DD')}
              min={dayjs().format('YYYY-MM-DD')}
            />
          </div>
          <div className="mt-2">
            <label className="text-xs font-semibold" htmlFor="checkOut">
              체크아웃
            </label>
            <input
              id="checkOut"
              type="date"
              className="w-full px-4 py-3 border border-gray-400 rounded-md text-xs mt-1"
              onChange={(e) => onChangeDateSection(e, 'checkOut')}
              defaultValue={filterValue.checkOut || dayjs().format('YYYY-MM-DD')}
              min={filterValue.checkIn ? filterValue.checkIn : dayjs().format('YYYY-MM-DD')}
            />
          </div>
          <div className="mt-2">
            <label className="text-xs font-semibold" htmlFor="guest">
              인원
            </label>
            <select
              id="guest"
              onChange={(e) => onChangeDateSection(e, 'guest')}
              value={filterValue.guest}
              className="w-full px-4 py-3 border border-gray-400 rounded-md text-xs mt-1 col-start-1 row-start-1 appearance-none"
            >
              {Array.from({ length: 20 }).map((_, idx) => (
                <option key={idx} value={idx + 1}>
                  {idx + 1}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-6">
            <button
              className="bg-rose-500 hover:bg-rose-600 text-white rounded-md py-2.5 w-full cursor-pointer"
              type="submit"
            >
              예약하기
            </button>
            <p className="text-center text-gray-600 mt-4 md:text-sm">
              예약 확정 전에는 요금이 청구되지 않습니다.
            </p>
          </div>
        </form>
        <div className="mt-4 flex flex-col gap-2 border-b border-b-gray-300 pb-4 text-xs md:text-sm">
          <div className="flex justify-between">
            <div className="text-gray-600 underline underline-offset-4">
              {data?.price?.toLocaleString()} x 5박
            </div>
            <div className="text-gray-500">₩271,420</div>
          </div>
          <div className="flex justify-between">
            <div className="text-gray-600 underline underline-offset-4">nextBnb 수수료</div>
            <div className="text-gray-500">₩0</div>
          </div>
          <div className="flex justify-between mt-6">
            <div>총 합계</div>
            <div>₩271,420</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSection;

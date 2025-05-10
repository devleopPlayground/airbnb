import 'dayjs/locale/ko';

import clsx from 'clsx';
import dayjs from 'dayjs';
import Calendar from 'react-calendar';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';

import FilterLayout from './FilterLayout';
import useNavFilter from './hooks/useNavFilter';

const LocationFilter = () => {
  const { filterValue, detailFilter, onClickLocationFilter } = useNavFilter();

  return (
    <FilterLayout title="지역으로 검색하기" isShowFilter={detailFilter == 'location'}>
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
    </FilterLayout>
  );
};

const CheckInFilter = () => {
  const { filterValue, detailFilter, onChangeCheckInFilter } = useNavFilter();

  return (
    <FilterLayout title="체크인 날짜 설정하기" isShowFilter={detailFilter == 'checkIn'}>
      <Calendar
        className="mt-8 mx-auto"
        defaultValue={filterValue.checkIn ? new Date(filterValue.checkIn) : null}
        minDate={new Date()}
        onChange={(e) => onChangeCheckInFilter(dayjs(e as Date).format('YYYY-MM-DD'))}
        formatDay={(_, date) => dayjs(date).format('DD')} // 일 빼기
      />
    </FilterLayout>
  );
};

const CheckOutFilter = () => {
  const { filterValue, detailFilter, onChangeCheckOutFilter } = useNavFilter();

  return (
    <FilterLayout title="체크아웃 날짜 설정하기" isShowFilter={detailFilter == 'checkOut'}>
      <Calendar
        className="mt-8 mx-auto"
        defaultValue={filterValue.checkOut ? new Date(filterValue.checkOut) : null}
        minDate={
          filterValue.checkIn
            ? new Date(dayjs(filterValue.checkIn).add(1, 'day').format('YYYY-MM-DD'))
            : new Date()
        }
        onChange={(e) => onChangeCheckOutFilter(dayjs(e as Date).format('YYYY-MM-DD'))}
        formatDay={(_, date) => dayjs(date).format('DD')} // 일 빼기
      />
    </FilterLayout>
  );
};

const GuestFilter = () => {
  const { filterValue, detailFilter, onClickGuestFilter } = useNavFilter();

  return (
    <FilterLayout title="게스트 수 추가하기" isShowFilter={detailFilter == 'guest'}>
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
    </FilterLayout>
  );
};

const SearchFilter = () => {
  return (
    <>
      <LocationFilter />
      <CheckInFilter />
      <CheckOutFilter />
      <GuestFilter />
    </>
  );
};

export { CheckInFilter, CheckOutFilter, GuestFilter, LocationFilter, SearchFilter };

'use client';

import 'dayjs/locale/ko';

import dayjs from 'dayjs';
import Calendar from 'react-calendar';

import useCalendar from './hooks/useCalendar';

const CalendarSection = () => {
  const { filterValue, onChangeDateFilter, isMount } = useCalendar();

  if (!isMount) return null;

  return (
    <div className="mt-4 flex flex-col gap-4">
      <div className="text-gray-500 text-sm">
        {filterValue.checkIn && filterValue.checkOut
          ? `${filterValue.checkIn} ~ ${filterValue.checkOut}`
          : '체크인 체크아웃 날짜를 입력해주세요.'}
      </div>
      <div className="flex flex-col md:flex-row justify-between">
        <Calendar
          next2Label={null}
          prev2Label={null}
          className="mt-4 mx-auto"
          minDate={new Date()}
          onChange={(e) => onChangeDateFilter(e as Date, 'checkIn')}
          defaultValue={filterValue.checkIn ? new Date(filterValue.checkIn) : null}
          formatDay={(_, date) => dayjs(date).format('DD')}
        />
        <Calendar
          next2Label={null}
          prev2Label={null}
          className="mt-4 mx-auto"
          minDate={
            filterValue.checkIn
              ? new Date(dayjs(filterValue.checkIn).add(1, 'day').format('YYYY-MM-DD'))
              : new Date()
          }
          onChange={(e) => onChangeDateFilter(e as Date, 'checkOut')}
          defaultValue={filterValue.checkOut ? filterValue.checkOut : null}
          formatDay={(_, date) => dayjs(date).format('DD')}
        />
      </div>
    </div>
  );
};

export default CalendarSection;

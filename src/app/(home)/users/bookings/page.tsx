'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React from 'react';
import { BiChevronRight } from 'react-icons/bi';

import { fetchBookings } from '@/apis/bookings';
import { Loader } from '@/components/common/Loader';
import type { BookingType } from '@/interface';

const Bookings = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const router = useRouter();

  const {
    data: bookings,
    fetchNextPage,
    isLoading,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: [`bookings-user-${userId}`],
    queryFn: ({ pageParam = 1 }) => fetchBookings({ pageParam, userId }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.page < lastPage.totalPage ? lastPage.page + 1 : undefined),
    enabled: !!session?.user?.id,
  });

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="font-semibold text-lg md:text-2xl">나의 예약 리스트</h1>
      <p className="mt-2 text-gray-500">나의 예약 일정을 확인해 보세요.</p>
      {isLoading ? (
        <Loader className="mt-10 mb-20" />
      ) : (
        <div className="mb-20 mt-10 flex flex-col">
          {bookings?.pages.map((page, idx) => (
            <React.Fragment key={idx}>
              {page?.data.map((booking: BookingType) => (
                <div
                  key={booking.id}
                  className="flex flex-col gap-6 border-b border-b-gray-200 pb-8 hover:bg-black/5 p-6"
                >
                  <h1 className="font-semibold text-lg md:text-xl">
                    {booking?.status === 'SUCCESS' ? '예약된 여행' : '취소된 여행'}
                  </h1>
                  <div className="flex items-center w-full justify-between">
                    <div className="flex gap-4 items-center">
                      <Image
                        className="rounded-md"
                        src={booking?.room?.images[0] || '/images/user.png'}
                        width={80}
                        height={80}
                        alt="숙소 이미지"
                      />
                      <div>
                        <h2 className="font-semibold">{booking?.room?.title}</h2>
                        <p className="mt-2 text-sm text-gray-600">{booking?.room?.address}</p>
                        <p className="mt-1 text-xs text-gray-500">
                          {dayjs(booking?.checkIn).format('YYYY년 MM월 DD일')} ~{' '}
                          {dayjs(booking?.checkOut).format('YYYY년 MM월 DD일')} | {booking?.guestCount} 명 |{' '}
                          {booking?.totalAmount?.toLocaleString()} 원
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="flex items-center cursor-pointer underline underline-offset-2 hover:text-gray-500"
                      onClick={() => {
                        router.push(`/rooms/${booking?.roomId}`);
                      }}
                    >
                      숙소 보기
                      <BiChevronRight className="text-xl" />
                    </button>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="cursor-pointer bg-rose-600 hover:bg-rose-500 px-4 py-2.5 rounded-md text-white"
                      onClick={() => {
                        router.push(`/users/bookings/${booking.id}`);
                      }}
                    >
                      예약내역 확인
                    </button>
                  </div>
                </div>
              ))}
            </React.Fragment>
          ))}
          {hasNextPage && (
            <div className="flex justify-center">
              <button
                type="button"
                className="mt-8 bg-black text-white px-5 py-3.5 shadow-sm hover:shadow-xl rounded-full cursor-pointer"
                onClick={() => fetchNextPage()}
              >
                예약내역 더 불러오기
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Bookings;

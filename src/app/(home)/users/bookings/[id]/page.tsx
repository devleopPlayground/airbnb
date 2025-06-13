import 'dayjs/locale/ko';

import dayjs from 'dayjs';
import Image from 'next/image';

import RefundButton from '@/app/(components)/booking/RefundButton';
import { IMAGE_BLUR } from '@/constants/imageBlur';
import type { BookingType } from '@/interface';

const BookingPage = async ({ params }: { params: { id: string } }) => {
  const booking: BookingType = await getData(Number(params.id));

  const canRefund = dayjs(booking?.checkIn).diff(dayjs(), 'days') > 10;

  return (
    <div className="max-w-5xl mx-auto px-4 pt-10 pb-20">
      <h1 className="text-xl md:text-3xl font-semibold">예약 상세 내역</h1>
      <div className="rounded-md border border-gray-300 p-6 mt-10">
        <section className="flex border-b gap-4 pb-6 border-gray-200">
          <Image
            src={booking.room?.images?.[0] || '/images/user.png'}
            width={100}
            height={100}
            alt="숙소 이미지"
            className="rounded-md"
            placeholder="blur"
            blurDataURL={IMAGE_BLUR}
          />
          <div className="flex flex-col gap-3">
            <h1 className="text-sm">{booking.room?.title}</h1>
            <p className="text-xs text-gray-500">
              {booking.room?.category} | {booking.room?.price.toLocaleString()} 원
            </p>
          </div>
        </section>
        <section className="flex flex-col gap-4 border-b pb-6 border-gray-200">
          <h1 className="text-lg md:text-xl mt-4">여행 일정정보</h1>
          <div className="flex justify-between items-center">
            <h3 className="font-bold">날짜</h3>
            <div className="text-gray-900">
              {dayjs(booking?.checkIn).format('YYYY-MM-DD')} ~ {dayjs(booking?.checkOut).format('YYYY-MM-DD')}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <h3 className="font-bold">게스트</h3>
            <div className="text-gray-900">게스트 {booking?.guestCount}명</div>
          </div>
        </section>
        <section className="flex flex-col gap-4 pb-6">
          <h1 className="text-lg md:text-xl mt-4">요금 세부정보</h1>
          <div className="flex justify-between items-center">
            <h3 className="font-bold">숙박 일정</h3>
            <div className="text-gray-900">{booking?.totalDays}박</div>
          </div>
          <div className="flex justify-between items-center">
            <h3 className="font-bold">총 금액</h3>
            <div className="text-gray-900">{booking?.totalAmount.toLocaleString()}원</div>
          </div>
        </section>
        <RefundButton canRefund={canRefund} booking={booking} />
      </div>
    </div>
  );
};

export default BookingPage;

async function getData(id: number) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings?id=${id}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
}

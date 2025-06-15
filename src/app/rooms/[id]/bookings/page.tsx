import Image from 'next/image';
import Link from 'next/link';

import SubmitButton from '@/app/(components)/booking/SubmitButton';
import { IMAGE_BLUR } from '@/constants/imageBlur';
import type { RoomType } from '@/interface';

type BookingPageProps = {
  params: { id: string };
  searchParams: {
    checkIn: string;
    checkOut: string;
    guestCount: string;
    totalAmount: string;
    totalDays: string;
  };
};

const BookingPage = async ({ params, searchParams }: BookingPageProps) => {
  const { id } = await params;
  const { checkIn, checkOut, guestCount, totalAmount, totalDays } = await searchParams;

  const data: RoomType = await getData(id);

  return (
    <div className="my-28 max-w-6xl mx-auto px-4">
      <div className="mt-32">
        <h1 className="font-semibold text-xl md:text-3xl">예약 확인 및 결제</h1>
        <div className="grid md:grid-cols-2 gap-20">
          <div className="flex flex-col gap-6 border-y border-gray-200 mt-8 py-8">
            <h2 className="text-lg md:text-2xl font-semibold">예약 정보</h2>
            <div>
              <h3>날짜</h3>
              <div className="text-sm mt-1 text-gray-800">
                {checkIn} ~ {checkOut}
              </div>
            </div>
            <div>
              <h3>게스트</h3>
              <div className="text-sm mt-1 text-gray-800">게스트 {guestCount} 명</div>
            </div>
          </div>
          <div className="flex flex-col gap-6 border-y border-gray-200 mt-8 py-8">
            <h2 className="text-lg md:text-2xl font-semibold">숙소 정보</h2>
            <div className="flex border-b border-gray-200 gap-4 pb-6">
              <Image
                src={data?.images?.[0] || '/images/user.png'}
                width={100}
                height={100}
                alt="숙소 이미지"
                className="rounded-md"
                placeholder="blur"
                blurDataURL={IMAGE_BLUR}
              />
              <div className="flex flex-col justify-between">
                <Link href={`/rooms/${data.id}`}>
                  <h1 className="text-sm">{data?.title}</h1>
                </Link>
                <p className="text-xs text-gray-500">
                  {data?.category} || {data?.price.toLocaleString()}
                </p>
              </div>
            </div>
            <h2 className="text-lg md:text-2xl font-semibold">요금 세부 정보</h2>
            <div>
              <h3>숙박 일수</h3>
              <div className="text-sm mt-1 text-gray-800">{totalDays}박</div>
            </div>
            <div>
              <h3>총 합계</h3>
              <div className="text-sm mt-1 text-gray-800">{Number(totalAmount).toLocaleString()} 원</div>
            </div>
            <SubmitButton title={data.title} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;

async function getData(id: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/rooms?id=${id}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('failed to fetch data.');
  }

  return response.json();
}

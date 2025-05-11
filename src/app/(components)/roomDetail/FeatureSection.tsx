import clsx from 'clsx';
import Image from 'next/image';
import { AiOutlineCheckCircle, AiOutlineDesktop, AiOutlineWifi } from 'react-icons/ai';
import { BsDoorClosed, BsFan } from 'react-icons/bs';
import { GiBarbecue } from 'react-icons/gi';
import { LuCircleParking } from 'react-icons/lu';
import { MdOutlineDoorBack, MdOutlineLocalLaundryService } from 'react-icons/md';
import { PiBathtub, PiMountainsDuotone } from 'react-icons/pi';

import { FeatureDesc } from '@/constants/room';
import type { RoomType } from '@/interface';

import BookingSection from './BookingSection';
import CalendarSection from './CalendarSection';

type FeatureSectionProps = {
  data?: RoomType;
};

const FeatureSection = ({ data }: FeatureSectionProps) => {
  return (
    <div className="md:grid md:grid-cols-3 gap-8 mt-8 relative">
      <div className="col-span-2">
        <div className="flex items-center justify-between px-4">
          <div>
            <h1 className="text-xl">{data?.user?.name ?? '사용자'}님이 호스팅하는 숙소</h1>
            <p className="text-sm text-gray-600 mt-1">{data?.user?.desc ?? '호스트 설명이 없습니다.'}</p>
          </div>
          <Image
            src={data?.user?.image || '/images/user.png'}
            className="rounded-full shadow"
            width={50}
            height={50}
            alt="user-image"
          />
        </div>
        <div className="mt-4 flex flex-col gap-6 py-6 border-y border-gray-300">
          <div className="flex gap-6 items-center px-4">
            <AiOutlineCheckCircle className="text-lg md:text-2xl " />
            <div className="font-semibold">무료 취소</div>
            <div className="text-sm text-gray-400">
              {data?.freeCancel ? FeatureDesc.FREE_CANCEL : FeatureDesc.PAID_CANCEL}
            </div>
          </div>
          <div className="flex gap-6 items-center px-4">
            <BsDoorClosed className="text-lg md:text-2xl " />
            <div className="font-semibold">셀프 체크인</div>
            <div className="text-sm text-gray-400">
              {data?.selfCheckIn ? FeatureDesc.SELF_CHECKIN : FeatureDesc.SELF_CHECKIN_DISALLOWED}
            </div>
          </div>
          <div className="flex gap-6 items-center px-4">
            <AiOutlineDesktop className="text-lg md:text-2xl " />
            <div className="font-semibold">사무 시설</div>
            <div className="text-sm text-gray-400">
              {data?.officeSpace ? FeatureDesc.FREE_OFFICE_SPACE : FeatureDesc.NO_OFFICE_SPACE}
            </div>
          </div>
        </div>

        <div className="py-6 border-b border-gray-300 leading-8 text-gray-800">
          <h1 className="font-semibold text-xl mb-2">숙박 장소</h1>
          {data?.bedroomDescription ?? '숙소 설명이 없습니다.'}
        </div>
        <div className="py-6 border-b border-gray-300 leading-8 text-gray-800">
          <h1 className="font-semibold text-xl mb-2">숙소 편의시설</h1>
          <div className="grid md:grid-cols-2 gap-1">
            <div className="flex items-center gap-2 mt-4">
              <AiOutlineCheckCircle className="text-lg md:text-2xl" />
              <span className={clsx('text-gray-600', !data?.freeCancel && 'line-through')}>무료 취소</span>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <MdOutlineDoorBack className="text-lg md:text-2xl" />
              <span className={clsx('text-gray-600', !data?.selfCheckIn && 'line-through')}>셀프 체크인</span>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <PiMountainsDuotone className="text-lg md:text-2xl" />
              <span className={clsx('text-gray-600', !data?.hasMountainView && 'line-through')}>
                마운틴 뷰
              </span>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <PiBathtub className="text-lg md:text-2xl" />
              <span className={clsx('text-gray-600', !data?.hasShampoo && 'line-through')}>
                샴푸 및 욕실 용품
              </span>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <MdOutlineLocalLaundryService className="text-lg md:text-2xl" />
              <span className={clsx('text-gray-600', !data?.hasFreeLaundry && 'line-through')}>
                무료 세탁
              </span>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <BsFan className="text-lg md:text-2xl" />
              <span className={clsx('text-gray-600', !data?.hasAirCondition && 'line-through')}>에어컨</span>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <AiOutlineWifi className="text-lg md:text-2xl" />
              <span className={clsx('text-gray-600', !data?.hasFreeWifi && 'line-through')}>
                무료 와이파이
              </span>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <GiBarbecue className="text-lg md:text-2xl" />
              <span className={clsx('text-gray-600', !data?.hasBarbecue && 'line-through')}>바비큐 시설</span>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <LuCircleParking className="text-lg md:text-2xl" />
              <span className={clsx('text-gray-600', !data?.hasFreeParking && 'line-through')}>
                무료 주차
              </span>
            </div>
          </div>
        </div>
        <div className="py-8 border-b border-gray-300 leading-8 text-gray-800">
          <h1 className="font-semibold text-xl mb-2">캘린더</h1>
          <CalendarSection />
        </div>
        <div className="py-8 px-4 border-b border-gray-300 leading-8 text-gray-800">
          <h1 className="font-semibold text-xl mb-2">후기</h1>
          <div className="mt-4 rounded-lg p-5 border border-gray-300">후기가 들어갑니다.</div>
        </div>
      </div>
      <BookingSection data={data} />
    </div>
  );
};

export default FeatureSection;

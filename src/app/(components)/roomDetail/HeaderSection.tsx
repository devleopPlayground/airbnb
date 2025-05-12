'use client';

import { QueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { CiHeart } from 'react-icons/ci';

import { IMAGE_BLUR } from '@/constants/imageBlur';
import type { GetRoomDetailResponse } from '@/hooks/api/rooms/useGetRoomDetail';
import type { RoomType } from '@/interface';

import useHeaderSection from './hooks/useHeaderSection';
import ShareSection from './ShareSection';

type HeaderSectionProps = {
  data?: RoomType;
};

const HeaderSection = ({ data }: HeaderSectionProps) => {
  const { onClickModalOpen } = useHeaderSection();

  const queryClient = new QueryClient();
  queryClient.setQueryData<GetRoomDetailResponse>(['room-detail', data?.id], data);

  return (
    <>
      <h1 className="text-lg md:text-3xl font-medium px-4">{data?.title}</h1>
      <div className="flex w-full justify-between items-center px-4">
        <div className="underline text-xs md:text-sm mt-2">{data?.address}</div>
        <div className="flex gap-2 text-xs md:text-sm mt-2">
          <ShareSection data={data} />
          <button
            type="button"
            className="flex gap-2 items-center px-2 py-1.5 rounded-lg hover:bg-black/10 cursor-pointer"
          >
            <CiHeart />
            <span className="underline underline-offset-2">저장</span>
          </button>
        </div>
      </div>
      <div className="mt-6 relative">
        <div className="grid md:grid-cols-2 gap-2 md:gap-4 align-middle h-[400px] overflow-hidden md:rounded-lg">
          {data?.images.slice(0, 2).map((image) => (
            <div key={image} className="w-full relative">
              <Image
                src={image}
                fill
                alt="room-img"
                style={{ objectFit: 'cover' }}
                placeholder="blur"
                blurDataURL={IMAGE_BLUR}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={onClickModalOpen}
            className="absolute right-6 bottom-8 bg-white px-4 py-1.5 text-black rounded-md text-sm border-black cursor-pointer flex gap-2 items-center hover:shadow-lg"
          >
            <AiOutlineUnorderedList />
            사진 모두 보기
          </button>
        </div>
      </div>
    </>
  );
};

export default HeaderSection;

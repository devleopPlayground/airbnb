import Image from 'next/image';
import Link from 'next/link';
import { AiFillFacebook, AiFillTwitterSquare, AiOutlineCopy, AiOutlineMail } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';

import { IMAGE_BLUR } from '@/constants/imageBlur';
import type { RoomType } from '@/interface';

import useShareSection from './hooks/useShareSection';

type ShareModalContentProps = {
  data?: RoomType;
  closeModal: () => void;
};

const ShareModalContent = ({ closeModal, data }: ShareModalContentProps) => {
  const { handleCopyLink, handleShareX, handleShareFacebook } = useShareSection();

  if (!data) return;

  return (
    <div className="w-full md:w-[520px] flex flex-col gap-4">
      <div className="flex justify-between">
        <h1 className="font-semibold text-lg">숙소 공유하기</h1>
        <button onClick={closeModal} className="cursor-pointer rounded-full p-1 hover:bg-black/20">
          <IoClose className="size-6" />
        </button>
      </div>
      <div className="flex gap-4">
        <Image
          src={data.images[0]}
          className="rounded-lg"
          placeholder="blur"
          blurDataURL={IMAGE_BLUR}
          alt="room-image"
          width={90}
          height={90}
        />
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-lg text-gray-800">{data.title}</h2>
          <p className="text-sm text-gray-500">{data.category}</p>
          <p className="text-sm text-gray-800">{data.address}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md-6">
        <button
          type="button"
          onClick={handleCopyLink}
          className="border border-gray-300 font-semibold rounded-lg px-6 py-4 flex items-center gap-4 hover:bg-black/20 cursor-pointer ease-in-out duration-150"
        >
          <AiOutlineCopy className="size-5" />
          링크 복사
        </button>
        {typeof window !== 'undefined' && (
          <Link
            href={`mailto:dltkdwls60202@gmail.com?subject=숙소 공유하기&body=${window.location.href}`}
            className="border border-gray-300 font-semibold rounded-lg px-6 py-4 flex items-center gap-4 hover:bg-black/20 cursor-pointer ease-in-out duration-150"
          >
            <AiOutlineMail className="size-5" />
            링크 복사
          </Link>
        )}
        <button
          type="button"
          onClick={handleShareX}
          className="border border-gray-300 font-semibold rounded-lg px-6 py-4 flex items-center gap-4 hover:bg-black/20 cursor-pointer ease-in-out duration-150"
        >
          <AiFillTwitterSquare className="size-5 text-sky-500" />
          링크 복사
        </button>
        <button
          type="button"
          onClick={handleShareFacebook}
          className="border border-gray-300 font-semibold rounded-lg px-6 py-4 flex items-center gap-4 hover:bg-black/20 cursor-pointer ease-in-out duration-150"
        >
          <AiFillFacebook className="size-5 text-blue-600" />
          링크 복사
        </button>
      </div>
    </div>
  );
};

export default ShareModalContent;

'use client';

import Image from 'next/image';

import { Loader } from '@/components/common/Loader';
import { IMAGE_BLUR } from '@/constants/imageBlur';

import useImageModal from './(hooks)/useImageModal';

const ImageModal = () => {
  const { isMounted, cachedData, onClickCloseModal } = useImageModal();

  if (!isMounted) return null;

  return (
    <>
      {cachedData ? (
        <div className="w-full h-screen flex items-center justify-center fixed bg-black/40 top-0 left-0 right-0 bottom-0 z-9999">
          <div className="w-full max-w-5xl transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all max-h-[90vh] overflow-scroll scrollbar-hide">
            <div className="text-xl md:text-2xl font-medium leading-6 text-gray-900">이미지 전체 보기</div>
            <div className="mt-10 md-20 max-w-xl mx-auto flex flex-col gap-4">
              {cachedData.images.map((image) => (
                <Image
                  src={image}
                  className="mx-auto"
                  placeholder="blur"
                  blurDataURL={IMAGE_BLUR}
                  width={1000}
                  height={1000}
                  key={image}
                  alt="room-image"
                />
              ))}
            </div>
            <div className="mt-4">
              <button
                type="button"
                className="inline-flex justify-center text-rose-800 rounded-md border border-transparent bg-rose-100 px-5 py-2 cursor-pointer hover:bg-rose-200 transition ease-in-out"
                onClick={onClickCloseModal}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ImageModal;

import Image from 'next/image';
import Link from 'next/link';

import { IMAGE_BLUR } from '@/constants/imageBlur';
import type { RoomType } from '@/interface';

const RoomItem = ({ id, images, title, category, address, price }: RoomType) => {
  return (
    <div key={id}>
      <Link href={`/rooms/${id}`}>
        <Image
          width={200}
          height={200}
          src={images[0]}
          alt={title}
          placeholder="blur"
          blurDataURL={IMAGE_BLUR}
          className="rounded-md w-full h-auto object-fit"
        />
        <div className="mt-2 font-semibold text-sm">{title}</div>
        <span className="text-xs px-2 py-1 rounded-full bg-black text-white">{category}</span>
        <div className="mt-1 text-gray-400 text-sm">{address}</div>
        <div className="mt-1 text-sm">
          {price.toLocaleString()} 원<span className="text-gray-500"> / 1박</span>
        </div>
      </Link>
    </div>
  );
};

export default RoomItem;

import { useAtom } from 'jotai';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineCloseCircle } from 'react-icons/ai';

import { selectedRoomAtom } from '@/atoms/mapAtoms';
import { IMAGE_BLUR } from '@/constants/imageBlur';

const SelectedRoom = () => {
  const [selectedRoom, setSelectedRoom] = useAtom(selectedRoomAtom);

  if (!selectedRoom) return null;

  return (
    <div className="fixed inset-x-0 mx-auto bottom-20 rounded-lg shadow-lg max-w-xs md:max-w-sm z-10 w-full bg-white">
      <div className="flex flex-col relative">
        <button
          type="button"
          className="absolute right-2 top-2 text-white text-2xl bg-black/20 rounded-full cursor-pointer"
          onClick={() => setSelectedRoom(null)}
        >
          <AiOutlineCloseCircle />
        </button>
        <Link href={`/rooms/${selectedRoom.id}`}>
          <div className="rounded-lg-t h-[200px] overflow-hidden">
            <Image
              width={384}
              height={384}
              src={selectedRoom.images[0]}
              alt="room-image"
              placeholder="blur"
              blurDataURL={IMAGE_BLUR}
              className="rounded-t-lg"
            />
          </div>
          <div className="p-4 font-semibold bg-white rounded-b-lg flex flex-col gap-1">
            <div>{selectedRoom.title}</div>
            <div className="text-gray-400">{selectedRoom.address}</div>
            <div className="">
              {selectedRoom.price.toLocaleString()} 원 <span className="text-gray-400"> /박</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SelectedRoom;

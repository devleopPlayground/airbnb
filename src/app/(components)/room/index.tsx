import type { RoomType } from '@/interface';

const RoomItem = ({ id, images, title, category, address, price }: RoomType) => {
  return (
    <div key={id}>
      <img src={images[0]} alt={title} className="rounded-md w-full h-auto object-fit" />
      <div className="mt-2 font-semibold text-sm">{title}</div>
      <span className="text-xs px-2 py-1 rounded-full bg-black text-white">{category}</span>
      <div className="mt-1 text-gray-400 text-sm">{address}</div>
      <div className="mt-1 text-sm">
        {price.toLocaleString()} 원<span className="text-gray-500"> / 1박</span>
      </div>
    </div>
  );
};

export default RoomItem;


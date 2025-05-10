import type { RoomType } from '@/interface';

import DetailRoomMap from '../map/DetailRoomMap';

type MapSectionProps = {
  data?: RoomType;
};

const MapSection = ({ data }: MapSectionProps) => {
  return (
    <div className="py-8 px-4 border-b border-gray-300 leading-8 text-gray-800">
      <h1 className="font-semibold text-xl mb-2">호스팅 지역</h1>
      <div className="mt-4">
        <DetailRoomMap data={data} />
      </div>
      <div className="mt-8 font-semibold">{data?.address}</div>
      <div className="mt-3 text-gray-600">{data?.description}</div>
    </div>
  );
};

export default MapSection;

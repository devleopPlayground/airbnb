'use client';

import useGetRoomDetail from '@/hooks/api/rooms/useGetRoomDetail';

import CommentSection from './comment';
import FeatureSection from './FeatureSection';
import HeaderSection from './HeaderSection';
import MapSection from './MapSection';

type RoomDetailProps = {
  id: string;
};

const RoomDetail = ({ id }: RoomDetailProps) => {
  const { roomDetail } = useGetRoomDetail(id);

  return (
    <div className="mt-8 mb-20 max-w-6xl mx-auto">
      <HeaderSection data={roomDetail} />
      <FeatureSection data={roomDetail} />
      <CommentSection room={roomDetail} />
      <MapSection data={roomDetail} />
    </div>
  );
};

export default RoomDetail;

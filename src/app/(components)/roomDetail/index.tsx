'use client';

import useRoomDetail from './hooks/useRoomDetail';

type RoomDetailProps = {
  id: string;
};

const RoomDetail = ({ id }: RoomDetailProps) => {
  const { roomDetail } = useRoomDetail(id);

  return <div className="mt-8 mb-20 max-w-6xl mx-auto">{JSON.stringify(roomDetail)}</div>;
};

export default RoomDetail;

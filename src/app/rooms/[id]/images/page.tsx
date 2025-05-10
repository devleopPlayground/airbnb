import RoomDetailComponent from '@/components/RoomDetail';
import type { ParamsProps } from '@/interface';

const RoomDetailPage = async ({ params }: ParamsProps) => {
  const { id } = params;

  return <RoomDetailComponent id={id} />;
};

export default RoomDetailPage;

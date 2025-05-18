import useGetComments from '@/hooks/api/comments/useGetComments';
import type { RoomType } from '@/interface';

import CommentForm from './CommentForm';
import CommentList from './CommentList';

type CommentSectionProps = {
  room?: RoomType;
};

const CommentSection = ({ room }: CommentSectionProps) => {
  const { roomComments, isLoading } = useGetComments(Number(room?.id));

  return (
    <div className="border-b border-gray-300 py-8 px-4">
      <CommentForm roomId={Number(room?.id)} />
      <CommentList roomId={String(room?.id)} {...roomComments} isLoading={isLoading} />
    </div>
  );
};

export default CommentSection;

import 'dayjs/locale/ko';

import dayjs from 'dayjs';
import { IoIosArrowForward } from 'react-icons/io';

import type { CommentType } from '@/interface';

type CommentItemProps = {
  comment: CommentType;
  onNavigateRoom?: (roomId: string) => void;
};

const CommentItem = ({ comment, onNavigateRoom }: CommentItemProps) => {
  return (
    <div key={comment.id} className="flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <img
          src={comment?.user.image || '/images/user.png'}
          className="size-12 rounded-full"
          alt="user-icon"
        />
        <div>
          <h1 className="font-semibold">{comment?.user.name || '-'}</h1>
          <div className="text-gray-500 text-xs">{dayjs(comment?.createdAt).format('YYYY-MM-DD HH:mm')}</div>
        </div>
      </div>
      <div className="max-w-md text-gray-600">{comment?.body}</div>

      {onNavigateRoom && (
        <div
          onClick={() => onNavigateRoom(String(comment?.roomId))}
          className="flex items-center gap-1 underline text-gray-600 underline-offset-2 hover:text-gray-800 cursor-pointer"
        >
          숙소 보기 <IoIosArrowForward />
        </div>
      )}
    </div>
  );
};

export default CommentItem;

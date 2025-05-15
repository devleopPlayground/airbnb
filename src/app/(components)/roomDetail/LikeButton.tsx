import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import type { RoomType } from '@/interface';

import useLikeButton from './hooks/useLikeButton';

type LikeButtonProps = {
  data?: RoomType;
};

const LikeButton = ({ data }: LikeButtonProps) => {
  const { onClickToggleLike } = useLikeButton(Number(data?.id));

  return (
    <button
      type="button"
      onClick={onClickToggleLike}
      className="flex gap-2 items-center px-2 py-1.5 rounded-lg hover:bg-black/10 cursor-pointer"
    >
      {data?.likes && data.likes.length > 0 ? (
        <>
          <AiFillHeart className="text-red-500 hover:text-red-600 focus:text-red-600" />
          <span className="underline underline-offset-2">취소</span>
        </>
      ) : (
        <>
          <AiOutlineHeart className="text-gray-500" />
          <span className="underline underline-offset-2">저장</span>
        </>
      )}
    </button>
  );
};

export default LikeButton;

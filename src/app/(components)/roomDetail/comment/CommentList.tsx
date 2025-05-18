import { Loader } from '@/components/common/Loader';
import type { CommentResponseApiType } from '@/interface';

import useCommentList from './hooks/useCommentList';

type CommentListProps = CommentResponseApiType & {
  isLoading: boolean;
  roomId: string;
};

const CommentList = ({ comments, totalCount, isLoading, roomId }: CommentListProps) => {
  const { handleOpenModal } = useCommentList(roomId);

  return (
    <>
      <h1 className="font-semibold text-xl mb-2">후기: {totalCount ?? 0}개</h1>
      <div className="mt-8 grid md:grid-cols-2 gap-12 w-full">
        {isLoading ? (
          <Loader className="col-span-2" />
        ) : (
          comments?.map((comment) => (
            <div key={comment.id} className="flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <img
                  src={comment?.user.image || '/images/user.png'}
                  className="size-12 rounded-full"
                  alt="user-icon"
                />
                <div>
                  <h1 className="font-semibold">{comment?.user.name || '-'}</h1>
                  <div className="text-gray-500 text-xs">{comment?.createdAt}</div>
                </div>
              </div>
              <div className="max-w-md text-gray-600">{comment?.body}</div>
            </div>
          ))
        )}
      </div>
      {totalCount && totalCount > 6 ? (
        <div className="mt-10">
          <button
            type="button"
            onClick={handleOpenModal}
            className="border border-gray-700 font-semibold rounded-lg px-6 py-4 flex items-center gap-4 hover:bg-black/5 cursor-pointer"
          >
            후기 {totalCount}개 모두 보기
          </button>
        </div>
      ) : (
        <div className="pb-8" />
      )}
    </>
  );
};

export default CommentList;

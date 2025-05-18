import useCommentForm from './hooks/useCommentForm';

type CommentFormProps = {
  roomId: number;
};

const CommentForm = ({ roomId }: CommentFormProps) => {
  const { session, handleSubmit } = useCommentForm(roomId);

  return (
    <>
      {session && (
        <form className="mt-8" onSubmit={handleSubmit}>
          <textarea
            rows={3}
            name="comment"
            placeholder="후기를 작성해주세요."
            className="w-full block min-h-[120px] resize-none border border-gray-400 rounded-md bg-transparent py-2.5 px-4 placeholder:text-gray-400 text-sm leading-6 outline-none focus:border-gray-600"
          />
          <div className="flex flex-row-reverse mt-4">
            <button
              type="submit"
              className="bg-rose-600 hover:bg-rose-500 text-white px-8 py-2.5 cursor-pointer text-sm font-semibold shadow-sm rounded-md"
            >
              작성하기
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default CommentForm;
